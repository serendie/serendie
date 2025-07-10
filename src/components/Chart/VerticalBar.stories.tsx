import { Meta, StoryObj } from "@storybook/react";
import { ResponsiveBar } from "@nivo/bar";
import { useBarChartProps, legendChartMargin } from "./index";
import { multiSeriesData } from "./chartData";
import figma from "@figma/code-connect";

/**
 * VerticalBar - 垂直バーチャート（グループ化）
 */
type BarChartVariant = "primary" | "multi" | "positive" | "negative" | "notice";

type VerticalBarProps = {
  ColorScheme?: BarChartVariant;
};

const VerticalBar = ({ ColorScheme = "multi" }: VerticalBarProps) => {
  const barProps = useBarChartProps(ColorScheme);

  return (
    <div style={{ height: 400, width: 600 }}>
      <ResponsiveBar
        data={multiSeriesData}
        keys={["sales", "profit", "cost"]}
        indexBy="month"
        groupMode="grouped"
        {...barProps}
        margin={legendChartMargin}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisRight={{
          format: (value) => `${value}%`,
        }}
        gridYValues={[0, 50, 100]}
        enableLabel={false}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
          },
        ]}
      />
    </div>
  );
};

/* ---------- Figma Code Connect の設定 ---------- */
figma.connect(
  VerticalBar,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=17792-14261",
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
    example: (props) => <VerticalBar {...props} />,
  }
);

const meta: Meta<typeof VerticalBar> = {
  title: "components/Chart/VerticalBar",
  component: VerticalBar,
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

type Story = StoryObj<typeof VerticalBar>;

export const Default: Story = {
  args: { ColorScheme: "multi" },
};

export const Primary: Story = {
  args: { ColorScheme: "primary" },
};
