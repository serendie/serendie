import React, { forwardRef, useState } from "react";
import { TextField } from "../TextField";
import { SerendieSymbolEye, SerendieSymbolEyeHidden } from "@serendie/symbols";
import { IconButton } from "../IconButton";
import { useTranslations } from "../../i18n";

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
    const t = useTranslations();
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
        aria-label={
          showPassword
            ? t("passwordField.hidePassword")
            : t("passwordField.showPassword")
        }
        disabled={disabled}
        icon={
          showPassword ? <SerendieSymbolEyeHidden /> : <SerendieSymbolEye />
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
