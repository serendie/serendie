import React from "react";
import { SerendieSymbol } from "@serendie/symbols";
import { css, cva, cx } from "../../../../styled-system/css";

const tableHeaderCellStyle = cva({
  base: {
    borderBottom: "1px solid",
    borderColor: "sd.system.color.component.outline",
    fontFamily: "Roboto, sans-serif",
    color: "sd.system.color.component.onSurface",
    textAlign: "left",
    fontWeight: 400,
    fontSize: "14px",
    px: "sd.system.dimension.spacing.extraSmall",
    py: "sd.system.dimension.spacing.twoExtraSmall",
    height: "32px",
    background: "sd.system.color.component.inversePrimary",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  defaultVariants: {},
});

export const HeaderCell = React.forwardRef<
  HTMLTableCellElement,
  React.PropsWithChildren<{
    size?: "small" | "medium" | "large";
    state?: "enabled" | "hovered";
    sortable?: boolean;
    sortDirection?: "asc" | "desc" | false;
    onSort?: () => void;
    className?: string;
  }> &
    React.ComponentProps<"th">
>(
  (
    {
      children,
      size = "medium",
      state = "enabled",
      sortable = false,
      sortDirection,
      onSort,
      className,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (sortable && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onSort?.();
      }
    };

    return (
      <th
        ref={ref}
        role="columnheader"
        aria-sort={
          sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : sortable
                ? "none"
                : undefined
        }
        tabIndex={sortable ? 0 : undefined}
        onClick={sortable ? onSort : undefined}
        onKeyDown={handleKeyDown}
        className={cx(tableHeaderCellStyle({ size, state }), className)}
        style={{
          cursor: sortable ? "pointer" : "default",
          userSelect: "none",
        }}
        {...props}
      >
        <span
          className={css({
            display: "inline-flex",
            alignItems: "center",
            verticalAlign: "middle",
          })}
        >
          {children}
          {sortable &&
            (sortDirection === "asc" ? (
              <SerendieSymbol
                name="chevron-double-up"
                style={{ marginLeft: 4 }}
              />
            ) : sortDirection === "desc" ? (
              <SerendieSymbol
                name="chevron-double-down"
                style={{ marginLeft: 4 }}
              />
            ) : (
              <SerendieSymbol
                name="chevron-up-down"
                style={{ marginLeft: 4 }}
              />
            ))}
        </span>
      </th>
    );
  }
);
