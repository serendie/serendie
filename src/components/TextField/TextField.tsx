import {
  SerendieSymbolAlertCircle,
  SerendieSymbolClose,
} from "@serendie/symbols";
import mergeRefs from "merge-refs";
import React, { forwardRef } from "react";
import { css, cx, sva } from "../../../styled-system/css";

const TextFieldStyle = sva({
  slots: [
    "root",
    "label",
    "required",
    "inputWrapper",
    "leftContent",
    "rightContent",
    "input",
    "icon",
    "messageField",
    "description",
    "invalidMessage",
  ],
  base: {
    root: {
      display: "inline-grid",
      // 後から指定したCSSからwidthが上書きできないため、@layer componentsを指定
      "@layer components": {
        width: "min(100%, 300px)",
      },
      gridTemplateColumns: "auto",
      rowGap: "sd.system.dimension.spacing.extraSmall",
      textStyle: {
        base: "sd.system.typography.body.medium_compact",
        expanded: "sd.system.typography.body.medium_expanded",
      },
    },
    label: {
      textStyle: {
        base: "sd.system.typography.label.medium_compact",
        expanded: "sd.system.typography.label.medium_expanded",
      },
    },
    inputWrapper: {
      height: 48,
      display: "grid",
      gridTemplateColumns: "auto 1fr auto auto",
      alignItems: "center",
      outlineStyle: "solid",
      outlineWidth: "sd.system.dimension.border.medium",
      outlineColor: "sd.system.color.component.outline",
      borderRadius: "sd.system.dimension.radius.medium",
      backgroundColor: "sd.system.color.component.surface",
      '&:has([data-focus="true"])': {
        outlineWidth: "sd.system.dimension.border.thick",
        outlineColor: "sd.system.color.impression.primary",
      },
      _focusWithin: {
        outlineWidth: "sd.system.dimension.border.thick",
        outlineColor: "sd.system.color.impression.primary",
      },
      _disabled: {
        backgroundColor: "sd.system.color.interaction.disabled",
        cursor: "not-allowed",
      },
      _invalid: {
        outlineColor: "sd.system.color.impression.negative",
      },
    },
    leftContent: {
      paddingLeft: "sd.system.dimension.spacing.medium",
    },
    rightContent: {
      paddingRight: "sd.system.dimension.spacing.medium",
    },
    input: {
      outline: "none",
      paddingTop: "sd.system.dimension.spacing.extraSmall",
      paddingRight: "sd.system.dimension.spacing.twoExtraSmall",
      paddingBottom: "sd.system.dimension.spacing.extraSmall",
      paddingLeft: "sd.system.dimension.spacing.medium",
    },
    icon: {
      display: "grid",
      placeItems: "center",
      w: "48px",
      h: "48px",
      expanded: {
        w: "44px",
        h: "44px",
      },
    },
    required: {
      pl: "sd.system.dimension.spacing.extraSmall",
      color: "sd.system.color.impression.negative",
    },
    messageField: {
      textStyle: {
        base: "sd.system.typography.body.extraSmall_compact",
        expanded: "sd.system.typography.body.extraSmall_expanded",
      },
    },
    invalidMessage: {
      color: "sd.system.color.impression.negative",
    },
  },
});

type Props = {
  label?: string;
  description?: string;
  invalid?: boolean;
  invalidMessage?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"input">;

export const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      placeholder,
      label,
      description,
      required,
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
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = mergeRefs(inputRef, ref);
    const [variantProps, elementProps] =
      TextFieldStyle.splitVariantProps(props);
    const styles = TextFieldStyle(variantProps);
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
            {required && <span className={styles.required}>必須</span>}
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
