import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  HeaderGroup,
  Header,
  Row,
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
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
          <DataTable.Tr key={headerGroup.id}>
            <DataTable.HeaderCheckbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              value="select-all"
            />
            {headerGroup.headers.map((header: Header<TData, unknown>) => {
              const canSort = header.column.getCanSort();
              const sortDirection = header.column.getIsSorted();
              return (
                <DataTable.HeaderCell
                  key={header.id}
                  sortable={canSort}
                  sortDirection={sortDirection}
                  onSort={header.column.getToggleSortingHandler()}
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
        {table.getRowModel().rows.map((row: Row<TData>) => (
          <DataTable.Row key={row.id} row={row} />
        ))}
      </DataTable.Tbody>
    </DataTable.Root>
  );
}

export default DataTableGrid;
