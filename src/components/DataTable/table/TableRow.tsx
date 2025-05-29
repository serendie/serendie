import { useState } from "react";
import { TableCell } from "./TableCell";
import { Row, flexRender, ColumnDef } from "@tanstack/react-table";
import { TableTr } from "./TableTr";
import { TableCheckboxCell } from "./TableCheckboxCell";

export function TableRow<TData>({ row }: { row: Row<TData> }) {
  const [hovered, setHovered] = useState(false);
  const isSelected = row.getIsSelected();
  return (
    <TableTr
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
          <TableCell key={cell.id} type={type} state={cellState}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableTr>
  );
}
