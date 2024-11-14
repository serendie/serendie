import { ComponentPropsWithoutRef } from "react";
import { type SymbolName, type SymbolVariant } from "./generated/symbolNames";

const outlinedSymbols = import.meta.glob("../assets/outlined/*.svg", {
  eager: true,
  import: "default",
  query: "?react",
});

const filledSymbols = import.meta.glob("../assets/filled/*.svg", {
  eager: true,
  import: "default",
  query: "?react",
});

interface SymbolProps extends ComponentPropsWithoutRef<"svg"> {
  name: SymbolName;
  size?: number;
  variant?: SymbolVariant;
}

export const Symbol = ({
  name,
  variant = "outlined",
  size = 24,
  ...props
}: SymbolProps) => {
  const symbols = variant === "outlined" ? outlinedSymbols : filledSymbols;
  const symbolPath = `../assets/${variant}/${name}.svg`;
  const SymbolComponent = symbols[symbolPath] as React.ComponentType<
    ComponentPropsWithoutRef<"svg">
  >;

  if (!SymbolComponent) {
    return null;
  }

  return <SymbolComponent {...props} width={size} height={size} />;
};
