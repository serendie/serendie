import React, { ComponentProps } from "react";
import { ProgressIndicator } from "../ProgressIndicator";
import { css, cva, cx } from "../../../styled-system/css";
import { styled } from "../../../styled-system/jsx";
import { RecipeVariantProps } from "../../../styled-system/types";

//Note:  Filledがデフォルト
//typeにルックを定義、sizeには余白やフォントのサイズを定義するイメージ

// outlineとrectangleは角Rのみ違うので共通部を切り出している
const outlineCss = {
  color: "sd.system.color.component.onSurface",
  outlineWidth: "sd.system.dimension.border.medium",
  outlineStyle: "solid",
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
  _disabled: {
    bgColor: "sd.system.color.interaction.disabled",
    color: "sd.system.color.interaction.disabledOnSurface",
    outline: "none",
  },
};

export const ButtonStyle = cva({
  base: {
    borderRadius: "sd.system.dimension.radius.full",
    position: "relative",
    display: "inline-flex",
    gap: "sd.system.dimension.spacing.twoExtraSmall",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
    _disabled: {
      cursor: "not-allowed",
    },
  },
  variants: {
    styleType: {
      filled: {
        bg: "sd.system.color.impression.primaryContainer",
        color: "sd.system.color.impression.onPrimaryContainer",
        _enabled: {
          _hover: {
            _after: {
              content: "''",
              position: "absolute",
              inset: "0",
              bg: "sd.system.color.interaction.hovered",
            },
          },
          _focusVisible: {
            outlineWidth: "sd.system.dimension.border.medium",
            outlineStyle: "solid",
            outlineColor: "sd.system.color.interaction.hovered",
            _after: {
              content: "''",
              position: "absolute",
              inset: "0",
              bg: "sd.system.color.interaction.hovered",
            },
          },
        },
        _disabled: {
          bg: "sd.system.color.interaction.disabled",
          color: "sd.system.color.interaction.disabledOnSurface",
        },
      },
      ghost: {
        color: "sd.system.color.impression.primary",
        _enabled: {
          _hover: {
            bgColor: "sd.system.color.interaction.hoveredVariant",
          },
          _focusVisible: {
            bgColor: "sd.system.color.interaction.hoveredVariant",
            outlineWidth: "sd.system.dimension.border.medium",
            outlineStyle: "solid",
            outlineColor: "sd.system.color.component.outlineVariant",
          },
        },
        _disabled: {
          color: "sd.system.color.interaction.disabledOnSurface",
        },
      },
      outlined: outlineCss,
      rectangle: {
        ...outlineCss,
        borderRadius: "sd.system.dimension.radius.medium",
      },
    },
    size: {
      medium: {
        height: 48,
        px: "sd.system.dimension.spacing.extraLarge",
        py: "sd.system.dimension.spacing.small",
        textStyle: "sd.system.typography.label.large_compact",
        expanded: {
          textStyle: "sd.system.typography.label.large_expanded",
        },
      },
      small: {
        height: 32,
        px: "sd.system.dimension.spacing.small",
        py: "sd.system.dimension.spacing.twoExtraSmall",
        textStyle: "sd.system.typography.label.medium_compact",
        expanded: {
          textStyle: "sd.system.typography.label.medium_expanded",
        },
      },
    },
  },
  defaultVariants: {
    styleType: "filled",
    size: "medium",
  },
});

// leftIconとrightIconを両方指定できないようにする
type ExclusiveIconProps =
  | ({ leftIcon?: React.ReactElement } & { rightIcon?: never })
  | ({ leftIcon?: never } & { rightIcon?: React.ReactElement });

type ButtonLoadingProps = {
  isLoading?: boolean;
};
type ButtonProps = ComponentProps<"button"> &
  RecipeVariantProps<typeof ButtonStyle> &
  ExclusiveIconProps &
  ButtonLoadingProps;

const Span = styled("span", {
  base: {
    position: "relative",
    zIndex: "sd.system.elevation.zIndex.base",
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const [
      variantProps,
      { children, leftIcon, rightIcon, isLoading, className, ...restProps },
    ] = ButtonStyle.splitVariantProps(props);
    const style = ButtonStyle(variantProps);

    const iconPaddingCss = css(
      leftIcon || rightIcon
        ? props.size === "medium"
          ? {
              //アイコンがある側 `spacing.medium`、無い側は`spacing.extraLarge`
              paddingLeft: leftIcon
                ? "sd.system.dimension.spacing.medium"
                : "sd.system.dimension.spacing.extraLarge",
              paddingRight: rightIcon
                ? "sd.system.dimension.spacing.medium"
                : "sd.system.dimension.spacing.extraLarge",
            }
          : {
              //アイコンがある側 `spacing.extraSmall`、無い側は`spacing.medium`
              paddingLeft: leftIcon
                ? "sd.system.dimension.spacing.extraSmall"
                : "sd.system.dimension.spacing.medium",
              paddingRight: rightIcon
                ? "sd.system.dimension.spacing.extraSmall"
                : "sd.system.dimension.spacing.medium",
            }
        : {}
    );

    return (
      <button
        ref={ref}
        className={cx(style, iconPaddingCss, className)}
        {...restProps}
      >
        {isLoading && (
          <ProgressIndicator
            size={variantProps.size}
            color={
              props.styleType === undefined || props.styleType === "filled"
                ? "white"
                : "gray"
            }
          />
        )}
        {!isLoading && leftIcon && <Span p={"2px"}>{leftIcon}</Span>}
        <Span>{children}</Span>
        {!isLoading && rightIcon && <Span p={"2px"}>{rightIcon}</Span>}
      </button>
    );
  }
);
