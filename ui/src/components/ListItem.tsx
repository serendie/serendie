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
    "title",
    "description",
    "rightIcon",
    "leftIcon",
    "badge",
  ],
  base: {
    root: {
      minH: 48,
      display: "flex",
      alignItems: "center",
      paddingX: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.extraSmall",
      gap: "sd.system.dimension.spacing.small",
      cursor: "pointer",
      _hover: {
        background:
          "color-mix(in srgb, {colors.sd.system.color.interaction.hoveredVariant}, {colors.sd.system.color.component.surface});",
      },
      _focusVisible: {
        outline: "1px solid",
        outlineColor: "sd.system.color.component.outline",
      },
    },
    textGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.twoExtraSmall",
      flexGrow: 1,
    },
    title: {
      textStyle: "sd.system.typography.label.extraLarge_compact",
      color: "sd.system.color.component.onSurface",
      _expanded: {
        textStyle: "sd.system.typography.label.extraLarge_expanded",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    description: {
      textStyle: "sd.system.typography.body.extraSmall_compact",
      color: "sd.system.color.component.onSurfaceVariant",
      _expanded: {
        textStyle: "sd.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    leftIcon: {
      flexShrink: 0,
      "& svg": {
        display: "block",
        maxHeight: "100%",
        maxWidth: "100%",
      },
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
  title: string;
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
  title,
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
    <li
      className={styles.root}
      style={itemStyle}
      /* TODO: tabIndexでfocusableにしてるけど、そもそもリンクやボタンとして扱うための仕組みが必要 */
      tabIndex={1}
      {...componentProps}
    >
      {leftIcon && (
        <div
          className={styles.leftIcon}
          style={
            isLargeLeftIcon
              ? { padding: "0", width: "40px", height: "40px" }
              : { padding: "0", width: "24px", height: "24px" }
          }
        >
          <SvgIcon icon={leftIcon} size={iconSize} />
        </div>
      )}
      <div className={styles.textGroup} style={textGroupStyle}>
        <span className={styles.title}>{title}</span>
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
