import React from "react";
import { css, cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";
import { StyledVariantProps } from "../../styled-system/types";

//Note:  Filledがデフォルト
//typeにルックを定義、sizeには余白やフォントのサイズを定義するイメージ

const buttonStyle = cva({
  base: {
    borderRadius: "full",
    position: "relative",
    display: "inline-flex",
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
        _focus: {
          _after: {
            content: "''",
            position: "absolute",
            inset: "0",
            bg: "dic.system.color.interaction.hovered",
          },
        },
      },
      outline: {
        color: "dic.system.color.component.onSurface",
        border: "1px solid",
        borderColor: "dic.system.color.component.outline",
        bgColor: "dic.system.color.component.surface",
        _hover: {
          bgColor: "dic.system.color.interaction.hoveredVariant",
        },
        _focus: {
          bgColor: "dic.system.color.interaction.hoveredVariant",
        },
      },
      ghost: {},
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

export type ButtonVariants = StyledVariantProps<typeof Button>;

// forward ref でボタンをラップ
export const ButtonWithRef = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button ref={ref} {...props}>
      <span className={css({ pos: "relative", zIndex: 1 })}>{children}</span>
    </button>
  );
});

export const Button = styled(ButtonWithRef, buttonStyle);
