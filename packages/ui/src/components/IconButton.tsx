import React from "react";
import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";
import { SvgIcon, SvgIconName } from "./SvgIcon";
import { getToken } from "../tokens/getToken";

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
    type: {
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
    type: "outline",
    size: "medium",
  },
});

/**
 * TODO: できれば
 * shapeがrectangleの時はsizeにlargeを取れず、
 * shapeがcircleの時にはtypeにoutlinedを取れないようにしたい
 */
type ButtonProps = {
  icon: SvgIconName;
  size: (typeof IconButtonStyle.variantMap.size)[number];
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const IconButtonWithRef = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon, size, ...props }, ref) => {
    const token = getToken();
    return (
      <styled.button ref={ref} className={IconButtonStyle()} {...props}>
        <SvgIcon
          size={
            size === "large"
              ? token.dic.reference.dimension.scale[12]
              : token.dic.reference.dimension.scale[8]
          }
          icon={icon}
        />
      </styled.button>
    );
  }
);

export const IconButton = styled(IconButtonWithRef, IconButtonStyle);
