"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type EmptyFallbackProps = {
  message?: string;
  showBackButton?: boolean;
};

const defaultMessage = "Not Found!";

export const EmptyFallback = ({
  message = defaultMessage,
  showBackButton = false,
}: EmptyFallbackProps) => {
  const router = useRouter();

  return (
    <div
      className="empty-fallback flex flex-col items-center justify-center gap-4"
      style={{
        padding: "var(--spacing-dashboard)",
        color: "var(--muted)",
        textAlign: "center",
        fontSize: "var(--text-sm)",
      }}
    >
      <p>{message}</p>

      {showBackButton && (
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-default font-medium border border-header bg-background-alt text-foreground hover:bg-[var(--primary)]/10 transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar para a página anterior
        </button>
      )}
    </div>
  );
};
