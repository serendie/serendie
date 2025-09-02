import React from "react";
import { cva, cx } from "../../../styled-system/css";
import { AnimatedArc } from "./AnimatedArc";

const progressIndicatorIndeterminateStyles = cva({
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
    color: {
      primary: {},
      subtle: {},
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
    color: "primary",
  },
});

const trackStyles = cva({
  base: {
    position: "absolute",
    backgroundColor: "sd.reference.color.scale.gray.100",
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
  },
  variants: {
    type: {
      linear: {
        width: "50%",
        borderRadius: "sd.system.dimension.radius.full",
        animation: "slide 1.5s ease-in-out infinite",
      },
      circular: {
        fill: "none",
        strokeLinecap: "butt",
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
    color: {
      primary: {
        backgroundColor: "sd.system.color.impression.primary",
        stroke: "sd.system.color.impression.primary",
      },
      subtle: {
        backgroundColor: "sd.reference.color.scale.gray.300",
        stroke: "sd.reference.color.scale.gray.300",
      },
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
        strokeWidth: "2",
      },
    },
    {
      type: "circular",
      size: "medium",
      css: {
        strokeWidth: "6",
      },
    },
    {
      type: "circular",
      size: "large",
      css: {
        strokeWidth: "8",
      },
    },
  ],
});

export interface ProgressIndicatorIndeterminateProps
  extends React.ComponentProps<"div"> {
  type?: "linear" | "circular";
  size?: "small" | "medium" | "large";
  color?: "primary" | "subtle";
}

const getCircleProps = (size: "small" | "medium" | "large") => {
  const sizeMap = {
    small: {
      radius: 6,
      strokeWidth: 2,
    },
    medium: {
      radius: 8,
      strokeWidth: 6,
    },
    large: {
      radius: 20,
      strokeWidth: 8,
    },
  };
  return sizeMap[size];
};

export const ProgressIndicatorIndeterminate = ({
  type = "linear",
  size = "medium",
  color = "primary",
  className,
  style,
  ...props
}: ProgressIndicatorIndeterminateProps) => {
  if (type === "circular") {
    const { radius, strokeWidth } = getCircleProps(size);

    return (
      <div
        className={cx(
          progressIndicatorIndeterminateStyles({ type, size, color }),
          className
        )}
        role="progressbar"
        aria-valuetext="Loading"
        {...props}
      >
        <svg
          viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}
          style={{
            width: "100%",
            height: "100%",
            animation: "rotate 2s linear infinite",
          }}
        >
          <AnimatedArc
            className={filledStyles({ type, size, color })}
            radius={radius}
            width={strokeWidth}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={cx(
        progressIndicatorIndeterminateStyles({ type, size, color }),
        className
      )}
      role="progressbar"
      aria-valuetext="Loading"
      style={style}
      {...props}
    >
      <div className={trackStyles({ type, size })} />
      <div className={filledStyles({ type, size, color })} />
    </div>
  );
};

ProgressIndicatorIndeterminate.displayName = "ProgressIndicatorIndeterminate";
