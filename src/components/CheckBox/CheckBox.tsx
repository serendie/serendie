import { Checkbox as ArkCheckbox, CheckboxRootProps } from "@ark-ui/react";
import { RecipeVariantProps, css, cx, sva } from "../../../styled-system/css";
import CheckboxCheckedIcon from "../../assets/checkboxChecked.svg?react";
import CheckboxUncheckedIcon from "../../assets/checkboxUnchecked.svg?react";
import CheckboxIndeterminateIcon from "../../assets/checkboxIndeterminate.svg?react";

export const checkboxIconCss = {
  flexShrink: 0,
  cursor: "pointer",
  ".group:has(:focus-visible) &": {
    outlineStyle: "solid",
    outlineOffset: "-2px",
    outlineWidth: "1.5px",
    outlineColor: "sd.system.color.impression.primary",
    borderRadius: "sd.system.dimension.radius.small",
  },
  _disabled: {
    _checked: {
      "& svg": {
        color:
          "color-mix(in srgb, {colors.sd.system.color.impression.primary}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
      },
      "& .checkmark": {
        color:
          "color-mix(in srgb, {colors.sd.system.color.interaction.disabled}, {colors.sd.system.color.impression.onPrimaryContainer});",
      },
    },
  },
};

export const checkboxCheckedIconCss = {
  width: 24,
  height: 24,
  color: "sd.system.color.impression.primary",
  "& .checkmark": {
    color: "sd.system.color.impression.onPrimaryContainer",
  },
};

export const checkboxUncheckedIconCss = {
  width: 24,
  height: 24,
  color: "sd.system.color.component.outline",
  _disabled: {
    color:
      "color-mix(in srgb, {colors.sd.system.color.component.outline}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
  },
};

export const CheckBoxStyle = sva({
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
      gap: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.small",
      paddingX: "sd.system.dimension.spacing.medium",
      cursor: "pointer",
      position: "relative",
    },
    itemControl: checkboxIconCss,
    checkedIcon: checkboxCheckedIconCss,
    uncheckedIcon: checkboxUncheckedIconCss,
    itemTextGroup: {
      display: "flex",
      flexFlow: "column",
    },
    itemText: {
      color: "sd.system.color.component.onSurface",
      textStyle: "sd.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
    helperText: {
      color: "sd.system.color.component.onSurfaceVariant",
      marginTop: "sd.system.dimension.spacing.twoExtraSmall",
      textStyle: "sd.system.typography.body.extraSmall_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
  },
});

type CheckBoxItemProps = {
  label: string;
  helperText?: string;
};

export type CheckBoxProps = CheckboxRootProps &
  RecipeVariantProps<typeof CheckBoxStyle> &
  CheckBoxItemProps;

export const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  label,
  helperText,
  className,
  ...props
}) => {
  const [variantProps, elementProps] = CheckBoxStyle.splitVariantProps(props);
  const styles = CheckBoxStyle(variantProps);
  const rootStyle = cx(
    styles.root,
    helperText && css({ alignItems: "flex-start" })
  );

  return (
    <ArkCheckbox.Root
      value={value}
      className={cx("group", rootStyle, className)}
      {...elementProps}
    >
      <ArkCheckbox.Context>
        {(checkbox) => (
          <ArkCheckbox.Control className={styles.itemControl}>
            {checkbox.checked === true ? (
              <CheckboxCheckedIcon className={styles.checkedIcon} />
            ) : checkbox.indeterminate === true ? (
              <CheckboxIndeterminateIcon className={styles.checkedIcon} />
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
