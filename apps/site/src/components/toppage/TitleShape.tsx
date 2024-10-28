import { css, cx } from "styled-system/css";

export const TitleShape: React.FC<
  | {
      className?: string;
    }
  | React.HTMLAttributes<SVGElement>
> = ({ className, ...props }) => {
  return (
    <svg
      width="285"
      height="286"
      viewBox="0 0 285 286"
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
      <g clipPath="url(#clip0_13566_18712)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M142.5 22.4844C209.05 22.4844 263 76.4341 263 142.984H285C285 64.298 221.224 0.507389 142.543 0.484375L142.457 0.484375C63.7906 0.507384 0.0230157 64.275 6.22887e-06 142.942C2.07577e-06 142.956 -6.20599e-10 142.97 0 142.984H22C22 76.4341 75.9497 22.4844 142.5 22.4844Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_13566_18712">
          <rect
            width="285"
            height="285"
            fill="white"
            transform="translate(0 0.484375)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
