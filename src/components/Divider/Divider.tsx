import { ComponentProps } from "react";
import { cva, cx, RecipeVariantProps } from "../../../styled-system/css";

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

type DividerProps = ComponentProps<"hr"> &
  RecipeVariantProps<typeof DividerStyle>;

export const Divider = (props: DividerProps) => {
  const [variantProps, elementProps] = DividerStyle.splitVariantProps(props);
  const { className, ...restProps } = elementProps;
  return (
    <hr className={cx(DividerStyle(variantProps), className)} {...restProps} />
  );
};
