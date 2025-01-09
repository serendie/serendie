import { describe, expect, test } from "vitest";
import { resolveTypographyValue } from "./resolveTypographyValue";

describe("resolveTypographyValue", () => {
  test("関数が定義されていること", () => {
    expect(resolveTypographyValue).toBeDefined();
    expect(typeof resolveTypographyValue).toBe("function");
  });

  test("空の配列が渡された場合はundefinedを返すこと", () => {
    expect(resolveTypographyValue([])).toBeUndefined();
  });

  test("タイポグラフィ以外のトークンの場合はundefinedを返すこと", () => {
    const tokens = [
      {
        name: "sd.system.color.primary",
        type: "color",
        value: "#000000",
        extensions: {
          "com.figma": { scopes: ["COLOR"], codeSyntax: {} },
        },
      },
    ];
    expect(resolveTypographyValue(tokens)).toBeUndefined();
  });

  test("タイポグラフィ関連のトークンを1つのトークンに統合できること", () => {
    const tokens = [
      {
        name: "sd.system.typography.headline.large.fontFamily",
        type: "fontFamily",
        value: "Roboto",
        extensions: {
          "com.figma": { scopes: ["FONT_FAMILY"], codeSyntax: {} },
        },
      },
      {
        name: "sd.system.typography.headline.large.fontSize",
        type: "dimension",
        value: { value: 32, unit: "px" },
        extensions: {
          "com.figma": { scopes: ["FONT_SIZE"], codeSyntax: {} },
        },
      },
      {
        name: "sd.system.typography.headline.large.fontWeight",
        type: "fontStyle",
        value: 400,
        extensions: {
          "com.figma": { scopes: ["FONT_STYLE"], codeSyntax: {} },
        },
      },
      {
        name: "sd.system.typography.headline.large.lineHeight",
        type: "number",
        value: 1.6,
        extensions: {
          "com.figma": { scopes: ["LINE_HEIGHT"], codeSyntax: {} },
        },
      },
    ];

    const expected = {
      name: "sd.system.typography.headline.large",
      value: {
        fontFamily: "Roboto",
        fontSize: {
          value: 32,
          unit: "px",
        },
        fontWeight: 400,
        lineHeight: 1.6,
      },
    };

    expect(resolveTypographyValue(tokens)).toEqual(expected);
  });

  test("関連しないトークンは無視されること", () => {
    const tokens = [
      {
        name: "sd.system.typography.headline.large.fontFamily",
        type: "fontFamily",
        value: "Roboto",
        extensions: {
          "com.figma": { scopes: ["FONT_FAMILY"], codeSyntax: {} },
        },
      },
      {
        name: "sd.system.typography.title.small.fontFamily",
        type: "fontFamily",
        value: "Roboto",
        extensions: {
          "com.figma": { scopes: ["FONT_FAMILY"], codeSyntax: {} },
        },
      },
    ];

    const expected = {
      name: "sd.system.typography.headline.large",
      value: {
        fontFamily: "Roboto",
      },
    };

    expect(resolveTypographyValue(tokens)).toEqual(expected);
  });
});
