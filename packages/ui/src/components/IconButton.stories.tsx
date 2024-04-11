import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  parameters: {
    controls: {
      expanded: true,
      include: ["children", "type", "size", "disabled"],
    },
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    type: {
      options: ["outline", "ghost"],
      control: { type: "radio" },
      defaultValue: "filled",
    },
    size: {
      options: ["large", "medium", "small"],
      control: { type: "radio" },
      defaultValue: "medium",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Rectangle: Story = {
  args: {
    shape: "rectangle",
    icon: "add",
    size: "medium",
    disabled: false,
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
    icon: "add",
    size: "medium",
    disabled: false,
  },
};
