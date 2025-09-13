import React, { useMemo } from "react";
import { cva, cx } from "../../../styled-system/css";
import { describeArc } from "./util";

const progressIndicatorStyles = cva({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    type: {
      linear: {
        width: "100%",
      },
      circular: {},
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
  compoundVariants: [
    {
      type: "linear",
      size: "small",
      css: {
        height: "4px",
      },
    },
    {
      type: "linear",
      size: "medium",
      css: {
        height: "4px",
      },
    },
    {
      type: "linear",
      size: "large",
      css: {
        height: "8px",
      },
    },
    {
      type: "circular",
      size: "small",
      css: {
        width: "12px",
        height: "12px",
      },
    },
    {
      type: "circular",
      size: "medium",
      css: {
        width: "16px",
        height: "16px",
      },
    },
    {
      type: "circular",
      size: "large",
      css: {
        width: "40px",
        height: "40px",
      },
    },
  ],
  defaultVariants: {
    type: "linear",
    size: "medium",
  },
});

const trackStyles = cva({
  base: {
    position: "absolute",
    backgroundColor: "sd.reference.color.scale.gray.100",
    overflow: "hidden",
  },
  variants: {
    type: {
      linear: {
        width: "calc(100% - 4px)",
        height: "100%",
        borderRadius: "sd.system.dimension.radius.full",
      },
      circular: {
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        fill: "none",
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
  compoundVariants: [],
});

const filledStyles = cva({
  base: {
    position: "absolute",
    backgroundColor: "sd.system.color.impression.primary",
  },
  variants: {
    type: {
      linear: {
        left: "0px",
        height: "100%",
        borderRadius: "0",
      },
      circular: {
        width: "100%",
        height: "100%",
        fill: "none",
        stroke: "sd.system.color.impression.primary",
        strokeLinecap: "butt",
        transformOrigin: "center",
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
  compoundVariants: [],
});

export interface ProgressIndicatorProps extends React.ComponentProps<"div"> {
  type?: "linear" | "circular";
  size?: "small" | "medium" | "large";
  value?: number;
  max?: number;
}

const getCircleProps = (size: "small" | "medium" | "large") => {
  const sizeMap = {
    small: { radius: 8, strokeWidth: 2 },
    medium: { radius: 12, strokeWidth: 4 },
    large: { radius: 24, strokeWidth: 4 },
  };
  return sizeMap[size];
};

export const ProgressIndicator = ({
  value = 0,
  max = 1,
  type = "linear",
  size = "medium",
  className,
  style,
  ...props
}: ProgressIndicatorProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  if (type === "circular") {
    const { radius, strokeWidth } = getCircleProps(size);
    const d = useMemo(() => {
      // パーセンテージから円弧のパスを計算
      const start = 0;
      const end = (percentage / 100) * 360 - 0.00001;

      const dPath = describeArc(
        radius + strokeWidth,
        radius + strokeWidth,
        radius,
        start,
        end
      );
      return dPath;
    }, [percentage, radius, strokeWidth]);

    return (
      <div
        className={cx(progressIndicatorStyles({ type, size }), className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        style={style}
        {...props}
      >
        <svg
          viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            className={trackStyles({ type, size })}
            stroke="var(--colors-sd-reference-color-scale-gray-100)"
            strokeWidth={strokeWidth}
          />

          {percentage > 0 && (
            <path
              d={d}
              className={filledStyles({ type, size })}
              strokeWidth={strokeWidth * 2}
            />
          )}
        </svg>
      </div>
    );
  }

  return (
    <div
      className={cx(progressIndicatorStyles({ type, size }), className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      style={style}
      {...props}
    >
      <div className={trackStyles({ type, size })}>
        <div
          className={filledStyles({ type, size })}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

ProgressIndicator.displayName = "ProgressIndicator";
