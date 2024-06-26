import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
      defaultValue: "medium",
    },
    text: {
      control: { type: "text" },
      defaultValue: "",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Image: Story = {
  args: {
    size: "medium",
    src: "https://i.pravatar.cc/300",
    text: "AB",
  },
};

export const Text: Story = {
  args: {
    size: "medium",
    text: "AB",
  },
};

export const PlaceholderFilled: Story = {
  args: {
    size: "medium",
  },
};

export const PlaceholderOutlined: Story = {
  args: {
    size: "medium",
    placeholder: "outlined",
  },
};
