/**
 * Constants for the properties panel (layout, image, etc.).
 */

export const LAYOUT_DISPLAY_OPTIONS = ["block", "flex", "grid", "hidden"];
export const LAYOUT_DIRECTION_OPTIONS = ["flex-row", "flex-col"];
export const LAYOUT_JUSTIFY_OPTIONS = [
  "justify-start",
  "justify-center",
  "justify-end",
  "justify-between",
];
export const LAYOUT_ALIGN_OPTIONS = [
  "items-start",
  "items-center",
  "items-end",
  "items-stretch",
];
export const LAYOUT_GAP_OPTIONS = [
  "gap-0",
  "gap-1",
  "gap-2",
  "gap-3",
  "gap-4",
  "gap-6",
  "gap-8",
];
export const LAYOUT_WRAP_OPTIONS = ["flex-nowrap", "flex-wrap"];
export const LAYOUT_GROW_OPTIONS = ["grow-0", "grow"];
export const LAYOUT_SHRINK_OPTIONS = ["shrink-0", "shrink"];

export const IMAGE_SIZE_PRESETS: { label: string; className: string }[] = [
  { label: "Full", className: "w-full" },
  { label: "1/2", className: "w-1/2" },
  { label: "1/3", className: "w-1/3" },
  { label: "1/4", className: "w-1/4" },
  { label: "max-w-xs", className: "max-w-xs" },
  { label: "max-w-sm", className: "max-w-sm" },
  { label: "max-w-md", className: "max-w-md" },
  { label: "max-w-lg", className: "max-w-lg" },
  { label: "max-w-xl", className: "max-w-xl" },
  { label: "max-w-2xl", className: "max-w-2xl" },
  { label: "w-24", className: "w-24" },
  { label: "w-32", className: "w-32" },
  { label: "w-48", className: "w-48" },
  { label: "w-64", className: "w-64" },
  { label: "w-96", className: "w-96" },
];

export const IMAGE_OBJECT_FIT_PRESETS: { label: string; className: string }[] = [
  { label: "None", className: "" },
  { label: "Cover", className: "object-cover" },
  { label: "Contain", className: "object-contain" },
  { label: "Fill", className: "object-fill" },
];
