import { ComponentProps } from "react";
import { RecipeVariantProps, cva, cx } from "../../styled-system/css";

export const ProgressIndicatorStyle = cva({
  base: {
    animation: "1s linear infinite spin",
    stroke: "sd.reference.color.scale.gray.400",
  },
  variants: {
    size: {
      small: {
        width: "16px",
        height: "16px",
      },
      medium: {
        width: "24px",
        height: "24px",
      },
      large: {
        width: "96px",
        height: "96px",
      },
    },
    color: {
      gray: {
        stroke: "sd.reference.color.scale.gray.400",
      },
      white: {
        stroke: "sd.reference.color.scale.white.1000",
      },
    },
  },
  defaultVariants: {
    size: "medium",
    color: "gray",
  },
});

type ProgressIndicatorProps = ComponentProps<"svg"> &
  RecipeVariantProps<typeof ProgressIndicatorStyle>;

export const ProgressIndicator = ({
  className,
  ...props
}: ProgressIndicatorProps) => {
  const [variantProps, elementProps] =
    ProgressIndicatorStyle.splitVariantProps(props);
  const style = ProgressIndicatorStyle(variantProps);

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(style, className)}
      {...elementProps}
    >
      <path
        d="M24 44C27.9556 44 31.8224 42.827 35.1114 40.6294C38.4004 38.4318 40.9638 35.3082 42.4776 31.6537C43.9913 27.9992 44.3874 23.9778 43.6157 20.0982C42.844 16.2186 40.9392 12.6549 38.1421 9.85786C35.3451 7.06082 31.7814 5.156 27.9018 4.38429C24.0222 3.61259 20.0008 4.00866 16.3463 5.52241C12.6918 7.03616 9.56821 9.59962 7.37059 12.8886C5.17297 16.1776 3.99998 20.0444 3.99998 24"
        strokeWidth="4"
      />
    </svg>
  );
};
