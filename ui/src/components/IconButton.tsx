import React from "react";
import { css, cva, cx } from "../../styled-system/css";
import {
  HTMLStyledProps,
  splitCssProps,
  styled,
} from "../../styled-system/jsx";
import { SvgIcon, SvgIconName } from "./SvgIcon";
import { getToken } from "../tokens/getToken";
import { StyledVariantProps } from "../../styled-system/types";

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
            _after: {
              content: "''",
              position: "absolute",
              inset: "0",
              bg: "sd.system.color.interaction.hoveredVariant",
            },
          },
          _focusVisible: {
            outlineColor: "sd.system.color.component.outline",
            _after: {
              content: "''",
              position: "absolute",
              inset: "0",
              bg: "sd.system.color.interaction.hovered",
            },
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
      // TODO: PandaのTokenのsizesにも、dimensionを入れて`{}`を外したい
      large: {
        w: "{spacing.sd.reference.dimension.scale.17}",
        h: "{spacing.sd.reference.dimension.scale.17}",
      },
      medium: {
        w: "{spacing.sd.reference.dimension.scale.12}",
        h: "{spacing.sd.reference.dimension.scale.12}",
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

const StyledIconButton = styled("button", IconButtonStyle);

/**
 * TODO: できれば
 * shapeがrectangleの時はsizeにlargeを取れず、
 * shapeがcircleの時にはtypeにoutlinedを取れないようにしたい
 */
type ButtonProps = StyledVariantProps<typeof StyledIconButton> &
  Omit<HTMLStyledProps<"button">, "children"> & {
    icon: SvgIconName;
  };

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, ...props }, ref) => {
    /* NOTE: 自前でstyled componentsを作る場合はちょっとややこしい手順が必要
     https://panda-css.com/docs/concepts/style-props#making-your-own-styled-components
    */
    const [cssProps, componentProps] = splitCssProps(props);
    const { css: cssPropsCss, ...cssPropsRest } = cssProps;
    const token = getToken();
    return (
      <StyledIconButton
        ref={ref}
        className={cx(
          IconButtonStyle(componentProps),
          css(cssPropsRest, cssPropsCss)
        )}
        {...props}
      >
        <SvgIcon
          size={
            props.size === "large"
              ? token.sd.reference.dimension.scale[12]
              : token.sd.reference.dimension.scale[8]
          }
          icon={icon}
        />
      </StyledIconButton>
    );
  }
);
