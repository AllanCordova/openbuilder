import type { ColorPaletteItem } from "@/constants/properties";

export function getActiveColorClass(
  className: string,
  type: "bg" | "text",
  palette: ColorPaletteItem[],
): string {
  const classes = (className || "").split(/\s+/);

  const activeColor = palette.find((color) => {
    if (color.bgClass === "" && color.textClass === "") return false;
    const classToCheck = type === "bg" ? color.bgClass : color.textClass;
    return classes.includes(classToCheck);
  });

  return activeColor
    ? type === "bg"
      ? activeColor.bgClass
      : activeColor.textClass
    : "";
}

export function setColorClass(
  className: string,
  type: "bg" | "text",
  selectedItem: ColorPaletteItem,
  palette: ColorPaletteItem[],
): string {
  let classes = (className || "").split(/\s+/).filter(Boolean);

  const allPossibleClasses = palette
    .map((c) => (type === "bg" ? c.bgClass : c.textClass))
    .filter(Boolean);

  classes = classes.filter((c) => !allPossibleClasses.includes(c));

  const classToAdd =
    type === "bg" ? selectedItem.bgClass : selectedItem.textClass;

  if (classToAdd !== "") {
    classes.push(classToAdd);
  }

  return classes.join(" ");
}
