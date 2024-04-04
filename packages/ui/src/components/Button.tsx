import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";
import { StyledVariantProps } from "../../styled-system/types";

const buttonStyle = cva({
  base: {
    color: "red",
    textAlign: "center",
    borderRadius: "md",
  },
  variants: {
    variant: {
      primary: {
        color: "white",
        borderWidth: "dic.system.dimension.border.thick",
        padding: "dic.reference.dimension.scale.11",
        bg: "dic.reference.color.scale.red.300",
        _hover: {
          bg: "dic.reference.color.scale.red.400",
        },
        _active: {
          bg: "dic.reference.color.scale.red.500",
        },
      },
      secondary: {
        color: "secondary",
        bg: "dic.reference.color.scale.green.300",
        _hover: {
          bg: "dic.reference.color.scale.green.400",
        },
        _active: {
          bg: "dic.reference.color.scale.green.500",
        },
      },
      tertiary: {
        color: "black",
        bg: "dic.reference.color.scale.orange.300",
        _hover: {
          bg: "dic.reference.color.scale.orange.400",
        },
        _active: {
          bg: "dic.reference.color.scale.orange.500",
        },
      },
    },
    size: {
      sm: {
        fontSize: "sm",
        px: "2",
        py: "1",
      },
      md: {
        fontSize: "md",
        px: "3",
        py: "2",
      },
      lg: {
        fontSize: "lg",
        px: "4",
        py: "3",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariants = StyledVariantProps<typeof Button>;

export const Button = styled("button", buttonStyle);
