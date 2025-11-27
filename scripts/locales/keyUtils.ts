const FIGMA_SEPARATOR = "/";
const LOCAL_SEPARATOR = ".";

export function keyToFigmaName(key: string): string {
  return key.replaceAll(LOCAL_SEPARATOR, FIGMA_SEPARATOR);
}

export function figmaNameToKey(name: string): string {
  return name.replaceAll(FIGMA_SEPARATOR, LOCAL_SEPARATOR);
}
