import { Combobox, ComboboxRootProps, Portal } from "@ark-ui/react";
import {
  SerendieSymbolMagnifyingGlass,
  SerendieSymbolClose,
} from "@serendie/symbols";
import { cx, RecipeVariantProps, sva } from "../../../styled-system/css";
import { Box } from "../../../styled-system/jsx";

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
    "closeIcon",
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
    closeIcon: {
      opacity: 0,
      "[data-state=open] &": {
        opacity: 1,
      },
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
  RecipeVariantProps<typeof SearchStyle>;

export const Search: React.FC<SearchStyleProps> = ({
  items = [],
  ...props
}) => {
  const [variantProps, elementProps] = SearchStyle.splitVariantProps(props);
  const styles = SearchStyle(variantProps);

  return (
    <Combobox.Root
      items={items}
      lazyMount
      unmountOnExit
      positioning={{
        offset: {
          mainAxis: 2,
          crossAxis: 0,
        },
      }}
      {...elementProps}
    >
      <Combobox.Control className={cx(styles.control, elementProps.className)}>
        <div className={styles.iconBox}>
          <SerendieSymbolMagnifyingGlass className={styles.icon} />
        </div>
        <Combobox.Input className={styles.input} />
        {/* ARK UIではOpenのトリガーも用意されているがデザインではナシ */}
        {items.length > 0 && (
          <Combobox.Trigger>
            <div className={styles.closeIcon}>
              <SerendieSymbolClose className={styles.icon} />
            </div>
          </Combobox.Trigger>
        )}
      </Combobox.Control>
      {items.length > 0 && (
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content className={styles.combobox}>
              <Combobox.ItemGroup id="framework">
                {items.map((item, i) => (
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
      )}
    </Combobox.Root>
  );
};
