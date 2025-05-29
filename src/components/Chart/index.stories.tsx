import type { Meta, StoryObj } from "@storybook/react";
import { Chart } from "./index";
import { VictoryPie, VictoryLine, VictoryBar } from "victory";
import { SerendieTheme } from "./VictoryTheme";

const meta: Meta<typeof Chart> = {
  title: "Components/Chart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

// サンプルデータ
const pieData = [
  { x: "カテゴリA", y: 35 },
  { x: "カテゴリB", y: 25 },
  { x: "カテゴリC", y: 20 },
  { x: "カテゴリD", y: 20 },
];

const lineData = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 7 },
];

const barData = [
  { x: "1月", y: 5 },
  { x: "2月", y: 7 },
  { x: "3月", y: 3 },
  { x: "4月", y: 8 },
  { x: "5月", y: 6 },
];

export const PieChart: Story = {
  render: () => (
    <div>
      <VictoryPie
        theme={SerendieTheme}
        data={pieData}
        width={500}
        height={500}
        innerRadius={100}
        labelRadius={({ innerRadius }) => (innerRadius as number) + 40}
      />
    </div>
  ),
};

export const LineChart: Story = {
  render: () => (
    <Chart width={500} height={300}>
      <VictoryLine data={lineData} />
    </Chart>
  ),
};

export const BarChart: Story = {
  render: () => (
    <Chart domainPadding={{ x: 50 }} width={500} height={300}>
      <VictoryBar data={barData} />
    </Chart>
  ),
};
