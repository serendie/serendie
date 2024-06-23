import { Combobox, ComboboxRootProps, Portal } from "@ark-ui/react";
import { RecipeVariantProps, sva } from "../../styled-system/css";
import { SvgIcon } from "./SvgIcon";
import { Box } from "../../styled-system/jsx";
import { getToken } from "../tokens/getToken";

const { sd } = getToken();

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
      height: 48,
      display: "inline-grid",
      lineHeight: "1",
      gridTemplateColumns: "auto 1fr auto",
      paddingTop: "sd.system.dimension.spacing.small",
      paddingRight: "sd.system.dimension.spacing.extraSmall",
      paddingBottom: "sd.system.dimension.spacing.small",
      paddingLeft: "sd.system.dimension.spacing.twoExtraSmall",
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
      w: "40px",
      display: "flex",
      justifyContent: "center",
      "[data-disabled] &": {
        color: "sd.system.color.interaction.disabledOnSurface",
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
          textStyle: {
            base: "sd.system.typography.body.medium_compact",
            expanded: "sd.system.typography.body.medium_expanded",
          },
        },
        comboboxItem: {
          paddingRight: "sd.system.dimension.spacing.medium",
          paddingLeft: "sd.system.dimension.spacing.medium",
          paddingBottom: {
            base: "sd.system.dimension.spacing.small",
            expanded: "sd.system.dimension.spacing.extraSmall",
          },
          paddingTop: {
            base: "sd.system.dimension.spacing.small",
            expanded: "sd.system.dimension.spacing.extraSmall",
          },
        },
      },
      small: {
        control: {
          textStyle: {
            base: "sd.system.typography.body.small_compact",
          },
        },
        comboboxItem: {
          paddingTop: "sd.system.dimension.spacing.extraSmall",
          paddingRight: "sd.system.dimension.spacing.medium",
          paddingBottom: "sd.system.dimension.spacing.extraSmall",
          paddingLeft: "sd.system.dimension.spacing.medium",
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
          <SvgIcon icon="search" size={sd.system.dimension.spacing.large} />
        </div>
        <Combobox.Input className={styles.input} />
        {/* ARK UIではOpenのトリガーも用意されているがデザインではナシ */}
        <Combobox.Trigger>
          <div className={styles.closeIcon}>
            <SvgIcon icon="close" size={sd.system.dimension.spacing.large} />
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
