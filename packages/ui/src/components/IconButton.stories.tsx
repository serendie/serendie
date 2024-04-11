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
      options: ["filled", "outline", "ghost"],
      control: { type: "radio" },
      defaultValue: "filled",
    },
    size: {
      options: ["small", "medium"],
      control: { type: "radio" },
      defaultValue: "medium",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Medium: Story = {
  args: {
    icon: "add",
    size: "medium",
    disabled: false,
  },
};
