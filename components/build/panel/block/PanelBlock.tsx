"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";

type PanelBlockProps = {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function PanelBlock({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: PanelBlockProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--border-light)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 py-2.5 px-0 text-left text-sm font-semibold text-foreground hover:text-primary transition-colors"
      >
        {open ? (
          <ChevronDown size={16} className="shrink-0 text-muted" />
        ) : (
          <ChevronRight size={16} className="shrink-0 text-muted" />
        )}
        {Icon && <Icon size={16} className="shrink-0 text-muted" />}
        <span>{title}</span>
      </button>
      {open && <div className="pb-4 pt-0.5">{children}</div>}
    </div>
  );
}
