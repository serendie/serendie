import { ComponentPropsWithoutRef } from "react";
import { type IconName, type IconVariant } from "./iconNames";

const outlinedIcons = import.meta.glob("./assets/outlined/*.svg", {
  eager: true,
  import: "default",
  query: "?react",
});

const filledIcons = import.meta.glob("./assets/filled/*.svg", {
  eager: true,
  import: "default",
  query: "?react",
});

interface IconProps extends ComponentPropsWithoutRef<"svg"> {
  name: IconName;
  size?: number;
  variant?: IconVariant;
}

export const Icon = ({
  name,
  variant = "outlined",
  size = 24,
  ...props
}: IconProps) => {
  const icons = variant === "outlined" ? outlinedIcons : filledIcons;
  const iconPath = `./assets/${variant}/${name}.svg`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = icons[iconPath] as any;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} width={size} height={size} />;
};
