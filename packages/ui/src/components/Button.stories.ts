import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    controls: {
      expanded: true,
      include: ["children", "type", "size"],
    },
  },
  argTypes: {
    type: {
      options: ["filled", "outlined", "ghost"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium"],
      control: { type: "radio" },
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
