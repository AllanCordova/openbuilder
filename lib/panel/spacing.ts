export function getSpacingValue(className: string, prefix: string): string {
  const regex = new RegExp(`\\b${prefix}-([a-zA-Z0-9]+)\\b`);
  const match = (className || "").match(regex);
  return match ? match[1] : "";
}

export function setSpacing(
  className: string,
  prefix: string,
  value: string,
): string {
  let classes = (className || "").split(/\s+/).filter(Boolean);

  const regex = new RegExp(`^${prefix}-[a-zA-Z0-9]+$`);
  classes = classes.filter((c) => !regex.test(c));

  if (value !== "") {
    classes.push(`${prefix}-${value}`);
  }

  return classes.join(" ");
}
