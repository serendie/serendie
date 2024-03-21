import { useState } from "react";
import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";
import tokens from "@spread/design-token";
//import { Button as AriaButton } from "react-aria-components";

console.log(tokens);

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
        bg: "dic.reference.color.scale.red.300",
        "&[data-hovered]": {
          bg: "dic.reference.color.scale.red.400",
        },
        "&[data-pressed]": {
          color: "dic.reference.color.scale.red.500",
          bg: "black",
        },
      },
      secondary: {
        color: "secondary",
        bg: "gray",
        "&[data-hovered]": {
          bg: "purple.200",
        },
        "&[data-pressed]": {
          color: "primary",
          bg: "black.200",
        },
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

//export const Button = styled(AriaButton, buttonStyle);

//export const Button: React.FC = (props) => {
//return <AriaButton {...props} />;
//};

export const Button = styled("button", buttonStyle);

export const Button2 = () => {
  const [onOff, setOnOff] = useState("off");
  return (
    <Button onClick={() => setOnOff(onOff === "on" ? "off" : "on")}>
      {onOff}
    </Button>
  );
};

//export const Button3 = AriaButton;
