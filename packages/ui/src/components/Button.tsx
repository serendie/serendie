import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

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
        bg: "primary",
      },
      secondary: {
        color: "red",
        bg: "gray.200",
      },
      tertiary: {
        color: "black",
        bg: "spreadPrimaryColor",
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

export const Button = styled("button", buttonStyle);
