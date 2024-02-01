import { defineRecipe } from "@pandacss/dev";

export const buttons = {
  button: defineRecipe({
    className: "spread-button",
    jsx: ["ButtonBase"],
    base: {
      color: "black",
      backgroundColor: "red",
    },
    variants: {
      variant: {
        outlined: {},
        ghost: {},
      },
      color: {
        primary: {},
        secondary: {},
      },
    },
    compoundVariants: [
      {
        variant: "outlined",
        color: "primary",
        css: {
          backgroundColor: "black",
        },
      },
      {
        variant: "ghost",
        color: "primary",
        css: {
          backgroundColor: "green",
        },
      },
    ],
  }),
};
