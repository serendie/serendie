import { ResponsivePie } from "@nivo/pie";
import {
  SerendieChartThemeProvider,
  usePieChartProps,
  compactChartMargin,
} from "./index";

export default {
  title: "Chart/PieChart",
  component: ResponsivePie,
};

const basicPieData = [
  { id: "JavaScript", label: "JavaScript", value: 35 },
  { id: "TypeScript", label: "TypeScript", value: 25 },
  { id: "Python", label: "Python", value: 20 },
  { id: "Go", label: "Go", value: 15 },
  { id: "Rust", label: "Rust", value: 5 },
];

const salesData = [
  { id: "Q1", label: "Q1 Sales", value: 120 },
  { id: "Q2", label: "Q2 Sales", value: 150 },
  { id: "Q3", label: "Q3 Sales", value: 180 },
  { id: "Q4", label: "Q4 Sales", value: 200 },
];

const marketShareData = [
  { id: "Company A", label: "Company A", value: 45 },
  { id: "Company B", label: "Company B", value: 30 },
  { id: "Company C", label: "Company C", value: 15 },
  { id: "Company D", label: "Company D", value: 7 },
  { id: "Others", label: "Others", value: 3 },
];

// 基本的なパイチャート
export const BasicPie = () => {
  const pieProps = usePieChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 400, width: 400 }}>
        <ResponsivePie data={basicPieData} {...pieProps} valueFormat=" >-.2f" />
      </div>
    </SerendieChartThemeProvider>
  );
};

// ドーナツチャート
export const DonutChart = () => {
  const pieProps = usePieChartProps("primary");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 400, width: 400 }}>
        <ResponsivePie
          data={salesData}
          {...pieProps}
          innerRadius={0.6}
          valueFormat=" >-.0f"
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// ラベルなし（シンプル）
export const PieWithoutLabels = () => {
  const pieProps = usePieChartProps("positive");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 300 }}>
        <ResponsivePie
          data={basicPieData}
          {...pieProps}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          margin={compactChartMargin}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// カスタムパディング
export const PieWithPadding = () => {
  const pieProps = usePieChartProps("notice");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 400, width: 400 }}>
        <ResponsivePie
          data={marketShareData}
          {...pieProps}
          padAngle={2}
          cornerRadius={6}
          activeOuterRadiusOffset={12}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// アニメーション強調
export const AnimatedPie = () => {
  const pieProps = usePieChartProps("negative");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 400, width: 400 }}>
        <ResponsivePie
          data={salesData}
          {...pieProps}
          activeOuterRadiusOffset={15}
          animate={true}
          motionConfig={{
            mass: 1,
            tension: 120,
            friction: 14,
          }}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// レジェンド付き
export const PieWithLegend = () => {
  const pieProps = usePieChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 400, width: 600 }}>
        <ResponsivePie
          data={basicPieData}
          {...pieProps}
          margin={{ top: 40, right: 200, bottom: 40, left: 40 }}
          legends={[
            {
              anchor: "right",
              direction: "column",
              translateX: 140,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 60,
              itemHeight: 14,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// 小さなピース強調
export const PieWithRadialLabels = () => {
  const pieProps = usePieChartProps("primary");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 400, width: 400 }}>
        <ResponsivePie
          data={marketShareData}
          {...pieProps}
          radialLabelsSkipAngle={5}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: "color" }}
          slicesLabelsSkipAngle={10}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// 全カラーカテゴリの比較
export const AllPieColorCategories = () => {
  const primaryProps = usePieChartProps("primary");
  const positiveProps = usePieChartProps("positive");
  const negativeProps = usePieChartProps("negative");
  const noticeProps = usePieChartProps("notice");

  const testData = [
    { id: "A", label: "A", value: 30 },
    { id: "B", label: "B", value: 25 },
    { id: "C", label: "C", value: 20 },
    { id: "D", label: "D", value: 25 },
  ];

  return (
    <SerendieChartThemeProvider>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ height: 300 }}>
          <h3>Primary Colors</h3>
          <ResponsivePie
            data={testData}
            {...primaryProps}
            margin={compactChartMargin}
            enableArcLinkLabels={false}
          />
        </div>

        <div style={{ height: 300 }}>
          <h3>Positive Colors</h3>
          <ResponsivePie
            data={testData}
            {...positiveProps}
            margin={compactChartMargin}
            enableArcLinkLabels={false}
          />
        </div>

        <div style={{ height: 300 }}>
          <h3>Negative Colors</h3>
          <ResponsivePie
            data={testData}
            {...negativeProps}
            margin={compactChartMargin}
            enableArcLinkLabels={false}
          />
        </div>

        <div style={{ height: 300 }}>
          <h3>Notice Colors</h3>
          <ResponsivePie
            data={testData}
            {...noticeProps}
            margin={compactChartMargin}
            enableArcLinkLabels={false}
          />
        </div>
      </div>
    </SerendieChartThemeProvider>
  );
};

// ラベルコントラストのテスト
export const PieLabelContrastTest = () => {
  const pieProps = usePieChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 400, width: 400 }}>
        <ResponsivePie
          data={[
            { id: "Light Yellow", label: "Light", value: 30 },
            { id: "Dark Blue", label: "Dark", value: 25 },
            { id: "Medium Gray", label: "Medium", value: 20 },
            { id: "Bright Green", label: "Bright", value: 15 },
            { id: "Deep Red", label: "Deep", value: 10 },
          ]}
          {...pieProps}
          // ラベルのコントラストが自動調整される
        />
      </div>
    </SerendieChartThemeProvider>
  );
};
