import { Tabs as ArkTabs } from "@ark-ui/react";
import { sva } from "../../styled-system/css";
import { NotificationBadge } from "./NotificationBadge";

export const TabItemStyle = sva({
  slots: ["trigger", "dot", "badge"],
  base: {
    trigger: {
      display: "flex",
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
      _hover: {
        color: "dic.system.color.impression.primary",
      },
      _disabled: {
        cursor: "default",
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
    dot: {
      height: 8,
      width: 8,
    },
    badge: {
      height: 16,
      width: 16,
    },
  },
});

export type TabItemProps = {
  title: string;
  value: string;
  disabled?: boolean;
  dot?: boolean;
  badge?: number;
};

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
          <NotificationBadge noNumber />
        </div>
      )}
      {badge && (
        <div className={styles.badge}>
          <NotificationBadge count={badge} size="small" />
        </div>
      )}
    </ArkTabs.Trigger>
  );
};
