import { css, cva, cx } from "../../styled-system/css";
import {
  HTMLStyledProps,
  splitCssProps,
  styled,
} from "../../styled-system/jsx";
import { StyledVariantProps } from "../../styled-system/types";

export const DividerStyle = cva({
  base: {
    border: "none",
  },
  variants: {
    colorType: {
      light: {
        bg: "dic.reference.color.scale.gray.200",
      },
      normal: {
        bg: "dic.reference.color.scale.gray.300",
      },
      dark: {
        bg: "dic.reference.color.scale.gray.400",
      },
    },
    type: {
      horizontal: {
        width: "100%",
        height: "1px",
      },
      vertical: {
        width: "1px",
        height: "100%",
        minHeight: "10px",
      },
    },
  },
  defaultVariants: {
    colorType: "normal",
    type: "horizontal",
  },
});

type Props = {
  type?: "horizontal" | "vertical";
};

const StyledDivider = styled("hr", DividerStyle);

type DividerProps = Props &
  HTMLStyledProps<"hr"> &
  StyledVariantProps<typeof StyledDivider>;

export const Divider: React.FC<DividerProps> = ({ ...props }) => {
  const [cssProps, componentProps] = splitCssProps(props);
  const { css: cssPropsCss, ...cssPropsRest } = cssProps;

  return (
    <StyledDivider
      className={cx(
        DividerStyle(componentProps),
        css(cssPropsRest, cssPropsCss)
      )}
      {...props}
    ></StyledDivider>
  );
};
