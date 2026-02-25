"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type PaginatorActionsProps = {
  totalPages: number;
};

export function PaginatorActions({ totalPages }: PaginatorActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", newPage.toString());
    const search = current.toString();

    router.push(`${pathname}?${search}`, { scroll: false });
  };

  return (
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border-light)] shrink-0">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex items-center gap-1 text-xs text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:text-[var(--primary-hover)] hover:underline"
      >
        <ChevronLeft size={14} /> Ant
      </button>

      <span className="text-xs text-foreground/70 font-medium">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex items-center gap-1 text-xs text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:text-[var(--primary-hover)] hover:underline"
      >
        Próx <ChevronRight size={14} />
      </button>
    </div>
  );
}
