import { CSSProperties } from "react";
import { SvgIcon } from "..";
import { sva } from "../../styled-system/css";
import { SvgIconName } from "./SvgIcon";

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
      gap: "dic.system.dimension.spacing.extraSmall",
    },
    text: {
      textStyle: "dic.system.typography.label.extraLarge_compact",
      color: "dic.system.color.component.onSurface",
      _expanded: {
        textStyle: "dic.system.typography.label.extraLarge_expanded",
      },
    },
    description: {
      textStyle: "dic.system.typography.body.small_compact",
      color: "dic.system.color.component.onSurfaceVariant",
      _expanded: {
        textStyle: "dic.system.typography.body.small_expanded",
      },
    },
  },
});

type ListItemProps = {
  text: string;
  description?: string;
  rightIcon?: SvgIconName;
  leftIcon?: SvgIconName;
  badge?: number;
};

export const ListItem: React.FC<ListItemProps> = ({
  leftIcon,
  text,
  description,
  ...props
}) => {
  const styles = ListItemStyle(props);
  const itemStyle: CSSProperties = description
    ? { alignItems: "flex-start" }
    : {};

  return (
    <li className={styles.root} style={itemStyle}>
      {leftIcon && (
        <div>
          <SvgIcon icon={leftIcon} size="24px"/>
        </div>
      )}
      <div className={styles.textGroup}>
        <span className={styles.text}>{text}</span>
        <span className={styles.description}>{description}</span>
      </div>
    </li>
  );
};
