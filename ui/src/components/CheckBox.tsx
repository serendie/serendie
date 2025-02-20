import { Checkbox as ArkCheckbox, CheckboxRootProps } from "@ark-ui/react";
import { RecipeVariantProps, css, cx } from "../../styled-system/css";
import CheckboxCheckedIcon from "../assets/checkboxChecked.svg?react";
import CheckboxUncheckedIcon from "../assets/checkboxUnchecked.svg?react";
import { CheckBoxStyle } from "./styles/checkbox.styles";

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
