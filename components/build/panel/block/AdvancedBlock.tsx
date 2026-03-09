"use client";

const inputClassName =
  "w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-light)] rounded-default text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors text-foreground placeholder:text-muted";

type AdvancedBlockProps = {
  className: string;
  onChange: (value: string) => void;
};

export function AdvancedBlock({ className = "", onChange }: AdvancedBlockProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-foreground">
        Tailwind classes
      </label>
      <textarea
        className={inputClassName}
        rows={3}
        value={className}
        onChange={(e) => onChange(e.target.value)}
        placeholder="px-4 py-2 bg-primary..."
      />
    </div>
  );
}
