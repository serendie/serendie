import { Tabs as ArkTabs } from "@ark-ui/react";
import { RecipeVariantProps, sva } from "../../styled-system/css";
import { NotificationBadge } from "./NotificationBadge";

export const TabItemStyle = sva({
  slots: ["trigger", "dot", "badgeBox", "badge"],
  base: {
    trigger: {
      display: "flex",
      justifyContent: "center",
      flex: 1,
      gap: "dic.system.dimension.spacing.twoExtraSmall",
      alignItems: "center",
      height: 44,
      cursor: "pointer",
      color: "dic.system.color.component.onSurface",
      transitionDuration: ".2s",
      transitionProperty: "color, border-color",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      borderBottom: "2px solid",
      borderBottomColor: "transparent",
      textStyle: "dic.system.typography.label.large_compact",
      _expanded: {
        textStyle: "dic.system.typography.label.large_expanded",
      },
      _selected: {
        color: "dic.system.color.impression.primary",
        fontWeight: "bold",
        borderBottomColor: "dic.system.color.impression.primary",
      },
      _disabled: {
        cursor: "default",
        color: "dic.system.color.interaction.disabledOnSurface",
      },
      _hover: {
        color: "dic.system.color.impression.primary",
        _disabled: {
          color: "dic.system.color.interaction.disabledOnSurface",
        },
      },
      _focusVisible: {
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "dic.system.color.component.outline",
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
        "color-mix(in srgb, {colors.dic.system.color.interaction.hoveredOnPrimary}, {colors.dic.system.color.impression.negativeContainer});",
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
  ExclusiveBadgeProps;

export const TabItem: React.FC<TabItemProps> = ({
  title,
  value,
  disabled,
  dot,
  badge,
  ...props
}) => {
  const [cssProps, componentProps] = TabItemStyle.splitVariantProps(props);
  const styles = TabItemStyle(cssProps);
  const badgeStyle = disabled ? styles.badge : "";

  return (
    <ArkTabs.Trigger
      value={value}
      className={styles.trigger}
      disabled={disabled}
      {...componentProps}
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
