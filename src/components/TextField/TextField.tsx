import {
  SerendieSymbolAlertCircle,
  SerendieSymbolClose,
} from "@serendie/symbols";
import mergeRefs from "merge-refs";
import React, { forwardRef } from "react";
import { css, cx, RecipeVariantProps } from "../../../styled-system/css";
import { textFieldRecipe } from "../../recipes/textFieldRecipe";
import { useTranslations } from "../../i18n";

type Props = {
  label?: string;
  description?: string;
  invalid?: boolean;
  invalidMessage?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  requiredLabel?: string;
} & RecipeVariantProps<typeof textFieldRecipe> &
  React.ComponentPropsWithoutRef<"input">;

export const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      placeholder,
      label,
      description,
      required,
      requiredLabel,
      invalidMessage,
      invalid,
      type = "text",
      disabled,
      onChange,
      value,
      className,
      leftContent,
      rightContent,
      ...props
    },
    ref
  ) => {
    const t = useTranslations();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = mergeRefs(inputRef, ref);
    const [variantProps, elementProps] = textFieldRecipe.splitVariantProps({
      ...props,
    });
    const styles = textFieldRecipe(variantProps);
    const showMessageField = description || (invalid && invalidMessage);
    const [_value, setValue] = React.useState(props.defaultValue || value);
    const inputId = props.id || React.useId();

    const resetValue = () => {
      const e = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      onValueChange(e);
      props.onReset?.(e);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={cx(styles.root, className)}>
        {label ? (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {required && (
              <span className={styles.labelRequired}>
                {requiredLabel ?? t("common.required")}
              </span>
            )}
          </label>
        ) : null}
        <div
          className={styles.inputWrapper}
          data-invalid={invalid ? true : undefined}
          data-disabled={disabled ? true : undefined}
        >
          {leftContent ? (
            <div className={styles.leftContent}>{leftContent}</div>
          ) : (
            <div></div>
          )}
          <input
            ref={mergedRef}
            id={inputId}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            type={type}
            className={styles.input}
            onChange={onValueChange}
            {...elementProps}
          />
          {rightContent ? (
            <div className={styles.rightContent}>{rightContent}</div>
          ) : (
            <div className={styles.icon}>
              {!disabled &&
                /* disabledの場合はアイコンを表示しない */
                (invalid ? (
                  <span
                    className={css({
                      color: "sd.system.color.impression.negative",
                    })}
                  >
                    <SerendieSymbolAlertCircle width={20} height={20} />
                  </span>
                ) : _value ? (
                  <button
                    className={css({ cursor: "pointer" })}
                    onClick={resetValue}
                    aria-label="値をクリア"
                  >
                    <SerendieSymbolClose width={20} height={20} />
                  </button>
                ) : null)}
            </div>
          )}
        </div>
        {showMessageField && (
          <div className={styles.messageField}>
            {description && <p className={styles.description}>{description}</p>}
            {invalid && invalidMessage && (
              <p className={styles.invalidMessage}>{invalidMessage}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
