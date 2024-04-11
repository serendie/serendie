import add from "@material-design-icons/svg/round/add.svg?react";
import chevron_left from "@material-design-icons/svg/round/chevron_left.svg?react";
import chevron_right from "@material-design-icons/svg/round/chevron_right.svg?react";
import close from "@material-design-icons/svg/round/close.svg?react";
import face from "@material-design-icons/svg/round/face.svg?react";
import { css } from "../../styled-system/css";

const icons = {
  add,
  chevron_left,
  chevron_right,
  close,
  face,
};

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  icon: keyof typeof icons;
  size?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ icon, size, ...props }) => {
  const Svg = icons[icon];

  return Svg ? (
    <Svg
      {...props}
      width={size || "1em"}
      height={size || "1em"}
      className={css({
        fill: "currentColor",
      })}
    />
  ) : null;
};
