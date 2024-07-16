import type { StorybookConfig } from "@storybook/react-vite";

import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../../../ui/src/**/*.mdx",
    "../../../ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    //getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-interactions"),
    "@chromatic-com/storybook"
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
