import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { useBarChartProps, useLineChartProps, usePieChartProps } from "./index";
import { barData, lineData, stackedData, pieData } from "./chartData";
import { ResponsivePie } from "@nivo/pie";
import { figma } from "@figma/code-connect";

export default {
  title: "components/Charts",
};

export const PieChart = () => {
  const pieProps = usePieChartProps("primary");
  return (
    <div style={{ height: 400, width: 400 }}>
      <ResponsivePie data={pieData} {...pieProps} />
    </div>
  );
};
figma.connect(
  PieChart,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=17792-14082",
  {
    example: PieChart,
  }
);

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

figma.connect(
  LineChart,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=18036-8379",
  {
    example: LineChart,
  }
);

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

figma.connect(
  HorizontalBarChart,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=17799-17341",
  {
    example: HorizontalBarChart,
  }
);

export const VerticalBarChart = () => {
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

figma.connect(
  VerticalBarChart,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=17792-14261",
  {
    example: VerticalBarChart,
  }
);

/*
NOTE: exampleに渡すコンポーネントの中でテンプレートリテラルを使うとエラーになることがあるので文字列連結しています
*/

export const PiledBarChart = () => {
  const barProps = useBarChartProps("primary");
  const labelFormat = (datum: string | number) =>
    Number(datum) > 0 ? "20%" : "";

  return (
    <div style={{ height: 400, width: 700 }}>
      <ResponsiveBar
        data={stackedData}
        keys={["segment1", "segment2", "segment3", "segment4", "segment5"]}
        indexBy="category"
        margin={{ top: 20, right: 80, bottom: 60, left: 60 }}
        labelFormat={labelFormat}
        axisRight={{
          format: (value: number) => value + "%",
        }}
        {...barProps}
      />
    </div>
  );
};

figma.connect(
  PiledBarChart,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=18036-7361",
  {
    example: PiledBarChart,
  }
);
