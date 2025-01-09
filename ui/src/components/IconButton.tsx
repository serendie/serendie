import React, { ComponentProps } from "react";
import { cva, cx } from "../../styled-system/css";
import { RecipeVariantProps } from "../../styled-system/types";

export const IconButtonStyle = cva({
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    color: "sd.system.color.component.onSurface",
    outlineWidth: "sd.system.dimension.border.medium",
    outlineStyle: "solid",
    cursor: "pointer",
    "& svg": {
      width: "sd.reference.dimension.scale.8",
      height: "sd.reference.dimension.scale.8",
    },
    _disabled: {
      color: "sd.system.color.interaction.disabledOnSurface",
      cursor: "not-allowed",
      outlineColor: "transparent",
      bg: "sd.system.color.interaction.disabled",
    },
  },
  variants: {
    shape: {
      rectangle: {
        borderRadius: "sd.system.dimension.radius.medium",
      },
      circle: {
        borderRadius: "sd.system.dimension.radius.full",
      },
    },
    styleType: {
      filled: {
        color: "sd.system.color.impression.onPrimaryContainer",
        bgColor: "sd.system.color.impression.primaryContainer",
        _enabled: {
          _hover: {
            backgroundImage:
              "linear-gradient(0deg, {colors.sd.system.color.interaction.hovered} 0%, {colors.sd.system.color.interaction.hovered} 100%)",
          },
          _focusVisible: {
            outlineWidth: "sd.system.dimension.border.medium",
            outlineStyle: "solid",
            outlineColor: "sd.system.color.interaction.hovered",
            outlineOffset: "-1px",
            backgroundImage:
              "linear-gradient(0deg, {colors.sd.system.color.interaction.hovered} 0%, {colors.sd.system.color.interaction.hovered} 100%)",
          },
        },
      },
      outlined: {
        outlineColor: "sd.system.color.component.outline",
        bgColor: "sd.system.color.component.surface",
        _enabled: {
          _hover: {
            bgColor: "sd.system.color.interaction.hoveredVariant",
          },
          _focusVisible: {
            outlineColor: "sd.system.color.component.outlineVariant",
            bgColor: "sd.system.color.interaction.hoveredVariant",
          },
        },
      },
      ghost: {
        outlineColor: "transparent",
        _enabled: {
          _hover: {
            bgColor: "sd.system.color.interaction.hoveredVariant",
          },
          _focusVisible: {
            bgColor: "sd.system.color.interaction.hoveredVariant",
            outlineColor: "sd.system.color.component.outlineVariant",
          },
        },
        _disabled: {
          bg: "transparent",
        },
      },
    },
    size: {
      large: {
        w: "{spacing.sd.reference.dimension.scale.17}",
        h: "{spacing.sd.reference.dimension.scale.17}",
        "& svg": {
          width: "sd.reference.dimension.scale.12",
          height: "sd.reference.dimension.scale.12",
        },
      },
      medium: {
        w: "{spacing.sd.reference.dimension.scale.13}",
        h: "{spacing.sd.reference.dimension.scale.13}",
      },
      small: {
        w: "{spacing.sd.reference.dimension.scale.10}",
        h: "{spacing.sd.reference.dimension.scale.10}",
      },
    },
  },
  defaultVariants: {
    shape: "circle",
    styleType: "filled",
    size: "medium",
  },
});

type ButtonProps = RecipeVariantProps<typeof IconButtonStyle> &
  ComponentProps<"button"> & {
    icon: React.ReactElement;
  };

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, className, ...props }, ref) => {
    const [variantProps, elementProps] =
      IconButtonStyle.splitVariantProps(props);
    const style = IconButtonStyle(variantProps);
    return (
      <button ref={ref} className={cx(style, className)} {...elementProps}>
        {icon}
      </button>
    );
  }
);
