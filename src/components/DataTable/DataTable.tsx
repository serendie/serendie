import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { Table } from "./table/Table";
import { TableHeaderCell } from "./table/TableHeaderCell";
import { TableRow } from "./table/TableRow";
import { TableTbody } from "./table/TableTbody";
import { TableThead } from "./table/TableThead";
import { TableTr } from "./table/TableTr";

export function DataTable<TData>({
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
    <Table>
      <TableThead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableTr key={headerGroup.id}>
            <TableHeaderCell />
            {headerGroup.headers.map((header) => {
              const isSortable = header.column.getCanSort();
              const sortDir = header.column.getIsSorted();
              return (
                <TableHeaderCell
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
                </TableHeaderCell>
              );
            })}
          </TableTr>
        ))}
      </TableThead>
      <TableTbody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} row={row} />
        ))}
      </TableTbody>
    </Table>
  );
}
