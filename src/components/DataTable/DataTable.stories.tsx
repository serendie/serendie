import type { Meta, StoryObj } from "@storybook/react-vite";
import { figma } from "@figma/code-connect";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper as tanstackCreateColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { css } from "../../../styled-system/css";
import { DataTable } from ".";
import { createDataTableRows, type DataRow } from "./DataTable.sampleData";

export const FigmaExample = () => {
  type DataRowType = {
    name: string;
    age: number;
    email: string;
  };

  const columnHelper = DataTable.createColumnHelper<DataRowType>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("age", {
      header: "Age",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
  ];

  const data: DataRowType[] = [
    {
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    },
    {
      name: "Jane Smith",
      age: 25,
      email: "jane.smith@example.com",
    },
    {
      name: "Alice Johnson",
      age: 28,
      email: "alice.johnson@example.com",
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8713&m=dev",
  {
    props: {},
    example: FigmaExample,
  }
);

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8658&m=dev",
  {
    props: {},
    example: FigmaExample,
  }
);

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8659&m=dev",
  {
    props: {},
    example: FigmaExample,
  }
);

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8712&m=dev",
  {
    props: {},
    example: FigmaExample,
  }
);

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8686&m=dev",
  {
    props: {},
    example: FigmaExample,
  }
);

export default meta;

type Story = StoryObj<typeof DataTable>;

const Data: DataRow[] = createDataTableRows();

const columnHelper = DataTable.createColumnHelper<DataRow>();

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
  render: () => <DataTable<DataRow> data={Data} columns={columns} />,
};

// Table without row selection
export const WithoutRowSelection: Story = {
  render: () => (
    <DataTable<DataRow>
      data={Data}
      columns={columns}
      enableRowSelection={false}
    />
  ),
};

// Table with custom sorting
export const WithCustomSorting: Story = {
  render: () => (
    <DataTable<DataRow>
      data={Data}
      columns={columns}
      initialState={{
        sorting: [{ id: "area", desc: false }],
      }}
      onSortingChange={(sorting) => console.log("Sorting changed:", sorting)}
    />
  ),
};

// Table with callbacks
export const WithCallbacks: Story = {
  render: () => (
    <DataTable<DataRow>
      data={Data}
      columns={columns}
      onRowSelectionChange={(selection) =>
        console.log("Row selection changed:", selection)
      }
      onSortingChange={(sorting) => console.log("Sorting changed:", sorting)}
    />
  ),
};

// Simple table story
export const SimpleTable: Story = {
  render: () => (
    <DataTable.Root>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.HeaderCell>エリア</DataTable.HeaderCell>
          <DataTable.HeaderCell>時間</DataTable.HeaderCell>
          <DataTable.HeaderCell>ステータス</DataTable.HeaderCell>
          <DataTable.HeaderCell>接続数</DataTable.HeaderCell>
          <DataTable.HeaderCell>世帯数</DataTable.HeaderCell>
          <DataTable.HeaderCell>カバー率</DataTable.HeaderCell>
          <DataTable.HeaderCell>エラー率</DataTable.HeaderCell>
          <DataTable.HeaderCell>プロセス状況</DataTable.HeaderCell>
          <DataTable.HeaderCell>ID</DataTable.HeaderCell>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        {Data.map((row) => (
          <DataTable.Tr key={row.id}>
            <DataTable.BodyCell>{row.area}</DataTable.BodyCell>
            <DataTable.BodyCell>{row.time}</DataTable.BodyCell>
            <DataTable.BodyCell>{row.status}</DataTable.BodyCell>
            <DataTable.BodyCell>{row.connections}</DataTable.BodyCell>
            <DataTable.BodyCell>{row.households}</DataTable.BodyCell>
            <DataTable.BodyCell>{row.coverage}</DataTable.BodyCell>
            <DataTable.BodyCell>{row.errorRate}</DataTable.BodyCell>
            <DataTable.BodyCell>{row.process}</DataTable.BodyCell>
            <DataTable.BodyCell>{row.id}</DataTable.BodyCell>
          </DataTable.Tr>
        ))}
      </DataTable.Tbody>
    </DataTable.Root>
  ),
};

// 新しい型定義の例
type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
};

const userData: User[] = [
  { id: 1, name: "田中太郎", email: "tanaka@example.com", role: "admin" },
  { id: 2, name: "佐藤花子", email: "sato@example.com", role: "user" },
  { id: 3, name: "山田次郎", email: "yamada@example.com", role: "guest" },
];

const userColumnHelper = DataTable.createColumnHelper<User>();
const userColumns = [
  userColumnHelper.accessor("id", {
    header: "ID",
    enableSorting: true,
  }),
  userColumnHelper.accessor("name", {
    header: "名前",
    enableSorting: true,
  }),
  userColumnHelper.accessor("email", {
    header: "メールアドレス",
    enableSorting: true,
  }),
  userColumnHelper.accessor("role", {
    header: "役割",
    enableSorting: true,
    meta: {
      getType: (row: User) => {
        if (row.role === "admin") return "success";
        if (row.role === "guest") return "notice";
        return "default";
      },
    },
  }),
];

// 異なるデータ型での使用例
export const DifferentDataType: Story = {
  render: () => (
    <DataTable<User>
      data={userData}
      columns={userColumns}
      enableRowSelection={true}
      enableSorting={true}
    />
  ),
};

// カラムサイズ指定の例（DataTableComponent経由）
const sizedColumnHelper = DataTable.createColumnHelper<DataRow>();
const sizedColumns = [
  sizedColumnHelper.accessor("area", {
    header: "エリア",
    size: 200,
  }),
  sizedColumnHelper.accessor("time", {
    header: "時間",
    size: 100,
  }),
  sizedColumnHelper.accessor("status", {
    header: "ステータス",
    size: 120,
  }),
  sizedColumnHelper.accessor("connections", {
    header: "接続数",
    size: 80,
  }),
  sizedColumnHelper.accessor("process", {
    header: "プロセス状況",
    size: 250,
  }),
];

export const WithColumnSize: Story = {
  render: () => (
    <DataTable<DataRow>
      data={Data}
      columns={sizedColumns}
      enableRowSelection={false}
    />
  ),
};

// カラムリサイズの例（children パターンで実現）
const resizeColumnHelper = tanstackCreateColumnHelper<DataRow>();
const resizeColumns = [
  resizeColumnHelper.accessor("area", { header: "エリア", size: 100 }),
  resizeColumnHelper.accessor("status", { header: "ステータス", size: 100 }),
  resizeColumnHelper.accessor("connections", { header: "接続数", size: 100 }),
  resizeColumnHelper.accessor("coverage", { header: "カバー率", size: 100 }),
  resizeColumnHelper.accessor("process", { header: "プロセス状況", size: 120 }),
];

export const WithColumnResize: Story = {
  render: () => {
    const table = useReactTable({
      data: Data,
      columns: resizeColumns,
      getCoreRowModel: getCoreRowModel(),
      columnResizeMode: "onChange",
    });

    return (
      <DataTable.Root style={{ width: table.getTotalSize() }}>
        <DataTable.Thead>
          <DataTable.HeaderRow>
            {table.getFlatHeaders().map((header) => (
              <DataTable.HeaderCell
                key={header.id}
                style={{ width: header.getSize(), position: "relative" }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={css({
                    position: "absolute",
                    right: 0,
                    top: "10%",
                    height: "80%",
                    width: "3px",
                    cursor: "col-resize",
                    userSelect: "none",
                    touchAction: "none",
                    borderRightWidth: "1px",
                    borderRightStyle: "solid",
                    borderRightColor: "sd.system.color.component.outline",
                  })}
                />
              </DataTable.HeaderCell>
            ))}
          </DataTable.HeaderRow>
        </DataTable.Thead>
        <DataTable.Tbody>
          {table.getRowModel().rows.map((row) => (
            <DataTable.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <DataTable.BodyCell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </DataTable.BodyCell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable.Tbody>
      </DataTable.Root>
    );
  },
};
