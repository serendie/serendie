import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { DataTable } from ".";

export function DataTableGrid<TData>({
  data = [],
  columns = [],
}: {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
}) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { rowSelection, sorting },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    enableRowSelection: true,
    enableSorting: true,
  });
  return (
    <DataTable.Root>
      <DataTable.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <DataTable.Tr key={headerGroup.id}>
            <DataTable.HeaderCheckbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              value="select-all"
            />
            {headerGroup.headers.map((header) => {
              const isSortable = header.column.getCanSort();
              const sortDir = header.column.getIsSorted();
              return (
                <DataTable.HeaderCell
                  key={header.id}
                  isSortable={isSortable}
                  sortDir={sortDir}
                  onClick={
                    isSortable
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  style={{ cursor: isSortable ? "pointer" : undefined }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </DataTable.HeaderCell>
              );
            })}
          </DataTable.Tr>
        ))}
      </DataTable.Thead>
      <DataTable.Tbody>
        {table.getRowModel().rows.map((row) => (
          <DataTable.Row key={row.id} row={row} />
        ))}
      </DataTable.Tbody>
    </DataTable.Root>
  );
}

export default DataTableGrid;
