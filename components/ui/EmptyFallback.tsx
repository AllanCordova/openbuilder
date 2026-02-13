"use client";

type EmptyFallbackProps = {
  message?: string;
};

const defaultMessage = "Nada por aqui ainda.";

export const EmptyFallback = ({ message = defaultMessage }: EmptyFallbackProps) => {
  return (
    <div
      className="empty-fallback"
      style={{
        padding: "var(--spacing-dashboard)",
        color: "var(--muted)",
        textAlign: "center",
        fontSize: "var(--text-sm)",
      }}
    >
      {message}
    </div>
  );
};
