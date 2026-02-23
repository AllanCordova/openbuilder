"use client";

import { toast } from "sonner";
import { useCanvas } from "@/hooks/useCanvas";
import { ASTNode } from "@/types/AstNode.type";
import { Trash2 } from "lucide-react";
import { usePageMutations } from "@/hooks/usePages";

type PropsType = {
  pageId: string;
  projectId: string;
  pageSlug: string;
};

export const SavePage = ({ pageId, projectId, pageSlug }: PropsType) => {
  const { components, clearCanvas } = useCanvas();

  const { saveCanvas, isSavingCanvas } = usePageMutations(projectId);

  const handleSubmit = async () => {
    const root: ASTNode = {
      type: "root",
      props: {},
      children: components,
    };

    const response = await saveCanvas({
      id: pageId,
      schema: root,
      slug: pageSlug,
    });

    if (response.success) {
      toast.success("Page saved successfully!");
    } else {
      toast.error(response.error ?? "Failed to save page");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSubmit}
        disabled={isSavingCanvas}
        className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{isSavingCanvas ? "Saving…" : "Save"}</span>
      </button>

      <button
        onClick={() => clearCanvas()}
        disabled={isSavingCanvas}
        className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-default font-medium text-typography-body bg-background-alt text-foreground hover:bg-[var(--primary-hover)]/10 border border-header transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Trash2 size={16} strokeWidth={2} />
        <span>Clear</span>
      </button>
    </div>
  );
};
