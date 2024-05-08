import type { Meta, StoryObj } from "@storybook/react";

import { RadioButton, RadioButtonProps } from "./RadioButton";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  decorators: [(Story) => <Story />],
  argTypes: {
    helperText: {
      control: { type: "text" },
      defaultValue: "",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

const Template = (args: RadioButtonProps) => (
  <RadioGroup onValueChange={(e) => console.log(e.value)}>
    <RadioButton
      {...args}
      label="タイトルタイトル1"
      value="itemA"
      helperText={args.helperText}
    />
    <RadioButton
      {...args}
      label="タイトルタイトル2"
      value="itemB"
      helperText={args.helperText}
    />
    <RadioButton
      {...args}
      label="タイトルタイトル3"
      value="itemC"
      disabled={true}
    />
    <RadioButton
      {...args}
      label="タイトルタイトル4"
      value="itemD"
      helperText={args.helperText}
    />
  </RadioGroup>
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
  render: (args: RadioButtonProps) => (
    <RadioGroup onValueChange={(e) => console.log(e.value)} defaultValue="itemE">
      <RadioButton
        {...args}
        label="タイトルタイトル1"
        value="itemE"
        helperText={args.helperText}
        disabled
      />
      <RadioButton
        {...args}
        label="タイトルタイトル2"
        value="itemF"
        helperText={args.helperText}
        disabled
      />
    </RadioGroup>
  ),
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};
