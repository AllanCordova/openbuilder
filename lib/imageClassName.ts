/**
 * Utilities for reading and updating Tailwind classes for image
 * size and object-fit. Presets live in constants/properties.ts.
 */
function isWidthClass(c: string): boolean {
  return /^(w-|max-w-|min-w-)/.test(c);
}

function isObjectFitClass(c: string): boolean {
  return /^object-/.test(c);
}

function isImageSizeOrObjectClass(c: string): boolean {
  return isWidthClass(c) || isObjectFitClass(c);
}

export function withoutImageSizeClasses(className: string): string {
  return className
    .split(/\s+/)
    .filter((c) => c && !isImageSizeOrObjectClass(c))
    .join(" ");
}

export function getWidthClasses(className: string): string {
  return className
    .split(/\s+/)
    .filter(isWidthClass)
    .join(" ");
}

export function getObjectFitClass(className: string): string {
  const found = className.split(/\s+/).find(isObjectFitClass);
  return found ?? "";
}

export function setWidthPreset(
  className: string,
  presetClass: string,
): string {
  const rest = withoutImageSizeClasses(className);
  const currentWidth = getWidthClasses(className);
  const objectPart = getObjectFitClass(className);

  const alreadyOnlyThis =
    presetClass && currentWidth.split(/\s+/).filter(Boolean).join(" ") === presetClass;

  if (presetClass && alreadyOnlyThis) {
    return [rest, objectPart].filter(Boolean).join(" ").trim();
  }

  const newWidth = presetClass || "";
  return [rest, newWidth, objectPart].filter(Boolean).join(" ").trim();
}

export function setObjectFit(
  className: string,
  objectFitClass: string,
): string {
  const rest = className
    .split(/\s+/)
    .filter((c) => c && !isObjectFitClass(c))
    .join(" ");
  return [rest, objectFitClass].filter(Boolean).join(" ").trim();
}

export function setCustomWidthClasses(
  className: string,
  customWidthString: string,
): string {
  const rest = withoutImageSizeClasses(className);
  const objectPart = getObjectFitClass(className);
  const customPart = customWidthString.trim();
  return [rest, customPart, objectPart].filter(Boolean).join(" ").trim();
}

export function hasWidthPreset(className: string, presetClass: string): boolean {
  if (!presetClass) return false;
  const current = getWidthClasses(className);
  return current.split(/\s+/).includes(presetClass);
}

export function hasObjectFit(
  className: string,
  objectFitClass: string,
): boolean {
  if (!objectFitClass) return !getObjectFitClass(className);
  return className.split(/\s+/).includes(objectFitClass);
}
