import { Tabs as ArkTabs } from "@ark-ui/react";
import { cx, RecipeVariantProps, sva } from "../../styled-system/css";
import { NotificationBadge } from "./NotificationBadge";

export const TabItemStyle = sva({
  slots: ["trigger", "dot", "badgeBox", "badge"],
  base: {
    trigger: {
      display: "flex",
      justifyContent: "center",
      flex: 1,
      gap: "sd.system.dimension.spacing.twoExtraSmall",
      alignItems: "center",
      height: 44,
      cursor: "pointer",
      color: "sd.system.color.component.onSurface",
      transitionDuration: ".2s",
      transitionProperty: "color, border-color",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      borderBottom: "2px solid",
      borderBottomColor: "transparent",
      textStyle: "sd.system.typography.label.large_compact",
      _expanded: {
        textStyle: "sd.system.typography.label.large_expanded",
      },
      _selected: {
        color: "sd.system.color.impression.primary",
        fontWeight: "bold",
        borderBottomColor: "sd.system.color.impression.primary",
      },
      _disabled: {
        cursor: "default",
        color: "sd.system.color.interaction.disabledOnSurface",
      },
      _hover: {
        color: "sd.system.color.impression.primary",
        _disabled: {
          color: "sd.system.color.interaction.disabledOnSurface",
        },
      },
      _focusVisible: {
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "sd.system.color.component.outline",
        outlineOffset: "-1px",
      },
    },
    dot: {
      height: 8,
      width: 8,
    },
    badgeBox: {
      height: 16,
      width: 16,
    },
    badge: {
      backgroundColor:
        "color-mix(in srgb, {colors.sd.system.color.interaction.hoveredOnPrimary}, {colors.sd.system.color.impression.negativeContainer});",
    },
  },
});

type TabItemBaseProps = {
  title: string;
  value: string;
  dot?: boolean;
  disabled?: boolean;
  badge?: number;
};

type ExclusiveBadgeProps =
  | ({ badge?: number } & { dot?: never })
  | ({ badge?: never } & { dot?: boolean });

export type TabItemProps = TabItemBaseProps &
  RecipeVariantProps<typeof TabItemStyle> &
  ArkTabs.TriggerProps &
  ExclusiveBadgeProps;

export const TabItem = ({
  title,
  value,
  disabled,
  dot,
  badge,
  className,
  ...props
}: TabItemProps) => {
  const [variantProps, elementProps] = TabItemStyle.splitVariantProps(props);
  const styles = TabItemStyle(variantProps);
  const badgeStyle = disabled ? styles.badge : "";

  return (
    <ArkTabs.Trigger
      value={value}
      className={cx(styles.trigger, className)}
      disabled={disabled}
      {...elementProps}
    >
      <span>{title}</span>
      {dot && (
        <div className={styles.dot}>
          <NotificationBadge noNumber className={badgeStyle} />
        </div>
      )}
      {badge && (
        <div className={styles.badgeBox}>
          <NotificationBadge
            count={badge}
            size="small"
            className={badgeStyle}
          />
        </div>
      )}
    </ArkTabs.Trigger>
  );
};
