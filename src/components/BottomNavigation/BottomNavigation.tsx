import { ComponentProps } from "react";
import { css, cx } from "../../../styled-system/css";

export const BottomNavigation = ({
  children,
  className,
  ...props
}: ComponentProps<"nav">) => {
  return (
    <nav
      className={cx(
        css({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: 64,
          paddingX: "sd.system.dimension.spacing.medium",
          borderTop: "1px solid",
          borderTopColor: "sd.system.color.component.outline",
        }),
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
};
