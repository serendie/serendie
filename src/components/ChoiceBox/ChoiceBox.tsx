import {
  Checkbox as ArkCheckbox,
  CheckboxRootProps,
  RadioGroup,
  RadioGroupItemProps,
} from "@ark-ui/react";
import { cx, sva } from "../../../styled-system/css";
import CheckboxCheckedIcon from "../../assets/checkboxChecked.svg?react";
import CheckboxUncheckedIcon from "../../assets/checkboxUnchecked.svg?react";
import CheckboxIndeterminateIcon from "../../assets/checkboxIndeterminate.svg?react";
import RadioChecked from "../../assets/radioChecked.svg?react";
import RadioUnChecked from "../../assets/radioUnchecked.svg?react";
import {
  checkboxCheckedIconCss,
  checkboxIconCss,
  checkboxUncheckedIconCss,
} from "../CheckBox";
import {
  radioCheckedIconCss,
  radioIconCss,
  radioUncheckedIconCss,
} from "../RadioButton";

export const ChoiceBoxStyle = sva({
  slots: [
    "root",
    "radioItem",
    "radioCheckedIcon",
    "radioUncheckedIcon",
    "checkboxItem",
    "checkboxCheckedIcon",
    "checkboxUncheckedIcon",
  ],
  base: {
    root: {
      display: "flex",
    },
    radioItem: radioIconCss,
    radioCheckedIcon: radioCheckedIconCss,
    radioUncheckedIcon: radioUncheckedIconCss,
    checkboxItem: checkboxIconCss,
    checkboxCheckedIcon: checkboxCheckedIconCss,
    checkboxUncheckedIcon: checkboxUncheckedIconCss,
  },
});

type ChoiceBoxBaseProps = {
  type: "radio" | "checkbox";
};

export type ChoiceBoxProps = ChoiceBoxBaseProps &
  RadioGroupItemProps &
  CheckboxRootProps;

export const ChoiceBox: React.FC<ChoiceBoxProps> = ({
  type,
  value,
  className,
  ...props
}) => {
  const [variantProps, elementProps] = ChoiceBoxStyle.splitVariantProps(props);
  const styles = ChoiceBoxStyle(variantProps);

  if (type === "radio") {
    return (
      <RadioGroup.Item
        value={value}
        className={cx("group", styles.root, className)}
        {...elementProps}
      >
        <RadioGroup.ItemContext>
          {(radio) => (
            <RadioGroup.ItemControl className={styles.radioItem} asChild>
              {radio.checked ? (
                <RadioChecked className={styles.radioCheckedIcon} />
              ) : (
                <RadioUnChecked className={styles.radioUncheckedIcon} />
              )}
            </RadioGroup.ItemControl>
          )}
        </RadioGroup.ItemContext>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    );
  }

  if (type === "checkbox") {
    return (
      <ArkCheckbox.Root
        value={value}
        className={cx("group", styles.root, className)}
        {...props}
      >
        <ArkCheckbox.Context>
          {(checkbox) => (
            <>
              <ArkCheckbox.Control className={styles.checkboxItem}>
                {checkbox.checked === true ? (
                  <CheckboxCheckedIcon className={styles.checkboxCheckedIcon} />
                ) : checkbox.indeterminate === true ? (
                  <CheckboxIndeterminateIcon
                    className={styles.checkboxCheckedIcon}
                  />
                ) : (
                  <CheckboxUncheckedIcon
                    className={styles.checkboxUncheckedIcon}
                  />
                )}
              </ArkCheckbox.Control>
              <ArkCheckbox.HiddenInput />
            </>
          )}
        </ArkCheckbox.Context>
      </ArkCheckbox.Root>
    );
  }
};
