import type {
  Table,
  TableOptions,
  TableState,
  InitialTableState,
} from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useState } from "react";
import { DataTable } from ".";

interface DataTableComponentProps<TData = Record<string, unknown>>
  extends Omit<TableOptions<TData>, "getCoreRowModel" | "getSortedRowModel"> {
  className?: string;
}

interface DataTableComponentRef<TData = Record<string, unknown>> {
  table: Table<TData>;
  getCurrentState: () => TableState;
  updateState: (partialState: Partial<TableState>) => void;
}

function mergeInitialState(
  defaultState: InitialTableState,
  userState: InitialTableState
): InitialTableState {
  return {
    ...defaultState,
    ...userState,
    pagination: {
      ...defaultState.pagination,
      ...userState.pagination,
    },
  };
}

function useControlledTableState<TData>(
  initialState: InitialTableState,
  options: Partial<TableOptions<TData>>
) {
  const [rowSelection, setRowSelection] = useState(
    initialState.rowSelection || {}
  );
  const [sorting, setSorting] = useState(initialState.sorting || []);

  const isRowSelectionControlled = !!options.onRowSelectionChange;
  const isSortingControlled = !!options.onSortingChange;

  const controlledState = {
    rowSelection,
    sorting,
    ...options.state,
  };

  const controlledHandlers = {
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  };

  return {
    state: isRowSelectionControlled ? options.state : controlledState,
    handlers: isRowSelectionControlled ? {} : controlledHandlers,
    setters: { setRowSelection, setSorting },
    isControlled: {
      rowSelection: isRowSelectionControlled,
      sorting: isSortingControlled,
    },
  };
}

export const DataTableComponent = forwardRef(function DataTableComponent<
  TData = Record<string, unknown>,
>(
  { className, ...tableOptions }: DataTableComponentProps<TData>,
  ref: React.Ref<DataTableComponentRef<TData>>
) {
  const initialState = tableOptions.initialState
    ? mergeInitialState({}, tableOptions.initialState)
    : {};

  const { state, handlers, setters, isControlled } = useControlledTableState(
    initialState,
    tableOptions
  );

  const options = {
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    ...tableOptions,
    initialState,
    state,
    ...handlers,
  };

  const table = useReactTable(options);

  useImperativeHandle(ref, () => ({
    table,
    getCurrentState: () => table.getState(),
    updateState: (partialState: Partial<TableState>) => {
      if (
        partialState.rowSelection !== undefined &&
        !isControlled.rowSelection
      ) {
        setters.setRowSelection(partialState.rowSelection);
      }
      if (partialState.sorting !== undefined && !isControlled.sorting) {
        setters.setSorting(partialState.sorting);
      }
    },
  }));

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
});

export default DataTableComponent;
