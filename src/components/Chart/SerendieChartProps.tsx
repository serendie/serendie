import { BarSvgProps, BarDatum } from "@nivo/bar";
import { LineSeries, LineSvgProps } from "@nivo/line";
import { PieSvgProps } from "@nivo/pie";
import { token } from "../../../styled-system/tokens";
import serendieTokens from "@serendie/design-token";
import { SerendieChartTheme } from "./SerendieChartTheme";
import { getContrastTextColor } from "../../utils/colors";

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
