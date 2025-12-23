import React from "react";
import { Steps as ArkSteps } from "@ark-ui/react/steps";
import { sva, cx } from "../../../styled-system/css";
import { SerendieSymbolCheck } from "@serendie/symbols";

const stepsStyles = sva({
  slots: [
    "root",
    "list",
    "item",
    "trigger",
    "indicator",
    "indicatorInner",
    "checkIcon",
    "number",
    "separator",
    "textContent",
    "title",
    "description",
  ],
  base: {
    root: {
      display: "flex",
      gap: "sd.system.dimension.spacing.none",
    },
    list: {
      display: "flex",
      gap: "sd.system.dimension.spacing.none",
    },
    separator: {
      position: "absolute",
      backgroundColor: "sd.reference.color.scale.gray.200",
      zIndex: 1,
      "&[data-complete]": {
        backgroundColor: "sd.system.color.impression.primary",
      },
    },
    item: {
      display: "flex",
      position: "relative",
      flex: "1",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.small",
      background: "none",
      border: "none",
      cursor: "default",
      padding: "sd.system.dimension.spacing.none",
      position: "relative",
      zIndex: 2,
    },
    indicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "sd.system.dimension.radius.full",
      flexShrink: 0,
      position: "relative",
      zIndex: 2,
      backgroundColor: "sd.system.color.component.surface",
    },
    indicatorInner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      borderRadius: "sd.system.dimension.radius.full",
    },
    checkIcon: {
      width: "100%",
      height: "100%",
    },
    number: {
      fontWeight: "500",
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.twoExtraSmall",
      zIndex: 1,
    },
    title: {
      textStyle: "sd.system.typography.label.large_compact",
      color: "sd.system.color.component.onSurface",
    },
    description: {
      textStyle: "sd.system.typography.label.small_compact",
      color: "sd.system.color.component.onSurfaceVariant",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: {
          flexDirection: "row",
        },
        list: {
          flexDirection: "row",
          width: "100%",
        },
        separator: {
          height: "2px",
        },
        item: {
          flexDirection: "column",
          alignItems: "center",
        },
        trigger: {
          flexDirection: "column",
        },
        title: {
          textAlign: "center",
        },
        description: {
          textStyle: "sd.system.typography.label.small_compact",
          textAlign: "center",
        },
      },
      vertical: {
        root: {
          flexDirection: "column",
        },
        list: {
          flexDirection: "column",
        },
        separator: {
          width: "2px",
        },
        item: {
          flexDirection: "column",
        },
        trigger: {
          flexDirection: "row",
        },
        textContent: {
          alignItems: "flex-start",
        },
        title: {
          textStyle: "sd.system.typography.label.extraLarge_compact",
          textAlign: "left",
        },
        description: {
          textStyle: "sd.system.typography.label.small_compact",
          textAlign: "left",
        },
      },
    },
    size: {
      large: {
        indicator: {
          width: "sd.system.dimension.spacing.threeExtraLarge",
          height: "sd.system.dimension.spacing.threeExtraLarge",
        },
        number: {
          textStyle: "sd.system.typography.label.large_compact",
        },
      },
      small: {
        indicator: {
          width: "sd.system.dimension.spacing.small",
          height: "sd.system.dimension.spacing.small",
        },
        number: {
          textStyle: "sd.system.typography.label.small_compact",
        },
        title: {
          textStyle: "sd.system.typography.label.medium_compact",
        },
        description: {
          textStyle: "sd.system.typography.label.small_compact",
        },
      },
    },
    type: {
      default: {},
      subtle: {},
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "large",
      css: {
        separator: {
          top: "sd.system.dimension.spacing.large",
          left: "calc(50% + 20px)",
          right: "calc(-50% + 20px)",
        },
      },
    },
    {
      orientation: "horizontal",
      size: "small",
      css: {
        separator: {
          top: "5px",
          left: "calc(50% + 6px)",
          right: "calc(-50% + 6px)",
        },
      },
    },
    {
      orientation: "vertical",
      size: "large",
      css: {
        item: {
          paddingBottom: "sd.system.dimension.spacing.extraLarge",
        },
        textContent: {
          paddingTop: "sd.system.dimension.spacing.small",
        },
        separator: {
          left: "19px",
          top: "sd.system.dimension.spacing.threeExtraLarge",
          bottom: "-40px",
        },
        title: {
          textStyle: "sd.system.typography.label.extraLarge_compact",
        },
      },
    },
    {
      orientation: "vertical",
      size: "small",
      css: {
        item: {
          paddingBottom: "sd.system.dimension.spacing.medium",
          "--steps-indicator-size":
            "var(--spacing-sd-system-dimension-spacing-small)",
          "--steps-indicator-offset":
            "var(--spacing-sd-system-dimension-spacing-large)",
        },
        trigger: {
          alignItems: "flex-start",
        },
        indicator: {
          marginTop: "var(--steps-indicator-offset)",
        },
        textContent: {
          marginTop: "sd.system.dimension.spacing.large",
        },
        separator: {
          left: "calc(var(--steps-indicator-size) / 2 - 1px)",
          top: "calc(var(--steps-indicator-offset) + var(--steps-indicator-size) / 2)",
          bottom:
            "calc(-1 * (var(--steps-indicator-offset) + var(--steps-indicator-size) / 2))",
        },
        title: {
          textStyle: "sd.system.typography.label.extraLarge_compact",
        },
      },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    type: "default",
    size: "large",
  },
});

export interface StepsItemProps {
  status?: "checked" | "active" | "disabled";
  title: string;
  description?: string;
  index: number;
}

export interface StepsProps extends React.ComponentProps<"div"> {
  items: StepsItemProps[];
  direction?: "horizontal" | "vertical";
  type?: "default" | "subtle";
}

const getStepFromItems = (items: StepsItemProps[]): number => {
  const activeIndex = items.findIndex((item) => item.status === "active");
  if (activeIndex !== -1) return activeIndex;

  const lastCheckedIndex = items.reduce((lastIdx, item, idx) => {
    return item.status === "checked" ? idx : lastIdx;
  }, -1);

  if (lastCheckedIndex !== -1) return lastCheckedIndex + 1;

  return 0;
};

const getIndicatorStyles = (
  status: "checked" | "active" | "disabled" | undefined,
  type: "default" | "subtle",
  size: "large" | "small"
): React.CSSProperties => {
  if (status === "checked") {
    if (type === "subtle") {
      return {
        backgroundColor: "var(--colors-sd-system-color-impression-primary)",
      };
    } else {
      return {
        backgroundColor: "var(--colors-sd-system-color-impression-secondary)",
      };
    }
  } else if (status === "active") {
    if (type === "subtle" || size === "small") {
      return {
        border: "2px solid var(--colors-sd-system-color-impression-primary)",
        backgroundColor: "var(--colors-sd-system-color-component-surface)",
      };
    } else {
      return {
        backgroundColor: "var(--colors-sd-system-color-impression-primary)",
      };
    }
  } else {
    if (type === "subtle") {
      return {
        backgroundColor: "var(--colors-sd-reference-color-scale-gray-400)",
      };
    } else {
      return {
        backgroundColor: "var(--colors-sd-reference-color-scale-gray-100)",
      };
    }
  }
};

const getIndicatorInnerStyles = (
  status: "checked" | "active" | "disabled" | undefined,
  type: "default" | "subtle",
  size: "large" | "small"
): React.CSSProperties => {
  if (status === "checked") {
    if (type === "subtle") {
      return { color: "var(--colors-sd-system-color-impression-on-primary)" };
    } else {
      return { color: "var(--colors-sd-system-color-impression-on-secondary)" };
    }
  } else if (status === "active") {
    if (type === "subtle" || size === "small") {
      return { color: "var(--colors-sd-system-color-impression-primary)" };
    } else {
      return { color: "var(--colors-sd-system-color-impression-on-primary)" };
    }
  } else {
    return { color: "var(--colors-sd-reference-color-scale-gray-400)" };
  }
};

const getTextStyles = (
  status: "checked" | "active" | "disabled" | undefined
): { title: React.CSSProperties; description: React.CSSProperties } => {
  if (status === "disabled") {
    return {
      title: { color: "var(--colors-sd-reference-color-scale-gray-400)" },
      description: { color: "var(--colors-sd-reference-color-scale-gray-400)" },
    };
  }
  return { title: {}, description: {} };
};

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    { items, direction = "horizontal", type = "default", className, ...props },
    ref
  ) => {
    const computedSize = type === "subtle" ? "small" : "large";
    const orientation = direction;
    const styles = stepsStyles({ orientation, size: computedSize, type });
    const currentStep = getStepFromItems(items);

    return (
      <ArkSteps.Root
        ref={ref}
        count={items.length}
        step={currentStep}
        orientation={orientation}
        className={cx(styles.root, className)}
        {...props}
      >
        <ArkSteps.List className={styles.list}>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            const indicatorStyles = getIndicatorStyles(
              item.status,
              type,
              computedSize
            );
            const indicatorInnerStyles = getIndicatorInnerStyles(
              item.status,
              type,
              computedSize
            );
            const textStyles = getTextStyles(item.status);

            return (
              <ArkSteps.Item key={idx} index={idx} className={styles.item}>
                <ArkSteps.Trigger className={styles.trigger}>
                  <ArkSteps.Indicator
                    className={styles.indicator}
                    style={indicatorStyles}
                  >
                    <div
                      className={styles.indicatorInner}
                      style={indicatorInnerStyles}
                    >
                      {type === "subtle" ? null : item.status === "checked" ? (
                        <SerendieSymbolCheck className={styles.checkIcon} />
                      ) : (
                        <span className={styles.number}>{item.index}</span>
                      )}
                    </div>
                  </ArkSteps.Indicator>
                  <div className={styles.textContent}>
                    <div className={styles.title} style={textStyles.title}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div
                        className={styles.description}
                        style={textStyles.description}
                      >
                        {item.description}
                      </div>
                    )}
                  </div>
                </ArkSteps.Trigger>
                {!isLast && <ArkSteps.Separator className={styles.separator} />}
              </ArkSteps.Item>
            );
          })}
        </ArkSteps.List>
      </ArkSteps.Root>
    );
  }
);

Steps.displayName = "Steps";
