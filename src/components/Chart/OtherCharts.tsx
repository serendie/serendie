import { ResponsiveArea } from "@nivo/area";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import {
  SerendieChartThemeProvider,
  useChartProps,
  compactChartMargin,
  defaultChartMargin,
} from "./index";

export default {
  title: "Chart/Other Chart Types",
};

// Area Chart Data
const areaData = [
  {
    id: "Sales",
    data: [
      { x: "2019", y: 65 },
      { x: "2020", y: 75 },
      { x: "2021", y: 90 },
      { x: "2022", y: 85 },
      { x: "2023", y: 95 },
    ],
  },
  {
    id: "Profit",
    data: [
      { x: "2019", y: 25 },
      { x: "2020", y: 35 },
      { x: "2021", y: 50 },
      { x: "2022", y: 45 },
      { x: "2023", y: 55 },
    ],
  },
  {
    id: "Revenue",
    data: [
      { x: "2019", y: 100 },
      { x: "2020", y: 110 },
      { x: "2021", y: 140 },
      { x: "2022", y: 130 },
      { x: "2023", y: 150 },
    ],
  },
];

// Scatter Plot Data
const scatterData = [
  {
    id: "Product A",
    data: [
      { x: 10, y: 65 },
      { x: 20, y: 75 },
      { x: 30, y: 90 },
      { x: 40, y: 85 },
      { x: 50, y: 95 },
    ],
  },
  {
    id: "Product B",
    data: [
      { x: 15, y: 45 },
      { x: 25, y: 55 },
      { x: 35, y: 70 },
      { x: 45, y: 65 },
      { x: 55, y: 75 },
    ],
  },
  {
    id: "Product C",
    data: [
      { x: 12, y: 30 },
      { x: 22, y: 40 },
      { x: 32, y: 55 },
      { x: 42, y: 50 },
      { x: 52, y: 60 },
    ],
  },
];

// HeatMap Data
const heatMapData = [
  {
    id: "Jan",
    data: [
      { x: "Mon", y: 10 },
      { x: "Tue", y: 15 },
      { x: "Wed", y: 20 },
      { x: "Thu", y: 18 },
      { x: "Fri", y: 25 },
    ],
  },
  {
    id: "Feb",
    data: [
      { x: "Mon", y: 12 },
      { x: "Tue", y: 18 },
      { x: "Wed", y: 22 },
      { x: "Thu", y: 20 },
      { x: "Fri", y: 28 },
    ],
  },
  {
    id: "Mar",
    data: [
      { x: "Mon", y: 15 },
      { x: "Tue", y: 20 },
      { x: "Wed", y: 25 },
      { x: "Thu", y: 23 },
      { x: "Fri", y: 30 },
    ],
  },
  {
    id: "Apr",
    data: [
      { x: "Mon", y: 18 },
      { x: "Tue", y: 22 },
      { x: "Wed", y: 28 },
      { x: "Thu", y: 25 },
      { x: "Fri", y: 32 },
    ],
  },
];

// Area Chart
export const AreaChart = () => {
  const { line: lineProps } = useChartProps("primary");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 350, width: 600 }}>
        <ResponsiveArea
          data={areaData}
          {...lineProps}
          enableArea={true}
          areaOpacity={0.4}
          enablePoints={true}
          pointSize={6}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          axisBottom={{
            legend: "Year",
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

// Stacked Area Chart
export const StackedAreaChart = () => {
  const { line: lineProps } = useChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 350, width: 600 }}>
        <ResponsiveArea
          data={areaData}
          {...lineProps}
          enableArea={true}
          areaOpacity={0.7}
          enablePoints={false}
          enableGridX={true}
          enableGridY={true}
          axisBottom={{
            legend: "Year",
            legendPosition: "middle",
            legendOffset: 36,
          }}
          axisLeft={{
            legend: "Value",
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

// Scatter Plot
export const ScatterPlotChart = () => {
  const { line: chartProps } = useChartProps("positive");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 350, width: 600 }}>
        <ResponsiveScatterPlot
          data={scatterData}
          colors={chartProps.colors}
          margin={defaultChartMargin}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          nodeSize={10}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legend: "X Value",
            legendPosition: "middle",
            legendOffset: 36,
          }}
          axisLeft={{
            legend: "Y Value",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 130,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 12,
              itemsSpacing: 5,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// HeatMap
export const HeatMapChart = () => {
  const { bar: chartProps } = useChartProps("notice");

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 350, width: 500 }}>
        <ResponsiveHeatMap
          data={heatMapData}
          colors={chartProps.colors}
          margin={defaultChartMargin}
          valueFormat=" >-.1f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legend: "Day of Week",
            legendPosition: "middle",
            legendOffset: 36,
          }}
          axisLeft={{
            legend: "Month",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          cellOpacity={1}
          cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
          animate={true}
          motionConfig="wobbly"
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// Scatter Plot with Different Sizes
export const BubbleChart = () => {
  const { line: chartProps } = useChartProps("multi");

  const bubbleData = [
    {
      id: "Group A",
      data: [
        { x: 10, y: 65, size: 15 },
        { x: 20, y: 75, size: 20 },
        { x: 30, y: 90, size: 25 },
        { x: 40, y: 85, size: 18 },
      ],
    },
    {
      id: "Group B",
      data: [
        { x: 15, y: 45, size: 12 },
        { x: 25, y: 55, size: 22 },
        { x: 35, y: 70, size: 28 },
        { x: 45, y: 65, size: 16 },
      ],
    },
  ];

  return (
    <SerendieChartThemeProvider>
      <div style={{ height: 350, width: 600 }}>
        <ResponsiveScatterPlot
          data={bubbleData}
          colors={chartProps.colors}
          margin={defaultChartMargin}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          nodeSize={({ size }) => size || 10}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legend: "X Value",
            legendPosition: "middle",
            legendOffset: 36,
          }}
          axisLeft={{
            legend: "Y Value",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 130,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 12,
              itemsSpacing: 5,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
    </SerendieChartThemeProvider>
  );
};

// 複数チャートタイプの比較
export const MultipleChartComparison = () => {
  const primaryProps = useChartProps("primary");
  const multiProps = useChartProps("multi");

  return (
    <SerendieChartThemeProvider>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ height: 250 }}>
          <h3>Area Chart</h3>
          <ResponsiveArea
            data={areaData.slice(0, 2)}
            {...primaryProps.line}
            margin={compactChartMargin}
            enableArea={true}
            areaOpacity={0.5}
            enablePoints={false}
          />
        </div>

        <div style={{ height: 250 }}>
          <h3>Scatter Plot</h3>
          <ResponsiveScatterPlot
            data={scatterData.slice(0, 2)}
            colors={multiProps.bar.colors}
            margin={compactChartMargin}
            xScale={{ type: "linear", min: 0, max: "auto" }}
            yScale={{ type: "linear", min: 0, max: "auto" }}
            nodeSize={8}
            axisTop={null}
            axisRight={null}
          />
        </div>
      </div>
    </SerendieChartThemeProvider>
  );
};
