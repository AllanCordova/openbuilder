"use client";

const inputClassName =
  "w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-light)] rounded-default text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors text-foreground placeholder:text-muted";
const labelClassName = "text-xs font-semibold text-foreground";

type LinkBlockProps = {
  href?: string;
  onChange: (value: string) => void;
};

export function LinkBlock({ href = "", onChange }: LinkBlockProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClassName}>URL (href)</label>
      <input
        type="url"
        className={inputClassName}
        value={href}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
      />
    </div>
  );
}
