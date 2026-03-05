"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragCancelEvent,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { LibInterface } from "@/components/build/LibInterface";
import { SavePage } from "@/components/section/SavePage";
import { EditorShell } from "@/components/section/EditorShell";
import { PaginatedResponse } from "@/types/Paginator.type";
import { ComponentLibraryDto } from "@/types/ComponentLibrary.dto";
import { PaginatorActions } from "../ui/PaginatorActions";
import { usePageBySlugQuery } from "@/hooks/usePages";
import { EmptyFallback } from "../ui/EmptyFallback";
import { ErrorFallback } from "../ui/ErrorFallback";
import { Spinner } from "../ui/Spinner";
import { ReturnFallback } from "../ui/ReturnFallback";
import { useCanvas } from "@/hooks/useCanvas";
import { schemaToASTNode } from "@/types/AstNode.type";
import {
  type LibraryItemDragData,
  LibraryItemDragPreview,
} from "@/components/build/DraggableLibraryItem";
import { GripVertical } from "lucide-react";

export type CanvasItemDragData = {
  type: "canvas";
  nodeKey: string;
  nodeType: string;
};

function CanvasItemDragPreview({ nodeType }: { nodeType: string }) {
  return (
    <div
      className="flex items-center gap-2 py-2 px-3 rounded-[var(--radius-md)] border-2 border-primary bg-[var(--background-alt)] shadow-lg cursor-grabbing min-w-[10rem]"
      role="presentation"
    >
      <GripVertical size={16} className="shrink-0 text-muted" aria-hidden />
      <span className="text-[length:var(--text-sm)] text-foreground font-medium">
        Moving: {nodeType}
      </span>
    </div>
  );
}

type BuilderClientShellProps = {
  projectId: string;
  slug: string;
  initialComponents: ComponentLibraryDto[];
  paginationMeta: PaginatedResponse<ComponentLibraryDto>["meta"];
};

export function BuilderClientShell({
  projectId,
  slug,
  initialComponents,
  paginationMeta,
}: BuilderClientShellProps) {
  const [viewMode, setViewMode] = useState<"preview" | "canva">("canva");
  const [activeLibraryDrag, setActiveLibraryDrag] =
    useState<LibraryItemDragData | null>(null);
  const [activeCanvasDrag, setActiveCanvasDrag] =
    useState<CanvasItemDragData | null>(null);
  const { addComponentAtTarget, moveNodeToTarget } = useCanvas();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 6 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data && typeof data === "object" && "type" in data) {
      if (data.type === "library")
        setActiveLibraryDrag(data as LibraryItemDragData);
      if (data.type === "canvas" && "nodeKey" in data && "nodeType" in data)
        setActiveCanvasDrag(data as CanvasItemDragData);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveLibraryDrag(null);
    setActiveCanvasDrag(null);

    if (!over) return;

    const data = active.data.current;
    const targetKey = String(over.id);

    if (data && typeof data === "object" && "type" in data) {
      if (data.type === "library" && "schema" in data && data.schema) {
        addComponentAtTarget(targetKey, schemaToASTNode(data.schema));
        return;
      }
      if (
        data.type === "canvas" &&
        "nodeKey" in data &&
        typeof data.nodeKey === "string"
      ) {
        if (data.nodeKey === targetKey) return;
        moveNodeToTarget(data.nodeKey, targetKey);
      }
    }
  };

  const handleDragCancel = () => {
    setActiveLibraryDrag(null);
    setActiveCanvasDrag(null);
  };

  const {
    data: pageData,
    isLoading,
    error,
  } = usePageBySlugQuery(projectId, `/${slug}`);

  if (isLoading) {
    return <Spinner />;
  }

  if (!pageData) {
    return <EmptyFallback message="Page not Found!" showBackButton={true} />;
  }

  if (error) {
    return <ErrorFallback error={error.message} />;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="h-screen flex w-full overflow-hidden bg-[var(--background)]">
        {viewMode === "canva" && (
          <article className="lib-article flex h-full w-[min(20rem,100%)] min-w-[16rem] shrink-0 flex-col border-r border-[var(--border-light)] p-[var(--spacing-dashboard)]">
            <div className="shrink-0">
              <h1 className="mb-[var(--spacing-dashboard)] text-[var(--text-xl)] font-bold text-foreground">
                Components
              </h1>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pr-2">
              <div className="flex-1">
                <LibInterface components={initialComponents} />
              </div>

              {paginationMeta && (
                <div className="flex-1">
                  <PaginatorActions totalPages={paginationMeta.totalPages} />
                </div>
              )}
            </div>
          </article>
        )}

        <main className="canva-area flex h-full min-w-0 flex-1 flex-col gap-4 p-[var(--spacing-dashboard)]">
          <header className="flex shrink-0 items-center justify-between border-b border-[var(--border-light)] pb-4">
            <div className="flex items-center gap-4">
              <div className="mt-1">
                <ReturnFallback
                  text="Return to Pages"
                  href={`/projects/${projectId}`}
                />
              </div>

              <div className="h-8 w-px bg-[var(--border-light)] hidden sm:block" />

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                  Edit Page
                </span>
                <h2 className="text-2xl font-bold text-foreground">
                  {pageData?.name}
                </h2>
              </div>
            </div>

            <div>
              <SavePage
                pageId={pageData.id}
                projectId={projectId}
                pageSlug={pageData.slug}
              />
            </div>
          </header>

          <div className="relative w-full min-h-0 flex-1">
            <EditorShell
              page={pageData}
              viewMode={viewMode}
              onViewChange={setViewMode}
            />
          </div>
        </main>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeLibraryDrag ? (
          <LibraryItemDragPreview name={activeLibraryDrag.name} />
        ) : activeCanvasDrag ? (
          <CanvasItemDragPreview nodeType={activeCanvasDrag.nodeType} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
