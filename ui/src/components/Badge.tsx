import { ComponentProps } from "react";
import { cva, cx } from "../../styled-system/css";
import { RecipeVariantProps } from "../../styled-system/types";

export const BadgeStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
    borderRadius: "sd.system.dimension.radius.extraLarge",
    bg: "sd.system.color.interaction.hoveredVariant",
  },
  variants: {
    size: {
      small: {
        height: "16px",
        pr: "sd.system.dimension.spacing.twoExtraSmall",
        pl: "sd.system.dimension.spacing.twoExtraSmall",
        textStyle: "sd.system.typography.label.small_compact",
        expanded: {
          textStyle: "sd.system.typography.label.small_expanded",
        },
      },
      medium: {
        height: "24px",
        pr: "sd.system.dimension.spacing.extraSmall",
        pl: "sd.system.dimension.spacing.extraSmall",
        textStyle: "sd.system.typography.label.medium_compact",
        expanded: {
          textStyle: "sd.system.typography.label.medium_expanded",
        },
      },
      large: {
        height: "32px",
        pr: "sd.system.dimension.spacing.medium",
        pl: "sd.system.dimension.spacing.medium",
        textStyle: "sd.system.typography.label.large_compact",
        expanded: {
          textStyle: "sd.system.typography.label.large_expanded",
        },
      },
    },
    styleColor: {
      gray: {
        bg: "sd.reference.color.scale.gray.600",
        color: "sd.system.color.component.inverseOnSurface",
      },
      blue: {
        bg: "sd.reference.color.scale.blue.600",
        color: "sd.system.color.component.inverseOnSurface",
      },
      green: {
        bg: "sd.reference.color.scale.green.600",
        color: "sd.system.color.component.inverseOnSurface",
      },
      yellow: {
        bg: "sd.reference.color.scale.yellow.600",
        color: "sd.system.color.component.inverseOnSurface",
      },
      orange: {
        bg: "sd.reference.color.scale.orange.600",
        color: "sd.system.color.component.inverseOnSurface",
      },
      red: {
        bg: "sd.reference.color.scale.red.600",
        color: "sd.system.color.component.inverseOnSurface",
      },
      "gray-subtle": {
        bg: "sd.reference.color.scale.gray.100",
        color: "sd.reference.color.scale.gray.800",
      },
      "blue-subtle": {
        bg: "sd.reference.color.scale.blue.100",
        color: "sd.reference.color.scale.blue.800",
      },
      "green-subtle": {
        bg: "sd.reference.color.scale.green.100",
        color: "sd.reference.color.scale.green.800",
      },
      "yellow-subtle": {
        bg: "sd.reference.color.scale.yellow.100",
        color: "sd.reference.color.scale.yellow.800",
      },
      "orange-subtle": {
        bg: "sd.reference.color.scale.orange.100",
        color: "sd.reference.color.scale.orange.800",
      },
      "red-subtle": {
        bg: "sd.reference.color.scale.red.100",
        color: "sd.reference.color.scale.red.800",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    styleColor: "gray",
  },
});

type BadgeProps = ComponentProps<"span"> &
  RecipeVariantProps<typeof BadgeStyle> & { chipIcon: React.ReactNode };

export const Badge: React.FC<BadgeProps> = ({
  children,
  chipIcon,
  ...props
}) => {
  const [variantProps, { className, ...restProps }] =
    BadgeStyle.splitVariantProps(props);
  const styles = BadgeStyle(variantProps);

  return (
    <span className={cx(styles, className)} {...restProps}>
      {children}
      {chipIcon}
    </span>
  );
};
