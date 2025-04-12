import React, { forwardRef, useState } from "react";
import { TextField } from "../TextField";
import { SerendieSymbol } from "@serendie/symbols";
import { IconButton } from "../IconButton";

type PasswordFieldProps = Omit<
  React.ComponentProps<typeof TextField>,
  "type" | "rightContent"
> & {
  /**
   * パスワードの表示/非表示切り替えを無効にする
   */
  disableToggle?: boolean;
};

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ disableToggle = false, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const toggleButton = !disableToggle ? (
      <IconButton
        type="button"
        onClick={togglePasswordVisibility}
        styleType="ghost"
        size="small"
        shape="circle"
        aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
        disabled={disabled}
        icon={
          <SerendieSymbol
            name={showPassword ? "eye-hidden" : "eye"}
            size={20}
          />
        }
      />
    ) : undefined;

    return (
      <TextField
        type={showPassword ? "text" : "password"}
        rightContent={toggleButton}
        disabled={disabled}
        {...props}
        ref={ref}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";
