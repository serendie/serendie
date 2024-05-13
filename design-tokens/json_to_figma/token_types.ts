import { VariableCodeSyntax, VariableScope } from "@figma/rest-api-spec";

export type Typography = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string | number;
  lineHeight: string | number;
  letterSpacing: string;
};

export const isTypography = (arg: unknown): arg is Typography =>
  typeof arg === "object" &&
  arg !== null &&
  typeof (arg as Typography).fontFamily === "string" &&
  typeof (arg as Typography).fontSize === "string" &&
  typeof (arg as Typography).fontWeight === "number" &&
  typeof (arg as Typography).lineHeight === "number" &&
  typeof (arg as Typography).letterSpacing === "string";

export type Token = {
  $type:
    | "color"
    | "dimension"
    | "typography"
    | "fontFamily"
    | "fontWeight"
    | "number";
  $value: string | number | Typography;
  $description?: string;
  $extensions?: {
    "com.figma"?: {
      hiddenFromPublishing?: boolean;
      scopes: VariableScope[];
      codeSyntax: VariableCodeSyntax;
    };
  };
};

export type TokenOrTokenGroup =
  | Token
  | ({ [tokenName: string]: Token } & { $type?: never; $value?: never });

export type TokensFile = {
  [key: string]: TokenOrTokenGroup;
};
