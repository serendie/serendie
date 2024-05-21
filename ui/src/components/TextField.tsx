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
    "reset",
    "messageField",
    "description",
    "invalidMessage",
  ],
  base: {
    root: {
      display: "inline-grid",
      gridTemplateColumns: "minmax(auto, 300px)",
      rowGap: "dic.system.dimension.spacing.extraSmall",
      textStyle: {
        base: "dic.system.typography.body.medium_compact",
        expanded: "dic.system.typography.body.medium_expanded",
      },
    },
    label: {
      textStyle: {
        base: "dic.system.typography.label.medium_compact",
        expanded: "dic.system.typography.label.medium_expanded",
      },
    },
    inputWrapper: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      outlineStyle: "solid",
      outlineWidth: "dic.system.dimension.border.medium",
      outlineColor: "dic.system.color.component.outline",
      borderRadius: "dic.system.dimension.radius.medium",

      _focusWithin: {
        outlineWidth: "dic.system.dimension.border.thick",
        outlineColor: "dic.system.color.impression.primary",
      },
      _disabled: {
        backgroundColor: "dic.system.color.interaction.disabled",
        cursor: "not-allowed",
      },

      _invalid: {
        outlineColor: "dic.system.color.impression.negative",
      },
    },
    input: {
      outline: "none",
      paddingTop: "dic.system.dimension.spacing.extraSmall",
      paddingRight: "dic.system.dimension.spacing.twoExtraSmall",
      paddingBottom: "dic.system.dimension.spacing.extraSmall",
      paddingLeft: "dic.system.dimension.spacing.medium",
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
      pl: "dic.system.dimension.spacing.extraSmall",
      color: "dic.system.color.impression.negative",
    },
    messageField: {
      textStyle: {
        base: "dic.system.typography.body.extraSmall_compact",
        expanded: "dic.system.typography.body.extraSmall_expanded",
      },
    },
    invalidMessage: {
      color: "dic.system.color.impression.negative",
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
                    color: "dic.system.color.impression.negative",
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
