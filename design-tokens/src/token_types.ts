import { VariableCodeSyntax, VariableScope } from "@figma/rest-api-spec";

export type Token = {
  $type: "color" | "dimension";
  $value: string | number | boolean;
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
