export const PLACEHOLDER_VALUE = "#";

export function isPlaceholderValue(value?: string | null): boolean {
  return typeof value === "string" && value.trim() === PLACEHOLDER_VALUE;
}

export function isEmptyTranslationValue(value?: string | null): boolean {
  if (typeof value !== "string") {
    return true;
  }

  if (!value.trim()) {
    return true;
  }

  return isPlaceholderValue(value);
}

export function normalizeFigmaValue(value: string): string {
  return isPlaceholderValue(value) ? "" : value;
}

export function ensureFigmaSafeValue(value: string): string {
  return isEmptyTranslationValue(value) ? PLACEHOLDER_VALUE : value;
}
