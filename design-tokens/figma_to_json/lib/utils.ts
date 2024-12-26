import { RGB, RGBA, VariableAlias, VariableValue } from "@figma/rest-api-spec";

export function rgbaToHex({ r, g, b, ...rest }: RGB | RGBA) {
  const a = "a" in rest ? rest.a : 1;

  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}${a !== 1 ? toHex(a) : ""}`;
}

export function isRGB(value: VariableValue): value is RGB | RGBA {
  return (
    typeof value === "object" && "r" in value && "g" in value && "b" in value
  );
}

export function isVariableAlias(value: VariableValue): value is VariableAlias {
  return (
    typeof value === "object" &&
    "type" in value &&
    "id" in value &&
    value.type === "VARIABLE_ALIAS"
  );
}

export function isNumber(value: VariableValue): value is number {
  return typeof value === "number";
}

export function slashToDot(str: string) {
  return str.replace(/\//g, ".");
}
