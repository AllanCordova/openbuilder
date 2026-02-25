"use client";

type ColorPaletteProps = {
  label: string;
  type: "bg" | "text";
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

const PALETTE = [
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

export const ColorPalette = ({
  label,
  type,
  currentClassName,
  onChange,
}: ColorPaletteProps) => {
  const getCurrentColorClass = () => {
    const classes = (currentClassName || "").split(/\s+/);

    const activeColor = PALETTE.find((color) => {
      if (color.bgClass === "" && color.textClass === "") return false;
      const classToCheck = type === "bg" ? color.bgClass : color.textClass;
      return classes.includes(classToCheck);
    });

    return activeColor
      ? type === "bg"
        ? activeColor.bgClass
        : activeColor.textClass
      : "";
  };

  const selectedClass = getCurrentColorClass();

  const handleSelectColor = (selectedItem: (typeof PALETTE)[0]) => {
    let classes = (currentClassName || "").split(/\s+/).filter(Boolean);

    const allPossibleClasses = PALETTE.map((c) =>
      type === "bg" ? c.bgClass : c.textClass,
    ).filter(Boolean);

    classes = classes.filter((c) => !allPossibleClasses.includes(c));

    const classToAdd =
      type === "bg" ? selectedItem.bgClass : selectedItem.textClass;

    if (classToAdd !== "") {
      classes.push(classToAdd);
    }

    onChange(classes.join(" "));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground flex justify-between items-center">
        {label}
        {selectedClass && (
          <span className="text-xs font-normal text-muted bg-[var(--background)] px-1.5 rounded">
            {selectedClass}
          </span>
        )}
      </label>

      <div className="flex flex-wrap gap-2 p-3 bg-[var(--background)] border border-[var(--border-light)] rounded-default">
        {PALETTE.map((color, index) => {
          const thisColorClass =
            type === "bg" ? color.bgClass : color.textClass;

          const isSelected = selectedClass === thisColorClass;

          const isTransparent = thisColorClass === "";

          return (
            <button
              key={index}
              onClick={() => handleSelectColor(color)}
              title={color.name}
              className={`w-6 h-6 rounded-full border-2 transition-all shadow-sm ${
                isSelected
                  ? "border-[var(--primary)] scale-110 ring-2 ring-[var(--primary)] ring-opacity-30"
                  : "border-transparent hover:scale-110 hover:border-gray-300"
              }`}
              style={{
                backgroundColor: color.hex,
                backgroundImage: isTransparent
                  ? "conic-gradient(#ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), conic-gradient(#ccc 25%, white 25%, white 75%, #ccc 75%, #ccc)"
                  : "none",
                backgroundSize: isTransparent ? "8px 8px" : "auto",
                backgroundPosition: isTransparent ? "0 0, 4px 4px" : "0 0",
              }}
              aria-label={`Selecionar cor ${color.name}`}
            />
          );
        })}
      </div>
    </div>
  );
};
