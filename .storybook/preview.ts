import "../src/styles.css";

import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { themeNames } from "../src/preset";
import { viewports } from "./modes";
import { SerendieProvider, type Language } from "../src/i18n";

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
  },
  initialGlobals: {
    locale: "ja",
  },
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        konjo: "", // デフォルト（テーマなし）
        ...themeNames.reduce((acc, name) => {
          acc[name] = name;
          return acc;
        }, {}),
      },
      defaultTheme: "konjo",
      attributeName: "data-panda-theme",
    }),
    (Story, context) => {
      const locale = (context.globals.locale || "ja") as Language;
      return SerendieProvider({
        lang: locale,
        children: Story(),
      });
    },
  ],
  tags: ["autodocs"],
};

export default preview;
