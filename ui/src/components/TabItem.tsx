import { Tabs as ArkTabs } from "@ark-ui/react";
import { sva } from "../../styled-system/css";

export const TabItemStyle = sva({
  slots: ["root", "label"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "dic.system.dimension.spacing.small",
      paddingY: "dic.system.dimension.spacing.medium",
      paddingX: "dic.system.dimension.spacing.medium",
      cursor: "pointer",
      color: "dic.system.color.component.onSurface",
      transitionDuration: ".2s",
      transitionProperty: "color",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      _selected: {
        color: "dic.system.color.impression.primary",
      },
      _disabled: {
        cursor: "default",
        color: "dic.system.color.interaction.disabled",
      },
    },
    label: {},
  },
});

export type TabItemProps = {
  title: string;
  value: string;
  disabled?: boolean;
  badge?: boolean;
  number?: number;
};

export const TabItem: React.FC<TabItemProps> = ({
  title,
  value,
  disabled,
  ...props
}) => {
  const [cssProps, componentProps] = TabItemStyle.splitVariantProps(props);
  const styles = TabItemStyle(cssProps);

  return (
    <ArkTabs.Trigger
      value={value}
      className={styles.root}
      disabled={disabled}
      {...componentProps}
    >
      {title}
    </ArkTabs.Trigger>
  );
};
