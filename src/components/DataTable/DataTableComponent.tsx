import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { DataTable } from ".";

/**
 * TanStack Tableは設計上、各カラムが異なる値の型を持つことを前提としています。
 * createColumnHelperは各カラムに正確な型（string, number等）を付与しますが、
 * これらを単一の配列にまとめる際、TypeScriptの型システムの制約により問題が生じます。
 *
 * TanStack Table自体も内部実装で`ColumnDef<TData, any>[]`を使用しており、
 * これは意図的な設計判断です。これに従い、型エイリアスで意図を明確にします。
 * https://github.com/TanStack/table/blob/0cc6992c7836489661a0954a2b56e620850ad4da/packages/table-core/src/types.ts#L288C1-L289C1
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableColumnDef<TData> = ColumnDef<TData, any>;

export interface DataTableComponentProps<TData = Record<string, unknown>> {
  data: TData[];
  columns: TableColumnDef<TData>[];
  enableRowSelection?: boolean;
  enableSorting?: boolean;
  initialSorting?: SortingState;
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
  onSortingChange?: (sorting: SortingState) => void;
  className?: string;
}

export function DataTableComponent<TData = Record<string, unknown>>({
  data = [],
  columns = [],
  enableRowSelection = true,
  enableSorting = true,
  initialSorting = [],
  onSortingChange,
  className,
}: DataTableComponentProps<TData>) {
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
        {table.getHeaderGroups().map((headerGroup) => (
          <DataTable.HeaderRow
            key={headerGroup.id}
            headerGroup={headerGroup}
            enableRowSelection={enableRowSelection}
            table={table}
          />
        ))}
      </DataTable.Thead>
      <DataTable.Tbody>
        {table.getRowModel().rows.map((row) => (
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
