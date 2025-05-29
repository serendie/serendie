import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
// Simple table components import
import { Table } from "./table/Table";
import { TableHeaderCell } from "./table/TableHeaderCell";
import { TableCell } from "./table/TableCell";
import { TableTbody } from "./table/TableTbody";
import { TableThead } from "./table/TableThead";
import { TableTr } from "./table/TableTr";

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export type DataRow = {
  id: number;
  area: string;
  time: string;
  status: string;
  connections: number;
  households: number;
  coverage: string;
  errorRate: string;
  process: string;
};

const areaList = [
  "東京",
  "大阪",
  "名古屋",
  "札幌",
  "福岡",
  "仙台",
  "広島",
  "神戸",
  "京都",
  "横浜",
];
const statusList = ["正常", "警告", "障害", "調査中"];
const processList = ["完了", "進行中", "未着手", "一時停止"];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

const Data: DataRow[] = Array.from({ length: 10 }, (_, i) => {
  const area = randomPick(areaList);
  const status = randomPick(statusList);
  const process = randomPick(processList);
  const connections = randomInt(50, 5000);
  const households = randomInt(30, 4000);
  const coverage = `${randomInt(60, 100)}%`;
  const errorRate = `${(Math.random() * 5).toFixed(2)}%`;
  const hour = randomInt(0, 23).toString().padStart(2, "0");
  const minute = randomInt(0, 59).toString().padStart(2, "0");
  const time = `2025-04-${randomInt(1, 30)
    .toString()
    .padStart(2, "0")} ${hour}:${minute}`;
  return {
    id: i + 1,
    area,
    time,
    status,
    connections,
    households,
    coverage,
    errorRate,
    process,
  };
});

const columnHelper = createColumnHelper<DataRow>();

const columns = [
  columnHelper.accessor("area", {
    header: "エリア",
    enableSorting: true,
  }),
  columnHelper.accessor("time", {
    header: "時間",
    enableSorting: true,
  }),
  columnHelper.accessor("status", {
    header: "ステータス",
    enableSorting: true,
    meta: {
      getType: (row: DataRow) => {
        if (row.status === "正常") return "success";
        if (row.status === "警告") return "notice";
        if (row.status === "障害") return "error";
        return "default";
      },
    },
  }),
  columnHelper.accessor("connections", {
    header: "接続数",
    enableSorting: true,
  }),
  columnHelper.accessor("households", {
    header: "世帯数",
    enableSorting: true,
  }),
  columnHelper.accessor("coverage", {
    header: "カバー率",
    enableSorting: true,
    meta: {
      getType: (row: DataRow) => {
        const value = parseFloat(row.coverage);
        if (value >= 95) return "success";
        if (value < 80) return "error";
        return "notice";
      },
    },
  }),
  columnHelper.accessor("errorRate", {
    header: "エラー率",
    enableSorting: true,
    meta: {
      getType: (row: DataRow) => {
        const value = parseFloat(row.errorRate);
        if (value >= 4) return "error";
        if (value >= 2) return "notice";
        return "success";
      },
    },
  }),
  columnHelper.accessor("process", {
    header: "プロセス状況",
    enableSorting: true,
  }),
  columnHelper.accessor("id", {
    header: "ID",
    enableSorting: true,
  }),
];

// Basic table with sample data
export const Default: Story = {
  render: () => (
    <DataTable data={Data} columns={columns as ColumnDef<DataRow, unknown>[]} />
  ),
};

// Simple table story
export const SimpleTable: Story = {
  render: () => (
    <Table>
      <TableThead>
        <TableTr>
          <TableHeaderCell>エリア</TableHeaderCell>
          <TableHeaderCell>時間</TableHeaderCell>
          <TableHeaderCell>ステータス</TableHeaderCell>
          <TableHeaderCell>接続数</TableHeaderCell>
          <TableHeaderCell>世帯数</TableHeaderCell>
          <TableHeaderCell>カバー率</TableHeaderCell>
          <TableHeaderCell>エラー率</TableHeaderCell>
          <TableHeaderCell>プロセス状況</TableHeaderCell>
          <TableHeaderCell>ID</TableHeaderCell>
        </TableTr>
      </TableThead>
      <TableTbody>
        {Data.map((row) => (
          <TableTr key={row.id}>
            <TableCell>{row.area}</TableCell>
            <TableCell>{row.time}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.connections}</TableCell>
            <TableCell>{row.households}</TableCell>
            <TableCell>{row.coverage}</TableCell>
            <TableCell>{row.errorRate}</TableCell>
            <TableCell>{row.process}</TableCell>
            <TableCell>{row.id}</TableCell>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  ),
};
