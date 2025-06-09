import { ResponsiveLine } from "@nivo/line";
import {
  SerendieChartThemeProvider,
  useLineChartProps,
  compactChartMargin,
  legendChartMargin,
} from "./index";

export default {
  title: "Chart/LineChart",
  component: ResponsiveLine,
};

const singleLineData = [
  {
    id: "series-1",
    data: [
      { x: "Jan", y: 65 },
      { x: "Feb", y: 75 },
      { x: "Mar", y: 90 },
      { x: "Apr", y: 85 },
      { x: "May", y: 95 },
      { x: "Jun", y: 80 },
    ],
  },
];

const multiLineData = [
  {
    id: "Sales",
    data: [
      { x: "Jan", y: 65 },
      { x: "Feb", y: 75 },
      { x: "Mar", y: 90 },
      { x: "Apr", y: 85 },
      { x: "May", y: 95 },
      { x: "Jun", y: 80 },
    ],
  },
  {
    id: "Profit",
    data: [
      { x: "Jan", y: 45 },
      { x: "Feb", y: 50 },
      { x: "Mar", y: 65 },
      { x: "Apr", y: 55 },
      { x: "May", y: 70 },
      { x: "Jun", y: 60 },
    ],
  },
  {
    id: "Cost",
    data: [
      { x: "Jan", y: 20 },
      { x: "Feb", y: 25 },
      { x: "Mar", y: 25 },
      { x: "Apr", y: 30 },
      { x: "May", y: 25 },
      { x: "Jun", y: 20 },
    ],
  },
];

const temperatureData = [
  {
    id: "Tokyo",
    data: [
      { x: "Jan", y: 7 },
      { x: "Feb", y: 8 },
      { x: "Mar", y: 13 },
      { x: "Apr", y: 18 },
      { x: "May", y: 23 },
      { x: "Jun", y: 26 },
    ],
  },
  {
    id: "New York",
    data: [
      { x: "Jan", y: 2 },
      { x: "Feb", y: 4 },
      { x: "Mar", y: 9 },
      { x: "Apr", y: 15 },
      { x: "May", y: 21 },
      { x: "Jun", y: 25 },
    ],
  },
];

// 基本的なライン
export const BasicLine = () => {
  const lineProps = useLineChartProps("primary");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 500 }}>
        <ResponsiveLine
          data={singleLineData}
          {...lineProps}
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
          pointSymbol={({ size, color, borderWidth }) => {
            const rectSize = size + borderWidth * 2;
            return (
              <rect
                x={-rectSize / 2}
                y={-rectSize / 2}
                width={rectSize}
                height={rectSize}
                stroke={color}
                strokeWidth={borderWidth}
                fill={"#fff"}
              />
            );
          }}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// 複数ライン（マルチカラー）
export const MultipleLines = () => {
  const lineProps = useLineChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 350, width: 600 }}>
        <ResponsiveLine
          data={multiLineData}
          {...lineProps}
          margin={legendChartMargin}
          axisBottom={{
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 36,
          }}
          axisLeft={{
            legend: "Amount",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// エリアチャート風
export const AreaChart = () => {
  const lineProps = useLineChartProps("positive");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 500 }}>
        <ResponsiveLine
          data={singleLineData}
          {...lineProps}
          enableArea={true}
          areaOpacity={0.3}
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
    </SerendieChartThemeProvider>
  );
};

// ドット強調
export const LineWithDots = () => {
  const lineProps = useLineChartProps("notice");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 500 }}>
        <ResponsiveLine
          data={temperatureData}
          {...lineProps}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={3}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          axisBottom={{
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 36,
          }}
          axisLeft={{
            legend: "Temperature (°C)",
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// カーブ付きライン
export const CurvedLine = () => {
  const lineProps = useLineChartProps("negative");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 500 }}>
        <ResponsiveLine
          data={multiLineData}
          {...lineProps}
          curve="catmullRom"
          lineWidth={3}
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
    </SerendieChartThemeProvider>
  );
};

// グリッドなし
export const LineWithoutGrid = () => {
  const lineProps = useLineChartProps("primary");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 300, width: 500 }}>
        <ResponsiveLine
          data={singleLineData}
          {...lineProps}
          enableGridX={false}
          enableGridY={false}
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
    </SerendieChartThemeProvider>
  );
};

// コンパクトサイズ
export const CompactLineChart = () => {
  const lineProps = useLineChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 200, width: 300 }}>
        <ResponsiveLine
          data={temperatureData}
          {...lineProps}
          margin={compactChartMargin}
          enablePoints={false}
          axisBottom={{
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 24,
          }}
          axisLeft={{
            legend: "Temp",
            legendPosition: "middle",
            legendOffset: -30,
          }}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// 全カラーカテゴリの比較
export const AllLineColorCategories = () => {
  const primaryProps = useLineChartProps("primary");
  const positiveProps = useLineChartProps("positive");
  const negativeProps = useLineChartProps("negative");
  const noticeProps = useLineChartProps("notice");

  const testData = [
    {
      id: "test",
      data: [
        { x: "A", y: 30 },
        { x: "B", y: 50 },
        { x: "C", y: 40 },
        { x: "D", y: 60 },
      ],
    },
  ];

  return (
    <SerendieChartThemeProvider>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ height: 200 }}>
          <h3>Primary</h3>
          <ResponsiveLine
            data={testData}
            {...primaryProps}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 200 }}>
          <h3>Positive</h3>
          <ResponsiveLine
            data={testData}
            {...positiveProps}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 200 }}>
          <h3>Negative</h3>
          <ResponsiveLine
            data={testData}
            {...negativeProps}
            margin={compactChartMargin}
          />
        </div>

        <div style={{ height: 200 }}>
          <h3>Notice</h3>
          <ResponsiveLine
            data={testData}
            {...noticeProps}
            margin={compactChartMargin}
          />
        </div>
      </div>
    </SerendieChartThemeProvider>
  );
};
