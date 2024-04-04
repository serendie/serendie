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
  },
  variants: {
    type: {
      filled: {
        overflow: "hidden",
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
      outline: {},
      ghost: {},
    },
    size: {
      medium: {
        px: "3",
        py: "2",
        fontSize: "dic.reference.typography.scale.expanded.medium",
        sm: {
          fontSize: "dic.reference.typography.scale.compact.medium",
        },
      },
      small: {
        px: "3",
        py: "2",
        fontSize: "dic.reference.typography.scale.expanded.small",
        sm: {
          fontSize: "dic.reference.typography.scale.compact.small",
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
