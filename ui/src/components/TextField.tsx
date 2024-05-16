import React from "react";
import mergeRefs from "merge-refs";
import { forwardRef } from "react";
import { sva } from "../../styled-system/css";
import { SvgIcon } from "./SvgIcon";

const TextFieldStyle = sva({
  slots: ["root", "input", "reset"],
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
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = mergeRefs(inputRef, ref);
    const [styleProps, selectProps] = TextFieldStyle.splitVariantProps(props);
    const styles = TextFieldStyle(styleProps);

    const resetValue = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    return (
      <div className={styles.root}>
        <label>{label}</label>
        <div>
          <input
            ref={mergedRef}
            placeholder={placeholder}
            required={required}
            type={type}
            {...selectProps}
          />
          {invalid ? (
            <SvgIcon icon="error" />
          ) : (
            <button onClick={resetValue} aria-label="値をクリア">
              <SvgIcon icon="close" />
            </button>
          )}
        </div>
        {description && <p>{description}</p>}
        {invalidMessage && <p>{invalidMessage}</p>}
      </div>
    );
  }
);
