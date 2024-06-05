import { RecipeVariantProps, sva } from "../../styled-system/css";
import { getToken } from "../tokens/getToken";
import { NotificationBadge } from "./NotificationBadge";
import { SvgIcon, SvgIconName } from "./SvgIcon";

const { dic } = getToken();

export const BottomNavigationItemStyle = sva({
  slots: ["root", "iconGroup", "icon", "label", "badge"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "dic.system.dimension.spacing.twoExtraSmall",
      height: 64,
      flex: 1,
      cursor: "pointer",
    },
    iconGroup: {
      position: "relative",
    },
    label: {
      color: "dic.system.color.component.onSurface",
      textStyle: "dic.system.typography.label.small_compact",
      expanded: {
        textStyle: "dic.system.typography.label.small_compact",
      },
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
          color: "dic.system.color.impression.primary",
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
  RecipeVariantProps<typeof BottomNavigationItemStyle>;

export const BottomNavigationItem: React.FC<BottomNavigationItemProps> = ({
  icon,
  label,
  count,
  ...props
}) => {
  const [cssProps, componentProps] =
    BottomNavigationItemStyle.splitVariantProps(props);
  const styles = BottomNavigationItemStyle(cssProps);
  const dot = cssProps.dot;
  const iconColor = cssProps.isActive ? dic.system.color.impression.primary : dic.system.color.component.onSurface;

  return (
    <button className={styles.root} {...componentProps}>
      <div className={styles.iconGroup}>
        <div className={styles.badge}>
          <NotificationBadge count={count || 0} noNumber={dot} />
        </div>
        <SvgIcon icon={icon} size="24px" color={iconColor} />
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  );
};
