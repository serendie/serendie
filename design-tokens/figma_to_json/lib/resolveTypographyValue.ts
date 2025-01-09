import { W3CToken, TypographyValue, VariableScope } from "../types";

const TYPOGRAPHY_SCOPES = [
  "FONT_FAMILY",
  "FONT_SIZE",
  "FONT_STYLE",
  "LINE_HEIGHT",
] as VariableScope[];

export const resolveTypographyValue = (tokens: W3CToken[]): W3CToken[] => {
  if (tokens.length === 0) return [];

  // タイポグラフィ関連のトークンを抽出
  const typographyTokens = tokens.filter((token) =>
    token.extensions["com.figma"].scopes?.some((scope) =>
      TYPOGRAPHY_SCOPES.includes(scope)
    )
  );

  // タイポグラフィ以外のトークンを抽出
  const otherTokens = tokens.filter(
    (token) =>
      !token.extensions["com.figma"].scopes?.some((scope) =>
        TYPOGRAPHY_SCOPES.includes(scope)
      )
  );

  // トークンをグループごとに分類
  const groupedTokens = new Map<string, W3CToken[]>();

  typographyTokens.forEach((token) => {
    const baseName = token.name.split(".").slice(0, -1).join(".");
    const group = groupedTokens.get(baseName) || [];
    group.push(token);
    groupedTokens.set(baseName, group);
  });

  // タイポグラフィトークンを統合
  const resolvedTypographyTokens: W3CToken[] = [];

  groupedTokens.forEach((groupTokens, baseName) => {
    const value: TypographyValue = {};

    groupTokens.forEach((token) => {
      const scope = token.extensions["com.figma"].scopes?.[0];
      if (!scope) return;

      switch (scope) {
        case "FONT_FAMILY":
          value.fontFamily = token.value as string;
          break;
        case "FONT_SIZE":
          value.fontSize = token.value as { value: number; unit: string };
          break;
        case "FONT_STYLE":
          value.fontWeight = token.value as number;
          break;
        case "LINE_HEIGHT":
          value.lineHeight = token.value as number;
          break;
      }
    });

    resolvedTypographyTokens.push({
      name: baseName,
      type: "typography",
      value,
      extensions: {
        "com.figma": {
          scopes: ["TYPOGRAPHY" as VariableScope],
          codeSyntax: {
            WEB: `'${baseName}'`,
          },
        },
      },
    });
  });

  // 統合したタイポグラフィトークンと他のトークンを結合して返す
  return [...otherTokens, ...resolvedTypographyTokens];
};
