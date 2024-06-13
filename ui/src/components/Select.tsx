import { Select as ArkSelect, Portal, SelectRootProps } from "@ark-ui/react";
import { RecipeVariantProps, css, sva } from "../../styled-system/css";
import { useId } from "react";
import { SvgIcon } from "./SvgIcon";

export const SelectStyle = sva({
  slots: ["root", "valueText", "trigger", "content", "item", "iconBox"],
  base: {
    root: {
      display: "inline-grid",
      gridTemplateColumns: "minmax(auto, 300px)",
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
      display: "flex",
      gap: "sd.system.dimension.spacing.small",
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
        item: {
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
        root: {
          gridTemplateColumns: "minmax(auto, 150px)",
          textStyle: {
            base: "sd.system.typography.body.small_compact",
          },
        },
        trigger: {
          paddingTop: "sd.system.dimension.spacing.twoExtraSmall",
          paddingRight: "sd.system.dimension.spacing.extraSmall",
          paddingBottom: "sd.system.dimension.spacing.twoExtraSmall",
          paddingLeft: "sd.system.dimension.spacing.extraSmall",
          borderRadius: "sd.system.dimension.radius.small",
        },
        content: {
          borderRadius: "sd.system.dimension.radius.small",
        },
        item: {
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
  ...props
}) => {
  const [styleProps, selectProps] = SelectStyle.splitVariantProps(props);
  const styles = SelectStyle(styleProps);
  const id = useId(); // TODO: Ark UI 3.0.0 からIDの指定いらなくなる

  return (
    <ArkSelect.Root
      {...selectProps}
      invalid={invalid}
      className={styles.root}
      positioning={{ sameWidth: true }}>
      {label && styleProps.size != "small" && (
        // smallの場合はラベルを表示しない
        <ArkSelect.Label
          className={css({
            textStyle: {
              base: "sd.system.typography.label.medium_compact",
              expanded: "sd.system.typography.label.medium_expanded",
            },
          })}>
          {label}
          {required && (
            // とりあえず必須メッセージはハードコード
            <span
              className={css({
                pl: "sd.system.dimension.spacing.extraSmall",
                color: "sd.system.color.impression.negative",
              })}>
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
          <SvgIcon icon="expandMore" size="20" className={styles.iconBox} />
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
          })}>
          {invalidMessage}
        </div>
      )}
      <Portal>
        <ArkSelect.Positioner>
          {/* TODO: 上部に僅かに隙間があるので詰めたいがAPIが見つからない、、、 */}
          <ArkSelect.Content className={styles.content}>
            <ArkSelect.ItemGroup id={id}>
              {props.items.map((item, i) => (
                <ArkSelect.Item key={i} item={item} className={styles.item}>
                  <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                </ArkSelect.Item>
              ))}
            </ArkSelect.ItemGroup>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
    </ArkSelect.Root>
  );
};
