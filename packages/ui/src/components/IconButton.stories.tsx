import type { Meta, StoryObj } from "@storybook/react";

import { IconButton, IconButtonStyle } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  parameters: {
    controls: {
      expanded: true,
      include: ["shape", "type", "size", "disabled"],
    },
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    shape: {
      options: IconButtonStyle.variantMap.shape,
      control: { type: "radio" },
      defaultValue: "rectangle",
    },
    type: {
      options: IconButtonStyle.variantMap.type,
      control: { type: "radio" },
      defaultValue: "filled",
    },
    size: {
      options: IconButtonStyle.variantMap.size,
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
