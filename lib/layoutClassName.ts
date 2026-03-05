/**
 * Utilities for reading and updating Tailwind layout classes (display, flex, gap, etc.).
 * Used by LayoutControl. Option groups are in constants/properties.ts.
 */

/**
 * Returns the first class from className that is in the group, or "".
 */
export function getActiveFromGroup(
  className: string,
  group: string[],
): string {
  const classes = (className || "").split(/\s+/).filter(Boolean);
  return group.find((c) => classes.includes(c)) ?? "";
}

/**
 * Toggle/set a single option from a group: remove all group classes, then add
 * selectedValue if it wasn't already present (so clicking again removes it).
 */
export function setClassGroup(
  className: string,
  group: string[],
  selectedValue: string,
): string {
  const classes = (className || "").split(/\s+/).filter(Boolean);
  const hadValue = selectedValue ? classes.includes(selectedValue) : false;
  const rest = classes.filter((c) => !group.includes(c));
  if (selectedValue && !hadValue) rest.push(selectedValue);
  return rest.join(" ").trim();
}

/** Returns true when display is flex or inline-flex. */
export function isFlexLayout(className: string): boolean {
  const active = getActiveFromGroup(className, [
    "block",
    "flex",
    "inline-flex",
    "grid",
    "hidden",
  ]);
  return active === "flex" || active === "inline-flex";
}
