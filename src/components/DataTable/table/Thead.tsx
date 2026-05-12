import React from "react";

export const Thead = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<"thead">
>(({ children, ...props }, ref) => {
  return (
    <thead ref={ref} {...props}>
      {children}
    </thead>
  );
});
