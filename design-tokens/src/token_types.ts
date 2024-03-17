import { VariableCodeSyntax, VariableScope } from "@figma/rest-api-spec";

type Shadow = {
  color: string;
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
};

type Typography = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
};

export type Token = {
  $type:
    | "color"
    | "dimension"
    | "number"
    | "shadow"
    | "fontFamily"
    | "fontWeight"
    | "typography";
  $value: string | number | boolean | Shadow | Typography;
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
