import { ComponentProps } from "react";
import { RecipeVariantProps, cx, sva } from "../../styled-system/css";
import { NotificationBadge } from "./NotificationBadge";
import { SvgIcon, SvgIconName } from "./SvgIcon";

export const BottomNavigationItemStyle = sva({
  slots: ["root", "iconGroup", "icon", "label", "badge"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "sd.system.dimension.spacing.twoExtraSmall",
      height: 64,
      flex: 1,
      cursor: "pointer",
    },
    iconGroup: {
      position: "relative",
    },
    label: {
      color: "sd.system.color.component.onSurface",
      textStyle: "sd.system.typography.label.small_compact",
      expanded: {
        textStyle: "sd.system.typography.label.small_compact",
      },
    },
    icon: {
      color: "sd.system.color.component.onSurface",
    },
    badge: {
      position: "absolute",
      top: "-6px",
      right: "4px",
    },
  },
  variants: {
    isActive: {
      true: {
        label: {
          color: "sd.system.color.impression.primary",
        },
        icon: {
          color: "sd.system.color.impression.primary",
        },
      },
    },
    dot: {
      true: {
        badge: {
          top: "-2.5px",
          right: "4px",
        },
      },
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

type Props = {
  icon: SvgIconName;
  label: string;
  count?: number;
};

export type BottomNavigationItemProps = Props &
  ComponentProps<"button"> &
  RecipeVariantProps<typeof BottomNavigationItemStyle>;

export const BottomNavigationItem: React.FC<BottomNavigationItemProps> = ({
  icon,
  label,
  count,
  className,
  ...props
}) => {
  const [variantProps, elementProps] =
    BottomNavigationItemStyle.splitVariantProps(props);
  const styles = BottomNavigationItemStyle(variantProps);

  return (
    <button className={cx(styles.root, className)} {...elementProps}>
      <div className={styles.iconGroup}>
        <div className={styles.badge}>
          <NotificationBadge
            count={count || 0}
            noNumber={variantProps.dot}
            size="small"
          />
        </div>
        <SvgIcon icon={icon} size="24px" className={styles.icon} />
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  );
};
