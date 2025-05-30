import { Menu as ArkMenu, MenuRootProps, Portal } from "@ark-ui/react";
import {
  SerendieSymbolChevronDown,
  SerendieSymbolMenu,
} from "@serendie/symbols";
import { sva } from "../../../styled-system/css";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

export const DropdownMenuStyle = sva({
  slots: ["content", "itemGroup", "item", "itemIcon", "button", "buttonIcon"],
  base: {
    content: {
      bgColor: "sd.system.color.component.surface",
      borderRadius: "sd.system.dimension.radius.medium",
      bg: "sd.system.color.component.surface",
      boxShadow: "sd.system.elevation.shadow.level1",
      outline: "none",
    },
    itemGroup: {
      width: 240,
    },
    item: {
      display: "flex",
      height: "48px",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.small",
      paddingX: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.extraSmall",
      cursor: "pointer",
      textStyle: "sd.system.typography.body.medium_compact",
      expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
      _hover: {
        bgColor: "sd.system.color.interaction.hoveredVariant",
      },
      _highlighted: {
        bgColor: "sd.system.color.interaction.hoveredVariant",
      },
    },
    itemIcon: {
      "& svg": {
        width: "sd.reference.dimension.scale.8",
        height: "sd.reference.dimension.scale.8",
      },
    },
    button: {
      paddingY: "sd.system.dimension.spacing.small",
      paddingInlineStart: "sd.system.dimension.spacing.medium",
      paddingRight: "sd.system.dimension.spacing.small",
      color: "sd.system.color.component.onSurfaceVariant",
      gap: "sd.system.dimension.spacing.extraSmall",
      textStyle: "sd.system.typography.body.medium_compact",
      expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
      _disabled: {
        outline: "solid",
        outlineOffset: "0px",
        outlineColor: "sd.system.color.component.outline",
        outlineWidth: "sd.system.dimension.border.medium",
      },
      _expanded: {
        textStyle: "sd.system.typography.body.medium_compact",
        expanded: {
          textStyle: "sd.system.typography.body.medium_expanded",
        },
        // Note: leftIcon が _open を受け取れないため button 側で制御
        "& svg": {
          transform: "rotate(180deg)",
        },
      },
    },
    buttonIcon: {
      color: "sd.system.color.component.onSurface",
      marginLeft: "2px",
      transition: "transform 0.2s",
    },
  },
});

export type MenuItemProps = {
  value: string;
  label: string;
  icon?: React.ReactElement;
};

export type DropdownMenuProps = {
  styleType?: "default" | "iconButton";
  title: string;
  items: MenuItemProps[];
  disabled?: boolean;
  icon?: React.ReactElement;
};

export const DropdownMenu: React.FC<DropdownMenuProps & MenuRootProps> = ({
  styleType = "default",
  title,
  items,
  disabled,
  icon,
  ...restProps
}) => {
  /* variant なし */
  const styles = DropdownMenuStyle();

  return (
    <ArkMenu.Root
      positioning={{
        offset: {
          mainAxis: 1,
          crossAxis: 0,
        },
      }}
      {...restProps}
    >
      <ArkMenu.Trigger asChild>
        {styleType === "iconButton" ? (
          <IconButton
            icon={icon || <SerendieSymbolMenu className={styles.buttonIcon} />}
            shape="rectangle"
            disabled={disabled}
            styleType="outlined"
            title={title}
          />
        ) : (
          <Button
            styleType="rectangle"
            size="medium"
            disabled={disabled}
            rightIcon={
              <SerendieSymbolChevronDown className={styles.buttonIcon} />
            }
            className={styles.button}
          >
            {title}
          </Button>
        )}
      </ArkMenu.Trigger>
      <Portal>
        <ArkMenu.Positioner>
          <ArkMenu.Content className={styles.content}>
            <ArkMenu.ItemGroup className={styles.itemGroup}>
              {items.map((item) => (
                <ArkMenu.Item
                  key={item.value}
                  value={item.value}
                  className={styles.item}
                >
                  {item.icon && (
                    <div className={styles.itemIcon}>{item.icon}</div>
                  )}
                  {item.label}
                </ArkMenu.Item>
              ))}
            </ArkMenu.ItemGroup>
          </ArkMenu.Content>
        </ArkMenu.Positioner>
      </Portal>
    </ArkMenu.Root>
  );
};
