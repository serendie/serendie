import type { Meta, StoryObj } from "@storybook/react";

import { Choicebox } from "./Choicebox";
import { RadioGroup } from "..";

const meta: Meta<typeof Choicebox> = {
  component: Choicebox,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Choicebox>;

export const Radio: Story = {
  render: () => (
    <RadioGroup>
      <Choicebox value="itemA" type="radio" />
    </RadioGroup>
  ),
};

export const Checkbox: Story = {
  args: {
    value: "itemA",
    type: "checkbox",
  },
};
