import React from "react";
import { css, cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

//Note:  Filledがデフォルト
//typeにルックを定義、sizeには余白やフォントのサイズを定義するイメージ

const buttonStyle = cva({
  base: {
    borderRadius: "full",
    position: "relative",
    display: "inline-flex",
    gap: "dic.system.dimension.spacing.twoExtraSmall",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  variants: {
    type: {
      filled: {
        bg: "dic.system.color.impression.primaryContainer",
        color: "dic.system.color.impression.onPrimaryContainer",
        _hover: {
          _after: {
            content: "''",
            position: "absolute",
            inset: "0",
            bg: "dic.system.color.interaction.hovered",
          },
        },
        _focusVisible: {
          _after: {
            content: "''",
            position: "absolute",
            inset: "0",
            bg: "dic.system.color.interaction.hovered",
          },
        },
        _disabled: {
          bg: "dic.system.color.interaction.disabled",
          color: "dic.system.color.component.onSurface",
          "&>span": {
            opacity: "dic.reference.elevation.opacity.scale.3",
          },
        },
      },
      outline: {
        color: "dic.system.color.component.onSurface",
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
    type: "filled",
    size: "medium",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Span = styled("span", {
  base: {
    position: "relative",
    zIndex: 1,
  },
});

export const ButtonWithRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {leftIcon && <Span>{leftIcon}</Span>}
        <Span>{children}</Span>
        {rightIcon && <Span>{rightIcon}</Span>}
      </button>
    );
  }
);

export const Button = styled(ButtonWithRef, buttonStyle);
