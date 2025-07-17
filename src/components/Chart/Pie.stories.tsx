// src/components/Chart/stories/Pie.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { ResponsivePie } from "@nivo/pie";
import { usePieChartProps } from "./SerendieChartProps";
import { pieData } from "./chartData";
import figma from "@figma/code-connect";

/**
 * ResponsivePie をラップして colorCategory を切り替えられる
 */
type PieChartVariant = "primary" | "multi" | "positive" | "negative" | "notice";

type PieChartProps = {
  colorCategory?: PieChartVariant;
};

const PieChart = ({ colorCategory = "primary" }: PieChartProps) => {
  const pieProps = usePieChartProps(colorCategory);
  return (
    <div style={{ height: 400, width: 400 }}>
      <ResponsivePie data={pieData} {...pieProps} />
    </div>
  );
};

/* ---------- Figma Code Connect の設定 ---------- */
const meta: Meta<typeof PieChart> = {
  component: PieChart,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=17792-14082",
      props: {
        colorCategory: figma.enum("Color", {
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
    colorCategory: {
      options: ["primary", "multi", "positive", "negative", "notice"],
      control: { type: "radio" },
      defaultValue: "primary",
    },
  },
};
export default meta;

/* Figma 側で呼び出される例示用コンポーネント */
function FigmaExample(props: PieChartProps) {
  return <PieChart {...props} />;
}

type Story = StoryObj<typeof PieChart>;

export const Primary: Story = {
  args: { colorCategory: "primary" },
};

export const MultiColored: Story = {
  args: { colorCategory: "multi" },
};
