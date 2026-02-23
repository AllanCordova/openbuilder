"use client";

import { useState } from "react";
import { Trash2, FileText, Edit } from "lucide-react";
import Link from "next/link";
import { usePagesList, usePageMutations } from "@/hooks/usePages";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import type { PageDto } from "@/types/Page.dto";
import { EditPageModal } from "./EditPageModal";
import { ErrorFallback } from "../ui/ErrorFallback";

type PageListProps = {
  projectId: string;
};

export const PageList = ({ projectId }: PageListProps) => {
  const { data: pages = [], isLoading, error } = usePagesList(projectId);

  const { deletePage } = usePageMutations(projectId);

  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const editingPage = pages.find((p) => p.id === editingPageId) || null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorFallback error={error.message || "Error loading pages"} />;
  }

  if (pages.length === 0) {
    return <EmptyFallback message="No pages yet. Create your first page!" />;
  }

  const handleDelete = async (page: PageDto) => {
    if (confirm(`Are you sure you want to delete "${page.name}"?`)) {
      await deletePage(page.id);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid gap-3">
        {pages.map((page) => (
          <div
            key={page.id}
            className="flex items-center justify-between p-4 bg-background-alt border border-header rounded-default hover:border-primary/50 transition-all group"
          >
            <Link
              href={`/projects/${projectId}/sections${page.slug}`}
              className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
            >
              <FileText
                className="text-primary shrink-0"
                size={20}
                strokeWidth={2}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-typography-body font-semibold text-foreground truncate">
                    {page.name}
                  </h3>
                </div>
                <p className="text-typography-small text-foreground/70 truncate">
                  {page.slug}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditingPageId(page.id);
                }}
                className="p-2 rounded-default hover:bg-background transition-colors text-foreground/60 hover:text-foreground"
                aria-label={`Edit page ${page.name}`}
              >
                <Edit size={16} strokeWidth={2} />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(page);
                }}
                className="p-2 rounded-default hover:bg-background transition-colors text-foreground/60 hover:text-[var(--destructive)]"
                aria-label={`Delete page ${page.name}`}
              >
                <Trash2 size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}

        {editingPage && (
          <EditPageModal
            page={editingPage}
            isOpen={editingPageId !== null}
            onClose={() => setEditingPageId(null)}
            onSuccess={() => {
              setEditingPageId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
