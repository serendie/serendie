import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  TableOptions,
} from "@tanstack/react-table";
import { DataTable } from ".";

export interface DataTableComponentProps<TData = Record<string, unknown>>
  extends Omit<TableOptions<TData>, "getCoreRowModel" | "getSortedRowModel"> {
  className?: string;
}

export function DataTableComponent<TData = Record<string, unknown>>({
  className,
  ...tableOptions
}: DataTableComponentProps<TData>) {
  const options = {
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    ...tableOptions,
  };
  const table = useReactTable(options);
  return (
    <DataTable.Root className={className}>
      <DataTable.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <DataTable.HeaderRow
            key={headerGroup.id}
            headerGroup={headerGroup}
            enableRowSelection={options.enableRowSelection === true}
            table={table}
          />
        ))}
      </DataTable.Thead>
      <DataTable.Tbody>
        {table.getRowModel().rows.map((row) => (
          <DataTable.Row
            key={row.id}
            row={row}
            enableRowSelection={options.enableRowSelection === true}
          />
        ))}
      </DataTable.Tbody>
    </DataTable.Root>
  );
}

export default DataTableComponent;
