import Face from "@material-design-icons/svg/round/face.svg?react";

const icons = {
  face: Face,
};

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  icon: keyof typeof icons;
  className?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  icon,
  className,
  ...props
}) => {
  const Svg = icons[icon];

  return Svg ? (
    <Svg {...props} width={"1em"} height={"1em"} className={className} />
  ) : null;
};
