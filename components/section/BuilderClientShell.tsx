"use client";

import { useState } from "react";
import { LibInterface } from "@/components/build/LibInterface";
import { SavePage } from "@/components/section/SavePage";
import { EditorShell } from "@/components/section/EditorShell";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PaginatedResponse } from "@/types/Paginator.type";
import { ComponentLibraryDto } from "@/types/ComponentLibrary.dto";
import { PaginatorActions } from "../ui/PaginatorActions";
import { usePageBySlugQuery } from "@/hooks/usePages";
import { EmptyFallback } from "../ui/EmptyFallback";
import { ErrorFallback } from "../ui/ErrorFallback";
import { Spinner } from "../ui/Spinner";

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
    <div className="h-screen flex w-full overflow-hidden bg-[var(--background)]">
      {viewMode === "canva" && (
        <article className="lib-article flex h-full w-[min(20rem,100%)] min-w-[16rem] shrink-0 flex-col border-r border-[var(--border-light)] p-[var(--spacing-dashboard)]">
          <div className="shrink-0">
            <Link
              href={`/projects/${projectId}`}
              className="mb-4 flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ChevronLeft size={16} /> Go out
            </Link>
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
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/50">
              Edit Page
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              {pageData?.name || "Página não encontrada"}
            </h2>
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
  );
}
