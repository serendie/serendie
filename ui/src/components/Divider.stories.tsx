import { Meta, StoryObj } from "@storybook/react";
import { Divider, DividerStyle } from "./Divider";

const meta: Meta<typeof Divider> = {
  component: Divider,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    colorType: {
      options: DividerStyle.variantMap.colorType,
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
    colorType: "normal",
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
