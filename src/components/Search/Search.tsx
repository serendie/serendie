import React from "react";
import {
  Combobox,
  ComboboxRootProps,
  Portal,
  createListCollection,
} from "@ark-ui/react";
import {
  SerendieSymbolMagnifyingGlass,
  SerendieSymbolClose,
} from "@serendie/symbols";
import { cx, RecipeVariantProps, sva } from "../../../styled-system/css";
import { Box } from "../../../styled-system/jsx";
import { useAutoPortalContainer } from "../../hooks/useAutoPortalContainer";

/*
 * 検索候補を出すことができるサーチコンボボックス
 * https://ark-ui.com/docs/components/combobox
 * 候補のリストを受け取っていない時には通常の検索窓として使える
 * items: 検索候補のリスト、Easyさを優先しているので型はstringのみ
 */

export const SearchStyle = sva({
  slots: [
    "input",
    "control",
    "combobox",
    "comboboxItem",
    "iconBox",
    "icon",
    "clearTrigger",
  ],
  base: {
    control: {
      display: "inline-grid",
      // 後から指定したCSSからwidthが上書きできないため、@layer componentsを指定
      "@layer components": {
        width: "min(100%, 300px)",
      },
      lineHeight: "1",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      borderRadius: "sd.system.dimension.radius.medium",
      outlineStyle: "solid",
      outlineWidth: "sd.system.dimension.border.medium",
      outlineColor: "sd.system.color.component.outline",
      bg: "sd.system.color.component.surface",
      _focus: {
        outlineWidth: "sd.system.dimension.border.thick",
        outlineColor: "sd.system.color.impression.primary",
      },
      _disabled: {
        bgColor: "sd.system.color.interaction.disabled",
        cursor: "not-allowed",
      },
    },
    input: {
      outline: "none",
      width: "100%",
      textOverflow: "ellipsis",
      _placeholder: {
        color: "sd.system.color.component.onSurfaceVariant",
      },
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
        _placeholder: {
          color: "sd.system.color.interaction.disabledOnSurface",
        },
      },
    },
    combobox: {
      bgColor: "sd.system.color.component.surface",
      borderRadius: "sd.system.dimension.radius.medium",
      boxShadow: "sd.system.elevation.shadow.level1",
      zIndex: "sd.system.elevation.zIndex.dropdown",
      width: "100%",
    },
    comboboxItem: {
      display: "flex",
      gap: "sd.system.dimension.spacing.small",
      cursor: "pointer",
      _highlighted: {
        backgroundColor: "sd.system.color.interaction.hoveredVariant",
      },
    },
    iconBox: {
      display: "flex",
      justifyContent: "center",
      "[data-disabled] &": {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
    icon: {
      width: "sd.system.dimension.spacing.large",
    },
    clearTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
  },
  variants: {
    size: {
      medium: {
        iconBox: {
          w: "40px",
        },
        control: {
          height: 48,
          gap: "sd.system.dimension.spacing.extraSmall",
          textStyle: "sd.system.typography.body.medium_compact",
          paddingTop: "sd.system.dimension.spacing.small",
          paddingRight: "sd.system.dimension.spacing.extraSmall",
          paddingBottom: "sd.system.dimension.spacing.small",
          paddingLeft: "sd.system.dimension.spacing.twoExtraSmall",
        },
        comboboxItem: {
          paddingRight: "sd.system.dimension.spacing.medium",
          paddingLeft: "sd.system.dimension.spacing.medium",
          paddingBottom: "sd.system.dimension.spacing.extraSmall",
          paddingTop: "sd.system.dimension.spacing.extraSmall",
        },
      },
      small: {
        iconBox: {
          w: "20px",
        },
        control: {
          height: 32,
          gap: "sd.system.dimension.spacing.twoExtraSmall",
          textStyle: "sd.system.typography.body.small_compact",
          paddingTop: "sd.system.dimension.spacing.twoExtraSmall",
          paddingLeft: "sd.system.dimension.spacing.extraSmall",
          paddingRight: "sd.system.dimension.spacing.extraSmall",
          paddingBottom: "sd.system.dimension.spacing.twoExtraSmall",
          scrollPaddingLeft: "sd.system.dimension.spacing.twoExtraSmall",
        },
        comboboxItem: {
          gap: "sd.system.dimension.spacing.twoExtraSmall",
          paddingTop: "sd.system.dimension.spacing.extraSmall",
          paddingRight: "sd.system.dimension.spacing.extraSmall",
          paddingBottom: "sd.system.dimension.spacing.extraSmall",
          paddingLeft: "sd.system.dimension.spacing.extraSmall",
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type SearchStyleProps = ComboboxRootProps<string> &
  RecipeVariantProps<typeof SearchStyle> & {
    items?: string[];
    /**
     * Portalを使用するかどうか
     * - `true` (デフォルト): body直下にポータルする。ModalDialog/Drawer内にある場合は自動的にそのコンテンツ内にポータルされる
     * - `false`: ポータルを使用せず、その場にレンダリングする
     * @default true
     */
    portalled?: boolean;
    /**
     * 候補リストにない値（フリーテキスト）での検索を許可するかどうか
     * @default true
     */
    allowCustomValue?: boolean;
    /**
     * 検索実行時のコールバック（Enterキー押下時・候補選択時）
     */
    onSearch?: (value: string) => void;
  };

export const Search: React.FC<SearchStyleProps> = ({
  items = [],
  portalled = true,
  allowCustomValue = true,
  onSearch,
  ...props
}) => {
  const [variantProps, comboboxProps] = SearchStyle.splitVariantProps(props);
  const styles = SearchStyle(variantProps);
  const { collection: _, ...elementProps } = comboboxProps;
  const { triggerRef, portalContainerRef } = useAutoPortalContainer(portalled);

  // controlled / uncontrolled の判定
  const isControlled = elementProps.inputValue !== undefined;

  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    elementProps.defaultInputValue || ""
  );

  const inputValue = isControlled
    ? elementProps.inputValue!
    : uncontrolledValue;

  // ハイライト中の候補を追跡（再レンダリング不要なのでrefを使用）
  const highlightedValueRef = React.useRef<string | null>(null);

  const filteredItems = React.useMemo(() => {
    if (!inputValue) return items;
    return items.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [items, inputValue]);

  const collection = createListCollection({ items: filteredItems });

  const handleInputValueChange = (details: { inputValue: string }) => {
    if (!isControlled) {
      setUncontrolledValue(details.inputValue);
    }
    elementProps.onInputValueChange?.(details);
  };

  // 候補選択時も検索を実行
  const handleValueChange = (details: { value: string[] }) => {
    if (details.value.length > 0) {
      onSearch?.(details.value[0]);
    }
    elementProps.onValueChange?.(details);
  };

  // ハイライト変更を追跡
  const handleHighlightChange = (details: {
    highlightedValue: string | null;
  }) => {
    highlightedValueRef.current = details.highlightedValue;
  };

  // Enterキーでフリーテキスト検索を実行（ハイライト中はArk UIの選択フローに任せる）
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue && !highlightedValueRef.current) {
      onSearch?.(inputValue);
    }
  };

  return (
    <Combobox.Root
      {...elementProps}
      collection={collection}
      openOnClick
      allowCustomValue={allowCustomValue}
      onInputValueChange={handleInputValueChange}
      onValueChange={handleValueChange}
      onHighlightChange={handleHighlightChange}
      lazyMount
      unmountOnExit
      positioning={{
        offset: {
          mainAxis: 2,
          crossAxis: 0,
        },
      }}
    >
      <Combobox.Control
        className={cx(styles.control, elementProps.className)}
        ref={triggerRef}
      >
        <div className={styles.iconBox}>
          <SerendieSymbolMagnifyingGlass className={styles.icon} />
        </div>
        <Combobox.Input className={styles.input} onKeyDown={handleKeyDown} />
        {inputValue && (
          <Combobox.ClearTrigger className={styles.clearTrigger}>
            <SerendieSymbolClose className={styles.icon} />
          </Combobox.ClearTrigger>
        )}
      </Combobox.Control>
      <Portal disabled={!portalled} container={portalContainerRef}>
        <Combobox.Positioner>
          <Combobox.Content className={styles.combobox}>
            <Combobox.ItemGroup id="framework">
              {collection.items.map((item, i) => (
                <Combobox.Item
                  key={i}
                  item={item}
                  className={styles.comboboxItem}
                >
                  <Box
                    w="sd.system.dimension.spacing.large"
                    h="sd.system.dimension.spacing.large"
                  />
                  <Combobox.ItemText>{item}</Combobox.ItemText>
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
};
