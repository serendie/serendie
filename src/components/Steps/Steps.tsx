import React from "react";
import { Steps as ArkSteps, type StepsRootProps } from "@ark-ui/react/steps";
import { sva, cx, type RecipeVariantProps } from "../../../styled-system/css";
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
      color: "inherit",
    },
    checkIcon: {
      width: "24px",
      height: "24px",
      padding: "4px",
    },
    number: {
      fontWeight: "500",
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.extraSmall",
      zIndex: 1,
    },
    title: {
      textStyle: "sd.system.typography.label.large_compact",
      color: "sd.system.color.component.onSurface",
      "&[data-incomplete]": {
        color: "sd.reference.color.scale.gray.400",
      },
    },
    description: {
      textStyle: "sd.system.typography.label.small_compact",
      color: "sd.system.color.component.onSurfaceVariant",
      "&[data-incomplete]": {
        color: "sd.reference.color.scale.gray.400",
      },
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
          height: "1px",
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
          width: "1px",
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
          textStyle: "sd.system.typography.label.large_compact",
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
      default: {
        indicator: {
          backgroundColor: "sd.reference.color.scale.gray.100",
          color: "sd.reference.color.scale.gray.400",
          "&[data-complete]": {
            backgroundColor: "sd.system.color.impression.secondary",
            color: "sd.system.color.impression.onSecondary",
          },
          "&[data-current]": {
            backgroundColor: "sd.system.color.impression.primary",
            color: "sd.system.color.impression.onPrimary",
          },
        },
      },
      subtle: {
        indicator: {
          backgroundColor: "sd.reference.color.scale.gray.400",
          "&[data-complete]": {
            backgroundColor: "sd.system.color.impression.primary",
          },
          "&[data-current]": {
            backgroundColor: "sd.system.color.component.surface",
            border: "2px solid",
            borderColor: "sd.system.color.impression.primary",
          },
        },
      },
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
          paddingBottom: "sd.system.dimension.spacing.twoExtraLarge",
        },
        trigger: {
          alignItems: "flex-start",
          gap: "sd.system.dimension.spacing.extraSmall",
        },
        textContent: {
          paddingTop: "10px",
        },
        separator: {
          left: "calc(20px - 0.5px)",
          top: "sd.system.dimension.spacing.threeExtraLarge",
          bottom: "-32px",
        },
        title: {
          textStyle: "sd.system.typography.label.large_compact",
        },
      },
    },
    {
      orientation: "vertical",
      size: "small",
      css: {
        item: {
          paddingBottom: "sd.system.dimension.spacing.extraLarge",
          "--steps-indicator-size":
            "var(--spacing-sd-system-dimension-spacing-small)",
          "--steps-indicator-offset":
            "var(--spacing-sd-system-dimension-spacing-large)",
        },
        trigger: {
          alignItems: "flex-start",
          gap: "sd.system.dimension.spacing.large",
        },
        indicator: {
          marginTop: "var(--steps-indicator-offset)",
        },
        textContent: {
          marginTop: "sd.system.dimension.spacing.extraSmall",
        },
        separator: {
          left: "calc(var(--steps-indicator-size) / 2 - 0.5px)",
          top: "calc(var(--steps-indicator-offset) + var(--steps-indicator-size) + 4px)",
          bottom: "calc(-1 * var(--steps-indicator-offset) + 4px)",
        },
        title: {
          textStyle: "sd.system.typography.label.large_compact",
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

type StepsStyleProps = RecipeVariantProps<typeof stepsStyles>;

export interface StepsProps
  extends Omit<StepsRootProps, "orientation">,
    Omit<NonNullable<StepsStyleProps>, "orientation" | "size"> {
  items: StepsItemProps[];
  direction?: "horizontal" | "vertical";
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

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      items,
      direction = "horizontal",
      type = "default",
      step,
      className,
      ...props
    },
    ref
  ) => {
    const computedSize = type === "subtle" ? "small" : "large";
    const orientation = direction;
    const styles = stepsStyles({ orientation, size: computedSize, type });
    const currentStep = step !== undefined ? step : getStepFromItems(items);

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

            return (
              <ArkSteps.Item key={idx} index={idx} className={styles.item}>
                <ArkSteps.ItemContext>
                  {(itemState) => (
                    <>
                      <ArkSteps.Trigger className={styles.trigger}>
                        <ArkSteps.Indicator className={styles.indicator}>
                          <div className={styles.indicatorInner}>
                            {type !== "subtle" && itemState.completed && (
                              <SerendieSymbolCheck
                                className={styles.checkIcon}
                              />
                            )}
                            {type !== "subtle" && !itemState.completed && (
                              <span className={styles.number}>
                                {item.index}
                              </span>
                            )}
                          </div>
                        </ArkSteps.Indicator>
                        <div className={styles.textContent}>
                          <div
                            className={styles.title}
                            {...(itemState.incomplete
                              ? { "data-incomplete": "" }
                              : {})}
                          >
                            {item.title}
                          </div>
                          {item.description && (
                            <div
                              className={styles.description}
                              {...(itemState.incomplete
                                ? { "data-incomplete": "" }
                                : {})}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>
                      </ArkSteps.Trigger>
                      {!isLast && (
                        <ArkSteps.Separator className={styles.separator} />
                      )}
                    </>
                  )}
                </ArkSteps.ItemContext>
              </ArkSteps.Item>
            );
          })}
        </ArkSteps.List>
      </ArkSteps.Root>
    );
  }
);

Steps.displayName = "Steps";
