import React from "react";
import { HeaderGroup, Header, flexRender } from "@tanstack/react-table";
import { DataTable } from "..";
import { css } from "../../../../styled-system/css";

export interface HeaderRowProps<TData> {
  headerGroup?: HeaderGroup<TData>;
  enableRowSelection?: boolean;
  table?: {
    getIsAllRowsSelected: () => boolean;
    getIsSomeRowsSelected: () => boolean;
    getToggleAllRowsSelectedHandler: () => (event: unknown) => void;
  };
  children?: React.ReactNode;
  ref?: React.Ref<HTMLTableRowElement>;
  className?: string;
}

export function HeaderRow<TData>({
  headerGroup,
  enableRowSelection,
  table,
  children,
  ref,
  className,
}: HeaderRowProps<TData>) {
  if (children) {
    return (
      <DataTable.Tr ref={ref} className={className}>
        {children}
      </DataTable.Tr>
    );
  }

  if (!headerGroup || !table) return null;

  return (
    <DataTable.Tr ref={ref} className={className} key={headerGroup.id}>
      {enableRowSelection && (
        <DataTable.HeaderCheckbox
          checked={
            table.getIsSomeRowsSelected()
              ? "indeterminate"
              : table.getIsAllRowsSelected()
                ? true
                : false
          }
          onChange={table.getToggleAllRowsSelectedHandler()}
          value="select-all"
          className={css({
            verticalAlign: "middle",
          })}
        />
      )}
      {headerGroup.headers.map((header: Header<TData, unknown>) => {
        const canSort = header.column.getCanSort();
        const sortDirection = header.column.getIsSorted();
        return (
          <DataTable.HeaderCell
            key={header.id}
            sortable={canSort}
            sortDirection={sortDirection}
            onSort={() => header.column.toggleSorting()}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </DataTable.HeaderCell>
        );
      })}
    </DataTable.Tr>
  );
}
