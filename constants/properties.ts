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

export const SPACING_SIZES = [
  "0",
  "1",
  "2",
  "4",
  "6",
  "8",
  "12",
  "16",
  "24",
  "32",
];

export type ColorPaletteItem = {
  name: string;
  bgClass: string;
  textClass: string;
  hex: string;
};

export const COLOR_PALETTE: ColorPaletteItem[] = [
  { name: "Nenhuma", bgClass: "", textClass: "", hex: "transparent" },
  {
    name: "Fundo",
    bgClass: "bg-background",
    textClass: "text-background",
    hex: "var(--background)",
  },
  {
    name: "Fundo Alt",
    bgClass: "bg-background-alt",
    textClass: "text-background-alt",
    hex: "var(--background-alt)",
  },
  {
    name: "Primária",
    bgClass: "bg-primary",
    textClass: "text-primary",
    hex: "var(--primary)",
  },
  {
    name: "Secundária",
    bgClass: "bg-secondary",
    textClass: "text-secondary",
    hex: "var(--secondary)",
  },
  {
    name: "Destrutiva",
    bgClass: "bg-destructive",
    textClass: "text-destructive",
    hex: "var(--destructive)",
  },
  {
    name: "Suave",
    bgClass: "bg-muted",
    textClass: "text-muted",
    hex: "var(--muted)",
  },
  {
    name: "Texto",
    bgClass: "bg-foreground",
    textClass: "text-foreground",
    hex: "var(--foreground)",
  },
  {
    name: "Branco",
    bgClass: "bg-white",
    textClass: "text-white",
    hex: "#ffffff",
  },
  {
    name: "Preto",
    bgClass: "bg-black",
    textClass: "text-black",
    hex: "#000000",
  },
  {
    name: "Azul",
    bgClass: "bg-blue-500",
    textClass: "text-blue-500",
    hex: "#3b82f6",
  },
  {
    name: "Verde",
    bgClass: "bg-green-500",
    textClass: "text-green-500",
    hex: "#22c55e",
  },
  {
    name: "Vermelho",
    bgClass: "bg-red-500",
    textClass: "text-red-500",
    hex: "#ef4444",
  },
  {
    name: "Amarelo",
    bgClass: "bg-yellow-500",
    textClass: "text-yellow-500",
    hex: "#eab308",
  },
];

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
