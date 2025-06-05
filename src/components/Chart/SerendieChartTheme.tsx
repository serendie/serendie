import React from "react";
import { PartialTheme, ThemeProvider } from "@nivo/theming";
import { token } from "../../../styled-system/tokens";
import serendieTokens from "@serendie/design-token";

// tokens.jsから直接typography値を取得
const typographyTokens = serendieTokens.sd.reference.typography;
const spacingTokens = serendieTokens.sd.system.dimension.spacing;

const SerendieChartTheme: PartialTheme = {
  background: token("colors.sd.system.color.chart.component.chartSurface"),

  // 軸関連のスタイル
  axis: {
    domain: {
      line: {
        stroke: token("colors.sd.system.color.chart.component.scalemark"),
        strokeWidth: 1,
        strokeOpacity: 0.2,
      },
    },
    ticks: {
      line: {
        stroke: "transparent", // 目盛り線を非表示
        strokeWidth: 0,
      },
      text: {
        fill: token("colors.sd.system.color.chart.component.onChartSurface"),
        fontSize: parseInt(typographyTokens.scale.expanded.extraSmall, 10), // 13px
        fontFamily: typographyTokens.fontFamily.primary,
      },
    },
    legend: {
      text: {
        fill: token("colors.sd.system.color.chart.component.onChartSurface"),
        fontSize: parseInt(typographyTokens.scale.expanded.small, 10), // 14px
        fontWeight: typographyTokens.fontWeight.regular, // 400
        fontFamily: typographyTokens.fontFamily.primary,
      },
    },
  },

  // グリッド線のスタイル
  grid: {
    line: {
      stroke: token("colors.sd.system.color.chart.component.scalemark"),
      strokeWidth: 1,
      strokeOpacity: 0.15,
      strokeDasharray: "4 4", // 点線スタイル
    },
  },

  // 凡例のスタイル
  legends: {
    text: {
      fill: token("colors.sd.system.color.chart.component.onChartSurface"),
      fontSize: parseInt(typographyTokens.scale.expanded.extraSmall, 10), // 13px
      fontFamily: typographyTokens.fontFamily.primary,
    },
    ticks: {
      line: {
        strokeWidth: 1,
        strokeOpacity: 0.2,
      },
    },
    title: {
      text: {
        fill: token("colors.sd.system.color.chart.component.onChartSurface"),
        fontSize: parseInt(typographyTokens.scale.expanded.small, 10), // 14px
        fontWeight: typographyTokens.fontWeight.regular, // 500
        fontFamily: typographyTokens.fontFamily.primary,
      },
    },
  },

  // ラベルのスタイル（バー内のテキスト）
  labels: {
    text: {
      fill: "#ffffff", // 白色で表示
      fontSize: parseInt(typographyTokens.scale.expanded.extraSmall, 10), // 13px
      fontWeight: typographyTokens.fontWeight.regular, // 500
      fontFamily: typographyTokens.fontFamily.primary,
    },
  },

  // ツールチップのスタイル
  tooltip: {
    container: {
      background: token("colors.sd.system.color.chart.component.chartSurface"),
      color: token("colors.sd.system.color.chart.component.onChartSurface"),
      fontSize: parseInt(typographyTokens.scale.expanded.extraSmall, 10), // 13px
      fontFamily: typographyTokens.fontFamily.primary,
      borderRadius: 6,
      boxShadow: "0 3px 14px rgba(0, 0, 0, 0.2)",
      border: `1px solid ${token("colors.sd.system.color.chart.component.scalemark")}`,
      padding: `${parseInt(spacingTokens.small, 10)}px ${parseInt(spacingTokens.medium, 10)}px`,
    },
  },

  // 注釈のスタイル
  annotations: {
    text: {
      fill: token("colors.sd.system.color.chart.component.onChartSurface"),
      fontSize: parseInt(typographyTokens.scale.expanded.extraSmall, 10), // 13px
      fontFamily: typographyTokens.fontFamily.primary,
    },
    link: {
      stroke: token("colors.sd.system.color.chart.component.scalemark"),
      strokeWidth: 1,
      strokeOpacity: 0.3,
    },
    outline: {
      stroke: token("colors.sd.system.color.chart.component.scalemark"),
      strokeWidth: 2,
      strokeOpacity: 0.3,
      fill: "transparent",
    },
  },

  // ドットのスタイル（折れ線グラフなど）
  dots: {
    text: {
      fill: token("colors.sd.system.color.chart.component.onChartSurface"),
      fontSize: parseInt(typographyTokens.scale.expanded.extraSmall, 10), // 13px
      fontFamily: typographyTokens.fontFamily.primary,
    },
  },

  // マーカーのスタイル（しきい値線など）
  markers: {
    lineColor: token("colors.sd.system.color.chart.component.threshold"),
    lineStrokeWidth: 1,
    text: {
      fontFamily: typographyTokens.fontFamily.primary,
      fontSize: parseInt(typographyTokens.scale.expanded.extraSmall, 10), // 13px
      fill: token("colors.sd.system.color.chart.component.onChartSurface"),
      outlineWidth: 2,
      outlineColor: token(
        "colors.sd.system.color.chart.component.chartSurface"
      ),
      outlineOpacity: 1,
    },
  },

  // クロスヘアのスタイル
  crosshair: {
    line: {
      stroke: token("colors.sd.system.color.chart.component.scalemark"),
      strokeWidth: 1,
      strokeOpacity: 0.5,
      strokeDasharray: "3 3",
    },
  },
};

// シンプルなProvider（テーマのみ提供）
interface SerendieChartThemeProviderProps {
  children: React.ReactNode;
}

export const SerendieChartThemeProvider = ({
  children,
}: SerendieChartThemeProviderProps) => {
  return <ThemeProvider theme={SerendieChartTheme}>{children}</ThemeProvider>;
};

export default SerendieChartTheme;
