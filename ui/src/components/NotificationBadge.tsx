import { cva } from "../../styled-system/css";

const NotificationBadgeStyle = cva({
  base: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 16,
    minWidth: 16,
    color: "dic.system.color.impression.onNegative",
    borderRadius: "dic.system.dimension.radius.full",
    paddingX: "dic.system.dimension.spacing.twoExtraSmall",
    paddingBottom: 2,
    textStyle: "dic.system.typography.label.small_compact",
    _expanded: {
      textStyle: "dic.system.typography.label.small_expanded",
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "dic.system.color.impression.negative",
      },
      secondary: {
        backgroundColor: "dic.system.color.impression.primary",
      },
    },
    noNumber: {
      true: {
        minW: 8,
        height: 8,
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type NotificationBadgeProps = {
  count: number;
  noNumber?: boolean;
  variant?: "primary" | "secondary";
};

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  ...props
}) => {
  const [cssProps, componentProps] =
    NotificationBadgeStyle.splitVariantProps(props);
  const styles = NotificationBadgeStyle(cssProps);

  if (props.noNumber) {
    return <div className={styles} {...componentProps}></div>;
  }

  if (count === 0) {
    return null;
  }

  return (
    <div className={styles} {...componentProps}>
      <span style={{ height: 11 }}>
        {count > 99 ? "99+" : count > 0 ? count : null}
      </span>
    </div>
  );
};
