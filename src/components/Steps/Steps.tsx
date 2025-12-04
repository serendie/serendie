import React from "react";
import { sva, cx } from "../../../styled-system/css";
import { SerendieSymbolCheck } from "@serendie/symbols";

const stepsStyles = sva({
  slots: [
    "root",
    "item",
    "itemContent",
    "icon",
    "iconInner",
    "checkIcon",
    "number",
    "connector",
    "textContent",
    "title",
    "description",
  ],
  base: {
    root: {
      display: "flex",
      gap: "0",
    },
    connector: {
      position: "absolute",
      backgroundColor: "sd.reference.color.scale.gray.200",
      zIndex: 0,
    },
    item: {
      display: "flex",
      position: "relative",
      flex: "1",
    },
    itemContent: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.small",
    },
    icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      flexShrink: 0,
      position: "relative",
      zIndex: 1,
      backgroundColor: "sd.system.color.component.surface",
    },
    iconInner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
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
      textStyle: "sd.system.typography.label.large",
      color: "sd.system.color.component.onSurface",
    },
    description: {
      textStyle: "sd.system.typography.label.small",
      color: "sd.system.color.component.onSurfaceVariant",
    },
  },
  variants: {
    direction: {
      horizontal: {
        root: {
          flexDirection: "row",
        },
        connector: {
          height: "2px",
        },
        item: {
          flexDirection: "column",
        },
        itemContent: {
          flexDirection: "column",
        },
      },
      vertical: {
        root: {
          flexDirection: "column",
        },
        connector: {
          width: "2px",
        },
        item: {
          flexDirection: "row",
        },
        itemContent: {
          flexDirection: "row",
        },
      },
    },
    size: {
      large: {
        icon: {
          width: "40px",
          height: "40px",
        },
        number: {
          textStyle: "sd.system.typography.label.large",
        },
      },
      small: {
        icon: {
          width: "24px",
          height: "24px",
        },
        number: {
          textStyle: "sd.system.typography.label.small",
        },
        title: {
          textStyle: "sd.system.typography.label.medium",
        },
        description: {
          textStyle: "sd.system.typography.label.small",
        },
      },
    },
    status: {
      checked: {
        icon: {
          backgroundColor: "sd.system.color.impression.primary",
        },
        iconInner: {
          color: "sd.system.color.impression.onPrimary",
        },
      },
      active: {
        icon: {
          backgroundColor: "sd.system.color.impression.primary",
        },
        iconInner: {
          color: "sd.system.color.impression.onPrimary",
        },
      },
      disabled: {
        icon: {
          backgroundColor: "sd.reference.color.scale.gray.100",
        },
        iconInner: {
          color: "sd.reference.color.scale.gray.400",
        },
        number: {
          color: "sd.reference.color.scale.gray.400",
        },
        title: {
          color: "sd.reference.color.scale.gray.400",
        },
        description: {
          color: "sd.reference.color.scale.gray.400",
        },
      },
    },
    type: {
      default: {},
      subtle: {
        icon: {
          border: "2px solid",
          borderColor: "sd.reference.color.scale.gray.200",
          backgroundColor: "transparent",
        },
        iconInner: {
          backgroundColor: "sd.system.color.component.surface",
        },
      },
    },
    connectorState: {
      default: {},
      progress: {
        connector: {
          backgroundColor: "sd.system.color.impression.primary",
        },
      },
    },
  },
  compoundVariants: [
    {
      status: "checked",
      type: "subtle",
      css: {
        icon: {
          borderColor: "sd.system.color.impression.primary",
          backgroundColor: "transparent",
        },
        iconInner: {
          color: "sd.system.color.impression.primary",
        },
      },
    },
    {
      status: "active",
      type: "subtle",
      css: {
        icon: {
          borderColor: "sd.system.color.impression.primary",
          backgroundColor: "sd.system.color.component.surface",
        },
        iconInner: {
          color: "sd.system.color.impression.primary",
        },
      },
    },
    {
      status: "disabled",
      type: "subtle",
      css: {
        icon: {
          borderColor: "sd.reference.color.scale.gray.200",
          backgroundColor: "transparent",
        },
      },
    },
    {
      direction: "horizontal",
      size: "large",
      css: {
        connector: {
          top: "20px",
          left: "calc(50% + 20px)",
          right: "calc(-50% + 20px)",
        },
      },
    },
    {
      direction: "horizontal",
      size: "small",
      css: {
        connector: {
          top: "12px",
          left: "calc(50% + 12px)",
          right: "calc(-50% + 12px)",
        },
      },
    },
    {
      direction: "vertical",
      size: "large",
      css: {
        item: {
          paddingBottom: "24px",
        },
        connector: {
          left: "19px",
          top: "40px",
          bottom: "calc(-40px)",
        },
        title: {
          textStyle: "sd.system.typography.label.extraLarge",
        },
        description: {
          fontSize: "9px",
          lineHeight: "9px",
        },
      },
    },
    {
      direction: "vertical",
      size: "small",
      css: {
        item: {
          paddingBottom: "16px",
        },
        connector: {
          left: "11px",
          top: "24px",
          bottom: "calc(-24px)",
        },
        title: {
          textStyle: "sd.system.typography.label.extraLarge",
        },
        description: {
          fontSize: "9px",
          lineHeight: "9px",
        },
      },
    },
    {
      size: "large",
      status: "checked",
      type: "default",
      css: {
        icon: {
          backgroundColor: "sd.system.color.component.inversePrimary",
        },
        iconInner: {
          color: "sd.system.color.impression.primary",
        },
      },
    },
    {
      size: "small",
      status: "active",
      type: "default",
      css: {
        icon: {
          border: "2px solid",
          borderColor: "sd.system.color.impression.primary",
          backgroundColor: "sd.system.color.component.surface",
        },
      },
    },
  ],
  defaultVariants: {
    direction: "horizontal",
    status: "disabled",
    type: "default",
    connectorState: "default",
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

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    { items, direction = "horizontal", type = "default", className, ...props },
    ref
  ) => {
    const computedSize = type === "subtle" ? "small" : "large";
    const styles = stepsStyles({ direction, size: computedSize, type });

    return (
      <div ref={ref} className={cx(styles.root, className)} {...props}>
        {items.map((item, idx) => {
          const nextItem = items[idx + 1];
          const connectorState =
            nextItem?.status === "active" || nextItem?.status === "checked"
              ? "progress"
              : "default";
          const itemStyles = stepsStyles({
            direction,
            size: computedSize,
            status: item.status,
            type,
            connectorState,
          });
          const isLast = idx === items.length - 1;
          const showConnector = !isLast;

          return (
            <div key={idx} className={itemStyles.item}>
              <div className={itemStyles.itemContent}>
                <div className={itemStyles.icon}>
                  <div className={itemStyles.iconInner}>
                    {type === "subtle" ? null : item.status === "checked" ? (
                      <SerendieSymbolCheck className={itemStyles.checkIcon} />
                    ) : (
                      <span className={itemStyles.number}>{item.index}</span>
                    )}
                  </div>
                </div>
                <div className={itemStyles.textContent}>
                  <div className={itemStyles.title}>{item.title}</div>
                  {item.description && (
                    <div className={itemStyles.description}>
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
              {showConnector && <div className={itemStyles.connector} />}
            </div>
          );
        })}
      </div>
    );
  }
);

Steps.displayName = "Steps";
