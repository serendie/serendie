import { css, cx } from "styled-system/css";

export const TitleShapeRenew: React.FC<{
  className?: string;
  strokeWidth?: string;
}> = ({ className, strokeWidth, ...props }) => {
  return (
    <svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(
        className,
        css({
          stroke: "web.system.color.mvShape.foreground.arc.index",
        })
      )}
      {...props}
    >
      <g clipPath="url(#clip0_13461_17977)">
        <circle cx="128" cy="128" r="116" strokeWidth={strokeWidth || "24"} />
      </g>
      <defs>
        <clipPath id="clip0_13461_17977">
          <rect width="256" height="128" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
