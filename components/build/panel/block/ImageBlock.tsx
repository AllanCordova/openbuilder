"use client";

import { ImageControl } from "../control/ImageControl";

type ImageBlockProps = {
  src?: string;
  alt?: string;
  currentClassName?: string;
  onClassNameChange?: (className: string) => void;
  onSrcChange: (value: string) => void;
  onAltChange: (value: string) => void;
};

export function ImageBlock({
  src = "",
  alt = "",
  currentClassName = "",
  onClassNameChange,
  onSrcChange,
  onAltChange,
}: ImageBlockProps) {
  if (!onClassNameChange) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">Image URL (src)</label>
          <input
            type="url"
            className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-light)] rounded-default text-sm"
            value={src}
            onChange={(e) => onSrcChange(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">Alt text</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-light)] rounded-default text-sm"
            value={alt}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Description for accessibility"
          />
        </div>
      </div>
    );
  }

  return (
    <ImageControl
      src={src}
      alt={alt}
      currentClassName={currentClassName}
      onSrcChange={onSrcChange}
      onAltChange={onAltChange}
      onClassNameChange={onClassNameChange}
    />
  );
}
