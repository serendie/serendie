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
        outlineColor: "transparent",
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
      // TODO: PandaのTokenのsizesにも、dimensionを入れて`{}`を外したい
      large: {
        w: "{spacing.dic.system.dimension.spacing.sixExtraLarge}",
        h: "{spacing.dic.system.dimension.spacing.sixExtraLarge}",
      },
      medium: {
        w: "{spacing.dic.system.dimension.spacing.threeExtraLarge}",
        h: "{spacing.dic.system.dimension.spacing.threeExtraLarge}",
      },
      small: {
        w: "{spacing.dic.system.dimension.spacing.twoExtraLarge}",
        h: "{spacing.dic.system.dimension.spacing.twoExtraLarge}",
      },
    },
  },
  defaultVariants: {
    shape: "circle",
    type: "outline",
    size: "medium",
  },
});

// shapeがrectangleの時はsizeにlargeを取れないのですが、型芸になりそうなので受け入れています
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
