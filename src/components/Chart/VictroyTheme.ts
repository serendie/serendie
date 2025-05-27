import { VictoryThemeDefinition } from "victory";
import { token } from "@serendie/ui/tokens";

// @serendie/ui/tokensの値を使用してカスタムテーマを定義
const SerendieTheme: VictoryThemeDefinition = {
  area: {
    style: {
      data: {
        fill: token("colors.sd.system.color.impression.primary"),
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
    },
  },
  axis: {
    style: {
      axis: {
        fill: "transparent",
        stroke: token("colors.sd.system.color.component.outline"),
        strokeWidth: 1,
      },
      axisLabel: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        padding: 30,
        fill: token("colors.sd.system.color.component.onSurfaceVariant"),
      },
      grid: {
        fill: "none",
        stroke: "none",
      },
      ticks: {
        fill: "transparent",
        size: 5,
        stroke: token("colors.sd.system.color.component.outline"),
      },
      tickLabels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        padding: 10,
        fill: token("colors.sd.system.color.component.onSurfaceVariant"),
      },
    },
  },
  bar: {
    style: {
      data: {
        fill: token("colors.sd.system.color.impression.primary"),
        padding: 8,
        strokeWidth: 0,
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
    },
  },
  boxplot: {
    style: {
      max: {
        padding: 8,
        stroke: token("colors.sd.system.color.component.outline"),
        strokeWidth: 1,
      },
      maxLabels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        padding: 8,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
      median: {
        padding: 8,
        stroke: token("colors.sd.system.color.component.outline"),
        strokeWidth: 1,
      },
      medianLabels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        padding: 8,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
      min: {
        padding: 8,
        stroke: token("colors.sd.system.color.component.outline"),
        strokeWidth: 1,
      },
      minLabels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        padding: 8,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
      q1: {
        padding: 8,
        fill: token("colors.sd.system.color.impression.primary"),
      },
      q1Labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        padding: 8,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
      q3: {
        padding: 8,
        fill: token("colors.sd.system.color.impression.primary"),
      },
      q3Labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        padding: 8,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
    },
    boxWidth: 20,
  },
  candlestick: {
    style: {
      data: {
        stroke: token("colors.sd.system.color.component.outline"),
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        padding: 8,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
    },
    candleColors: {
      positive: token("colors.sd.system.color.impression.positive"),
      negative: token("colors.sd.system.color.impression.negative"),
    },
  },
  chart: {
    width: 450,
    height: 300,
    padding: 50,
  },
  errorbar: {
    borderWidth: 8,
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: token("colors.sd.system.color.component.outline"),
        strokeWidth: 2,
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
    },
  },
  group: {
    colorScale: [
      token("colors.sd.system.color.impression.primary"),
      token("colors.sd.system.color.impression.secondary"),
      token("colors.sd.system.color.impression.tertiary"),
      token("colors.sd.reference.color.scale.green.500"),
      token("colors.sd.reference.color.scale.purple.500"),
    ],
  },
  legend: {
    colorScale: [
      token("colors.sd.system.color.impression.primary"),
      token("colors.sd.system.color.impression.secondary"),
      token("colors.sd.system.color.impression.tertiary"),
      token("colors.sd.reference.color.scale.green.500"),
      token("colors.sd.reference.color.scale.purple.500"),
    ],
    gutter: 10,
    orientation: "vertical" as const,
    titleOrientation: "top" as const,
    style: {
      data: {
        type: "square",
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
      title: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 14,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
    },
  },
  line: {
    style: {
      data: {
        fill: "transparent",
        opacity: 1,
        stroke: token("colors.sd.system.color.impression.primary"),
        strokeWidth: 2,
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
    },
  },
  pie: {
    colorScale: [
      token("colors.sd.system.color.impression.primary"),
      token("colors.sd.system.color.impression.secondary"),
      token("colors.sd.system.color.impression.tertiary"),
      token("colors.sd.reference.color.scale.green.500"),
      token("colors.sd.reference.color.scale.purple.500"),
    ],
    style: {
      data: {
        padding: 8,
        stroke: token("colors.sd.system.color.component.surface"),
        strokeWidth: 1,
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        fill: token("colors.sd.system.color.component.onSurface"),
      },
    },
  },
  scatter: {
    style: {
      data: {
        fill: token("colors.sd.system.color.impression.primary"),
        opacity: 1,
        stroke: "transparent",
        strokeWidth: 0,
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        fill: token("colors.sd.system.color.component.onSurface"),
        padding: 8,
      },
    },
  },
  stack: {
    colorScale: [
      token("colors.sd.system.color.impression.primary"),
      token("colors.sd.system.color.impression.secondary"),
      token("colors.sd.system.color.impression.tertiary"),
      token("colors.sd.reference.color.scale.green.500"),
      token("colors.sd.reference.color.scale.purple.500"),
    ],
  },
  tooltip: {
    style: {
      fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
      fontSize: 12,
      fill: token("colors.sd.system.color.component.onSurface"),
      fontWeight: "bold",
    },
    flyoutStyle: {
      stroke: token("colors.sd.system.color.component.outline"),
      strokeWidth: 1,
      fill: token("colors.sd.system.color.component.surface"),
      pointerEvents: "none",
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10,
  },
  voronoi: {
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0,
      },
      labels: {
        fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
        fontSize: 12,
        fill: token("colors.sd.system.color.component.onSurface"),
        padding: 5,
        pointerEvents: "none",
      },
      flyout: {
        stroke: token("colors.sd.system.color.component.outline"),
        strokeWidth: 1,
        fill: token("colors.sd.system.color.component.surface"),
        pointerEvents: "none",
      },
    },
  },
};

export default SerendieTheme;
