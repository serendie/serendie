import { Select as ArkSelect, Portal, SelectRootProps } from "@ark-ui/react";
import { SerendieSymbolChevronDown } from "@serendie/symbols";
import { useId } from "react";
import { RecipeVariantProps, css, cx, sva } from "../../../styled-system/css";
import { List, ListItem } from "../List";

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
      bgColor: "sd.system.color.component.surface",
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
      "[data-disabled] &": {
        color: "sd.system.color.interaction.disabledOnSurface",
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
  invalidMessage?: string;
};

type selectItem = {
  label: string;
  value: string;
};

type SelectStyleProps = Props &
  SelectRootProps<selectItem> &
  RecipeVariantProps<typeof SelectStyle>;

export const Select: React.FC<SelectStyleProps> = ({
  placeholder = "",
  label,
  required,
  invalid,
  invalidMessage,
  className,
  ...props
}) => {
  const [variantProps, elementProps] = SelectStyle.splitVariantProps(props);
  const styles = SelectStyle(variantProps);
  const id = useId(); // TODO: https://github.com/serendie/serendie/issues/409 Ark UI 3 へのアップデート

  return (
    <ArkSelect.Root
      {...elementProps}
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
            // とりあえず必須メッセージはハードコード
            <span
              className={css({
                pl: "sd.system.dimension.spacing.extraSmall",
                color: "sd.system.color.impression.negative",
              })}
            >
              必須
            </span>
          )}
        </ArkSelect.Label>
      )}
      <ArkSelect.Control>
        <ArkSelect.Trigger className={styles.trigger}>
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
      <Portal>
        <ArkSelect.Positioner>
          <ArkSelect.Content className={styles.content}>
            <List id={id}>
              {props.items.map((item: selectItem, i: number) => (
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
