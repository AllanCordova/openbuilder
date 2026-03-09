"use client";

import Link from "next/link";
import { Castle, Menu } from "lucide-react";

export const Header = ({ onOpenSidebar }: { onOpenSidebar: () => void }) => {
  return (
    <header
      data-testid="header-main-container"
      className="flex items-center justify-between bg-background border-b border-header px-4 h-16 shrink-0 lg:px-8"
    >
      <div className="flex-1 flex justify-start lg:hidden">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 text-muted hover:text-foreground hover:bg-background-alt rounded-default transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={2} />
        </button>
      </div>

      <div className="hidden lg:flex flex-1"></div>

      <div className="flex flex-1 items-center justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:opacity-90 transition-opacity"
          data-testid="header-logo-link"
        >
          <Castle className="text-primary" size={24} strokeWidth={2} />
          <h1 className="text-typography-heading font-bold whitespace-nowrap">
            Cadre
          </h1>
        </Link>
      </div>

      <div className="flex flex-1 justify-end"></div>
    </header>
  );
};
