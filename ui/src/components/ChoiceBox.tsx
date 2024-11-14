import {
  checkboxCheckedIconCss,
  checkboxIconCss,
  checkboxUncheckedIconCss,
} from "./CheckBox";
import {
  radioCheckedIconCss,
  radioIconCss,
  radioUncheckedIconCss,
} from "./RadioButton";
import { RadioGroup, RadioGroupItemProps } from "@ark-ui/react";
import RadioChecked from "../assets/radioChecked.svg?react";
import RadioUnChecked from "../assets/radioUnchecked.svg?react";
import CheckboxCheckedIcon from "../assets/checkboxChecked.svg?react";
import CheckboxUncheckedIcon from "../assets/checkboxUnchecked.svg?react";
import { cx, sva } from "../../styled-system/css";
import { Checkbox as ArkCheckbox, CheckboxRootProps } from "@ark-ui/react";

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
        {...elementProps}
      >
        <ArkCheckbox.Context>
          {(checkbox) => (
            <ArkCheckbox.Control className={styles.checkboxItem}>
              {checkbox.checked ? (
                <CheckboxCheckedIcon className={styles.checkboxCheckedIcon} />
              ) : (
                <CheckboxUncheckedIcon
                  className={styles.checkboxUncheckedIcon}
                />
              )}
            </ArkCheckbox.Control>
          )}
        </ArkCheckbox.Context>
        <ArkCheckbox.HiddenInput />
      </ArkCheckbox.Root>
    );
  }
};
