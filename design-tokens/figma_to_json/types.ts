// W3C Tokenの値の型定義
export type VariableValue =
  | string
  | number
  | boolean
  | { r: number; g: number; b: number; a: number }
  | ValueWithUnit
  | TypographyValue;

export type ValueWithUnit = { value: number; unit: string };

export type VariableScope =
  | "ALL"
  | "TEXT"
  | "FRAME"
  | "SHAPE_FILL"
  | "TEXT_FILL"
  | "STROKE_COLOR"
  | "FONT_FAMILY"
  | "FONT_SIZE"
  | "FONT_STYLE"
  | "LINE_HEIGHT"
  | "TYPOGRAPHY";

export type VariableCodeSyntax = { WEB: string };

// タイポグラフィトークンの値の型
export type TypographyValue = {
  fontFamily?: string;
  fontSize?: ValueWithUnit;
  fontWeight?: number;
  lineHeight?: number;
};

// W3C Token Like な型
export type W3CToken = {
  name: string;
  description?: string;
  type: string;
  value: VariableValue;
  extensions: {
    "com.figma": {
      scopes?: VariableScope[];
      codeSyntax?: VariableCodeSyntax;
    };
  };
};
