import React from "react";
import { Row as TanstackRow, flexRender, Cell } from "@tanstack/react-table";
import { DataTable } from "..";
import { cva, cx } from "../../../../styled-system/css";
import { CellType } from "./BodyCell";

const rowStyle = cva({
  base: {
    _hover: {
      _after: {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        w: "100%",
        h: "100%",
        bg: "sd.system.color.interaction.hoveredVariant",
        zIndex: 1,
      },
    },
  },
  variants: {
    state: {
      selected: {
        base: {
          _after: {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            w: "100%",
            h: "100%",
            bg: "sd.system.color.component.inversePrimary",
            zIndex: 1,
            mixBlendMode: "multiply",
          },
          _hover: {
            _after: {
              content: "''",
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              w: "100%",
              h: "100%",
              bg: "color-mix(in srgb, token(colors.sd.system.color.component.inversePrimary) 95%, token(colors.sd.system.color.component.inverseSurface) 5%)",
              zIndex: 1,
              mixBlendMode: "multiply",
            },
          },
        },
      },
    },
  },
});

export function Row<TData>({
  row,
  enableRowSelection,
  children,
  selected,
  ref,
  className,
}: {
  row?: TanstackRow<TData>;
  enableRowSelection?: boolean;
  children?: React.ReactNode;
  selected?: boolean;
  ref?: React.Ref<HTMLTableRowElement>;
  className?: string;
}) {
  if (children) {
    return (
      <DataTable.Tr
        ref={ref}
        className={cx(
          rowStyle({ state: selected ? "selected" : undefined }),
          className
        )}
      >
        {children}
      </DataTable.Tr>
    );
  }

  if (!row) return null;

  return (
    <DataTable.Tr
      ref={ref}
      className={cx(
        rowStyle({
          state: row.getIsSelected() ? "selected" : undefined,
        }),
        className
      )}
    >
      {enableRowSelection && (
        <DataTable.BodyCheckbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          value={row.id}
        />
      )}
      {row.getVisibleCells().map((cell) => {
        const type = getCellType(cell);
        return (
          <DataTable.BodyCell key={cell.id} type={type}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </DataTable.BodyCell>
        );
      })}
    </DataTable.Tr>
  );
}

function getCellType<TData>(cell: Cell<TData, unknown>): CellType | string {
  if (
    cell.column.columnDef.meta &&
    "getType" in cell.column.columnDef.meta &&
    typeof cell.column.columnDef.meta.getType === "function"
  ) {
    return cell.column.columnDef.meta.getType(cell.row.original);
  }
  return "default";
}
