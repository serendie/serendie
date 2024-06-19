import { Menu as ArkMenu } from "@ark-ui/react";
import { Button, IconButton, SvgIcon, SvgIconName } from "..";
import { sva } from "../../styled-system/css";
import { splitCssProps } from "../../styled-system/jsx";

export const DropdownMenuStyle = sva({
  slots: ["content", "itemGroup", "item"],
  base: {
    content: {
      bgColor: "sd.system.color.component.surface",
      borderRadius: "sd.system.dimension.radius.medium",
      bg: "sd.system.color.component.surface",
      boxShadow: "sd.system.elevation.shadow.level1",
      outline: "none",
    },
    itemGroup: {
      padding: "sd.system.dimension.spacing.medium",
    },
    item: {
      display: "flex",
      height: "48px",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.small",
      paddingX: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.extraSmall",
      cursor: "pointer",
      textStyle: "sd.system.typography.label.extraLarge_compact",
      _expanded: {
        textStyle: "sd.system.typography.label.extraLarge_expanded",
      },
      _hover: {
        bgColor: "sd.system.color.interaction.hoveredVariant",
      },
      _highlighted: {
        bgColor: "sd.system.color.interaction.hoveredVariant",
      }
    },
  }
});

export type MenuItemProps = {
  value: string;
  label: string;
  icon?: SvgIconName;
};

type MenuBaseProps = {
  isIconMenu?: boolean;
  title: string;
  items: MenuItemProps[];
};

export const DropdownMenu: React.FC<MenuBaseProps> = ({
  isIconMenu,
  title,
  items,
  ...props
}) => {
  const [cssProps, componentProps] = splitCssProps(props);
  const styles = DropdownMenuStyle(cssProps);

  return (
    <ArkMenu.Root {...componentProps}>
      <ArkMenu.Trigger asChild>
        {isIconMenu ? <IconButton icon="menu" shape="rectangle" /> : <Button styleType="outline" >{title}</Button>}
      </ArkMenu.Trigger>
      <ArkMenu.Positioner>
        <ArkMenu.Content className={styles.content}>
          <ArkMenu.ItemGroup>
            {items.map((item) => (
              <ArkMenu.Item key={item.value} value={item.value} className={styles.item}>
                {item.icon && <SvgIcon icon={item.icon} size="24px" />}
                {item.label}
              </ArkMenu.Item>
            ))}
          </ArkMenu.ItemGroup>
        </ArkMenu.Content>
      </ArkMenu.Positioner>
    </ArkMenu.Root>
  );
};
