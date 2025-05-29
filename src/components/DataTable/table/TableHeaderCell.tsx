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

export const TableHeaderCell = ({
  children,
  size = "medium",
  state = "enabled",
  isSortable = false,
  sortDir,
  ...props
}: React.PropsWithChildren<{
  size?: "small" | "medium" | "large";
  state?: "enabled" | "hovered";
  isSortable?: boolean;
  sortDir?: "asc" | "desc" | false;
}> &
  React.ComponentProps<"th">) => (
  <th className={tableHeaderCellStyle({ size, state })} {...props}>
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {children}
      {isSortable &&
        (sortDir === "asc" ? (
          <SerendieSymbol name="chevron-double-up" style={{ marginLeft: 4 }} />
        ) : sortDir === "desc" ? (
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
