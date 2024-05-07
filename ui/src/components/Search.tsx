import { Combobox, ComboboxRootProps, Portal } from "@ark-ui/react";
import { RecipeVariantProps, sva } from "../../styled-system/css";
import { SvgIcon } from "./SvgIcon";
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
    "closeIcon",
  ],
  base: {
    control: {
      display: "inline-grid",
      lineHeight: "1",
      gridTemplateColumns: "auto 1fr auto",
      paddingTop: "dic.system.dimension.spacing.small",
      paddingRight: "dic.system.dimension.spacing.extraSmall",
      paddingBottom: "dic.system.dimension.spacing.small",
      paddingLeft: "dic.system.dimension.spacing.twoExtraSmall",
      alignItems: "center",
      borderRadius: "dic.system.dimension.radius.medium",
      outlineStyle: "solid",
      outlineWidth: "dic.system.dimension.border.medium",
      outlineColor: "dic.system.color.component.outline",
      bg: "dic.system.color.component.surface",
      _focus: {
        outlineWidth: "dic.system.dimension.border.thick",
        outlineColor: "dic.system.color.impression.primary",
      },
      _disabled: {
        bgColor: "dic.system.color.interaction.disabled",
        cursor: "not-allowed",
      },
    },
    input: {
      outline: "none",
      width: "100%",
      textOverflow: "ellipsis",
      _placeholder: {
        color: "dic.system.color.component.onSurfaceVariant",
      },
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
        _placeholder: {
          color: "dic.system.color.interaction.disabledOnSurface",
        },
      },
    },
    combobox: {
      bgColor: "dic.system.color.component.surface",
      borderRadius: "dic.system.dimension.radius.medium",
      boxShadow: "dic.system.elevation.shadow.level1",
      zIndex: "dic.system.elevation.zIndex.dropdown",
      width: "100%",
    },
    comboboxItem: {
      paddingTop: "dic.system.dimension.spacing.extraSmall",
      paddingRight: "dic.system.dimension.spacing.medium",
      paddingBottom: "dic.system.dimension.spacing.extraSmall",
      paddingLeft: "dic.system.dimension.spacing.medium",
    },
    iconBox: {
      w: "40px",
      display: "flex",
      justifyContent: "center",
      "[data-disabled] &": {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
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
        control: {
          bg: {
            base: "red",
            sm: "blue",
          },
        },
        combobox: {
          textStyle: {
            base: "dic.system.typography.body.medium_compact",
            sm: "dic.system.typography.body.medium_expanded",
          },
        },
      },
      small: {
        combobox: {
          fontStyle: {
            base: "dic.system.typography.body.medium_compact",
            sm: "dic.system.typography.body.medium_expanded",
          },
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
  const styles = SearchStyle(props);

  return (
    <Combobox.Root items={items} lazyMount unmountOnExit {...props}>
      <Combobox.Control className={styles.control}>
        <div className={styles.iconBox}>
          <SvgIcon icon="search" />
        </div>
        <Combobox.Input className={styles.input} />
        {/* ARK UIではOpenのトリガーも用意されているがデザインではナシ */}
        <Combobox.Trigger>
          <div className={styles.closeIcon}>
            <SvgIcon icon="close" />
          </div>
        </Combobox.Trigger>
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
                    className={styles.comboboxItem}>
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
