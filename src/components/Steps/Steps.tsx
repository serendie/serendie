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
    connector: {
      position: "absolute",
      backgroundColor: "sd.reference.color.scale.gray.200",
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.twoExtraSmall",
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
        item: {
          flexDirection: "column",
        },
        itemContent: {
          flexDirection: "column",
        },
        connector: {
          top: "50%",
          transform: "translateY(-50%)",
          height: "2px",
        },
      },
      vertical: {
        root: {
          flexDirection: "column",
        },
        item: {
          flexDirection: "row",
        },
        itemContent: {
          flexDirection: "row",
        },
        connector: {
          left: "50%",
          transform: "translateX(-50%)",
          width: "2px",
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
          backgroundColor: "transparent",
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
          left: "calc(50% + 12px)",
          right: "calc(-50% + 12px)",
        },
      },
    },
    {
      direction: "vertical",
      size: "large",
      css: {
        connector: {
          top: "calc(50% + 20px)",
          bottom: "calc(-50% + 20px)",
        },
      },
    },
    {
      direction: "vertical",
      size: "small",
      css: {
        connector: {
          top: "calc(50% + 12px)",
          bottom: "calc(-50% + 12px)",
        },
      },
    },
  ],
  defaultVariants: {
    direction: "horizontal",
    size: "large",
    status: "disabled",
    type: "default",
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
  size?: "large" | "small";
  type?: "default" | "subtle";
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      items,
      direction = "horizontal",
      size = "large",
      type = "default",
      className,
      ...props
    },
    ref
  ) => {
    const styles = stepsStyles({ direction, size, type });

    return (
      <div ref={ref} className={cx(styles.root, className)} {...props}>
        {items.map((item, idx) => {
          const itemStyles = stepsStyles({
            direction,
            size,
            status: item.status,
            type,
          });
          const isLast = idx === items.length - 1;
          const showConnector = !isLast;

          return (
            <div key={idx} className={itemStyles.item}>
              <div className={itemStyles.itemContent}>
                <div className={itemStyles.icon}>
                  <div className={itemStyles.iconInner}>
                    {item.status === "checked" ? (
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
