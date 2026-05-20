import React from "react";
import { Steps as ArkSteps, type StepsRootProps } from "@ark-ui/react/steps";
import { sva, cx, type RecipeVariantProps } from "../../../styled-system/css";
import { SerendieSymbolCheck } from "@serendie/symbols";

export const stepsStyles = sva({
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
      backgroundColor: "sd.system.color.component.outlineDim",
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
      zIndex: 3,
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
      width: "sd.system.dimension.spacing.medium",
      height: "sd.system.dimension.spacing.medium",
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
      "[data-incomplete] &": {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
    description: {
      textStyle: "sd.system.typography.label.small_compact",
      color: "sd.system.color.component.onSurfaceVariant",
      "[data-incomplete] &": {
        color: "sd.system.color.interaction.disabledOnSurface",
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
          height: "sd.reference.dimension.scale.1",
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
          width: "sd.reference.dimension.scale.1",
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
          width: "sd.system.dimension.spacing.extraLarge",
          height: "sd.system.dimension.spacing.extraLarge",
        },
        number: {
          textStyle: "sd.system.typography.label.medium_compact",
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
          backgroundColor: "sd.system.color.interaction.disabled",
          color: "sd.system.color.interaction.disabledOnSurface",
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
          backgroundColor: "sd.system.color.interaction.disabledOnSurface",
          "&[data-complete]": {
            backgroundColor: "sd.system.color.impression.primary",
          },
          "&[data-current]": {
            backgroundColor: "sd.system.color.component.surface",
            borderWidth: "sd.system.dimension.border.thick",
            borderStyle: "solid",
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
          top: "sd.system.dimension.spacing.small",
          left: "calc(50% + var(--spacing-sd-system-dimension-spacing-small))",
          right:
            "calc(-50% + var(--spacing-sd-system-dimension-spacing-small))",
        },
      },
    },
    {
      orientation: "horizontal",
      size: "small",
      css: {
        separator: {
          top: "calc(var(--spacing-sd-system-dimension-spacing-small) / 2 - var(--spacing-sd-reference-dimension-scale-1))",
          left: "calc(50% + var(--spacing-sd-system-dimension-spacing-small) / 2)",
          right:
            "calc(-50% + var(--spacing-sd-system-dimension-spacing-small) / 2)",
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
          paddingTop: "sd.system.dimension.spacing.twoExtraSmall",
        },
        separator: {
          left: "calc(var(--spacing-sd-system-dimension-spacing-small) - 0.5px)",
          top: "sd.system.dimension.spacing.small",
          bottom: "-sd.system.dimension.spacing.large",
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
          marginTop:
            "calc(var(--spacing-sd-system-dimension-spacing-large) + var(--spacing-sd-reference-dimension-scale-2))",
        },
        separator: {
          left: "calc(var(--steps-indicator-size) / 2 - 0.5px)",
          top: "calc(var(--steps-indicator-offset) + var(--steps-indicator-size) + var(--spacing-sd-system-dimension-spacing-twoExtraSmall))",
          bottom:
            "calc(-1 * var(--steps-indicator-offset) + var(--spacing-sd-system-dimension-spacing-twoExtraSmall))",
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
  title: string;
  description?: string;
}

type StepsStyleProps = RecipeVariantProps<typeof stepsStyles>;

export interface StepsProps
  extends
    Omit<StepsRootProps, "orientation">,
    Omit<NonNullable<StepsStyleProps>, "orientation" | "size"> {
  items: StepsItemProps[];
  direction?: "horizontal" | "vertical";
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    { items, direction = "horizontal", type = "default", className, ...props },
    ref
  ) => {
    const computedSize = type === "subtle" ? "small" : "large";
    const orientation = direction;
    const styles = stepsStyles({ orientation, size: computedSize, type });

    return (
      <ArkSteps.Root
        ref={ref}
        {...props}
        count={items.length}
        orientation={orientation}
        className={cx(styles.root, className)}
      >
        <ArkSteps.List className={styles.list}>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <ArkSteps.Item key={idx} index={idx} className={styles.item}>
                <ArkSteps.Trigger className={styles.trigger}>
                  <ArkSteps.Indicator className={styles.indicator}>
                    <div className={styles.indicatorInner}>
                      {type !== "subtle" && (
                        <ArkSteps.ItemContext>
                          {(itemState) =>
                            itemState.completed ? (
                              <SerendieSymbolCheck
                                className={styles.checkIcon}
                              />
                            ) : (
                              <span className={styles.number}>{idx + 1}</span>
                            )
                          }
                        </ArkSteps.ItemContext>
                      )}
                    </div>
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
