import { css, cx } from "../../../../styled-system/css";

export function Tr({
  children,
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr
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
}
