"use client";

import {
  LAYOUT_DISPLAY_OPTIONS,
  LAYOUT_DIRECTION_OPTIONS,
  LAYOUT_JUSTIFY_OPTIONS,
  LAYOUT_ALIGN_OPTIONS,
  LAYOUT_GAP_OPTIONS,
  LAYOUT_WRAP_OPTIONS,
  LAYOUT_GROW_OPTIONS,
  LAYOUT_SHRINK_OPTIONS,
} from "@/constants/properties";
import {
  getActiveFromGroup,
  setClassGroup,
  isFlexLayout,
} from "@/lib/panel/layout";

type LayoutControlProps = {
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

export const LayoutControl = ({
  currentClassName,
  onChange,
}: LayoutControlProps) => {
  const activeDisplay = getActiveFromGroup(
    currentClassName,
    LAYOUT_DISPLAY_OPTIONS,
  );
  const activeDirection = getActiveFromGroup(
    currentClassName,
    LAYOUT_DIRECTION_OPTIONS,
  );
  const activeJustify = getActiveFromGroup(
    currentClassName,
    LAYOUT_JUSTIFY_OPTIONS,
  );
  const activeAlign = getActiveFromGroup(
    currentClassName,
    LAYOUT_ALIGN_OPTIONS,
  );
  const activeGap = getActiveFromGroup(currentClassName, LAYOUT_GAP_OPTIONS);
  const activeWrap = getActiveFromGroup(
    currentClassName,
    LAYOUT_WRAP_OPTIONS,
  );
  const activeGrow = getActiveFromGroup(
    currentClassName,
    LAYOUT_GROW_OPTIONS,
  );
  const activeShrink = getActiveFromGroup(
    currentClassName,
    LAYOUT_SHRINK_OPTIONS,
  );

  const handleToggle = (group: string[], value: string) => {
    onChange(setClassGroup(currentClassName, group, value));
  };

  const isFlex = isFlexLayout(currentClassName);

  const OptionButton = ({
    label,
    value,
    activeValue,
    group,
  }: {
    label: string;
    value: string;
    activeValue: string;
    group: string[];
  }) => {
    const isActive = activeValue === value;
    return (
      <button
        type="button"
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
            group={LAYOUT_DISPLAY_OPTIONS}
          />
          <OptionButton
            label="Flex"
            value="flex"
            activeValue={activeDisplay}
            group={LAYOUT_DISPLAY_OPTIONS}
          />
          <OptionButton
            label="Grid"
            value="grid"
            activeValue={activeDisplay}
            group={LAYOUT_DISPLAY_OPTIONS}
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
                group={LAYOUT_DIRECTION_OPTIONS}
              />
              <OptionButton
                label="Col ↓"
                value="flex-col"
                activeValue={activeDirection}
                group={LAYOUT_DIRECTION_OPTIONS}
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
                group={LAYOUT_JUSTIFY_OPTIONS}
              />
              <OptionButton
                label="Center"
                value="justify-center"
                activeValue={activeJustify}
                group={LAYOUT_JUSTIFY_OPTIONS}
              />
              <OptionButton
                label="End"
                value="justify-end"
                activeValue={activeJustify}
                group={LAYOUT_JUSTIFY_OPTIONS}
              />
              <OptionButton
                label="Between"
                value="justify-between"
                activeValue={activeJustify}
                group={LAYOUT_JUSTIFY_OPTIONS}
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
                group={LAYOUT_ALIGN_OPTIONS}
              />
              <OptionButton
                label="Center"
                value="items-center"
                activeValue={activeAlign}
                group={LAYOUT_ALIGN_OPTIONS}
              />
              <OptionButton
                label="End"
                value="items-end"
                activeValue={activeAlign}
                group={LAYOUT_ALIGN_OPTIONS}
              />
              <OptionButton
                label="Stretch"
                value="items-stretch"
                activeValue={activeAlign}
                group={LAYOUT_ALIGN_OPTIONS}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted">Gap</label>
            <div className="flex flex-wrap gap-1.5">
              {LAYOUT_GAP_OPTIONS.map((gap) => (
                <OptionButton
                  key={gap}
                  label={gap.replace("gap-", "")}
                  value={gap}
                  activeValue={activeGap}
                  group={LAYOUT_GAP_OPTIONS}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted">Wrap</label>
            <div className="flex gap-2">
              <OptionButton
                label="No wrap"
                value="flex-nowrap"
                activeValue={activeWrap}
                group={LAYOUT_WRAP_OPTIONS}
              />
              <OptionButton
                label="Wrap"
                value="flex-wrap"
                activeValue={activeWrap}
                group={LAYOUT_WRAP_OPTIONS}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted">Grow</label>
            <div className="flex gap-2">
              <OptionButton
                label="0"
                value="grow-0"
                activeValue={activeGrow}
                group={LAYOUT_GROW_OPTIONS}
              />
              <OptionButton
                label="1"
                value="grow"
                activeValue={activeGrow}
                group={LAYOUT_GROW_OPTIONS}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-muted">Shrink</label>
            <div className="flex gap-2">
              <OptionButton
                label="0"
                value="shrink-0"
                activeValue={activeShrink}
                group={LAYOUT_SHRINK_OPTIONS}
              />
              <OptionButton
                label="1"
                value="shrink"
                activeValue={activeShrink}
                group={LAYOUT_SHRINK_OPTIONS}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
