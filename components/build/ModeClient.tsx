"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { LibInterface } from "@/components/build/LibInterface";
import { SavePage } from "@/components/section/SavePage";
import { Mode } from "@/components/build/Mode";
import { PaginatedResponse } from "@/types/Paginator.type";
import { ComponentLibraryDto } from "@/types/ComponentLibrary.dto";
import { PaginatorActions } from "../ui/PaginatorActions";
import { usePageBySlugQuery } from "@/hooks/usePages";
import { EmptyFallback } from "../ui/fallback/EmptyFallback";
import { ErrorFallback } from "../ui/fallback/ErrorFallback";
import { Spinner } from "../ui/Spinner";
import { ReturnFallback } from "../ui/fallback/ReturnFallback";
import { useCanvas } from "@/hooks/useCanvas";
import { schemaToASTNode } from "@/types/AstNode.type";
import {
  type LibraryItemDragData,
  LibraryItemDragPreview,
} from "@/components/build/DraggableLibraryItem";

type BuilderClientShellProps = {
  projectId: string;
  slug: string;
  initialComponents: ComponentLibraryDto[];
  paginationMeta: PaginatedResponse<ComponentLibraryDto>["meta"];
};

export function ModeClient({
  projectId,
  slug,
  initialComponents,
  paginationMeta,
}: BuilderClientShellProps) {
  const [viewMode, setViewMode] = useState<"preview" | "canva">("canva");
  const [activeLibraryDrag, setActiveLibraryDrag] =
    useState<LibraryItemDragData | null>(null);
  const { addComponentAtTarget } = useCanvas();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 6 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data && typeof data === "object" && "type" in data && data.type === "library")
      setActiveLibraryDrag(data as LibraryItemDragData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveLibraryDrag(null);

    if (!over) return;

    const data = active.data.current;
    const targetKey = String(over.id);

    if (
      data &&
      typeof data === "object" &&
      "type" in data &&
      data.type === "library" &&
      "schema" in data &&
      data.schema
    ) {
      const schemaNode = schemaToASTNode(data.schema);
      const displayName =
        typeof (data as { name?: string }).name === "string"
          ? (data as { name: string }).name
          : null;
      const nodeWithLabel =
        displayName && schemaNode.props
          ? {
              ...schemaNode,
              props: { ...schemaNode.props, dataLabel: displayName },
            }
          : schemaNode;
      addComponentAtTarget(targetKey, nodeWithLabel);
    }
  };

  const handleDragCancel = () => setActiveLibraryDrag(null);

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
            <Mode
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
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
