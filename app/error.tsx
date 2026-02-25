"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("UI Error Boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center bg-[var(--background)] p-[var(--spacing-dashboard)]">
      <div className="flex w-full max-w-md flex-col items-center rounded-[var(--radius-lg)] border border-[var(--border-light)] bg-[var(--background-alt)] p-8 text-center shadow-sm">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--destructive)]/10 text-[var(--destructive)]">
          <AlertTriangle size={24} />
        </div>

        <h2 className="mb-2 text-[var(--text-lg)] font-bold text-[var(--foreground)]">
          Oops! Something went wrong.
        </h2>

        <p className="mb-6 text-[var(--text-base)] text-[var(--muted)]">
          Could not load the interface correctly. Please try reloading or try
          again.
        </p>

        {error.digest && (
          <div className="mb-6 w-full rounded-[var(--radius-sm)] border border-[var(--border-light)] bg-[var(--background)] p-3 text-left">
            <p className="font-mono text-[var(--text-xs)] text-[var(--muted)] break-all">
              <span className="font-semibold text-[var(--destructive)]">
                Code:{" "}
              </span>
              {error.digest}
            </p>
          </div>
        )}

        <button
          onClick={() => reset()}
          className="rounded-default bg-[var(--primary)] px-6 py-2.5 text-[var(--text-sm)] font-medium text-[var(--color-neutral-50)] transition-colors hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background-alt)]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
