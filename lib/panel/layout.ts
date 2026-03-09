export function getActiveFromGroup(
  className: string,
  group: string[],
): string {
  const classes = (className || "").split(/\s+/).filter(Boolean);
  return group.find((c) => classes.includes(c)) ?? "";
}

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
