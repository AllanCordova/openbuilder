"use client";

import { useDraggable } from "@dnd-kit/core";

export type LibraryItemDragData = {
  type: "library";
  name: string;
  schema: unknown;
};

export function LibraryItemDragPreview({ name }: { name: string }) {
  return (
    <div
      className="flex items-center py-2 px-3 rounded-[var(--radius-md)] border-2 border-primary bg-[var(--background-alt)] shadow-lg cursor-grabbing min-w-[10rem]"
      role="presentation"
    >
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
};

export function DraggableLibraryItem({
  id,
  name,
  schema,
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
      className={`flex items-center py-2 px-3 rounded-[var(--radius-md)] border transition-colors cursor-grab active:cursor-grabbing ${
        isDragging
          ? "opacity-50 bg-primary/10 border-primary"
          : "bg-[var(--background-alt)] border-[var(--border-light)] hover:border-[var(--primary)]/40"
      }`}
      {...listeners}
      {...attributes}
    >
      <span className="text-[length:var(--text-sm)] text-foreground font-medium truncate">
        {name}
      </span>
    </li>
  );
}
