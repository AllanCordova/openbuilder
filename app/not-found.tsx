import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 w-full px-4">
      <div
        role="alert"
        className="flex flex-col items-center text-center gap-4 p-8 rounded-default bg-[var(--primary)]/10 border border-header text-typography-body text-foreground max-w-md w-full"
      >
        <FileQuestion className="text-primary" size={48} strokeWidth={1.5} />

        <div className="space-y-2">
          <h2 className="text-xl font-bold">Page not found</h2>
          <p className="text-[var(--muted)] text-sm">
            Sorry, but the page you are trying to access does not exist or has
            been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 py-2 px-4 mt-4 rounded-default font-medium border border-header bg-background-alt text-foreground hover:bg-[var(--primary)]/10 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
