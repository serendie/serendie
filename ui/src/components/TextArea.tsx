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
    wrapper: {
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
      },
      _invalid: {
        outlineColor: "dic.system.color.impression.negative",
      },
    },
    textarea: {
      outline: "none",
      paddingTop: "dic.system.dimension.spacing.extraSmall",
      paddingRight: "dic.system.dimension.spacing.small",
      paddingBottom: "dic.system.dimension.spacing.extraSmall",
      paddingLeft: "dic.system.dimension.spacing.small",
      _disabled: {
        cursor: "not-allowed",
      },
    },
    required: {
      pl: "dic.system.dimension.spacing.extraSmall",
      color: "dic.system.color.impression.negative",
    },
    messageField: {
      textAlign: "right",
      color: "dic.system.color.component.onSurfaceVariant",
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
