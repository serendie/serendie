import { Select as ArkSelect, Portal, SelectRootProps } from "@ark-ui/react";
import { RecipeVariantProps, css, sva } from "../../styled-system/css";
import { useId } from "react";
import { SvgIcon } from "./SvgIcon";

export const SelectStyle = sva({
  slots: ["root", "valueText", "control", "content", "item", "iconBox"],
  base: {
    root: {
      display: "inline-grid",
      gridTemplateColumns: "minmax(auto, 300px)",
    },
    control: {
      width: "100%",
      textAlign: "left",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      paddingTop: "dic.system.dimension.spacing.small",
      paddingRight: "dic.system.dimension.spacing.extraSmall",
      paddingBottom: "dic.system.dimension.spacing.small",
      paddingLeft: "dic.system.dimension.spacing.medium",
      alignItems: "center",
      borderRadius: "dic.system.dimension.radius.medium",
      outlineStyle: "solid",
      outlineWidth: "dic.system.dimension.border.medium",
      outlineColor: "dic.system.color.component.outline",
      bg: "dic.system.color.component.surface",
      cursor: "pointer",
      _enabled: {
        _focus: {
          outlineWidth: "dic.system.dimension.border.thick",
          outlineColor: "dic.system.color.impression.primary",
        },
        _hover: {
          outlineColor: "dic.system.color.interaction.hovered",
          bg: "color-mix(in srgb, {colors.dic.system.color.component.surface}, {colors.dic.system.color.interaction.hoveredVariant})",
        },
      },
      _disabled: {
        bgColor: "dic.system.color.interaction.disabled",
        cursor: "not-allowed",
      },
      _invalid: {
        outlineColor: "dic.system.color.impression.negative",
      },
    },
    valueText: {
      outline: "none",
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
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
    content: {
      bgColor: "dic.system.color.component.surface",
      borderRadius: "dic.system.dimension.radius.medium",
      boxShadow: "dic.system.elevation.shadow.level1",
      zIndex: "dic.system.elevation.zIndex.dropdown",
      width: "100%",
      cursor: "pointer",
    },
    item: {
      display: "flex",
      gap: "dic.system.dimension.spacing.small",
      _highlighted: {
        backgroundColor: "dic.system.color.interaction.hoveredVariant",
      },
    },
    iconBox: {
      w: "40px",
      display: "flex",
      justifyContent: "center",
      "[data-disabled] &": {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
  },
  variants: {
    size: {
      medium: {
        root: {
          textStyle: {
            base: "dic.system.typography.body.medium_compact",
            expanded: "dic.system.typography.body.medium_expanded",
          },
        },
        item: {
          paddingRight: "dic.system.dimension.spacing.medium",
          paddingLeft: "dic.system.dimension.spacing.medium",
          paddingBottom: {
            base: "dic.system.dimension.spacing.small",
            expanded: "dic.system.dimension.spacing.extraSmall",
          },
          paddingTop: {
            base: "dic.system.dimension.spacing.small",
            expanded: "dic.system.dimension.spacing.extraSmall",
          },
        },
      },
      small: {
        root: {
          gridTemplateColumns: "minmax(auto, 150px)",
          textStyle: {
            base: "dic.system.typography.body.small_compact",
          },
        },
        control: {
          paddingTop: "dic.system.dimension.spacing.twoExtraSmall",
          paddingRight: "dic.system.dimension.spacing.extraSmall",
          paddingBottom: "dic.system.dimension.spacing.twoExtraSmall",
          paddingLeft: "dic.system.dimension.spacing.extraSmall",
        },
        item: {
          paddingTop: "dic.system.dimension.spacing.extraSmall",
          paddingRight: "dic.system.dimension.spacing.medium",
          paddingBottom: "dic.system.dimension.spacing.extraSmall",
          paddingLeft: "dic.system.dimension.spacing.medium",
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
          className={css({ mb: "dic.system.dimension.spacing.extraSmall" })}>
          {label}
          {required && (
            // とりあえず必須メッセージはハードコード
            <span
              className={css({
                pl: "dic.system.dimension.spacing.extraSmall",
                mb: "dic.system.dimension.spacing.extraSmall",
                color: "dic.system.color.impression.negative",
              })}>
              必須
            </span>
          )}
        </ArkSelect.Label>
      )}
      <ArkSelect.Control>
        <ArkSelect.Trigger className={styles.control}>
          <ArkSelect.ValueText
            placeholder={placeholder}
            className={styles.valueText}
          />
          <SvgIcon icon="expandMore" size="20" className={styles.iconBox} />
        </ArkSelect.Trigger>
        {invalid && invalidMessage && (
          <div
            className={css({
              mt: "dic.system.dimension.spacing.extraSmall",
              color: "dic.system.color.impression.negative",
            })}>
            {invalidMessage}
          </div>
        )}
      </ArkSelect.Control>
      <Portal>
        <ArkSelect.Positioner>
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
