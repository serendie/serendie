import { RecipeVariantProps, sva } from "../../styled-system/css";

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
      color: "dic.system.color.impression.onNegative",
      borderRadius: "dic.system.dimension.radius.full",
      paddingX: "dic.system.dimension.spacing.twoExtraSmall",
      textStyle: "dic.system.typography.label.small_compact",
      _expanded: {
        textStyle: "dic.system.typography.label.small_expanded",
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
          paddingX: "dic.system.dimension.spacing.twoExtraSmall",
        },

      },
      medium: {
        root: {
          height: 24,
          minWidth: 24,
          paddingX: "dic.system.dimension.spacing.extraSmall",
        },
      },
    },
    variant: {
      primary: {
        root: {
          backgroundColor: "dic.system.color.impression.negative",
        },
      },
      secondary: {
        root: {
          backgroundColor: "dic.system.color.impression.primary",
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
  RecipeVariantProps<typeof NotificationBadgeStyle>;

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  noNumber,
  ...props
}) => {
  const [cssProps, componentProps] =
    NotificationBadgeStyle.splitVariantProps(props);
  const styles = NotificationBadgeStyle({ noNumber, ...cssProps });

  if (noNumber) {
    return <div className={styles.root} {...componentProps}></div>;
  }

  if (!count || count < 1) {
    return null;
  }

  return (
    <div className={styles.root} {...componentProps}>
      <span className={styles.text}>{count > 99 ? "99+" : count}</span>
    </div>
  );
};
