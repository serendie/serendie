import React from "react";
import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";
import { SvgIcon, SvgIconName } from "./SvgIcon";
import { RecipeVariantProps } from "../../styled-system/types";

const buttonStyle = cva({
  base: {
    borderRadius: "full",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    color: "dic.system.color.component.onSurface",
  },
  variants: {
    shape: {
      rectangle: {},
      circle: {},
    },
    type: {
      outline: {
        outline: "1px solid",
        outlineColor: "dic.system.color.component.outline",
        bgColor: "dic.system.color.component.surface",
        _hover: {
          bgColor: "dic.system.color.interaction.hoveredVariant",
        },
        _focusVisible: {
          outlineColor: "dic.system.color.component.outlineVariant",
          bgColor: "dic.system.color.interaction.hoveredVariant",
        },
        _disabled: {
          bg: "dic.system.color.interaction.disabled",
          color: "dic.system.color.component.onSurface",
          "&>span": {
            opacity: "dic.reference.elevation.opacity.scale.3",
          },
        },
      },
      ghost: {
        outline: "1px solid",
        outlineColor: "transparent",
        color: "dic.system.color.impression.primary",
        _hover: {
          bgColor: "dic.system.color.interaction.hoveredVariant",
        },
        _focusVisible: {
          bgColor: "dic.system.color.interaction.hoveredVariant",
          outlineColor: "dic.system.color.component.outlineVariant",
        },
        _disabled: {
          // TODO: Fix the color
          color: "dic.system.color.component.onSurface",
          "&>span": {
            opacity: "dic.reference.elevation.opacity.scale.3",
          },
        },
      },
    },
    size: {
      large: {},
      medium: {
        px: "dic.system.dimension.spacing.extraLarge",
        py: "dic.system.dimension.spacing.small",
        fontSize: "dic.reference.typography.scale.compact.medium",
        sm: {
          fontSize: "dic.reference.typography.scale.expanded.medium",
        },
      },
      small: {
        px: "dic.system.dimension.spacing.small",
        py: "dic.system.dimension.spacing.twoExtraSmall",
        fontSize: "dic.reference.typography.scale.compact.small",
        sm: {
          fontSize: "dic.reference.typography.scale.expanded.small",
        },
      },
    },
  },
  defaultVariants: {
    shape: "circle",
    type: "outline",
    size: "medium",
  },
});

type Variants = RecipeVariantProps<typeof buttonStyle>;

type ButtonProps = {
  icon: SvgIconName;
} & Variants &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, size, ...props }, ref) => {
    return (
      <styled.button ref={ref} className={buttonStyle()} {...props}>
        <SvgIcon size={size === "large" ? "40px" : "24px"} icon={icon} />
      </styled.button>
    );
  }
);

//export const IconButton = styled(ButtonWithRef, buttonStyle);
