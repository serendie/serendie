import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
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
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Medium: Story = {
  args: {
    children: "Button",
    size: "medium",
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    children: "Button",
    size: "small",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    type: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    type: "ghost",
  },
};
