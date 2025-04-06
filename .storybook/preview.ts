import "../src/styles.css";

import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themeNames } from "../src/preset";
import { viewports } from "./modes";

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: viewports,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        ...themeNames.reduce((acc, name) => {
          acc[name] = name;
          return acc;
        }, {}),
      },
      defaultTheme: "konjo",
      attributeName: "data-panda-theme",
    }),
  ],
  tags: ["autodocs"],
};

export default preview;
