"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical, Plus } from "lucide-react";

export type LibraryItemDragData = {
  type: "library";
  name: string;
  schema: unknown;
};

/** Preview shown inside DragOverlay while dragging */
export function LibraryItemDragPreview({ name }: { name: string }) {
  return (
    <div
      className="flex items-center gap-2 py-2 px-3 rounded-[var(--radius-md)] border-2 border-primary bg-[var(--background-alt)] shadow-lg cursor-grabbing min-w-[10rem]"
      role="presentation"
    >
      <GripVertical size={16} className="shrink-0 text-muted" aria-hidden />
      <span className="text-[length:var(--text-sm)] text-foreground font-medium truncate">
        {name}
      </span>
    </div>
  );
}

type DraggableLibraryItemProps = {
  id: string;
  name: string;
  schema: unknown;
  onAddClick: () => void;
};

export function DraggableLibraryItem({
  id,
  name,
  schema,
  onAddClick,
}: DraggableLibraryItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `lib-${id}`,
    data: {
      type: "library",
      name,
      schema,
    } as LibraryItemDragData,
  });

  return (
    <li
      ref={setNodeRef}
      className={`flex items-center justify-between gap-2 py-2 px-3 rounded-[var(--radius-md)] border transition-colors ${
        isDragging
          ? "opacity-50 bg-primary/10 border-primary"
          : "bg-[var(--background-alt)] border-[var(--border-light)] hover:border-[var(--primary)]/40"
      }`}
    >
      <div
        className="flex items-center gap-2 min-w-0 flex-1 cursor-grab active:cursor-grabbing"
        {...listeners}
        {...attributes}
      >
        <GripVertical
          size={16}
          className="shrink-0 text-muted"
          aria-hidden
        />
        <span className="text-[length:var(--text-sm)] text-foreground font-medium truncate">
          {name}
        </span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAddClick();
        }}
        className="inline-flex items-center justify-center w-8 h-8 p-0 rounded-[var(--radius-md)] bg-primary text-background border-none cursor-pointer shrink-0 hover:bg-[var(--primary-hover)] transition-colors"
        title="Add to canvas"
        aria-label={`Add ${name} to canvas`}
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
    </li>
  );
}
