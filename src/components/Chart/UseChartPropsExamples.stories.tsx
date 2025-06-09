import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import {
  SerendieChartThemeProvider,
  useChartProps,
  useBarChartProps,
  compactChartMargin,
  legendChartMargin,
} from "./index";

export default {
  title: "Chart/UseChartProps Examples",
};

const barData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 75 },
  { month: "Mar", value: 90 },
  { month: "Apr", value: 85 },
  { month: "May", value: 95 },
];

const multiSeriesData = [
  { month: "Jan", sales: 65, profit: 45, cost: 20 },
  { month: "Feb", sales: 75, profit: 50, cost: 25 },
  { month: "Mar", sales: 90, profit: 65, cost: 25 },
  { month: "Apr", sales: 85, profit: 55, cost: 30 },
  { month: "May", sales: 95, profit: 70, cost: 25 },
];

const lineData = [
  {
    id: "sales",
    data: [
      { x: "Jan", y: 65 },
      { x: "Feb", y: 75 },
      { x: "Mar", y: 90 },
      { x: "Apr", y: 85 },
      { x: "May", y: 95 },
    ],
  },
  {
    id: "profit",
    data: [
      { x: "Jan", y: 45 },
      { x: "Feb", y: 50 },
      { x: "Mar", y: 65 },
      { x: "Apr", y: 55 },
      { x: "May", y: 70 },
    ],
  },
];

const pieData = [
  { id: "JavaScript", value: 35 },
  { id: "TypeScript", value: 25 },
  { id: "Python", value: 20 },
  { id: "Go", value: 15 },
  { id: "Rust", value: 5 },
];

// 基本的な使い方
export const BasicUsage = () => {
  const chartProps = useChartProps("primary");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 500 }}>
        <ResponsiveBar
          data={barData}
          keys={["value"]}
          indexBy="month"
          colorBy="indexValue"
          {...chartProps.bar}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// 個別のフックを使用
export const IndividualHooks = () => {
  const barProps = useBarChartProps("positive");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 500 }}>
        <ResponsiveBar
          data={barData}
          keys={["value"]}
          indexBy="month"
          {...barProps}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// カスタマイズ可能
export const CustomizedProps = () => {
  const chartProps = useChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 600 }}>
        <ResponsiveBar
          data={multiSeriesData}
          keys={["sales", "profit", "cost"]}
          indexBy="month"
          groupMode="grouped"
          {...chartProps.bar}
          // カスタマイズも可能
          margin={legendChartMargin}
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
    </SerendieChartThemeProvider>
  );
};

// 複数のチャートタイプ
export const MultipleChartTypes = () => {
  const chartProps = useChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ height: 300 }}>
          <h3>Bar Chart</h3>
          <ResponsiveBar
            data={barData}
            keys={["value"]}
            indexBy="month"
            {...chartProps.bar}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 300 }}>
          <h3>Line Chart</h3>
          <ResponsiveLine
            data={lineData}
            {...chartProps.line}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 300 }}>
          <h3>Pie Chart</h3>
          <ResponsivePie
            data={pieData}
            {...chartProps.pie}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 300 }}>
          <h3>Bar Chart (Notice Color)</h3>
          <ResponsiveBar
            data={barData}
            keys={["value"]}
            indexBy="month"
            {...useBarChartProps("notice")}
            margin={compactChartMargin}
          />
        </div>
      </div>
    </SerendieChartThemeProvider>
  );
};

// 色のコントラストテスト
export const ColorContrastDemo = () => {
  const primaryProps = useBarChartProps("primary");
  const multiProps = useBarChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ height: 300 }}>
          <h3>Primary Colors (Single Series)</h3>
          <ResponsiveBar
            data={barData}
            keys={["value"]}
            indexBy="month"
            {...primaryProps}
          />
        </div>

        <div style={{ height: 300 }}>
          <h3>Multi Colors (Multiple Series)</h3>
          <ResponsiveBar
            data={multiSeriesData}
            keys={["sales", "profit", "cost"]}
            indexBy="month"
            {...multiProps}
            groupMode="grouped"
          />
        </div>
      </div>
    </SerendieChartThemeProvider>
  );
};

// 単一系列で複数色を使用
export const SingleSeriesMultiColor = () => {
  const chartProps = useChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 600 }}>
        <ResponsiveBar
          data={[
            { item: "A", value: 100 },
            { item: "B", value: 80 },
            { item: "C", value: 60 },
            { item: "D", value: 90 },
            { item: "E", value: 70 },
          ]}
          keys={["value"]}
          indexBy="item"
          {...chartProps.bar}
          colorBy="indexValue" // 各バーに異なる色を適用
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// 全カラーカテゴリでのラベルコントラストテスト
export const AllColorCategoriesTest = () => {
  const primaryProps = useBarChartProps("primary");
  const positiveProps = useBarChartProps("positive");
  const negativeProps = useBarChartProps("negative");
  const noticeProps = useBarChartProps("notice");
  const multiProps = useBarChartProps("multi");

  const testData = [
    { item: "Test 1", value: 80 },
    { item: "Test 2", value: 90 },
    { item: "Test 3", value: 70 },
  ];

  return (
    <SerendieChartThemeProvider>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}
      >
        <div style={{ height: 250 }}>
          <h3>Primary Colors</h3>
          <ResponsiveBar
            data={testData}
            keys={["value"]}
            indexBy="item"
            {...primaryProps}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 250 }}>
          <h3>Positive Colors</h3>
          <ResponsiveBar
            data={testData}
            keys={["value"]}
            indexBy="item"
            {...positiveProps}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 250 }}>
          <h3>Negative Colors</h3>
          <ResponsiveBar
            data={testData}
            keys={["value"]}
            indexBy="item"
            {...negativeProps}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 250 }}>
          <h3>Notice Colors</h3>
          <ResponsiveBar
            data={testData}
            keys={["value"]}
            indexBy="item"
            {...noticeProps}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 250 }}>
          <h3>Multi Colors</h3>
          <ResponsiveBar
            data={testData}
            keys={["value"]}
            indexBy="item"
            {...multiProps}
            colorBy="indexValue"
            margin={compactChartMargin}
          />
        </div>
      </div>
    </SerendieChartThemeProvider>
  );
};

// 積み上げバーでのラベルコントラスト
export const StackedBarsWithLabels = () => {
  const chartProps = useChartProps("primary");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 350, width: 600 }}>
        <ResponsiveBar
          data={multiSeriesData}
          keys={["sales", "profit", "cost"]}
          indexBy="month"
          {...chartProps.bar}
          margin={legendChartMargin}
          // 積み上げモード（デフォルト）
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
    </SerendieChartThemeProvider>
  );
};

// 水平バーチャート
export const HorizontalBarsWithLabels = () => {
  const chartProps = useChartProps("notice");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 400, width: 500 }}>
        <ResponsiveBar
          data={barData}
          keys={["value"]}
          indexBy="month"
          {...chartProps.bar}
          layout="horizontal"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legend: "Value",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            legend: "Month",
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};
