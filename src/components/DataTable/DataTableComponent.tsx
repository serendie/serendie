/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  HeaderGroup,
  Row,
} from "@tanstack/react-table";
import { DataTable } from ".";

export interface DataTableComponentProps<
  TData = Record<string, any>,
  TValue = any,
> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  initialSorting?: SortingState;
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
  onSortingChange?: (sorting: SortingState) => void;
  className?: string;
}

export function DataTableComponent<TData = Record<string, any>, TValue = any>({
  data = [],
  columns = [],
  enableRowSelection = true,
  enableSorting = true,
  initialSorting = [],
  onSortingChange,
  className,
}: DataTableComponentProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [sorting, setSorting] = useState<SortingState>(initialSorting);

  const handleSortingChange = (
    updater: SortingState | ((prev: SortingState) => SortingState)
  ) => {
    const newSorting =
      typeof updater === "function" ? updater(sorting) : updater;
    setSorting(newSorting);
    onSortingChange?.(newSorting);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { rowSelection, sorting },
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSortingChange,
    enableRowSelection,
    enableSorting,
  });
  return (
    <DataTable.Root className={className}>
      <DataTable.Thead>
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
          <DataTable.HeaderRow
            key={headerGroup.id}
            headerGroup={headerGroup}
            enableRowSelection={enableRowSelection}
            table={table}
          />
        ))}
      </DataTable.Thead>
      <DataTable.Tbody>
        {table.getRowModel().rows.map((row: Row<TData>) => (
          <DataTable.Row
            key={row.id}
            row={row}
            enableRowSelection={enableRowSelection}
          />
        ))}
      </DataTable.Tbody>
    </DataTable.Root>
  );
}

export default DataTableComponent;
