import { BarSvgProps, BarDatum } from "@nivo/bar";
import { LineSeries, LineSvgProps } from "@nivo/line";
import { PieSvgProps } from "@nivo/pie";
import { token } from "../../../styled-system/tokens";
import serendieTokens from "@serendie/design-token";
import { SerendieChartTheme } from "./SerendieChartTheme";

export type ChartColorCategory =
  | "primary"
  | "positive"
  | "negative"
  | "notice"
  | "multi";

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

const spacingTokens = serendieTokens.sd.system.dimension.spacing;

// よく使用されるマージン設定
export const defaultChartMargin = {
  top: parseInt(spacingTokens.large, 10),
  right: parseInt(spacingTokens.large, 10),
  bottom: parseInt(spacingTokens.fourExtraLarge, 10),
  left: parseInt(spacingTokens.fiveExtraLarge, 10),
};

export const compactChartMargin = {
  top: parseInt(spacingTokens.small, 10),
  right: parseInt(spacingTokens.small, 10),
  bottom: parseInt(spacingTokens.twoExtraLarge, 10),
  left: parseInt(spacingTokens.threeExtraLarge, 10),
};

export const legendChartMargin = {
  top: parseInt(spacingTokens.large, 10),
  right: parseInt(spacingTokens.sixExtraLarge, 10),
  bottom: parseInt(spacingTokens.fourExtraLarge, 10),
  left: parseInt(spacingTokens.fiveExtraLarge, 10),
};

export const spaciousChartMargin = {
  top: parseInt(spacingTokens.extraLarge, 10),
  right: parseInt(spacingTokens.extraLarge, 10),
  bottom: parseInt(spacingTokens.fiveExtraLarge, 10),
  left: parseInt(spacingTokens.sixExtraLarge, 10),
};

type ChartPropsResult = {
  bar: Partial<BarSvgProps<BarDatum>>;
  line: Partial<LineSvgProps<LineSeries>>;
  pie: Partial<PieSvgProps<Record<string, unknown>>>;
};

export const useChartProps = <T extends keyof ChartPropsResult>(
  chartType: T,
  colorCategory: ChartColorCategory = "primary"
): ChartPropsResult[T] => {
  const colors = getChartColors(colorCategory);

  const calculateLabelTextColor = (datum: { color: string }) => {
    return getContrastTextColor(datum.color);
  };

  const commonProps = {
    theme: SerendieChartTheme,
    colors,
    margin: defaultChartMargin,
  };

  const chartProps: ChartPropsResult = {
    bar: {
      ...commonProps,
      padding: 0.3,
      innerPadding: 1,
      borderRadius: 0,
      enableLabel: true,
      labelTextColor: calculateLabelTextColor,
    },
    line: {
      ...commonProps,
      enablePoints: true,
      pointSize: 6,
      pointBorderWidth: 2,
      pointBorderColor: { from: "serieColor" },
      enableGridX: true,
      enableGridY: true,
    },
    pie: {
      ...commonProps,
      innerRadius: 0.5,
      padAngle: 0.7,
      cornerRadius: 0,
      activeOuterRadiusOffset: 8,
      enableArcLabels: true,
      enableArcLinkLabels: true,
      arcLabelsTextColor: calculateLabelTextColor,
      arcLinkLabelsColor: token(
        "colors.sd.system.color.chart.component.onChartSurface"
      ),
      arcLinkLabelsThickness: 2,
      arcLinkLabelsTextColor: token(
        "colors.sd.system.color.chart.component.onChartSurface"
      ),
    },
  };

  return chartProps[chartType];
};

export const useBarChartProps = (c: ChartColorCategory = "primary") =>
  useChartProps("bar", c);

export const useLineChartProps = (c: ChartColorCategory = "primary") =>
  useChartProps("line", c);

export const usePieChartProps = (c: ChartColorCategory = "primary") =>
  useChartProps("pie", c);
