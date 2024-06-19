import type { Meta, StoryObj } from "@storybook/react";

import { IconButton, IconButtonStyle } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  parameters: {
    controls: {
      expanded: true,
      include: ["shape", "styleType", "size", "disabled", "mt"],
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
      defaultValue: "circle",
    },
    styleType: {
      options: IconButtonStyle.variantMap.styleType,
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
  render: (props) => <IconButton {...props} />,
};

export const Circle: Story = {
  args: {
    shape: "circle",
    icon: "add",
    size: "medium",
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    shape: "circle",
    icon: "add",
    size: "small",
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    shape: "circle",
    icon: "add",
    size: "medium",
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    shape: "circle",
    icon: "add",
    size: "large",
    disabled: false,
  },
};

export const Filled: Story = {
  args: {
    shape: "circle",
    icon: "add",
    size: "medium",
    styleType: "filled",
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    shape: "circle",
    icon: "add",
    size: "medium",
    styleType: "outlined",
    disabled: false,
  },
};

export const Ghost: Story = {
  args: {
    shape: "circle",
    icon: "add",
    size: "medium",
    styleType: "ghost",
    disabled: false,
  },
};
