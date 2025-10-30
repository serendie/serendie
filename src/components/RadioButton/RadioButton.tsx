import { RadioGroup, RadioGroupItemProps } from "@ark-ui/react";
import { RecipeVariantProps, css, cx, sva } from "../../../styled-system/css";
import RadioChecked from "../../assets/radioChecked.svg?react";
import RadioUnChecked from "../../assets/radioUnchecked.svg?react";

export const radioIconCss = {
  flexShrink: 0,
  cursor: "pointer",
  ".group:has(:focus-visible) &": {
    backgroundColor: "sd.system.color.interaction.selectedSurface",
    borderRadius: "sd.system.dimension.radius.full",
  },
};

export const radioCheckedIconCss = {
  color: "sd.system.color.impression.primary",
  _disabled: {
    color:
      "color-mix(in srgb, {colors.sd.system.color.impression.primary}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
  },
};

export const radioUncheckedIconCss = {
  color: "sd.system.color.component.outlineDim",
  _disabled: {
    color:
      "color-mix(in srgb, {colors.sd.system.color.component.outlineDim}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
  },
};

export const RadioButtonStyle = sva({
  slots: [
    "item",
    "itemControl",
    "checkedIcon",
    "unCheckedIcon",
    "itemTextGroup",
    "itemText",
    "helperText",
  ],
  base: {
    item: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.small",
      paddingX: "sd.system.dimension.spacing.medium",
      cursor: "pointer",
    },
    itemControl: radioIconCss,
    checkedIcon: radioCheckedIconCss,
    unCheckedIcon: radioUncheckedIconCss,
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

type RadioButtonItemProps = {
  label?: string;
  helperText?: string;
};

export type RadioButtonProps = RadioGroupItemProps &
  RecipeVariantProps<typeof RadioButtonStyle> &
  RadioButtonItemProps;

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  helperText,
  className,
  ...props
}) => {
  const [variantProps, elementProps] =
    RadioButtonStyle.splitVariantProps(props);
  const styles = RadioButtonStyle(variantProps);
  const itemStyle = cx(
    styles.item,
    helperText && css({ alignItems: "flex-start" })
  );

  return (
    <RadioGroup.Item
      value={value}
      className={cx("group", itemStyle, className)}
      {...elementProps}
    >
      <RadioGroup.ItemContext>
        {(radio) => (
          <RadioGroup.ItemControl className={styles.itemControl} asChild>
            {radio.checked ? (
              <RadioChecked className={styles.checkedIcon} />
            ) : (
              <RadioUnChecked className={styles.unCheckedIcon} />
            )}
          </RadioGroup.ItemControl>
        )}
      </RadioGroup.ItemContext>
      <div className={styles.itemTextGroup}>
        {label && (
          <RadioGroup.ItemText className={styles.itemText}>
            {label}
          </RadioGroup.ItemText>
        )}
        {helperText && (
          <RadioGroup.ItemText className={styles.helperText}>
            {helperText}
          </RadioGroup.ItemText>
        )}
      </div>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  );
};
