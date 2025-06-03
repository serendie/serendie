import { useState, useCallback, useMemo } from "react";
import {
  Row as TanstackRow,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { TableCheckboxCell } from "./CheckboxCell";
import { DataTable } from "..";

export function Row<TData>({ row }: { row: TanstackRow<TData> }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);
  const handleToggleSelected = useCallback(() => row.toggleSelected(), [row]);

  const isSelected = row.getIsSelected();
  const cellState = useMemo(() => {
    if (isSelected) return "selected";
    if (hovered) return "hovered";
    return "enabled";
  }, [isSelected, hovered]);

  return (
    <DataTable.Tr
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TableCheckboxCell
        checked={isSelected}
        onChange={handleToggleSelected}
        value={row.id}
        state={cellState}
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
        return (
          <DataTable.BodyCell key={cell.id} type={type} state={cellState}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </DataTable.BodyCell>
        );
      })}
    </DataTable.Tr>
  );
}
