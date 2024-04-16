import React from "react";
import { css, cva, cx } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

//Note:  Filledがデフォルト
//typeにルックを定義、sizeには余白やフォントのサイズを定義するイメージ

// outlineとroundedは角Rのみ違うので共通部を切り出している
const outlineCss = {
  color: "dic.system.color.component.onSurface",
  outline: "token(dic.system.dimension.border.medium) solid",
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
};

export const ButtonStyle = cva({
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
      outline: outlineCss,
      rounded: {
        ...outlineCss,
        borderRadius: "dic.system.dimension.radius.medium",
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
  ExclusiveButtonProps & {
    // TODO: buttonStyleからsizeの型情報を取りたい
    size?: "small" | "medium";
  };

const Span = styled("span", {
  base: {
    position: "relative",
    zIndex: "dic.system.elevation.zIndex.base",
  },
});

const ButtonWithRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, leftIcon, rightIcon, size, className, ...props }, ref) => {
    const iconPaddingCss = css(
      leftIcon || rightIcon
        ? size === "medium"
          ? {
              //アイコンがある側 `spacing.medium`、無い側は`spacing.extraLarge`
              paddingLeft: leftIcon
                ? "dic.system.dimension.spacing.medium"
                : "dic.system.dimension.spacing.extraLarge",
              paddingRight: rightIcon
                ? "dic.system.dimension.spacing.medium"
                : "dic.system.dimension.spacing.extraLarge",
            }
          : {
              //アイコンがある側 `spacing.extraSmall`、無い側は`spacing.medium`
              paddingLeft: leftIcon
                ? "dic.system.dimension.spacing.extraSmall"
                : "dic.system.dimension.spacing.medium",
              paddingRight: rightIcon
                ? "dic.system.dimension.spacing.extraSmall"
                : "dic.system.dimension.spacing.medium",
            }
        : {}
    );
    return (
      <button ref={ref} className={cx(iconPaddingCss, className)} {...props}>
        {leftIcon && <Span p={"2px"}>{leftIcon}</Span>}
        <Span>{children}</Span>
        {rightIcon && <Span p={"2px"}>{rightIcon}</Span>}
      </button>
    );
  }
);

export const Button = styled(ButtonWithRef, ButtonStyle);
