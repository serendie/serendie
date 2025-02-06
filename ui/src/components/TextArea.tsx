import React, { ComponentPropsWithoutRef } from "react";
import mergeRefs from "merge-refs";
import { forwardRef } from "react";
import { cx, sva } from "../../styled-system/css";

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
      '&:has([data-focus="true"])': {
        outlineWidth: "sd.system.dimension.border.thick",
        outlineColor: "sd.system.color.impression.primary",
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
  variants: {
    autoAdjustHeight: {
      true: {
        textarea: {
          fieldSizing: "content",
          minHeight: "2lh",
        },
      },
    },
  },
});

type Props = {
  label?: string;
  description?: string;
  invalid?: boolean;
  invalidMessage?: string;
  autoAdjustHeight?: boolean;
} & ComponentPropsWithoutRef<"textarea">;

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
      className,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const mergedRef = mergeRefs(inputRef, ref);
    const [variantProps, elementProps] = TextAreaStyle.splitVariantProps(props);
    const styles = TextAreaStyle(variantProps);
    const showMessageField = description || (invalid && invalidMessage);

    return (
      <div className={cx(styles.root, className)}>
        {label ? (
          <label className={styles.label}>
            {label}
            {required && (
              // とりあえず必須メッセージはハードコード
              <span className={styles.required}>必須</span>
            )}
          </label>
        ) : null}
        <div
          className={styles.wrapper}
          data-invalid={invalid ? true : undefined}
          data-disabled={disabled ? true : undefined}
        >
          <textarea
            ref={mergedRef}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={styles.textarea}
            {...elementProps}
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
