import { Meta, StoryObj } from "@storybook/react";
import { ResponsiveBar } from "@nivo/bar";
import { useBarChartProps } from "./index";
import { token } from "../../../styled-system/tokens";
import { stackedData } from "./chartData";
import figma from "@figma/code-connect";

/**
 * Piled - 積み上げバーチャート
 */
type BarChartVariant = "primary" | "multi" | "positive" | "negative" | "notice";

type PiledProps = {
  ColorScheme?: BarChartVariant;
};

const Piled = ({ ColorScheme = "multi" }: PiledProps) => {
  const barProps = useBarChartProps(ColorScheme);

  return (
    <div style={{ height: 400, width: 700 }}>
      <ResponsiveBar
        data={stackedData}
        keys={["segment1", "segment2", "segment3", "segment4", "segment5"]}
        indexBy="category"
        {...barProps}
        margin={{ top: 20, right: 80, bottom: 60, left: 60 }}
        valueFormat={(value) => `${value}%`}
        labelFormat={(datum) =>
          typeof datum === "number" && datum > 0 ? `${datum}%` : ""
        }
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisRight={{
          format: (value) => `${value}%`,
        }}
        gridYValues={[0, 25, 50, 75, 100]}
        markers={[
          {
            axis: "y",
            value: 75,
            lineStyle: {
              stroke: token("colors.sd.system.color.chart.component.threshold"),
              strokeWidth: 2,
              strokeDasharray: "4 4",
            },
            legend: "平均",
            legendOrientation: "horizontal",
            legendPosition: "bottom-right",
            textStyle: {
              fill: token("colors.sd.system.color.chart.component.threshold"),
            },
          },
        ]}
        defs={[
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "segment1",
            },
            id: "lines",
          },
        ]}
      />
    </div>
  );
};

/* ---------- Figma Code Connect の設定 ---------- */
figma.connect(
  Piled,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=18036-7361",
  {
    props: {
      ColorScheme: figma.enum("ColorScheme", {
        Primary: "primary",
        Multi: "multi",
        Positive: "positive",
        Negative: "negative",
        Notice: "notice",
      }),
    },
    example: (props) => <Piled {...props} />,
  }
);

const meta: Meta<typeof Piled> = {
  title: "components/Chart/Piled",
  component: Piled,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    ColorScheme: {
      options: ["primary", "multi", "positive", "negative", "notice"],
      control: { type: "radio" },
      defaultValue: "multi",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Piled>;

export const Default: Story = {
  args: { ColorScheme: "multi" },
};

export const Primary: Story = {
  args: { ColorScheme: "primary" },
};
