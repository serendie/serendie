import { Meta, StoryObj } from "@storybook/react";
import { ResponsiveLine } from "@nivo/line";
import { useLineChartProps } from "./index";
import { lineData } from "./chartData";
import figma from "@figma/code-connect";

/**
 * ResponsiveLine をラップして colorCategory を切り替えられる
 */
type LineChartVariant =
  | "primary"
  | "multi"
  | "positive"
  | "negative"
  | "notice";

type LineChartProps = {
  ColorScheme?: LineChartVariant;
  enableArea?: boolean;
};

const LineChart = ({
  ColorScheme = "primary",
  enableArea = false,
}: LineChartProps) => {
  const lineProps = useLineChartProps(ColorScheme);

  // エリアチャートの場合は単一シリーズ、通常のラインチャートは複数シリーズ
  const data = enableArea ? [lineData[0]] : lineData;

  return (
    <div style={{ height: 400, width: 600 }}>
      <ResponsiveLine
        data={data}
        {...lineProps}
        enableArea={enableArea}
        areaOpacity={enableArea ? 0.3 : 0}
        axisBottom={{
          legend: "Month",
          legendPosition: "middle",
          legendOffset: 36,
        }}
        axisLeft={{
          legend: "Value",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};

/* ---------- Figma Code Connect の設定 ---------- */
const meta: Meta<typeof LineChart> = {
  component: LineChart,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=18036-8379",
      props: {
        ColorScheme: figma.enum("ColorScheme", {
          Primary: "primary",
          Multi: "multi",
          Positive: "positive",
          Negative: "negative",
          Notice: "notice",
        }),
      },
      examples: [FigmaExample],
    },
    controls: { expanded: true },
  },
  argTypes: {
    ColorScheme: {
      options: ["primary", "multi", "positive", "negative", "notice"],
      control: { type: "radio" },
      defaultValue: "primary",
    },
    enableArea: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
};
export default meta;

/* Figma 側で呼び出される例示用コンポーネント */
function FigmaExample(props: LineChartProps) {
  return <LineChart {...props} />;
}

type Story = StoryObj<typeof LineChart>;

export const Primary: Story = {
  args: { ColorScheme: "multi", enableArea: false },
};

export const Area: Story = {
  args: { ColorScheme: "positive", enableArea: true },
};
