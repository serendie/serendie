import type { Meta, StoryObj } from "@storybook/react";

import { RadioButton, RadioButtonProps, RadioButtonStyle } from "./RadioButton";
import { RadioGroup } from "@ark-ui/react";

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  decorators: [
    (Story) => (
      <RadioGroup.Root>
        <Story />
      </RadioGroup.Root>
    ),
  ],
  argTypes: {
    variant: {
      options: RadioButtonStyle.variantMap.variant,
      control: { type: "radio" },
      defaultValue: "expanded",
    },
    helperText: {
      control: { type: "text" },
      defaultValue: "",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

const Template = (args: RadioButtonProps) => (
  <>
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
  </>
);

export const Expanded: Story = {
  render: Template,
  args: {
    variant: "expanded",
  },
};

export const Compact: Story = {
  render: Template,
  args: {
    variant: "compact",
  },
};

export const WithHelperText: Story = {
  render: Template,
  args: {
    variant: "expanded",
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};
