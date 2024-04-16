import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonStyle } from "./Button";
import { SvgIcon } from "./SvgIcon";

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
      options: ButtonStyle.variantMap.type,
      control: { type: "radio" },
      defaultValue: "filled",
    },
    size: {
      options: ButtonStyle.variantMap.size,
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

export const Rounded: Story = {
  args: {
    children: "Rounded Button",
    type: "ghost",
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Button",
    leftIcon: <SvgIcon icon="chevron_left" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Button",
    rightIcon: <SvgIcon icon="chevron_right" />,
  },
};
