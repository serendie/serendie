import { VariableValue } from "@figma/rest-api-spec";
import { rgbaToHex, isRGB, isNumber } from "./utils";

type ValueWithUnit = {
  value: number | string;
  unit: string;
};

export function resolveValue(
  value: VariableValue,
  type: string
): VariableValue | ValueWithUnit {
  if (type === "dimension" || type === "fontSize") {
    if (isNumber(value)) {
      const num = Math.round(value * 1000) / 1000;
      return {
        value: num,
        unit: "px",
      };
    }
  }

  if (isNumber(value)) {
    const num = Math.round(value * 1000) / 1000;
    return num;
  }

  if (isRGB(value)) {
    return rgbaToHex(value);
  }

  return value;
}
