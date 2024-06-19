import React from "react";
import mergeRefs from "merge-refs";
import { forwardRef } from "react";
import { css, sva } from "../../styled-system/css";
import { SvgIcon } from "./SvgIcon";

const TextFieldStyle = sva({
  slots: [
    "root",
    "label",
    "required",
    "inputWrapper",
    "input",
    "icon",
    "messageField",
    "description",
    "invalidMessage",
  ],
  base: {
    root: {
      display: "inline-grid",
      gridTemplateColumns: "minmax(auto, 300px)",
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
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      outlineStyle: "solid",
      outlineWidth: "sd.system.dimension.border.medium",
      outlineColor: "sd.system.color.component.outline",
      borderRadius: "sd.system.dimension.radius.medium",
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
} & React.InputHTMLAttributes<HTMLInputElement>;

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
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = mergeRefs(inputRef, ref);
    const [styleProps, selectProps] = TextFieldStyle.splitVariantProps(props);
    const styles = TextFieldStyle(styleProps);
    const showMessageField = description || (invalid && invalidMessage);
    const [_value, setValue] = React.useState(props.defaultValue || value);

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
      <div className={styles.root}>
        <label className={styles.label}>
          {label}
          {required && (
            // とりあえず必須メッセージはハードコード
            <span className={styles.required}>必須</span>
          )}
        </label>
        <div
          className={styles.inputWrapper}
          data-invalid={invalid ? true : undefined}
          data-disabled={disabled ? true : undefined}>
          <input
            ref={mergedRef}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            type={type}
            className={styles.input}
            onChange={onValueChange}
            {...selectProps}
          />
          <div className={styles.icon}>
            {!disabled &&
              /* disabledの場合はアイコンを表示しない */
              (invalid ? (
                <span
                  className={css({
                    color: "sd.system.color.impression.negative",
                  })}>
                  <SvgIcon icon="error" size="20" />
                </span>
              ) : _value ? (
                <button
                  className={css({ cursor: "pointer" })}
                  onClick={resetValue}
                  aria-label="値をクリア">
                  <SvgIcon icon="close" size="20" />
                </button>
              ) : null)}
          </div>
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
