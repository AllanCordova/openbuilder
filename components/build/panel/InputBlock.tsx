"use client";

const inputClassName =
  "w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-light)] rounded-default text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors text-foreground placeholder:text-muted";
const labelClassName = "text-xs font-semibold text-foreground";

type InputBlockProps = {
  type?: string;
  placeholder?: string;
  rows?: number;
  isTextarea?: boolean;
  onTypeChange?: (value: string) => void;
  onPlaceholderChange: (value: string) => void;
  onRowsChange?: (value: number) => void;
};

export function InputBlock({
  type = "text",
  placeholder = "",
  rows = 4,
  isTextarea = false,
  onTypeChange,
  onPlaceholderChange,
  onRowsChange,
}: InputBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      {!isTextarea && onTypeChange && (
        <div className="flex flex-col gap-1.5">
          <label className={labelClassName}>Input type</label>
          <select
            className={inputClassName}
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
            <option value="search">Search</option>
          </select>
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className={labelClassName}>Placeholder</label>
        <input
          type="text"
          className={inputClassName}
          value={placeholder}
          onChange={(e) => onPlaceholderChange(e.target.value)}
          placeholder="Placeholder..."
        />
      </div>
      {isTextarea && onRowsChange && (
        <div className="flex flex-col gap-1.5">
          <label className={labelClassName}>Rows</label>
          <input
            type="number"
            className={inputClassName}
            value={rows}
            onChange={(e) => onRowsChange(parseInt(e.target.value, 10) || 4)}
            min={1}
          />
        </div>
      )}
    </div>
  );
}
