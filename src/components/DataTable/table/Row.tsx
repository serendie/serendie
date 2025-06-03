import { useState } from "react";
import {
  Row as TanstackRow,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { TableCheckboxCell } from "./CheckboxCell";
import { DataTable } from "..";

export function Row<TData>({ row }: { row: TanstackRow<TData> }) {
  const [hovered, setHovered] = useState(false);
  const isSelected = row.getIsSelected();
  return (
    <DataTable.Tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TableCheckboxCell
        checked={isSelected}
        onChange={() => row.toggleSelected()}
        value={row.id}
        state={isSelected ? "selected" : hovered ? "hovered" : "enabled"}
      />
      {row.getVisibleCells().map((cell) => {
        let type: "default" | "success" | "notice" | "error" = "default";
        const columnDef = cell.column.columnDef as ColumnDef<TData>;
        if (
          columnDef.meta &&
          typeof columnDef.meta === "object" &&
          "getType" in columnDef.meta
        ) {
          const getTypeFn = columnDef.meta.getType as (
            row: TData
          ) => typeof type;
          type = getTypeFn(row.original);
        }
        let cellState: "enabled" | "hovered" | "selected" = "enabled";
        if (isSelected) cellState = "selected";
        else if (hovered) cellState = "hovered";
        return (
          <DataTable.BodyCell key={cell.id} type={type} state={cellState}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </DataTable.BodyCell>
        );
      })}
    </DataTable.Tr>
  );
}
