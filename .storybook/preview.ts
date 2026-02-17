import "../src/styles.css";

import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { themeNames } from "../src/preset";
import { viewports } from "./modes";
import { SerendieProvider, type Language } from "../src/i18n";
import type { ColorTheme, ColorMode } from "../src/theme/ThemeContext";

const deviceViewports = {
  iphone14: INITIAL_VIEWPORTS.iphone14,
  iphone14promax: INITIAL_VIEWPORTS.iphone14promax,
  iphoneSE3: INITIAL_VIEWPORTS.iphoneSE3,
  ipad11p: INITIAL_VIEWPORTS.ipad11p,
  ipad12p: INITIAL_VIEWPORTS.ipad12p,
  pixel: INITIAL_VIEWPORTS.pixel,
  galaxys9: INITIAL_VIEWPORTS.galaxys9,
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        ...viewports,
        ...deviceViewports,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "ja", title: "日本語" },
          { value: "en", title: "English" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      name: "Theme",
      description: "Color theme",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "konjo", title: "konjo" },
          ...themeNames
            .filter((name) => !name.includes("-dark"))
            .map((name) => ({ value: name, title: name })),
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      name: "Color Mode",
      description: "Light or dark mode",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "system", title: "System" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: "ja",
    theme: "konjo",
    colorMode: "light",
  },
  decorators: [
    (Story, context) => {
      const locale = (context.globals.locale || "ja") as Language;
      const colorTheme = (context.globals.theme || "konjo") as ColorTheme;
      const colorMode = (context.globals.colorMode || "light") as ColorMode;
      return SerendieProvider({
        lang: locale,
        colorTheme,
        colorMode,
        children: Story(),
      });
    },
  ],
  tags: ["autodocs"],
};

export default preview;
