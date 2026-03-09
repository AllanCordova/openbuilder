"use client";

const inputClassName =
  "w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-light)] rounded-default text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors text-foreground placeholder:text-muted";
const labelClassName = "text-xs font-semibold text-foreground";

type TextBlockProps = {
  content?: string;
  tag?: string;
  onContentChange?: (value: string) => void;
  onTagChange?: (value: string) => void;
  showContent?: boolean;
  showTag?: boolean;
};

export function TextBlock({
  content = "",
  tag = "",
  onContentChange,
  onTagChange,
  showContent = true,
  showTag = false,
}: TextBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      {showContent && onContentChange && (
        <div className="flex flex-col gap-1.5">
          <label className={labelClassName}>Content</label>
          <input
            type="text"
            className={inputClassName}
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Label or text..."
          />
        </div>
      )}
      {showTag && onTagChange && (
        <div className="flex flex-col gap-1.5">
          <label className={labelClassName}>HTML tag</label>
          <input
            type="text"
            className={`${inputClassName} font-mono`}
            value={tag}
            onChange={(e) => onTagChange(e.target.value.toLowerCase())}
            placeholder="h1, div, section, p..."
          />
        </div>
      )}
    </div>
  );
}
