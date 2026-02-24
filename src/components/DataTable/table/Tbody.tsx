import React from "react";

export const Tbody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<"tbody">
>(({ children, ...props }, ref) => {
  return (
    <tbody ref={ref} {...props}>
      {children}
    </tbody>
  );
});
