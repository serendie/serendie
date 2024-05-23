import { Meta, StoryObj } from "@storybook/react";
import { Divider, DividerStyle } from "./Divider";

const meta: Meta<typeof Divider> = {
  component: Divider,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    color: {
      options: DividerStyle.variantMap.color,
      control: { type: "select" },
      defaultValue: "normal",
    },
    type: {
      options: DividerStyle.variantMap.type,
      control: { type: "select" },
      defaultValue: "horizontal",
    },
  },
  args: {
    color: "normal",
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    type: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    type: "vertical",
  },
};
