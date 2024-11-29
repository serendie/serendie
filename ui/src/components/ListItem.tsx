import { ComponentProps } from "react";
import { css, cx, sva } from "../../styled-system/css";
import { NotificationBadge } from "./NotificationBadge";

export const ListItemStyle = sva({
  slots: [
    "root",
    "wrapper",
    "textGroup",
    "title",
    "description",
    "rightIcon",
    "leftIcon",
    "badge",
  ],
  base: {
    root: {
      position: "relative",
    },
    wrapper: {
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
      _selected: {
        background: "sd.system.color.interaction.selectedSurface",
        _hover: {
          background: "sd.system.color.interaction.selectedSurface",
        },
      },
      _disabled: {
        opacity: 0.3,
        cursor: "not-allowed",
        _selected: {
          background: "transparent",
        },
      },
    },
    textGroup: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    title: {
      py: "sd.system.dimension.spacing.twoExtraSmall",
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
      display: "flex",
      flexDirection: "column",
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
        width: "24px",
        height: "24px",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    rightIcon: {
      flexShrink: 0,
      "& svg": {
        width: "24px",
        height: "24px",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    badge: {
      position: "absolute",
      right: "sd.system.dimension.spacing.medium",
      top: "sd.system.dimension.spacing.extraSmall",
      height: 24,
      minW: 24,
    },
  },
  variants: {
    isLargeLeftIcon: {
      true: {
        leftIcon: {
          "& svg": {
            width: "40px",
            height: "40px",
          },
        },
      },
      false: {},
    },
    size: {
      small: {
        wrapper: {
          minH: 38,
        },
      },
    },
  },
});

type ListItemBaseProps = {
  title: string;
  description?: string;
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  isLargeLeftIcon?: boolean;
  badge?: number;
  children?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  focusVisible?: boolean;
  size?: "small";
};

type ExclusiveRightItemProps =
  | ({ badge?: number } & { rightIcon?: never })
  | ({ badge?: never } & { rightIcon?: React.ReactElement });

type ListItemProps = ComponentProps<"li"> &
  ListItemBaseProps &
  ExclusiveRightItemProps;

export const ListItem: React.FC<ListItemProps> = ({
  leftIcon,
  rightIcon,
  title,
  description,
  badge,
  children,
  disabled,
  selected,
  focusVisible,
  className,
  ...props
}) => {
  const [variantProps, elementProps] = ListItemStyle.splitVariantProps(props);
  const styles = ListItemStyle(variantProps);
  // const iconSize = isLargeLeftIcon ? "40px" : "24px";

  return (
    <li className={cx(styles.root, className)} {...elementProps}>
      <div
        tabIndex={1}
        /* TODO: tabIndexでfocusableにしてるけど、そもそもリンクやボタンとして扱うための仕組みが必要 */
        className={cx(
          styles.wrapper,
          description && css({ alignItems: "flex-start" })
        )}
        data-disabled={disabled ? true : undefined}
        data-selected={selected ? true : undefined}
        data-focus-visible={focusVisible ? true : undefined}
      >
        {leftIcon && (
          <div
            className={styles.leftIcon}
            style={
              props.isLargeLeftIcon
                ? { padding: "0", width: "40px", height: "40px" }
                : { padding: "0", width: "24px", height: "24px" }
            }
          >
            {leftIcon}
          </div>
        )}
        <div
          className={cx(
            styles.textGroup,
            (!!description || !!children) && css({ alignItems: "flex-start" })
          )}
        >
          <span className={styles.title}>{title}</span>
          <div className={styles.description}>
            {description}
            {children}
          </div>
        </div>
        {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
      </div>
      {badge && (
        <div className={styles.badge}>
          <NotificationBadge count={badge} variant="secondary" />
        </div>
      )}
    </li>
  );
};
