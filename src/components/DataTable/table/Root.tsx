import { ReactNode } from "react";
import { sva } from "../../../../styled-system/css";
import { cx } from "../../../../styled-system/css";

const tableRootStyles = sva({
  slots: ["container", "table"],
  base: {
    container: {
      border: "1px solid",
      borderColor: "sd.system.color.component.outline",
      borderRadius: "4px",
      overflow: "hidden",
      boxShadow: "sm",
      background: "sd.system.color.component.surface",
      overflowX: "auto",
    },
    table: {
      w: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
  },
});

export function Root({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const classes = tableRootStyles();

  return (
    <div className={cx(classes.container, className)}>
      <table role="table" className={classes.table}>
        {children}
      </table>
    </div>
  );
}
