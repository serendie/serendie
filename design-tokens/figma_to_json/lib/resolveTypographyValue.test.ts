import { describe, expect, test } from "vitest";
import { resolveTypographyValue } from "./resolveTypographyValue";
import { VariableScope, W3CToken } from "../types";

describe("resolveTypographyValue", () => {
  test("関数が定義されていること", () => {
    expect(resolveTypographyValue).toBeDefined();
    expect(typeof resolveTypographyValue).toBe("function");
  });

  test("空のトークンが渡された場合は空の配列を返すこと", () => {
    const input: W3CToken[] = [];
    expect(resolveTypographyValue(input)).toEqual([]);
  });

  test("タイポグラフィ以外のトークンはそのまま返すこと", () => {
    const input: W3CToken[] = [colorToken];
    expect(resolveTypographyValue(input)).toEqual(input);
  });

  test("タイポグラフィ関連のトークンを統合し、他のトークンはそのまま返すこと", () => {
    const input: W3CToken[] = [
      colorToken,
      {
        name: "sd.system.typography.headline.large.fontFamily",
        type: "fontFamily",
        value: "Roboto",
        extensions: {
          "com.figma": {
            scopes: ["FONT_FAMILY" as VariableScope],
            codeSyntax: {
              WEB: "'sd.system.typography.headline.large.fontFamily'",
            },
          },
        },
      },
      {
        name: "sd.system.typography.headline.large.fontSize",
        type: "dimension",
        value: { value: 32, unit: "px" },
        extensions: {
          "com.figma": {
            scopes: ["FONT_SIZE" as VariableScope],
            codeSyntax: {
              WEB: "'sd.system.typography.headline.large.fontSize'",
            },
          },
        },
      },
      {
        name: "sd.system.typography.headline.large.fontWeight",
        type: "fontStyle",
        value: 400,
        extensions: {
          "com.figma": {
            scopes: ["FONT_STYLE" as VariableScope],
            codeSyntax: {
              WEB: "'sd.system.typography.headline.large.fontWeight'",
            },
          },
        },
      },
      {
        name: "sd.system.typography.headline.large.lineHeight",
        type: "number",
        value: 1.6,
        extensions: {
          "com.figma": {
            scopes: ["LINE_HEIGHT" as VariableScope],
            codeSyntax: {
              WEB: "'sd.system.typography.headline.large.lineHeight'",
            },
          },
        },
      },
    ];

    const expected = [
      colorToken,
      {
        name: "sd.system.typography.headline.large",
        type: "typography",
        value: {
          fontFamily: "Roboto",
          fontSize: {
            value: 32,
            unit: "px",
          },
          fontWeight: 400,
          lineHeight: 1.6,
        },
        extensions: {
          "com.figma": {
            scopes: ["TYPOGRAPHY" as VariableScope],
            codeSyntax: {
              WEB: "'sd.system.typography.headline.large'",
            },
          },
        },
      },
    ];

    expect(resolveTypographyValue(input)).toEqual(expected);
  });
});

const colorToken: W3CToken = {
  name: "sd.system.color.primary",
  type: "color",
  value: "#000000",
  extensions: {
    "com.figma": {
      scopes: ["COLOR" as VariableScope],
      codeSyntax: {
        WEB: "'sd.system.color.primary'",
      },
    },
  },
};
