import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  TableOptions,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from ".";

export interface DataTableComponentProps<TData = Record<string, unknown>>
  extends Omit<TableOptions<TData>, "getCoreRowModel" | "getSortedRowModel"> {
  className?: string;
}

export function DataTableComponent<TData = Record<string, unknown>>({
  className,
  enableRowSelection = true,
  onRowSelectionChange,
  onSortingChange,
  state,
  ...tableOptions
}: DataTableComponentProps<TData>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection,
    ...tableOptions,
    state: {
      rowSelection: state?.rowSelection ?? rowSelection,
      sorting: state?.sorting ?? sorting,
      ...state,
    },
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      onRowSelectionChange?.(updater);
    },
    onSortingChange: (updater) => {
      setSorting(updater);
      onSortingChange?.(updater);
    },
  });

  const rowSelectionEnabled = enableRowSelection !== false;

  return (
    <DataTable.Root className={className}>
      <DataTable.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <DataTable.HeaderRow
            key={headerGroup.id}
            headerGroup={headerGroup}
            enableRowSelection={rowSelectionEnabled}
            table={table}
          />
        ))}
      </DataTable.Thead>
      <DataTable.Tbody>
        {table.getRowModel().rows.map((row) => (
          <DataTable.Row
            key={row.id}
            row={row}
            enableRowSelection={rowSelectionEnabled}
          />
        ))}
      </DataTable.Tbody>
    </DataTable.Root>
  );
}

export default DataTableComponent;
