"use client";

import { COLOR_PALETTE } from "@/constants/properties";
import { getActiveColorClass, setColorClass } from "@/lib/panel/color";

type ColorControlProps = {
  label: string;
  type: "bg" | "text";
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

export const ColorControl = ({
  label,
  type,
  currentClassName,
  onChange,
}: ColorControlProps) => {
  const selectedClass = getActiveColorClass(
    currentClassName,
    type,
    COLOR_PALETTE,
  );

  const handleSelectColor = (selectedItem: (typeof COLOR_PALETTE)[0]) => {
    onChange(
      setColorClass(currentClassName, type, selectedItem, COLOR_PALETTE),
    );
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
        {COLOR_PALETTE.map((color, index) => {
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
