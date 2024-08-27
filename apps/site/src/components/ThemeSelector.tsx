import { Select } from "@serendie/ui";
import { useEffect, useState } from "react";

import tokens from "@serendie/design-token/panda";

const { themes } = tokens;
const themeNames = Object.keys(themes);

const defaultTheme = "konjo";

themeNames.unshift(defaultTheme);

const themeItems = [
  ...themeNames.map((name) => ({
    // 1文字目を大文字にする
    label: name.charAt(0).toUpperCase() + name.slice(1),
    value: name,
  })),
];

export const ThemeSelector = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (!theme) {
      const storedTheme = localStorage.getItem("panda-theme");
      setTheme(storedTheme || defaultTheme);
    }
    localStorage.setItem("panda-theme", theme);
    document.documentElement.setAttribute("data-panda-theme", theme);
  }, [theme]);

  return (
    <Select
      onValueChange={({ value }) => setTheme(value[0])}
      value={[theme]}
      size="small"
      items={themeItems}
    />
  );
};
