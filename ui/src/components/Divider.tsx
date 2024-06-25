import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

export const DividerStyle = cva({
  base: {
    border: "none",
  },
  variants: {
    color: {
      light: {
        borderColor: "sd.reference.color.scale.gray.200",
      },
      normal: {
        borderColor: "sd.reference.color.scale.gray.300",
      },
      dark: {
        borderColor: "sd.system.color.component.outlineVariant",
      },
    },
    type: {
      horizontal: {
        width: "100%",
        height: "sd.reference.dimension.scale.1",
        borderBottomStyle: "solid",
        borderWidth: "sd.system.dimension.border.medium",
      },
      vertical: {
        borderLeftStyle: "solid",
        width: "sd.reference.dimension.scale.1",
        borderWidth: "sd.system.dimension.border.medium",
        height: "100%",
        minHeight: "10px",
      },
    },
  },
  defaultVariants: {
    color: "normal",
    type: "horizontal",
  },
});

export const Divider = styled("hr", DividerStyle);
