import { RadioGroup, RadioGroupItemProps } from "@ark-ui/react";
import { RecipeVariantProps, cx, sva } from "../../styled-system/css";
import { CSSProperties } from "react";
import RadioChecked from "../assets/radioChecked.svg?react";
import RadioUnChecked from "../assets/radioUnchecked.svg?react";

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
      gap: "dic.system.dimension.spacing.medium",
      paddingY: "dic.system.dimension.spacing.small",
      paddingX: "dic.system.dimension.spacing.medium",
      cursor: "pointer",
    },
    itemControl: {
      flexShrink: 0,
      ".group:has(:focus-visible) &": {
        backgroundColor: "dic.system.color.interaction.selectedSurface",
        borderRadius: "dic.system.dimension.radius.full",
      },
    },
    checkedIcon: {
      color: "dic.system.color.impression.primary",
      _disabled: {
        color:
          "color-mix(in srgb, {colors.dic.system.color.impression.primary}, {colors.dic.system.color.interaction.hoveredOnPrimary});",
      },
    },
    unCheckedIcon: {
      color: "dic.system.color.component.outlineVariant",
      _disabled: {
        color:
          "color-mix(in srgb, {colors.dic.system.color.component.outlineVariant}, {colors.dic.system.color.interaction.hoveredOnPrimary});",
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

type RadioButtonItemProps = {
  label: string;
  helperText?: string;
};

export type RadioButtonProps = RadioGroupItemProps &
  RecipeVariantProps<typeof RadioButtonStyle> &
  RadioButtonItemProps;

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  helperText,
  ...props
}) => {
  const [cssProps, radioProps] = RadioButtonStyle.splitVariantProps(props);
  const styles = RadioButtonStyle(cssProps);
  const itemStyle: CSSProperties = helperText
    ? { alignItems: "flex-start" }
    : {};

  return (
    <RadioGroup.Item
      value={value}
      className={cx("group", styles.item)}
      style={itemStyle}
      {...radioProps}
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
        <RadioGroup.ItemText className={styles.itemText}>
          {label}
        </RadioGroup.ItemText>
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
