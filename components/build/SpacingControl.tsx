"use client";

type SpacingControlProps = {
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

const SPACING_SIZES = ["0", "1", "2", "4", "6", "8", "12", "16", "24", "32"];

export const SpacingControl = ({
  currentClassName,
  onChange,
}: SpacingControlProps) => {
  const getSpacingValue = (prefix: string) => {
    const regex = new RegExp(`\\b${prefix}-([a-zA-Z0-9]+)\\b`);
    const match = currentClassName.match(regex);
    return match ? match[1] : "";
  };

  const handleSpacingChange = (prefix: string, value: string) => {
    let classes = (currentClassName || "").split(/\s+/).filter(Boolean);

    const regex = new RegExp(`^${prefix}-[a-zA-Z0-9]+$`);
    classes = classes.filter((c) => !regex.test(c));

    if (value !== "") {
      classes.push(`${prefix}-${value}`);
    }

    onChange(classes.join(" "));
  };

  const SpacingSelect = ({
    label,
    prefix,
  }: {
    label: string;
    prefix: string;
  }) => {
    const currentValue = getSpacingValue(prefix);

    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-xs font-medium text-muted">{label}</label>
        <select
          className="w-full px-2 py-1.5 bg-[var(--background)] border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] text-foreground"
          value={currentValue}
          onChange={(e) => handleSpacingChange(prefix, e.target.value)}
        >
          <option value="">-</option>
          {SPACING_SIZES.map((size) => (
            <option key={size} value={size}>
              {size} ({parseInt(size) * 4}px)
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-foreground border-b border-[var(--border-light)] pb-1">
          Padding
        </label>
        <div className="grid grid-cols-2 gap-3">
          <SpacingSelect label="All (p)" prefix="p" />
          <div className="hidden"></div>
          <SpacingSelect label="Horizontal (px)" prefix="px" />
          <SpacingSelect label="Vertical (py)" prefix="py" />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <label className="text-sm font-semibold text-foreground border-b border-[var(--border-light)] pb-1">
          Margin
        </label>
        <div className="grid grid-cols-2 gap-3">
          <SpacingSelect label="All (m)" prefix="m" />
          <div className="hidden"></div>
          <SpacingSelect label="Horizontal (mx)" prefix="mx" />
          <SpacingSelect label="Vertical (my)" prefix="my" />
        </div>
      </div>
    </div>
  );
};
