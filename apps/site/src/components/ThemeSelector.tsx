import { useEffect, useState } from "react";

import tokens from "@serendie/design-token/panda";
import { ThemeSelect } from "./ThemeSelect";

const { themes } = tokens;
const themeNames = Object.keys(themes);

const defaultTheme = "konjo";

themeNames.unshift(defaultTheme);

const statusBarColors = themeNames.map((name) => ({
  name,
  color:
    name === defaultTheme
      ? tokens.colors.sd.system.color.impression.tertiary.value
      : themes[name as keyof typeof themes].tokens.colors.sd.system.color
          .impression.tertiary.value,
}));

const defaultStatusBarColor =
  tokens.colors.sd.system.color.impression.tertiary.value;

const themeItems = [
  ...themeNames.map((name) => ({
    // 1文字目を大文字にする
    label: name.charAt(0).toUpperCase() + name.slice(1),
    value: name,
  })),
];

const getStatusBarColor = (theme: string) =>
  statusBarColors.find((color) => color.name === theme)?.color ??
  defaultStatusBarColor;

const setStatusBarColor = (theme: string) =>
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", getStatusBarColor(theme));

export const ThemeSelector = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (!theme) {
      const htmlTheme =
        document.documentElement.getAttribute("data-panda-theme") ||
        defaultTheme;
      setTheme(htmlTheme);
      localStorage.setItem("panda-theme", htmlTheme);
    } else {
      document.documentElement.setAttribute("data-panda-theme", theme);
      localStorage.setItem("panda-theme", theme);
    }
    // トップページのみステータスバーの色を変更
    if (window.location.pathname === "/") {
      setStatusBarColor(theme);
    }
  }, [theme]);

  return (
    <ThemeSelect
      onValueChange={({ value }) => setTheme(value[0])}
      value={[theme]}
      size="small"
      items={themeItems}
    />
  );
};
