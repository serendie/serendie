import React from "react";
import { cva, cx } from "../../../styled-system/css";

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
        height: "2px",
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
  compoundVariants: [
    {
      type: "linear",
      size: "small",
      css: {
        height: "2px",
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
  ],
});

const filledStyles = cva({
  base: {
    position: "absolute",
    backgroundColor: "sd.system.color.impression.primary",
  },
  variants: {
    type: {
      linear: {
        left: "2px",
        borderRadius: "sd.system.dimension.radius.full",
        transition: "width 0.3s ease-in-out",
      },
      circular: {
        width: "100%",
        height: "100%",
        fill: "none",
        stroke: "sd.system.color.impression.primary",
        strokeLinecap: "round",
        transition: "stroke-dasharray 0.3s ease-in-out",
        transform: "rotate(-90deg)",
        transformOrigin: "center",
      },
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
        height: "2px",
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
        strokeWidth: "1",
      },
    },
    {
      type: "circular",
      size: "medium",
      css: {
        strokeWidth: "2",
      },
    },
    {
      type: "circular",
      size: "large",
      css: {
        strokeWidth: "4",
      },
    },
  ],
});

export interface ProgressIndicatorProps extends React.ComponentProps<"div"> {
  type?: "linear" | "circular";
  size?: "small" | "medium" | "large";
  value?: number;
  max?: number;
}

const getCircleProps = (size: "small" | "medium" | "large") => {
  const sizeMap = {
    small: { radius: 5.5, circumference: 34.56 },
    medium: { radius: 7, circumference: 43.98 },
    large: { radius: 18, circumference: 113.1 },
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
    const { radius, circumference } = getCircleProps(size);

    return (
      <div
        className={cx(progressIndicatorStyles({ type, size }), className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <svg
          viewBox={`0 0 ${radius * 2 + 4} ${radius * 2 + 4}`}
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            cx={radius + 2}
            cy={radius + 2}
            r={radius}
            className={trackStyles({ type, size })}
            stroke="var(--colors-sd-reference-color-scale-gray-100)"
            strokeWidth={size === "small" ? 1 : size === "medium" ? 2 : 4}
          />
          <circle
            cx={radius + 2}
            cy={radius + 2}
            r={radius}
            className={filledStyles({ type, size })}
            strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
          />
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
      <div className={trackStyles({ type, size })} />
      <div
        className={filledStyles({ type, size })}
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};

ProgressIndicator.displayName = "ProgressIndicator";
