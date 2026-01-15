import React from "react";
import { Steps as ArkSteps, StepsRootProps } from "@ark-ui/react/steps";
import { RecipeVariantProps, cx, sva } from "../../../styled-system/css";
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
      backgroundColor: "sd.reference.color.scale.gray.100",
    },
    indicatorInner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      borderRadius: "sd.system.dimension.radius.full",
      color: "sd.reference.color.scale.gray.400",
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
      default: {
        indicator: {
          "&[data-complete]": {
            backgroundColor: "sd.system.color.impression.secondary",
          },
          "&[data-current]": {
            backgroundColor: "sd.system.color.impression.primary",
          },
          "&[data-incomplete]": {
            backgroundColor: "sd.reference.color.scale.gray.100",
          },
        },
        indicatorInner: {
          "&[data-complete]": {
            color: "sd.system.color.impression.onSecondary",
          },
          "&[data-current]": {
            color: "sd.system.color.impression.onPrimary",
          },
          "&[data-incomplete]": {
            color: "sd.reference.color.scale.gray.400",
          },
        },
      },
      subtle: {
        indicator: {
          "&[data-complete]": {
            backgroundColor: "sd.system.color.impression.primary",
          },
          "&[data-current]": {
            backgroundColor: "sd.system.color.component.surface",
            borderWidth: "sd.system.dimension.border.medium",
            borderStyle: "solid",
            borderColor: "sd.system.color.impression.primary",
          },
          "&[data-incomplete]": {
            backgroundColor: "sd.reference.color.scale.gray.400",
          },
        },
        indicatorInner: {
          "&[data-complete]": {
            color: "sd.system.color.impression.primary",
          },
          "&[data-current]": {
            color: "sd.system.color.impression.primary",
          },
          "&[data-incomplete]": {
            color: "sd.reference.color.scale.gray.400",
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
          gap: "sd.system.dimension.spacing.extraSmall",
        },
        textContent: {
          paddingTop: "sd.system.dimension.spacing.small",
        },
        separator: {
          left: "calc(20px - 0.5px)",
          top: "sd.system.dimension.spacing.threeExtraLarge",
          bottom: "-32px",
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
          textStyle: "sd.system.typography.label.extraLarge_compact",
        },
      },
    },
    {
      type: "default",
      size: "small",
      css: {
        indicator: {
          "&[data-current]": {
            backgroundColor: "sd.system.color.component.surface",
            borderWidth: "sd.system.dimension.border.medium",
            borderStyle: "solid",
            borderColor: "sd.system.color.impression.primary",
          },
        },
        indicatorInner: {
          "&[data-current]": {
            color: "sd.system.color.impression.primary",
          },
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
  title: string;
  description?: string;
}

type StepsVariantProps = {
  items: StepsItemProps[];
  direction?: "horizontal" | "vertical";
  type?: "default" | "subtle";
};

export type StepsProps = Omit<StepsRootProps, "count"> &
  RecipeVariantProps<typeof stepsStyles> &
  StepsVariantProps;

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      items,
      direction = "horizontal",
      type = "default",
      className,
      step,
      defaultStep,
      ...props
    },
    ref
  ) => {
    const computedSize = type === "subtle" ? "small" : "large";
    const orientation = direction;
    const styles = stepsStyles({ orientation, size: computedSize, type });

    return (
      <ArkSteps.Root
        ref={ref}
        count={items.length}
        step={step}
        defaultStep={defaultStep}
        orientation={orientation}
        className={cx(styles.root, className)}
        {...props}
      >
        <ArkSteps.List className={styles.list}>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <ArkSteps.Item key={idx} index={idx} className={styles.item}>
                <ArkSteps.Trigger className={styles.trigger}>
                  <ArkSteps.Indicator className={styles.indicator}>
                    <ArkSteps.ItemContext>
                      {(itemState) => (
                        <div className={styles.indicatorInner}>
                          {type === "subtle" ? null : itemState.completed ? (
                            <SerendieSymbolCheck className={styles.checkIcon} />
                          ) : (
                            <span className={styles.number}>{idx + 1}</span>
                          )}
                        </div>
                      )}
                    </ArkSteps.ItemContext>
                  </ArkSteps.Indicator>
                  <div className={styles.textContent}>
                    <div className={styles.title}>{item.title}</div>
                    {item.description && (
                      <div className={styles.description}>
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
