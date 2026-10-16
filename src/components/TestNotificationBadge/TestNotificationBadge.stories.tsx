import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestNotificationBadge } from "./TestNotificationBadge";

const meta = {
  component: TestNotificationBadge,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "radio" },
      options: ["small", "medium"],
    },
    count: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    dot: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof TestNotificationBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 1,
    variant: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    count: 5,
    variant: "secondary",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    count: 3,
    variant: "primary",
    size: "small",
  },
};

export const MaxCount: Story = {
  args: {
    count: 120,
    max: 99,
    variant: "primary",
    size: "medium",
  },
};

export const Dot: Story = {
  args: {
    dot: true,
    variant: "primary",
  },
};
