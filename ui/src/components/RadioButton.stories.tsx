import type { Meta, StoryObj } from "@storybook/react";

import { RadioButton, RadioButtonProps } from "./RadioButton"
import { RadioGroup } from "@ark-ui/react";

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  decorators: [
    (Story) => (
      <RadioGroup.Root>
        <Story />
      </RadioGroup.Root>
    )
  ]
}


export default meta;
type Story = StoryObj<typeof RadioButton>;

const Template= (args: RadioButtonProps) => (
  <RadioGroup.Root>
    <RadioButton {...args} label="タイトルタイトル1" value="itemA" />
    <RadioButton {...args} label="タイトルタイトル2" value="itemB" />
    <RadioButton {...args} label="タイトルタイトル3" value="itemC" disabled={true} />
    <RadioButton {...args} label="タイトルタイトル4" value="itemD" />
  </RadioGroup.Root>
);


export const Expanded: Story = {
  render: Template,
};

export const Compact: Story = {
  render: Template,
  args: {
    variant: "compact",
  },
};
