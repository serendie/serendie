import React from "react";
import mergeRefs from "merge-refs";
import { forwardRef } from "react";
import { sva } from "../../styled-system/css";

const TextAreaStyle = sva({
  slots: [
    "root",
    "label",
    "required",
    "wrapper",
    "textarea",
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
    wrapper: {
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
      },
      _invalid: {
        outlineColor: "sd.system.color.impression.negative",
      },
    },
    textarea: {
      outline: "none",
      marginTop: "sd.system.dimension.spacing.extraSmall",
      // NOTE: Figmaの値と違うがリサイズハンドルを考慮して小さくしている
      marginRight: "sd.system.dimension.spacing.twoExtraSmall",
      marginBottom: "sd.system.dimension.spacing.twoExtraSmall",
      marginLeft: "sd.system.dimension.spacing.small",
      _disabled: {
        cursor: "not-allowed",
      },
    },
    required: {
      pl: "sd.system.dimension.spacing.extraSmall",
      color: "sd.system.color.impression.negative",
    },
    messageField: {
      textAlign: "right",
      color: "sd.system.color.component.onSurfaceVariant",
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
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      placeholder,
      label,
      description,
      required,
      invalidMessage,
      invalid,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const mergedRef = mergeRefs(inputRef, ref);
    const [styleProps, selectProps] = TextAreaStyle.splitVariantProps(props);
    const styles = TextAreaStyle(styleProps);
    const showMessageField = description || (invalid && invalidMessage);

    return (
      // NOTE: rootのサイズやマージンなどをプロパティとして渡したくなる気がする
      <div className={styles.root}>
        <label className={styles.label}>
          {label}
          {required && (
            // とりあえず必須メッセージはハードコード
            <span className={styles.required}>必須</span>
          )}
        </label>
        <div
          className={styles.wrapper}
          data-invalid={invalid ? true : undefined}
          data-disabled={disabled ? true : undefined}>
          <textarea
            ref={mergedRef}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={styles.textarea}
            {...selectProps}
          />
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
