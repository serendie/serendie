import { CSSProperties } from "react";
import { SvgIcon } from "..";
import { sva } from "../../styled-system/css";
import { SvgIconName } from "./SvgIcon";
import { NotificationBadge } from "./NotificationBadge";
import { HTMLStyledProps } from "../../styled-system/types";
import { splitCssProps } from "../../styled-system/jsx";

export const ListItemStyle = sva({
  slots: [
    "root",
    "textGroup",
    "text",
    "description",
    "rightIcon",
    "leftIcon",
    "badge",
  ],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      paddingX: "dic.system.dimension.spacing.medium",
      paddingY: "dic.system.dimension.spacing.extraSmall",
      gap: "dic.system.dimension.spacing.small",
      background: "dic.system.color.component.surface",
      cursor: "pointer",
      _hover: {
        background:
          "color-mix(in srgb, {colors.dic.system.color.interaction.hoveredVariant}, {colors.dic.system.color.component.surface});",
      },
    },
    textGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "dic.system.dimension.spacing.twoExtraSmall",
      flexGrow: 1,
    },
    text: {
      textStyle: "dic.system.typography.label.extraLarge_compact",
      color: "dic.system.color.component.onSurface",
      _expanded: {
        textStyle: "dic.system.typography.label.extraLarge_expanded",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    description: {
      textStyle: "dic.system.typography.body.extraSmall_compact",
      color: "dic.system.color.component.onSurfaceVariant",
      _expanded: {
        textStyle: "dic.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    leftIcon: {
      flexShrink: 0,
      _disabled: {
        opacity: 0.3,
      },
    },
    rightIcon: {
      flexShrink: 0,
      _disabled: {
        opacity: 0.3,
      },
    },
    badge: {
      flexShrink: 0,
      height: 24,
      minW: 24,
    },
  },
});

type ListItemBaseProps = {
  text: string;
  description?: string;
  rightIcon?: SvgIconName;
  leftIcon?: SvgIconName;
  isLargeLeftIcon?: boolean;
  badge?: number;
  children?: React.ReactNode;
  disabled?: boolean;
};

type ExclusiveRightItemProps =
  | ({ badge?: number } & { rightIcon?: never })
  | ({ badge?: never } & { rightIcon?: SvgIconName });

type ListItemProps = HTMLStyledProps<"li"> &
  ListItemBaseProps &
  ExclusiveRightItemProps;

export const ListItem: React.FC<ListItemProps> = ({
  leftIcon,
  rightIcon,
  isLargeLeftIcon,
  text,
  description,
  badge,
  children,
  ...props
}) => {
  const [cssProps, componentProps] = splitCssProps(props);
  const styles = ListItemStyle(cssProps);
  const itemStyle: CSSProperties = description
    ? { alignItems: "flex-start" }
    : {};
  const textGroupStyle: CSSProperties =
    description || children ? { alignItems: "flex-start" } : { gap: 0 };
  const iconSize = isLargeLeftIcon ? "40px" : "24px";

  return (
    <li className={styles.root} style={itemStyle} {...componentProps}>
      {leftIcon && (
        <div className={styles.leftIcon}>
          <SvgIcon icon={leftIcon} size={iconSize} />
        </div>
      )}
      <div className={styles.textGroup} style={textGroupStyle}>
        <span className={styles.text}>{text}</span>
        <span className={styles.description}>{description}</span>
        {children}
      </div>
      {badge && (
        <div className={styles.badge}>
          <NotificationBadge count={badge} variant="secondary" />
        </div>
      )}
      {rightIcon && (
        <div className={styles.rightIcon}>
          <SvgIcon icon={rightIcon} size="24px" />
        </div>
      )}
    </li>
  );
};
