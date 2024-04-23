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
    color: "dic.system.color.component.onSurface",
    outlineWidth: "dic.system.dimension.border.medium",
    outlineStyle: "solid",
    cursor: "pointer",
    _disabled: {
      color: "dic.system.color.interaction.disabledOnSurface",
      cursor: "not-allowed",
      outlineColor: "transparent",
      bg: "dic.system.color.interaction.disabled",
    },
  },
  variants: {
    shape: {
      rectangle: {
        borderRadius: "dic.system.dimension.radius.medium",
      },
      circle: {
        borderRadius: "dic.system.dimension.radius.full",
      },
    },
    styleType: {
      outline: {
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
      },
      ghost: {
        outlineColor: "transparent",
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
          bg: "transparent",
        },
      },
    },
    size: {
      // TODO: PandaのTokenのsizesにも、dimensionを入れて`{}`を外したい
      large: {
        w: "{spacing.dic.reference.dimension.scale.17}",
        h: "{spacing.dic.reference.dimension.scale.17}",
      },
      medium: {
        w: "{spacing.dic.reference.dimension.scale.12}",
        h: "{spacing.dic.reference.dimension.scale.12}",
      },
      small: {
        w: "{spacing.dic.reference.dimension.scale.10}",
        h: "{spacing.dic.reference.dimension.scale.10}",
      },
    },
  },
  compoundVariants: [
    {
      // rectangle/smallの場合は横長
      shape: "rectangle",
      size: "small",
      css: {
        w: "{spacing.dic.reference.dimension.scale.12}",
      },
    },
  ],
  defaultVariants: {
    shape: "circle",
    styleType: "outline",
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
        {...props}>
        <SvgIcon
          size={
            props.size === "large"
              ? token.dic.reference.dimension.scale[12]
              : token.dic.reference.dimension.scale[8]
          }
          icon={icon}
        />
      </StyledIconButton>
    );
  }
);
