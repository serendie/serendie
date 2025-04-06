import { ComponentProps } from "react";

export const List = ({ children, ...props }: ComponentProps<"ul">) => {
  return <ul {...props}>{children}</ul>;
};
