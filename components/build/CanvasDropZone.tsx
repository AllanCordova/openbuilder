"use client";

import { useDroppable } from "@dnd-kit/core";
import { ROOT_NODE_KEY } from "@/constants/AST";

type CanvasDropZoneProps = {
  children: React.ReactNode;
};

export function CanvasDropZone({ children }: CanvasDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: ROOT_NODE_KEY,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex-1 min-h-full transition-colors rounded-[var(--radius-dashboard)] ${
        isOver ? "bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-[var(--dashboard-bg)]" : ""
      }`}
    >
      {children}
    </div>
  );
}
