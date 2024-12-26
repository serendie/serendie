import { VariableValue } from "@figma/rest-api-spec";
import { rgbaToHex, isRGB, isNumber } from "./utils";

export function resolveValue(value: VariableValue): VariableValue {
  if (isNumber(value)) {
    return Math.round(value * 1000) / 1000;
  }

  if (isRGB(value)) {
    return rgbaToHex(value);
  }

  return value;
}
