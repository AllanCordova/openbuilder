"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { savePageCanvas } from "@/actions/Page.action";
import { useCanvas } from "@/hooks/useCanvas";
import { ASTNode } from "@/types/AstNode.type";
import { Trash2 } from "lucide-react";

type PropsType = {
  pageId: string;
  projectId: string;
};

export const SavePage = ({ pageId, projectId }: PropsType) => {
  const { components, clearCanvas } = useCanvas();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const root: ASTNode = {
        type: "root",
        props: {},
        children: components,
      };

      const response = await savePageCanvas({
        id: pageId,
        projectId,
        schema: root,
      });

      if (response.success) {
        toast.success("Page saved successfully!");
      } else {
        toast.error(response.error ?? "Failed to save page");
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span>{isPending ? "Saving…" : "Save"}</span>
      </button>

      <button
        onClick={() => clearCanvas()}
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-default font-medium text-typography-body bg-background-alt text-foreground hover:bg-[var(--primary-hover)]/10 border border-header transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Trash2 size={16} strokeWidth={2} />
        <span>Clear</span>
      </button>
    </div>
  );
};
