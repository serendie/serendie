import { Meta, StoryObj } from "@storybook/react";
import { Badge, BadgeStyle } from "./Badge";

const meta: Meta<typeof Badge> = {
  component: Badge,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    size: {
      options: BadgeStyle.variantMap.size,
      control: { type: "select" },
      defaultValue: "medium",
    },
    styleColor: {
      options: BadgeStyle.variantMap.styleColor,
      control: { type: "select" },
      defaultValue: "gray",
    },
  },
  args: {
    children: "Badge",
    styleColor: "gray",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};
