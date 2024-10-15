import { css, cx } from "styled-system/css";

export const TitleShape: React.FC<
  | {
      className?: string;
    }
  | React.HTMLAttributes<SVGElement>
> = ({ className, ...props }) => {
  return (
    <svg
      width="302"
      height="302"
      viewBox="0 0 302 302"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        className,
        css({
          fill: "web.system.color.mvShape.foreground.arc.index",
        })
      )}
      {...props}
    >
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.2269 44.2269C72.5449 15.9089 110.952 -2.87138e-06 151 0C191.048 2.87139e-06 229.455 15.9089 257.773 44.2269C286.091 72.5449 302 110.952 302 151H285.942C285.942 115.211 271.725 80.8881 246.418 55.5816C221.112 30.275 186.789 16.058 151 16.0579C115.211 16.0579 80.8881 30.275 55.5816 55.5815C30.275 80.8881 16.058 115.211 16.0579 151L0 151C6.22133e-06 110.952 15.9089 72.5448 44.2269 44.2269Z"
        />
      </g>
    </svg>
  );
};
