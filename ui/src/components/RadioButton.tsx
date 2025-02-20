import { RadioGroup, RadioGroupItemProps } from "@ark-ui/react";
import { RecipeVariantProps, css, cx } from "../../styled-system/css";
import RadioChecked from "../assets/radioChecked.svg?react";
import RadioUnChecked from "../assets/radioUnchecked.svg?react";
import { RadioButtonStyle } from "./styles/radio.styles";

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
