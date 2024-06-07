import { Checkbox as ArkCheckbox, CheckboxRootProps } from "@ark-ui/react";
import { RecipeVariantProps, cx, sva } from "../../styled-system/css";
import { CSSProperties } from "react";
import CheckboxCheckedIcon from "../assets/checkboxChecked.svg?react";
import CheckboxUncheckedIcon from "../assets/checkboxUnchecked.svg?react";

export const CheckboxStyle = sva({
  slots: [
    "root",
    "itemControl",
    "checkedIcon",
    "uncheckedIcon",
    "itemTextGroup",
    "itemText",
    "helperText",
  ],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "dic.system.dimension.spacing.medium",
      paddingY: "dic.system.dimension.spacing.small",
      paddingX: "dic.system.dimension.spacing.medium",
      cursor: "pointer",
    },
    itemControl: {
      flexShrink: 0,
      ".group:has(:focus-visible) &": {
        outlineStyle: "solid",
        outlineOffset: "-2px",
        outlineWidth: "1.5px",
        outlineColor: "dic.system.color.impression.primary",
        borderRadius: "dic.system.dimension.radius.small",
      },
    },
    checkedIcon: {
      width: 24,
      height: 24,
      color: "dic.system.color.impression.primary",
      "& .checkmark": {
        color: "dic.system.color.impression.onPrimaryContainer",
      },
      _disabled: {
        color:
          "color-mix(in srgb, {colors.dic.system.color.impression.primary}, {colors.dic.system.color.interaction.hoveredOnPrimary});",
        "& .checkmark": {
          color:
            "color-mix(in srgb, {colors.dic.system.color.interaction.disabled}, {colors.dic.system.color.impression.onPrimaryContainer});",
        },
      },
    },
    uncheckedIcon: {
      width: 24,
      height: 24,
      color: "dic.system.color.component.outline",
      _disabled: {
        color:
          "color-mix(in srgb, {colors.dic.system.color.component.outline}, {colors.dic.system.color.interaction.hoveredOnPrimary});",
      },
    },
    itemTextGroup: {
      display: "flex",
      flexFlow: "column",
    },
    itemText: {
      color: "dic.system.color.component.onSurface",
      textStyle: "dic.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.medium_expanded",
      },
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
    helperText: {
      color: "dic.system.color.component.onSurfaceVariant",
      marginTop: "dic.system.dimension.spacing.twoExtraSmall",
      textStyle: "dic.system.typography.body.extraSmall_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
  },
});

type CheckboxItemProps = {
  label: string;
  helperText?: string;
};

export type CheckboxProps = CheckboxRootProps &
  RecipeVariantProps<typeof CheckboxStyle> &
  CheckboxItemProps;

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  label,
  helperText,
  ...props
}) => {
  const [cssProps, checkboxProps] = CheckboxStyle.splitVariantProps(props);
  const styles = CheckboxStyle(cssProps);
  const rootStyle: CSSProperties = helperText
    ? { alignItems: "flex-start" }
    : {};

  return (
    <ArkCheckbox.Root
      value={value}
      className={cx("group", styles.root)}
      style={rootStyle}
      {...checkboxProps}
    >
      <ArkCheckbox.Context>
        {(checkbox) => (
          <ArkCheckbox.Control className={styles.itemControl}>
            {checkbox.checked ? (
              <CheckboxCheckedIcon className={styles.checkedIcon} />
            ) : (
              <CheckboxUncheckedIcon className={styles.uncheckedIcon} />
            )}
          </ArkCheckbox.Control>
        )}
      </ArkCheckbox.Context>
      <div className={styles.itemTextGroup}>
        <ArkCheckbox.Label className={styles.itemText}>
          {label}
        </ArkCheckbox.Label>
        {helperText && (
          <ArkCheckbox.Label className={styles.helperText}>
            {helperText}
          </ArkCheckbox.Label>
        )}
      </div>
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  );
};
