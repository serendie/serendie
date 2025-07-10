import { Meta, StoryObj } from "@storybook/react";
import { ResponsiveBar } from "@nivo/bar";
import { useBarChartProps } from "./index";
import { barData } from "./chartData";
import figma from "@figma/code-connect";

/**
 * HorizontalBar - 水平バーチャート
 */
type BarChartVariant = "primary" | "multi" | "positive" | "negative" | "notice";

type HorizontalBarProps = {
  ColorScheme?: BarChartVariant;
};

const HorizontalBar = ({ ColorScheme = "primary" }: HorizontalBarProps) => {
  const barProps = useBarChartProps(ColorScheme);

  return (
    <div style={{ height: 400, width: 600 }}>
      <ResponsiveBar
        data={barData}
        keys={["value"]}
        indexBy="month"
        layout="horizontal"
        {...barProps}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          legend: "ラベル",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
      />
    </div>
  );
};

/* ---------- Figma Code Connect の設定 ---------- */
figma.connect(
  HorizontalBar,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=17799-17341",
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
    example: (props) => <HorizontalBar {...props} />,
  }
);

const meta: Meta<typeof HorizontalBar> = {
  title: "components/Chart/HorizontalBar",
  component: HorizontalBar,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    ColorScheme: {
      options: ["primary", "multi", "positive", "negative", "notice"],
      control: { type: "radio" },
      defaultValue: "primary",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HorizontalBar>;

export const Default: Story = {
  args: { ColorScheme: "primary" },
};

export const Multi: Story = {
  args: { ColorScheme: "multi" },
};
