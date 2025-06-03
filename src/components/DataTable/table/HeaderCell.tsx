import { SerendieSymbol } from "@serendie/symbols";
import { cva } from "../../../../styled-system/css";

const tableHeaderCellStyle = cva({
  base: {
    borderBottom: "1px solid",
    borderColor: "sd.system.color.component.outline",
    fontFamily: "Roboto, sans-serif",
    color: "sd.system.color.component.onSurface", // #000000
    textAlign: "left",
    fontWeight: 400,
    fontSize: "14px",
    px: "sd.system.dimension.spacing.extraSmall",
    py: "sd.system.dimension.spacing.twoExtraSmall",
    height: "32px",
    background: "sd.system.color.component.inversePrimary",
  },
  defaultVariants: {},
});

export const HeaderCell = ({
  children,
  size = "medium",
  state = "enabled",
  sortable = false,
  sortDirection,
  onSort,
  ...props
}: React.PropsWithChildren<{
  size?: "small" | "medium" | "large";
  state?: "enabled" | "hovered";
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | false;
  onSort?: () => void;
}> &
  React.ComponentProps<"th">) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (sortable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onSort?.();
    }
  };

  return (
    <th
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
      className={tableHeaderCellStyle({ size, state })}
      style={{
        cursor: sortable ? "pointer" : "default",
        userSelect: "none",
      }}
      {...props}
    >
      <span style={{ display: "inline-flex", alignItems: "center" }}>
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
            <SerendieSymbol name="chevron-up-down" style={{ marginLeft: 4 }} />
          ))}
      </span>
    </th>
  );
};
