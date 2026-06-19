import {
  Select as ArkSelect,
  Portal,
  SelectRootProps,
  createListCollection,
} from "@ark-ui/react";
import { SerendieSymbolChevronDown } from "@serendie/symbols";
import { RecipeVariantProps, css, cx, sva } from "../../../styled-system/css";
import { List, ListItem } from "../List";
import { useAutoPortalContainer } from "../../hooks/useAutoPortalContainer";
import { useTranslations } from "../../i18n";

export const SelectStyle = sva({
  slots: ["root", "valueText", "trigger", "content", "item", "iconBox"],
  base: {
    root: {
      display: "inline-grid",
      "@layer components": {
        width: "min(100%, 300px)",
      },
      rowGap: "sd.system.dimension.spacing.extraSmall",
    },
    trigger: {
      width: "100%",
      textAlign: "left",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      paddingTop: "sd.system.dimension.spacing.small",
      paddingRight: "sd.system.dimension.spacing.extraSmall",
      paddingBottom: "sd.system.dimension.spacing.small",
      paddingLeft: "sd.system.dimension.spacing.medium",
      alignItems: "center",
      borderRadius: "sd.system.dimension.radius.medium",
      outlineStyle: "solid",
      outlineWidth: "sd.system.dimension.border.medium",
      outlineColor: "sd.system.color.component.outline",
      bg: "sd.system.color.component.surface",
      cursor: "pointer",
      _enabled: {
        _focusVisible: {
          outlineWidth: "sd.system.dimension.border.thick",
          outlineColor: "sd.system.color.impression.primary",
        },
        _hover: {
          outlineColor: "sd.system.color.interaction.hovered",
          bg: "color-mix(in srgb, {colors.sd.system.color.component.surface}, {colors.sd.system.color.interaction.hoveredVariant})",
        },
      },
      _disabled: {
        bgColor: "sd.system.color.interaction.disabled",
        color: "sd.system.color.interaction.disabledOnSurface",
        cursor: "not-allowed",
      },
      _invalid: {
        outlineColor: "sd.system.color.impression.negative",
      },
    },
    valueText: {
      outline: "none",
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textStyle: {
        base: "sd.system.typography.body.medium_compact",
        expanded: "sd.system.typography.body.medium_expanded",
      },
      "[data-placeholder-shown] &": {
        color: "sd.system.color.component.onSurfaceVariant",
      },
      _disabled: {
        "[data-placeholder-shown] &": {
          color: "sd.system.color.interaction.disabledOnSurface",
        },
      },
    },
    content: {
      bgColor: "sd.system.color.component.surfaceContainerBright",
      borderRadius: "sd.system.dimension.radius.medium",
      boxShadow: "sd.system.elevation.shadow.level1",
      zIndex: "sd.system.elevation.zIndex.dropdown",
      width: "100%",
      cursor: "pointer",
    },
    item: {
      width: "100%",
    },
    iconBox: {
      w: "40px",
      display: "flex",
      justifyContent: "center",
      transition: "transform 0.2s",
      "[data-disabled] &": {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
      "[data-state='open'] &": {
        transform: "rotate(180deg)",
      },
    },
  },
  variants: {
    size: {
      medium: {
        root: {
          textStyle: {
            base: "sd.system.typography.body.medium_compact",
            expanded: "sd.system.typography.body.medium_expanded",
          },
        },
        valueText: {
          textStyle: {
            base: "sd.system.typography.body.medium_compact",
            expanded: "sd.system.typography.body.medium_expanded",
          },
        },
        trigger: {
          height: 48,
        },
        item: {},
      },
      small: {
        root: {
          "@layer components": {
            width: "min(100%, 150px)",
          },
          textStyle: {
            base: "sd.system.typography.body.small_compact",
          },
        },
        valueText: {
          textStyle: {
            base: "sd.system.typography.body.small_compact",
            expanded: "sd.system.typography.body.small_expanded",
          },
        },
        trigger: {
          height: 32,
          paddingTop: "sd.system.dimension.spacing.twoExtraSmall",
          paddingRight: "sd.system.dimension.spacing.extraSmall",
          paddingBottom: "sd.system.dimension.spacing.twoExtraSmall",
          paddingLeft: "sd.system.dimension.spacing.extraSmall",
          borderRadius: "sd.system.dimension.radius.small",
        },
        content: {
          borderRadius: "sd.system.dimension.radius.small",
        },
        item: {},
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type Props = {
  placeholder?: string;
  label?: string;
  required?: boolean;
  requiredLabel?: string;
  invalidMessage?: string;
  items?: selectItem[];
  collection?: SelectRootProps<selectItem>["collection"];
  /**
   * Portalを使用するかどうか
   * - `true` (デフォルト): body直下にポータルする。ModalDialog/Drawer内にある場合は自動的にそのコンテンツ内にポータルされる
   * - `false`: ポータルを使用せず、その場にレンダリングする
   * @default true
   */
  portalled?: boolean;
};

type selectItem = {
  label: string;
  value: string;
};

type SelectStyleProps = Props &
  Omit<SelectRootProps<selectItem>, "collection"> &
  RecipeVariantProps<typeof SelectStyle>;

export const Select: React.FC<SelectStyleProps> = ({
  placeholder = "",
  label,
  required,
  requiredLabel,
  invalid,
  invalidMessage,
  className,
  items = [],
  portalled = true,
  ...props
}) => {
  const t = useTranslations();
  const [variantProps, selectProps] = SelectStyle.splitVariantProps(props);
  const styles = SelectStyle(variantProps);
  const { collection: _, ...elementProps } = selectProps;
  const { triggerRef, portalContainerRef } = useAutoPortalContainer(portalled);

  const collection = createListCollection({
    items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  return (
    <ArkSelect.Root
      {...elementProps}
      collection={collection}
      invalid={invalid}
      className={cx(styles.root, className)}
      positioning={{
        sameWidth: true,
        offset: {
          mainAxis: 1,
          crossAxis: 0,
        },
      }}
    >
      {label && variantProps.size != "small" && (
        // smallの場合はラベルを表示しない
        <ArkSelect.Label
          className={css({
            textStyle: {
              base: "sd.system.typography.label.medium_compact",
              expanded: "sd.system.typography.label.medium_expanded",
            },
          })}
        >
          {label}
          {required && (
            <span
              className={css({
                pl: "sd.system.dimension.spacing.extraSmall",
                color: "sd.system.color.impression.negative",
              })}
            >
              {requiredLabel ?? t("common.required")}
            </span>
          )}
        </ArkSelect.Label>
      )}
      <ArkSelect.Control>
        <ArkSelect.Trigger className={styles.trigger} ref={triggerRef}>
          <ArkSelect.ValueText
            placeholder={placeholder}
            className={styles.valueText}
          />
          <SerendieSymbolChevronDown className={styles.iconBox} />
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      {invalid && invalidMessage && (
        <div
          className={css({
            textStyle: {
              base: "sd.system.typography.body.extraSmall_compact",
              expanded: "sd.system.typography.body.extraSmall_expanded",
            },
            color: "sd.system.color.impression.negative",
          })}
        >
          {invalidMessage}
        </div>
      )}
      <Portal disabled={!portalled} container={portalContainerRef}>
        <ArkSelect.Positioner>
          <ArkSelect.Content className={styles.content}>
            <List>
              {collection.items.map((item, i) => (
                <ArkSelect.Item key={i} item={item}>
                  <ListItem
                    title={item.label}
                    value={item.value}
                    className={styles.item}
                    size={variantProps.size == "small" ? "small" : undefined}
                  />
                </ArkSelect.Item>
              ))}
            </List>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
    </ArkSelect.Root>
  );
};
