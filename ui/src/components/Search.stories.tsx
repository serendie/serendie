import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "./Search";

const items = ["React", "Vue", "Angular", "Svelte", "Ember", "Preact"];

const meta: Meta<typeof Search> = {
  component: Search,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Basic: Story = {
  args: {
    disabled: false,
    items,
  },
};
