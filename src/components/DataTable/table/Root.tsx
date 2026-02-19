import React, { ReactNode } from "react";
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

export const Root = React.forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string } & Omit<
    React.ComponentProps<"div">,
    "children" | "className"
  >
>(({ children, className, ...props }, ref) => {
  const classes = tableRootStyles();

  return (
    <div ref={ref} className={cx(classes.container, className)} {...props}>
      <table role="table" className={classes.table}>
        {children}
      </table>
    </div>
  );
});
