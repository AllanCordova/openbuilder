"use client";

type LayoutControlProps = {
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

const DISPLAY_OPTIONS = ["block", "flex", "grid", "hidden"];
const DIRECTION_OPTIONS = ["flex-row", "flex-col"];
const JUSTIFY_OPTIONS = [
  "justify-start",
  "justify-center",
  "justify-end",
  "justify-between",
];
const ALIGN_OPTIONS = [
  "items-start",
  "items-center",
  "items-end",
  "items-stretch",
];

export const LayoutControl = ({
  currentClassName,
  onChange,
}: LayoutControlProps) => {
  const classes = (currentClassName || "").split(/\s+/).filter(Boolean);

  const activeDisplay = DISPLAY_OPTIONS.find((c) => classes.includes(c)) || "";
  const activeDirection =
    DIRECTION_OPTIONS.find((c) => classes.includes(c)) || "";
  const activeJustify = JUSTIFY_OPTIONS.find((c) => classes.includes(c)) || "";
  const activeAlign = ALIGN_OPTIONS.find((c) => classes.includes(c)) || "";

  const handleToggle = (groupOptions: string[], selectedClass: string) => {
    let newClasses = [...classes];

    newClasses = newClasses.filter((c) => !groupOptions.includes(c));

    if (!classes.includes(selectedClass)) {
      newClasses.push(selectedClass);
    }

    onChange(newClasses.join(" "));
  };

  const isFlex = activeDisplay === "flex" || activeDisplay === "inline-flex";

  const OptionButton = ({ label, value, activeValue, group }: any) => {
    const isActive = activeValue === value;
    return (
      <button
        onClick={() => handleToggle(group, value)}
        className={`px-2 py-1.5 text-xs font-medium rounded border transition-colors flex-1 ${
          isActive
            ? "bg-[var(--primary)] text-white border-[var(--primary)]"
            : "bg-[var(--background)] text-muted border-[var(--border-light)] hover:border-gray-400"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-foreground">Display</label>
        <div className="flex gap-2">
          <OptionButton
            label="Block"
            value="block"
            activeValue={activeDisplay}
            group={DISPLAY_OPTIONS}
          />
          <OptionButton
            label="Flex"
            value="flex"
            activeValue={activeDisplay}
            group={DISPLAY_OPTIONS}
          />
          <OptionButton
            label="Grid"
            value="grid"
            activeValue={activeDisplay}
            group={DISPLAY_OPTIONS}
          />
        </div>
      </div>

      {isFlex && (
        <div className="flex flex-col gap-3 p-3 bg-[var(--background)] border border-[var(--border-light)] rounded-default">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted">
              Direction
            </label>
            <div className="flex gap-2">
              <OptionButton
                label="Row →"
                value="flex-row"
                activeValue={activeDirection}
                group={DIRECTION_OPTIONS}
              />
              <OptionButton
                label="Col ↓"
                value="flex-col"
                activeValue={activeDirection}
                group={DIRECTION_OPTIONS}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted">Justify</label>
            <div className="flex gap-2">
              <OptionButton
                label="Start"
                value="justify-start"
                activeValue={activeJustify}
                group={JUSTIFY_OPTIONS}
              />
              <OptionButton
                label="Center"
                value="justify-center"
                activeValue={activeJustify}
                group={JUSTIFY_OPTIONS}
              />
              <OptionButton
                label="End"
                value="justify-end"
                activeValue={activeJustify}
                group={JUSTIFY_OPTIONS}
              />
              <OptionButton
                label="Between"
                value="justify-between"
                activeValue={activeJustify}
                group={JUSTIFY_OPTIONS}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted">Align</label>
            <div className="flex gap-2">
              <OptionButton
                label="Start"
                value="items-start"
                activeValue={activeAlign}
                group={ALIGN_OPTIONS}
              />
              <OptionButton
                label="Center"
                value="items-center"
                activeValue={activeAlign}
                group={ALIGN_OPTIONS}
              />
              <OptionButton
                label="End"
                value="items-end"
                activeValue={activeAlign}
                group={ALIGN_OPTIONS}
              />
              <OptionButton
                label="Stretch"
                value="items-stretch"
                activeValue={activeAlign}
                group={ALIGN_OPTIONS}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
