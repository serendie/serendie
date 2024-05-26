import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

export const DividerStyle = cva({
  base: {
    border: "none",
  },
  variants: {
    color: {
      light: {
        borderColor: "dic.reference.color.scale.gray.200",
      },
      normal: {
        borderColor: "dic.reference.color.scale.gray.300",
      },
      dark: {
        borderColor: "dic.system.color.component.outlineVariant",
      },
    },
    type: {
      horizontal: {
        width: "100%",
        height: "dic.reference.dimension.scale.1",
        borderBottom: "solid",
        borderWidth: "dic.system.dimension.border.medium",
      },
      vertical: {
        borderLeft: "solid",
        width: "dic.reference.dimension.scale.1",
        borderWidth: "dic.system.dimension.border.medium",
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
