import { token } from "../../styled-system/tokens";

// 明度を計算してコントラストの高い文字色を返す
export const getContrastTextColor = (backgroundColor: string): string => {
  // varから始まる場合はcomputedStyleを使用
  if (backgroundColor.startsWith("var(") && backgroundColor.endsWith(")")) {
    const varName = backgroundColor.replace("var(", "").replace(")", "");
    const computedStyle = getComputedStyle(document.documentElement);
    backgroundColor = computedStyle.getPropertyValue(varName);
  }

  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // 明度を計算 (YIQアルゴリズム)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128
    ? token("colors.sd.system.color.chart.component.onMarkLabel")
    : token("colors.sd.system.color.chart.component.inverseOnMarkLabel");
};
