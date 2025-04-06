import { ComponentProps } from "react";
import { RecipeVariantProps, cx, sva } from "../../styled-system/css";

const NotificationBadgeStyle = sva({
  slots: ["root", "text"],
  base: {
    root: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 24,
      minWidth: 24,
      color: "sd.system.color.impression.onNegative",
      borderRadius: "sd.system.dimension.radius.full",
      paddingX: "sd.system.dimension.spacing.twoExtraSmall",
      textStyle: "sd.system.typography.label.small_compact",
      _expanded: {
        textStyle: "sd.system.typography.label.small_expanded",
      },
    },
    text: {
      height: 24,
      lineHeight: "24px",
    },
  },
  variants: {
    size: {
      small: {
        root: {
          height: 16,
          minWidth: 16,
          paddingX: "sd.system.dimension.spacing.twoExtraSmall",
        },
      },
      medium: {
        root: {
          height: 24,
          minWidth: 24,
          paddingX: "sd.system.dimension.spacing.extraSmall",
        },
      },
    },
    variant: {
      primary: {
        root: {
          backgroundColor: "sd.system.color.impression.negative",
        },
      },
      secondary: {
        root: {
          backgroundColor: "sd.system.color.impression.primary",
        },
      },
    },
    noNumber: {
      true: {
        root: {
          height: 8,
          paddingX: 0,
          minWidth: 8,
        },
      },
    },
    position: {
      relative: {
        root: {
          position: "relative",
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

type BadgeProps = {
  count?: number;
};

export type NotificationBadgeProps = BadgeProps &
  ComponentProps<"div"> &
  RecipeVariantProps<typeof NotificationBadgeStyle>;

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  noNumber,
  className,
  ...props
}) => {
  const [variantProps, elementProps] =
    NotificationBadgeStyle.splitVariantProps(props);
  const styles = NotificationBadgeStyle({ noNumber, ...variantProps });

  if (noNumber) {
    return <div className={cx(styles.root, className)} {...elementProps}></div>;
  }

  if (!count || count < 1) {
    return null;
  }

  return (
    <div className={cx(styles.root, className)} {...elementProps}>
      <span className={styles.text}>{count > 99 ? "99+" : count}</span>
    </div>
  );
};
