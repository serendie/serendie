import React from "react";
import { css, cx } from "../../../../styled-system/css";

export const Tr = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentProps<"tr">
>(({ children, className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      role="row"
      className={cx(
        css({
          position: "relative",
        }),
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
});
