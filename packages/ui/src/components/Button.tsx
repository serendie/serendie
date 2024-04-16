import React from "react";
import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

//Note:  Filledがデフォルト
//typeにルックを定義、sizeには余白やフォントのサイズを定義するイメージ

const buttonStyle = cva({
  base: {
    borderRadius: "dic.system.dimension.radius.full",
    position: "relative",
    display: "inline-flex",
    gap: "dic.system.dimension.spacing.twoExtraSmall",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
    _disabled: {
      cursor: "not-allowed",
    },
  },
  variants: {
    type: {
      filled: {
        bg: "dic.system.color.impression.primaryContainer",
        color: "dic.system.color.impression.onPrimaryContainer",
        _enabled: {
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
        },
        _disabled: {
          bg: "dic.system.color.interaction.disabled",
          color: "dic.system.color.interaction.disabledOnSurface",
        },
      },
      outline: {
        color: "dic.system.color.component.onSurface",
        outline: "1px solid",
        outlineColor: "dic.system.color.component.outline",
        bgColor: "dic.system.color.component.surface",
        _enabled: {
          _hover: {
            bgColor: "dic.system.color.interaction.hoveredVariant",
          },
          _focusVisible: {
            outlineColor: "dic.system.color.component.outlineVariant",
            bgColor: "dic.system.color.interaction.hoveredVariant",
          },
        },
        _disabled: {
          bgColor: "dic.system.color.interaction.disabled",
          color: "dic.system.color.interaction.disabledOnSurface",
          outline: "none",
        },
      },
      ghost: {
        outline: "1px solid",
        outlineColor: "transparent",
        color: "dic.system.color.impression.primary",
        _enabled: {
          _hover: {
            bgColor: "dic.system.color.interaction.hoveredVariant",
          },
          _focusVisible: {
            bgColor: "dic.system.color.interaction.hoveredVariant",
            outlineColor: "dic.system.color.component.outlineVariant",
          },
        },
        _disabled: {
          color: "dic.system.color.interaction.disabledOnSurface",
        },
      },
    },
    size: {
      medium: {
        px: "dic.system.dimension.spacing.extraLarge",
        py: "dic.system.dimension.spacing.small",
        textStyle: "dic.system.typography.label.large_compact",
        sm: {
          textStyle: "dic.system.typography.label.large_expanded",
        },
      },
      small: {
        px: "dic.system.dimension.spacing.small",
        py: "dic.system.dimension.spacing.twoExtraSmall",
        textStyle: "dic.system.typography.label.medium_compact",
        sm: {
          textStyle: "dic.system.typography.label.medium_expanded",
        },
      },
    },
  },
  defaultVariants: {
    type: "filled",
    size: "medium",
  },
});

// leftIconとrightIconを両方指定できないようにする
type ExclusiveButtonProps =
  | ({ leftIcon: React.ReactNode } & { rightIcon?: never })
  | ({ leftIcon?: never } & { rightIcon: React.ReactNode });

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ExclusiveButtonProps;

const Span = styled("span", {
  base: {
    position: "relative",
    zIndex: 1,
  },
});

const ButtonWithRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {leftIcon && <Span p={"2px"}>{leftIcon}</Span>}
        <Span>{children}</Span>
        {rightIcon && <Span p={"2px"}>{rightIcon}</Span>}
      </button>
    );
  }
);

export const Button = styled(ButtonWithRef, buttonStyle);
