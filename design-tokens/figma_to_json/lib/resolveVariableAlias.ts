import { LocalVariable, VariableValue } from "@figma/rest-api-spec";
import { isVariableAlias, slashToDot } from "./utils";
import { LocalVariableRecord } from "./FigmaClient";

export function resolveVariableAlias(
  variable: LocalVariable,
  modeId: string,
  variables: LocalVariableRecord
): VariableValue {
  const value = variable.valuesByMode[modeId];
  if (isVariableAlias(value)) {
    const ref = variables[value.id];
    if (!ref) {
      throw new Error(`Variable alias ${value.id} not found`);
    }
    return `{${slashToDot(ref.name)}}`;
  }
  return value;
}
