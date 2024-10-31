import {
  Select as ArkSelect,
  Portal,
  type SelectRootProps,
} from "@ark-ui/react";
import { type RecipeVariantProps, css, cx, sva } from "styled-system/css";
import ChevronDown from "../assets/icon/outline/chevron-down.svg?raw";
import { useId } from "react";

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
      // paddingTop: "sd.system.dimension.spacing.small",
      paddingRight: "sd.system.dimension.spacing.extraSmall",
      // paddingBottom: "sd.system.dimension.spacing.small",
      paddingLeft: "sd.system.dimension.spacing.medium",
      alignItems: "center",
      outlineStyle: "solid",
      outlineWidth: "sd.system.dimension.border.medium",
      outlineColor: "sd.system.color.component.outline",
      cursor: "pointer",
      color: "sd.system.color.impression.onPrimary",
      pl: "sd.system.dimension.spacing.medium",
      pr: 0,
      bg: "web.system.color.impression.secondary",
      borderRadius: "sd.system.dimension.radius.full",
      _hover: {
        bg: "color-mix(in srgb,var(--colors-sd-system-color-impression-primary),var(--colors-sd-reference-color-scale-black-1000) 20%) !important",
      },
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
      bgColor: "web.system.color.impression.secondary",
      boxShadow: "sd.system.elevation.shadow.level1",
      zIndex: "sd.system.elevation.zIndex.dropdown",
      width: "100%",
      cursor: "pointer",
      color: "white",
      outlineStyle: "solid",
      outlineWidth: "sd.system.dimension.border.medium",
      outlineColor: "sd.system.color.component.outline",
      borderRadius: "24px",
      overflow: "hidden",
    },
    item: {
      display: "flex",
      gap: "sd.system.dimension.spacing.small",
      justifyContent: "space-between",
      alignItems: "center",
      _highlighted: {
        backgroundColor: "sd.reference.color.scale.transparency.20",
      },
      _active: {
        fontWeight: "bold",
        "& figure": {
          borderWidth: "2px",
        },
      },
      _first: {
        pt: "sd.system.dimension.spacing.small",
      },
      _last: {
        pb: "sd.system.dimension.spacing.small",
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
        trigger: {
          height: 48,
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
          height: 40,
          // paddingTop: "sd.system.dimension.spacing.twoExtraSmall",
          paddingRight: "sd.system.dimension.spacing.small !important",
          // paddingBottom: "sd.system.dimension.spacing.twoExtraSmall",
          // paddingLeft: "sd.system.dimension.spacing.extraSmall",
        },
        content: {
          borderRadius: "24px",
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

export const ThemeSelect: React.FC<SelectStyleProps> = ({
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
  const id = useId(); // TODO: Ark UI 3.0.0 からIDの指定いらなくなる

  return (
    <ArkSelect.Root
      {...elementProps}
      invalid={invalid}
      className={cx(styles.root, className)}
      positioning={{ sameWidth: true }}
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
          {/* <SvgIcon icon="expandMore" size="20" className={styles.iconBox} /> */}
          <div
            className={css({
              "& path": {
                fill: "white !important",
              },
            })}
            dangerouslySetInnerHTML={{
              __html: ChevronDown,
            }}
          ></div>
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
          {/* TODO: 上部に僅かに隙間があるので詰めたいがAPIが見つからない、、、 */}
          <ArkSelect.Content className={styles.content}>
            <ArkSelect.ItemGroup id={id}>
              {props.items.map((item, i) => (
                <ArkSelect.Item key={i} item={item} className={styles.item}>
                  <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                  <figure
                    className={css({
                      width: "14px",
                      height: "14px",
                      bg: "white",
                      borderRadius: "50%",
                      border: "1px solid #fff",
                    })}
                    style={{
                      backgroundColor:
                        item.value === "konjo"
                          ? "var(--sd-reference-color-scale-blue-600)"
                          : item.value === "asagi"
                            ? "var(--sd-reference-color-scale-skyblue-600)"
                            : item.value === "sumire"
                              ? "var(--sd-reference-color-scale-purple-600)"
                              : item.value === "kurikawa"
                                ? "var(--sd-reference-color-scale-chestnut-600)"
                                : item.value === "tsutsuji"
                                  ? "var(--sd-reference-color-scale-pink-600)"
                                  : "",
                    }}
                  ></figure>
                </ArkSelect.Item>
              ))}
            </ArkSelect.ItemGroup>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
    </ArkSelect.Root>
  );
};
