import add from "@material-design-icons/svg/round/add.svg?react";
import check from "../assets/check.svg?react";
import checkCircle from "../assets/checkCircle.svg?react";
import chevron_left from "@material-design-icons/svg/round/chevron_left.svg?react";
import chevron_right from "@material-design-icons/svg/round/chevron_right.svg?react";
import close from "@material-design-icons/svg/round/close.svg?react";
import face from "@material-design-icons/svg/round/face.svg?react";
import search from "@material-design-icons/svg/round/search.svg?react";
import expandMore from "@material-design-icons/svg/round/expand_more.svg?react";
import error from "../assets/error.svg?react";
import error_fill from "../assets/errorFill.svg?react";
import errorCircle from "../assets/errorCircle.svg?react";
import info from "@material-design-icons/svg/outlined/info.svg?react";
import menu from "@material-design-icons/svg/round/menu.svg?react";
import { css, cx } from "../../styled-system/css";

const icons = {
  add,
  check,
  checkCircle,
  chevron_left,
  chevron_right,
  close,
  face,
  search,
  expandMore,
  errorCircle,
  error,
  error_fill,
  info,
  menu,
};

export type SvgIconName = keyof typeof icons;

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  icon: SvgIconName;
  size?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  icon,
  size,
  className,
  ...props
}) => {
  const Svg = icons[icon];

  return Svg ? (
    <Svg
      {...props}
      width={size || "1em"}
      height={size || "1em"}
      className={cx(
        css({
          fill: "currentColor",
        }),
        className
      )}
    />
  ) : null;
};
