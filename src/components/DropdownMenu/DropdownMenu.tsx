import { Menu as ArkMenu, MenuRootProps, Portal } from "@ark-ui/react";
import { useEffect, useRef } from "react";
import {
  SerendieSymbolChevronDown,
  SerendieSymbolMenu,
} from "@serendie/symbols";
import { css, sva } from "../../../styled-system/css";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { ListItem } from "../List";
import { useAutoPortalContainer } from "../../hooks/useAutoPortalContainer";

export const DropdownMenuStyle = sva({
  slots: ["content", "itemGroup", "item", "button", "buttonIcon"],
  base: {
    content: {
      bgColor: "sd.system.color.component.surfaceContainerBright",
      borderRadius: "sd.system.dimension.radius.medium",
      bg: "sd.system.color.component.surfaceContainerBright",
      boxShadow: "sd.system.elevation.shadow.level1",
      outline: "none",
      zIndex: "sd.system.elevation.zIndex.dropdown",
    },
    itemGroup: {
      width: 240,
    },
    item: {
      cursor: "pointer",
      _highlighted: {
        background:
          "color-mix(in srgb, {colors.sd.system.color.interaction.hoveredVariant}, {colors.sd.system.color.component.surface});",
      },
      // メニュー内ではハイライト背景で状態を示すため、ListItem内部のフォーカスoutlineは抑制する
      "& li > div:focus-visible": {
        outline: "none",
      },
    },
    button: {
      paddingY: "sd.system.dimension.spacing.small",
      paddingInlineStart: "sd.system.dimension.spacing.medium",
      paddingRight: "sd.system.dimension.spacing.small",
      color: "sd.system.color.component.onSurfaceVariant",
      gap: "sd.system.dimension.spacing.extraSmall",
      // NOTE: breakpoint の `expanded` が状態condition `_expanded`（aria-expanded）と
      // 名前衝突しているため、`expanded:` / `_expanded` を使うとメニューを開いた時に
      // もレスポンシブタイポグラフィが適用され文字サイズが変わってしまう。衝突を避け
      // るため生の media query と属性セレクタで指定し、開閉状態に依らずサイズを一定に
      // 保つ。
      textStyle: "sd.system.typography.label.large_compact",
      "@media screen and (min-width: 48rem)": {
        textStyle: "sd.system.typography.label.large_expanded",
      },
      // メニューを開いた（aria-expanded）状態でも閉じた状態と同じサイズにする
      "&[data-part='trigger'][aria-expanded='true']": {
        textStyle: "sd.system.typography.label.large_compact",
        "@media screen and (min-width: 48rem)": {
          textStyle: "sd.system.typography.label.large_expanded",
        },
      },
      _disabled: {
        outline: "solid",
        outlineOffset: "0px",
        outlineColor: "sd.system.color.component.outline",
        outlineWidth: "sd.system.dimension.border.medium",
      },
      _expanded: {
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
  headingElement?: React.ReactElement;
  trailingElement?: React.ReactElement;
  /** @deprecated `icon` は廃止予定です。`headingElement` を使ってください */
  icon?: React.ReactElement;
};

export type DropdownMenuProps = {
  styleType?: "default" | "iconButton";
  title: string;
  items: MenuItemProps[];
  disabled?: boolean;
  icon?: React.ReactElement;
  /**
   * Portalを使用するかどうか
   * - `true` (デフォルト): body直下にポータルする。ModalDialog/Drawer内にある場合は自動的にそのコンテンツ内にポータルされる
   * - `false`: ポータルを使用せず、その場にレンダリングする
   * @default true
   */
  portalled?: boolean;
};

export const DropdownMenu: React.FC<DropdownMenuProps & MenuRootProps> = ({
  styleType = "default",
  title,
  items,
  disabled,
  icon,
  portalled = true,
  ...restProps
}) => {
  /* variant なし */
  const styles = DropdownMenuStyle();
  const { triggerRef, portalContainerRef } = useAutoPortalContainer(portalled);

  const warnedRef = useRef(false);
  useEffect(() => {
    if (warnedRef.current) return;
    if (process.env.NODE_ENV === "production") return;
    if (items.some((item) => item.icon)) {
      warnedRef.current = true;
      console.warn(
        "[DropdownMenu] `icon` は廃止予定です。`headingElement` を使ってください。"
      );
    }
  }, []);

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
            ref={triggerRef}
            icon={icon || <SerendieSymbolMenu className={styles.buttonIcon} />}
            shape="rectangle"
            disabled={disabled}
            styleType="outlined"
            title={title}
          />
        ) : (
          <Button
            ref={triggerRef}
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
      <Portal disabled={!portalled} container={portalContainerRef}>
        <ArkMenu.Positioner>
          <ArkMenu.Content className={styles.content}>
            <ArkMenu.ItemGroup className={styles.itemGroup}>
              {items.map((item) => (
                <ArkMenu.Item
                  key={item.value}
                  value={item.value}
                  className={styles.item}
                >
                  <ListItem
                    title={item.label}
                    headingElement={item.headingElement ?? item.icon}
                    trailingElement={item.trailingElement}
                    className={css({ width: "100%", listStyle: "none" })}
                  />
                </ArkMenu.Item>
              ))}
            </ArkMenu.ItemGroup>
          </ArkMenu.Content>
        </ArkMenu.Positioner>
      </Portal>
    </ArkMenu.Root>
  );
};
