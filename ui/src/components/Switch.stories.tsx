import type { Meta, StoryObj } from "@storybook/react";

import { Switch, SwitchProps } from "./Switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  decorators: [(Story) => <Story />],
  argTypes: {
    helperText: {
      control: { type: "text" },
      defaultValue: "",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const Template = (args: SwitchProps) => (
  <Switch
    {...args}
    label="タイトルタイトル1"
    helperText={args.helperText}
  />
);

export const Default: Story = {
  render: Template,
};

export const WithHelperText: Story = {
  render: Template,
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};

export const Disabled: Story = {
  render: (args: SwitchProps) => (
    <>
      <Switch
        {...args}
        label="タイトルタイトル1"
        helperText={args.helperText}
        checked
        disabled
      />
      <Switch
        {...args}
        label="タイトルタイトル1"
        helperText={args.helperText}
        disabled
      />
    </>
  ),
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};
