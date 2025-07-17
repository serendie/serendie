import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import {
  useBarChartProps,
  useLineChartProps,
  compactChartMargin,
  legendChartMargin,
} from "./index";
import { token } from "../../../styled-system/tokens";
import { barData, multiSeriesData, lineData, stackedData } from "./chartData";

export default {
  title: "components/Charts",
};

// Bar Charts
export const BarChart = () => {
  const barProps = useBarChartProps("primary");

  return (
    <div style={{ height: 300, width: 500 }}>
      <ResponsiveBar
        data={barData}
        keys={["value"]}
        indexBy="month"
        {...barProps}
      />
    </div>
  );
};

export const GroupedBarChart = () => {
  const barProps = useBarChartProps("multi");

  return (
    <div style={{ height: 350, width: 600 }}>
      <ResponsiveBar
        data={multiSeriesData}
        keys={["sales", "profit", "cost"]}
        indexBy="month"
        groupMode="grouped"
        {...barProps}
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
  );
};

export const StackedBarChart = () => {
  const barProps = useBarChartProps("primary");

  return (
    <div style={{ height: 400, width: 700 }}>
      <ResponsiveBar
        data={stackedData}
        keys={["segment1", "segment2", "segment3", "segment4", "segment5"]}
        indexBy="category"
        {...barProps}
        margin={{ top: 20, right: 80, bottom: 60, left: 60 }}
        labelFormat={(datum) =>
          typeof datum === "number" && datum > 0 ? "20%" : ""
        }
        axisRight={{
          format: (value) => `${value}%`,
        }}
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
      />
    </div>
  );
};

export const HorizontalBarChart = () => {
  const barProps = useBarChartProps("notice");

  return (
    <div style={{ height: 400, width: 500 }}>
      <ResponsiveBar
        data={barData}
        keys={["value"]}
        indexBy="month"
        {...barProps}
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
  );
};

// Line Charts
export const LineChart = () => {
  const lineProps = useLineChartProps("multi");

  return (
    <div style={{ height: 300, width: 500 }}>
      <ResponsiveLine
        data={lineData}
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
      />
    </div>
  );
};

export const AreaChart = () => {
  const lineProps = useLineChartProps("positive");

  return (
    <div style={{ height: 300, width: 500 }}>
      <ResponsiveLine
        data={[lineData[0]]}
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
  );
};

// Color Categories
export const ColorCategories = () => {
  const primaryProps = useBarChartProps("primary");
  const positiveProps = useBarChartProps("positive");
  const negativeProps = useBarChartProps("negative");
  const noticeProps = useBarChartProps("notice");

  const testData = [
    { item: "Test 1", value: 80 },
    { item: "Test 2", value: 90 },
    { item: "Test 3", value: 70 },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ height: 250 }}>
        <h3>Primary</h3>
        <ResponsiveBar
          data={testData}
          keys={["value"]}
          indexBy="item"
          {...primaryProps}
          margin={compactChartMargin}
        />
      </div>

      <div style={{ height: 250 }}>
        <h3>Positive</h3>
        <ResponsiveBar
          data={testData}
          keys={["value"]}
          indexBy="item"
          {...positiveProps}
          margin={compactChartMargin}
        />
      </div>

      <div style={{ height: 250 }}>
        <h3>Negative</h3>
        <ResponsiveBar
          data={testData}
          keys={["value"]}
          indexBy="item"
          {...negativeProps}
          margin={compactChartMargin}
        />
      </div>

      <div style={{ height: 250 }}>
        <h3>Notice</h3>
        <ResponsiveBar
          data={testData}
          keys={["value"]}
          indexBy="item"
          {...noticeProps}
          margin={compactChartMargin}
        />
      </div>
    </div>
  );
};
