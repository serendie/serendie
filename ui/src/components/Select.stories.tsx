import { Select } from "./Select";
import type { Meta, StoryObj } from "@storybook/react";

const items = [
  { label: "React", value: "React" },
  { label: "Vue", value: "Vue" },
  { label: "Angular", value: "Angular" },
  { label: "Svelte", value: "Svelte" },
  { label: "Ember", value: "Ember" },
];

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  args: {
    onValueChange: (v) => console.log(v),
    label: "ラベル",
    required: true,
    disabled: false,
    invalid: false,
    invalidMessage: "",
    placeholder: "選択してください",
    items,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const HasError: Story = {
  args: {
    onValueChange: (v) => console.log(v),
    invalid: true,
    invalidMessage: "エラーメッセージ",
  },
};
