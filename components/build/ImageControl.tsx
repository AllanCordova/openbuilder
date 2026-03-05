"use client";

import {
  IMAGE_SIZE_PRESETS,
  IMAGE_OBJECT_FIT_PRESETS,
} from "@/constants/properties";
import {
  getWidthClasses,
  hasWidthPreset,
  hasObjectFit,
  setWidthPreset,
  setObjectFit,
  setCustomWidthClasses,
} from "@/lib/imageClassName";

const inputClassName =
  "w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-light)] rounded-default text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors text-foreground placeholder:text-muted";
const labelClassName = "text-xs font-semibold text-foreground";

type ImageControlProps = {
  src?: string;
  alt?: string;
  currentClassName: string;
  onSrcChange: (value: string) => void;
  onAltChange: (value: string) => void;
  onClassNameChange: (className: string) => void;
};

export const ImageControl = ({
  src = "",
  alt = "",
  currentClassName,
  onSrcChange,
  onAltChange,
  onClassNameChange,
}: ImageControlProps) => {
  const sizeClasses = getWidthClasses(currentClassName);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className={labelClassName}>Image URL (src)</label>
        <input
          type="url"
          className={inputClassName}
          value={src}
          onChange={(e) => onSrcChange(e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClassName}>Alt text</label>
        <input
          type="text"
          className={inputClassName}
          value={alt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Description for accessibility"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName}>Size (presets)</label>
        <div className="flex flex-wrap gap-1.5">
          {IMAGE_SIZE_PRESETS.map((preset) => {
            const isActive = hasWidthPreset(currentClassName, preset.className);
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  onClassNameChange(setWidthPreset(currentClassName, preset.className))
                }
                className={`px-2 py-1.5 text-xs font-medium rounded border transition-colors ${
                  isActive
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-[var(--background)] text-muted border-[var(--border-light)] hover:border-[var(--primary)]/50"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClassName}>Object fit</label>
        <div className="flex flex-wrap gap-1.5">
          {IMAGE_OBJECT_FIT_PRESETS.map((preset) => {
            const isActive = hasObjectFit(currentClassName, preset.className);
            return (
              <button
                key={preset.label || "none"}
                type="button"
                onClick={() =>
                  onClassNameChange(setObjectFit(currentClassName, preset.className))
                }
                className={`px-2 py-1.5 text-xs font-medium rounded border transition-colors ${
                  isActive
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-[var(--background)] text-muted border-[var(--border-light)] hover:border-[var(--primary)]/50"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClassName}>Custom size (Tailwind)</label>
        <input
          type="text"
          className={`${inputClassName} font-mono`}
          value={sizeClasses}
          onChange={(e) =>
            onClassNameChange(
              setCustomWidthClasses(currentClassName, e.target.value),
            )
          }
          placeholder="w-full max-w-md sm:w-1/2..."
        />
      </div>
    </div>
  );
};
