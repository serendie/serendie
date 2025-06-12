import { BarSvgProps, BarDatum } from "@nivo/bar";
import { LineSeries, LineSvgProps } from "@nivo/line";
import { PieSvgProps } from "@nivo/pie";
import { token } from "../../../styled-system/tokens";
import serendieTokens from "@serendie/design-token";

// チャートの色パレットタイプ
export type ChartColorCategory =
  | "primary"
  | "positive"
  | "negative"
  | "notice"
  | "multi";

// チャートの色パレットを取得するヘルパー関数
export const getChartColors = (
  category: ChartColorCategory,
  count?: number
): string[] => {
  const colors: Record<ChartColorCategory, string[]> = {
    primary: [
      token("colors.sd.system.color.chart.mark.primary.01"),
      token("colors.sd.system.color.chart.mark.primary.02"),
      token("colors.sd.system.color.chart.mark.primary.03"),
      token("colors.sd.system.color.chart.mark.primary.04"),
      token("colors.sd.system.color.chart.mark.primary.05"),
      token("colors.sd.system.color.chart.mark.primary.06"),
    ],
    positive: [
      token("colors.sd.system.color.chart.mark.positive.01"),
      token("colors.sd.system.color.chart.mark.positive.02"),
      token("colors.sd.system.color.chart.mark.positive.03"),
      token("colors.sd.system.color.chart.mark.positive.04"),
      token("colors.sd.system.color.chart.mark.positive.05"),
      token("colors.sd.system.color.chart.mark.positive.06"),
    ],
    negative: [
      token("colors.sd.system.color.chart.mark.negative.01"),
      token("colors.sd.system.color.chart.mark.negative.02"),
      token("colors.sd.system.color.chart.mark.negative.03"),
      token("colors.sd.system.color.chart.mark.negative.04"),
      token("colors.sd.system.color.chart.mark.negative.05"),
      token("colors.sd.system.color.chart.mark.negative.06"),
    ],
    notice: [
      token("colors.sd.system.color.chart.mark.notice.01"),
      token("colors.sd.system.color.chart.mark.notice.02"),
      token("colors.sd.system.color.chart.mark.notice.03"),
      token("colors.sd.system.color.chart.mark.notice.04"),
      token("colors.sd.system.color.chart.mark.notice.05"),
      token("colors.sd.system.color.chart.mark.notice.06"),
    ],
    multi: [
      token("colors.sd.system.color.chart.mark.multi.01"),
      token("colors.sd.system.color.chart.mark.multi.02"),
      token("colors.sd.system.color.chart.mark.multi.03"),
      token("colors.sd.system.color.chart.mark.multi.04"),
      token("colors.sd.system.color.chart.mark.multi.05"),
      token("colors.sd.system.color.chart.mark.multi.06"),
      token("colors.sd.system.color.chart.mark.multi.07"),
      token("colors.sd.system.color.chart.mark.multi.08"),
      token("colors.sd.system.color.chart.mark.multi.09"),
      token("colors.sd.system.color.chart.mark.multi.10"),
    ],
  };

  const colorArray = colors[category];
  return count ? colorArray.slice(0, count) : colorArray;
};

// 単一の色を取得するヘルパー関数
export const getChartColor = (
  category: ChartColorCategory,
  index: number = 0
): string => {
  return getChartColors(category)[index] || getChartColors(category)[0];
};

// 明度を計算してコントラストの高い文字色を返す関数
export const getContrastTextColor = (backgroundColor: string): string => {
  // varから始まる場合はcomputedStyleを使用
  if (backgroundColor.startsWith("var(") && backgroundColor.endsWith(")")) {
    // varを外す
    const varName = backgroundColor.replace("var(", "").replace(")", "");
    const computedStyle = getComputedStyle(document.documentElement);
    backgroundColor = computedStyle.getPropertyValue(varName);
  }

  // 背景色をRGBに変換
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // 明度を計算 (YIQアルゴリズム)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // 明度が128以上なら黒、それ以下なら白
  return yiq >= 128
    ? token("colors.sd.system.color.chart.component.onMarkLabel")
    : token("colors.sd.system.color.chart.component.inverseOnMarkLabel");
};

// tokens.jsから直接spacing値を取得
const spacingTokens = serendieTokens.sd.system.dimension.spacing;

// よく使用されるマージン設定
export const defaultChartMargin = {
  top: parseInt(spacingTokens.large, 10), // 20
  right: parseInt(spacingTokens.large, 10), // 20
  bottom: parseInt(spacingTokens.fourExtraLarge, 10), // 48
  left: parseInt(spacingTokens.fiveExtraLarge, 10), // 64
};

export const compactChartMargin = {
  top: parseInt(spacingTokens.small, 10), // 12
  right: parseInt(spacingTokens.small, 10), // 12
  bottom: parseInt(spacingTokens.twoExtraLarge, 10), // 32
  left: parseInt(spacingTokens.threeExtraLarge, 10), // 40
};

export const legendChartMargin = {
  top: parseInt(spacingTokens.large, 10), // 20
  right: parseInt(spacingTokens.sixExtraLarge, 10), // 80
  bottom: parseInt(spacingTokens.fourExtraLarge, 10), // 48
  left: parseInt(spacingTokens.fiveExtraLarge, 10), // 64
};

export const spaciousChartMargin = {
  top: parseInt(spacingTokens.extraLarge, 10), // 24
  right: parseInt(spacingTokens.extraLarge, 10), // 24
  bottom: parseInt(spacingTokens.fiveExtraLarge, 10), // 64
  left: parseInt(spacingTokens.sixExtraLarge, 10), // 80
};

// チャートプロパティの型定義

type ChartPropsResult = {
  bar: Partial<BarSvgProps<BarDatum>>;
  line: Partial<LineSvgProps<LineSeries>>;
  pie: Partial<PieSvgProps<Record<string, unknown>>>;
};

// チャートのプロパティを取得するフック
export const useChartProps = <T extends keyof ChartPropsResult>(
  chartType: T,
  colorCategory: ChartColorCategory = "primary"
): ChartPropsResult[T] => {
  const colors = getChartColors(colorCategory);

  const calculateLabelTextColor = (datum: { color: string }) => {
    return getContrastTextColor(datum.color);
  };

  const chartProps: ChartPropsResult = {
    bar: {
      colors,
      margin: defaultChartMargin,
      padding: 0.3,
      innerPadding: 1,
      borderRadius: 0,
      enableLabel: true,
      labelTextColor: calculateLabelTextColor,
    },
    line: {
      colors,
      margin: defaultChartMargin,
      enablePoints: true,
      pointSize: 6,
      pointBorderWidth: 2,
      pointBorderColor: { from: "serieColor" },
      enableGridX: true,
      enableGridY: true,
    },
    pie: {
      colors,
      margin: defaultChartMargin,
      innerRadius: 0.5,
      padAngle: 0.7,
      cornerRadius: 0,
      activeOuterRadiusOffset: 8,
      enableArcLabels: true,
      enableArcLinkLabels: true,
      arcLabelsTextColor: calculateLabelTextColor,
    },
  };

  return chartProps[chartType];
};

// 個別のチャートタイプ用のプロパティ取得関数（シンプル版）
export const useBarChartProps = (c: ChartColorCategory = "primary") =>
  useChartProps("bar", c);

export const useLineChartProps = (c: ChartColorCategory = "primary") =>
  useChartProps("line", c);

export const usePieChartProps = (c: ChartColorCategory = "primary") =>
  useChartProps("pie", c);
