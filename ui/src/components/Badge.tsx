import { DetailedHTMLProps, HTMLAttributes } from "react";
import { css, cva, cx } from "../../styled-system/css";
import {
  HTMLStyledProps,
  splitCssProps,
  styled,
} from "../../styled-system/jsx";
import { StyledVariantProps } from "../../styled-system/types";

export const BadgeStyle = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "dic.system.dimension.radius.extraLarge",
    bg: "dic.system.color.interaction.hoveredVariant",
  },
  variants: {
    size: {
      small: {
        height: "16px",
        pr: "dic.system.dimension.spacing.twoExtraSmall",
        pl: "dic.system.dimension.spacing.twoExtraSmall",
        textStyle: "dic.system.typography.label.small_compact",
        expanded: {
          textStyle: "dic.system.typography.label.small_expanded",
        },
      },
      medium: {
        height: "24px",
        pr: "dic.system.dimension.spacing.extraSmall",
        pl: "dic.system.dimension.spacing.extraSmall",
        textStyle: "dic.system.typography.label.medium_compact",
        expanded: {
          textStyle: "dic.system.typography.label.medium_expanded",
        },
      },
      large: {
        height: "32px",
        pr: "dic.system.dimension.spacing.medium",
        pl: "dic.system.dimension.spacing.medium",
        textStyle: "dic.system.typography.label.large_compact",
        expanded: {
          textStyle: "dic.system.typography.label.large_expanded",
        },
      },
    },
    color: {
      gray: {
        bg: "dic.reference.color.scale.gray.600",
        color: "dic.system.color.component.inverseOnSurface",
      },
      blue: {
        bg: "dic.reference.color.scale.blue.600",
        color: "dic.system.color.component.inverseOnSurface",
      },
      green: {
        bg: "dic.reference.color.scale.green.600",
        color: "dic.system.color.component.inverseOnSurface",
      },
      yellow: {
        bg: "dic.reference.color.scale.yellow.600",
        color: "dic.system.color.component.inverseOnSurface",
      },
      orange: {
        bg: "dic.reference.color.scale.orange.600",
        color: "dic.system.color.component.inverseOnSurface",
      },
      red: {
        bg: "dic.reference.color.scale.red.600",
        color: "dic.system.color.component.inverseOnSurface",
      },
      "gray-subtle": {
        bg: "dic.reference.color.scale.gray.100",
        color: "dic.reference.color.scale.gray.800",
      },
      "blue-subtle": {
        bg: "dic.reference.color.scale.blue.100",
        color: "dic.reference.color.scale.blue.800",
      },
      "green-subtle": {
        bg: "dic.reference.color.scale.green.100",
        color: "dic.reference.color.scale.green.800",
      },
      "yellow-subtle": {
        bg: "dic.reference.color.scale.yellow.100",
        color: "dic.reference.color.scale.yellow.800",
      },
      "orange-subtle": {
        bg: "dic.reference.color.scale.orange.100",
        color: "dic.reference.color.scale.orange.800",
      },
      "red-subtle": {
        bg: "dic.reference.color.scale.red.100",
        color: "dic.reference.color.scale.red.800",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    color: "gray",
  },
});

const StyledBadge = styled("span", BadgeStyle);

type BadgeProps = HTMLStyledProps<"span"> &
  StyledVariantProps<typeof StyledBadge>;

export const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  const [cssProps, componentProps] = splitCssProps(props);
  const { css: cssPropsCss, ...cssPropsRest } = cssProps;

  return (
    <StyledBadge
      className={cx(BadgeStyle(componentProps), css(cssPropsRest, cssPropsCss))}
      {...props}
    >
      {children}
    </StyledBadge>
  );
};
