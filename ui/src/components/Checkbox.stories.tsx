import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, CheckboxProps } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  decorators: [(Story) => <Story />],
  argTypes: {
    helperText: {
      control: { type: "text" },
      defaultValue: "",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template = (args: CheckboxProps) => (
  <>
    <Checkbox
      {...args}
      label="タイトルタイトル1"
      value="itemA"
      helperText={args.helperText}
    />
    <Checkbox
      {...args}
      label="タイトルタイトル2"
      value="itemB"
      helperText={args.helperText}
    />
    <Checkbox
      {...args}
      label="タイトルタイトル3"
      value="itemC"
      disabled={true}
    />
    <Checkbox
      {...args}
      label="タイトルタイトル4"
      value="itemD"
      helperText={args.helperText}
    />
  </>
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
  render: (args: CheckboxProps) => (
    <>
      <Checkbox
        {...args}
        label="タイトルタイトル2"
        value="itemB"
        helperText={args.helperText}
        defaultChecked
        disabled
      />
      <Checkbox
        {...args}
        label="タイトルタイトル3"
        value="itemC"
        disabled
      />
    </>
  ),
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};
