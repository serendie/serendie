import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./index";
import { figma } from "@figma/code-connect";

function FigmaExample() {
  return (
    <DataTable
      columns={[
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "age",
          header: "Age",
        },
        {
          accessorKey: "email",
          header: "Email",
        },
      ]}
      data={[
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
      ]}
    />
  );
}

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  parameters: {
    controls: { expanded: true },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8713&t=HSwwyCClYMW0jJWi-4",
      props: {},
      examples: [FigmaExample],
    },
  },
  args: {},
};

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8658&m=dev",
  {
    props: {},
    example: () => (
      <DataTable
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "age",
            header: "Age",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
        ]}
        data={[
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
        ]}
      />
    ),
  }
);

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8659&m=dev",
  {
    props: {},
    example: () => (
      <DataTable
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "age",
            header: "Age",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
        ]}
        data={[
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
        ]}
      />
    ),
  }
);

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8712&m=dev",
  {
    props: {},
    example: () => (
      <DataTable
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "age",
            header: "Age",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
        ]}
        data={[
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
        ]}
      />
    ),
  }
);

figma.connect(
  DataTable,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17879-8686&m=dev",
  {
    props: {},
    example: () => (
      <DataTable
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "age",
            header: "Age",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
        ]}
        data={[
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
        ]}
      />
    ),
  }
);

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
