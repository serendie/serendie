/*

./VictoryTheme.ts を参照して、その中のSerendieThemeの色を一覧できるようなコンポーネントを作成し、それをStorybookで表示できるようにしたい


*/

import React from "react";
// import type { Meta, StoryObj } from '@storybook/react'; // コメントアウトのまま
import { SerendieTheme } from "./VictoryTheme";
// import { token } from '@serendie/ui/tokens'; // このステップでは不要

// テーマプロパティの型定義
interface ThemeProperty {
  path: string[];
  value: unknown;
}

// SerendieThemeから全プロパティを抽出する関数
const extractThemeProperties = (
  theme: Record<string, unknown>,
  currentPath: string[] = []
): ThemeProperty[] => {
  let properties: ThemeProperty[] = [];
  for (const key in theme) {
    if (Object.prototype.hasOwnProperty.call(theme, key)) {
      const value = theme[key];
      const newPath = [...currentPath, key];
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        properties = properties.concat(
          extractThemeProperties(value as Record<string, unknown>, newPath)
        );
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          properties.push({ path: newPath, value: [] });
        } else {
          value.forEach((item, index) => {
            const itemPath = [...newPath, index.toString()];
            if (
              typeof item === "object" &&
              item !== null &&
              !Array.isArray(item)
            ) {
              properties = properties.concat(
                extractThemeProperties(
                  item as Record<string, unknown>,
                  itemPath
                )
              );
            } else if (Array.isArray(item)) {
              properties = properties.concat(
                extractThemeProperties(
                  { [index.toString()]: item } as Record<string, unknown>,
                  newPath
                )
              );
            } else {
              properties.push({ path: itemPath, value: item });
            }
          });
        }
      } else {
        properties.push({ path: newPath, value: value });
      }
    }
  }
  return properties;
};

// テーマ構造表示コンポーネント
const ThemeStructureTable: React.FC<{ properties: ThemeProperty[] }> = ({
  properties,
}) => {
  if (properties.length === 0) {
    return <p>No properties found in the theme.</p>;
  }

  const renderValueWithColorChip = (path: string[], value: unknown) => {
    const lastPathSegment =
      path.length > 0 ? path[path.length - 1].toLowerCase() : "";
    const parentPathSegment =
      path.length > 1 ? path[path.length - 2].toLowerCase() : "";
    const isLastSegmentNumeric = !isNaN(Number(lastPathSegment));

    let isColorProperty =
      lastPathSegment === "fill" ||
      lastPathSegment === "stroke" ||
      lastPathSegment.endsWith("color");

    if (
      !isColorProperty &&
      isLastSegmentNumeric &&
      parentPathSegment === "colorscale"
    ) {
      isColorProperty = true;
    }

    let colorChip = null;
    let displayValue = <code>{JSON.stringify(value)}</code>;
    let tokenName: string | undefined = undefined;

    if (typeof value === "string") {
      const tokenMatch = value.match(/^token\\(['"](colors\\..*?)['"]\\)$/);
      if (tokenMatch) {
        tokenName = tokenMatch[1];
        displayValue = (
          <code style={{ color: "purple" }}>
            {value} (Token: {tokenName})
          </code>
        );
        if (isColorProperty) {
          const cssVarName = `--${tokenName.replace(/\./g, "-")}`;
          colorChip = (
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: `var(${cssVarName})`,
                border: "1px solid #ccc",
                display: "inline-block",
                marginRight: "8px",
                verticalAlign: "middle",
              }}
              title={`var(${cssVarName}) / ${value}`}
            />
          );
        }
      } else {
        displayValue = <code>{value}</code>;
        if (
          isColorProperty &&
          (value.startsWith("#") ||
            value.startsWith("rgb") ||
            value.startsWith("hsl") ||
            CSS.supports("color", value))
        ) {
          colorChip = (
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: value,
                border:
                  value === "transparent" ||
                  value.toLowerCase() === "#ffffff" ||
                  value.toLowerCase() === "white"
                    ? "1px solid #ccc"
                    : "1px solid #888",
                display: "inline-block",
                marginRight: "8px",
                verticalAlign: "middle",
              }}
              title={value}
            />
          );
        }
      }
    } else if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      displayValue = <code>{String(value)}</code>;
    } // For other types (like arrays already stringified or objects), no color chip.

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {colorChip}
        {displayValue}
      </div>
    );
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "20px",
        fontSize: "12px",
        lineHeight: "1.5",
      }}
    >
      <h1>SerendieTheme Structure with Color Previews</h1>
      <p>
        This table displays properties within <code>SerendieTheme</code>. If a
        property path ends with "fill", "stroke", or "Color", or if it's an item
        in a "colorScale" array, it's assumed to be a color, and a preview chip
        is shown.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
            <th style={{ padding: "8px", width: "40%" }}>Property Path</th>
            <th style={{ padding: "8px", width: "60%" }}>Value / Preview</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop, index) => (
            <tr
              key={prop.path.join(".") + index}
              style={{ borderBottom: "1px solid #eee" }}
            >
              <td style={{ padding: "8px", wordBreak: "break-all" }}>
                <code>SerendieTheme.{prop.path.join(".")}</code>
              </td>
              <td style={{ padding: "8px", wordBreak: "break-all" }}>
                {renderValueWithColorChip(prop.path, prop.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Storybookのメタデータ
const meta = {
  title: "Chart/SerendieTheme Structure with Color Previews",
  component: ThemeStructureTable,
};

export default meta;
// type Story = StoryObj<typeof meta>; // コメントアウト

// SerendieThemeからプロパティ情報を抽出
const themeAllProperties = extractThemeProperties(
  SerendieTheme as Record<string, unknown>
);

// Storybookのストーリー
export const Default = {
  args: {
    properties: themeAllProperties,
  },
};
