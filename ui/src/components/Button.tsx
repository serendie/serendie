import React from "react";
import { css, cva, cx } from "../../styled-system/css";
import { styled, splitCssProps } from "../../styled-system/jsx";
import { HTMLStyledProps, StyledVariantProps } from "../../styled-system/types";
import { ProgressIndicator } from "..";

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

const StyledButton = styled("button", ButtonStyle);

// leftIconとrightIconを両方指定できないようにする
type ExclusiveIconProps =
  | ({ leftIcon?: React.ReactNode } & { rightIcon?: never })
  | ({ leftIcon?: never } & { rightIcon?: React.ReactNode });

type ButtonLoadingProps = {
  isLoading?: boolean;
};
type ButtonProps = HTMLStyledProps<"button"> &
  StyledVariantProps<typeof StyledButton> &
  ExclusiveIconProps &
  ButtonLoadingProps;

const Span = styled("span", {
  base: {
    position: "relative",
    zIndex: "sd.system.elevation.zIndex.base",
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, leftIcon, rightIcon, isLoading, ...props }, ref) => {
    const [cssProps, componentProps] = splitCssProps(props);
    const { css: cssPropsCss, ...cssPropsRest } = cssProps;

    const iconPaddingCss =
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
        : {};

    return (
      <StyledButton
        ref={ref}
        className={cx(
          ButtonStyle(componentProps),
          css(cssPropsRest, cssPropsCss, iconPaddingCss)
        )}
        {...props}
      >
        {isLoading && (
          <ProgressIndicator
            size={componentProps.size}
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
      </StyledButton>
    );
  }
);
