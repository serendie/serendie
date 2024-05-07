import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "./Search";

const items = ["React", "Vue", "Angular", "Svelte", "Ember", "React", "Vue"];

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
    onInputValueChange: (v) => console.log(v),
    disabled: false,
    placeholder: "デバイスIDなどを検索",
    items,
  },
};

export const Small: Story = {
  args: {
    onInputValueChange: (v) => console.log(v),
    disabled: false,
    placeholder: "デバイスIDなどを検索",
    size: "small",
    items,
  },
};

export const Disabled: Story = {
  args: {
    onInputValueChange: (v) => console.log(v),
    disabled: true,
    placeholder: "デバイスIDなどを検索",
    items,
  },
};
