import { LocalVariable, VariableScope } from "@figma/rest-api-spec";

const SCOPE_TO_TYPE: Record<VariableScope, string> = {
  ALL_SCOPES: "ALL_SCOPES",
  CORNER_RADIUS: "dimension",
  TEXT_CONTENT: "string",
  WIDTH_HEIGHT: "dimension",
  GAP: "dimension",
  STROKE_FLOAT: "dimension",
  OPACITY: "number",
  EFFECT_FLOAT: "number",
  FONT_WEIGHT: "fontWeight",
  FONT_SIZE: "dimension",
  LINE_HEIGHT: "number",
  LETTER_SPACING: "number",
  PARAGRAPH_SPACING: "dimension",
  PARAGRAPH_INDENT: "dimension",
  FONT_FAMILY: "fontFamily",
  FONT_STYLE: "fontStyle",
  ALL_FILLS: "color",
  FRAME_FILL: "color",
  SHAPE_FILL: "color",
  TEXT_FILL: "color",
  STROKE_COLOR: "color",
  EFFECT_COLOR: "color",
} as const;

export function resolveType(variable: LocalVariable): string {
  // NOTE:ヒューリスティックすぎる気もする
  if (variable.name.includes("color")) {
    return "color";
  }

  if (variable.name.includes("dimension")) {
    return "dimension";
  }

  for (const scope of Object.keys(SCOPE_TO_TYPE)) {
    if (variable.scopes.includes(scope as VariableScope)) {
      return SCOPE_TO_TYPE[scope as VariableScope];
    }
  }

  if (variable.resolvedType === "FLOAT") {
    return "number";
  }
  return variable.resolvedType.toLowerCase();
}
