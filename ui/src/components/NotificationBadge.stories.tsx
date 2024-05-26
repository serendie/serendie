import type { Meta, StoryObj } from "@storybook/react";

import { NotificationBadge } from "./NotificationBadge";

const meta: Meta<typeof NotificationBadge> = {
  component: NotificationBadge,
  decorators: [(Story) => <Story />],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
      defaultValue: "primary",
    },
    count: {
      control: { type: "number" },
      defaultValue: 1,
    },
    noNumber: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ position: "relative" }}>
      <NotificationBadge variant="secondary" {...args} />
    </div>
  ),
  args: {
    count: 1,
    variant: "primary",
    noNumber: false,
  },
};

export const NoNumber: Story = {
  render: (args) => (
    <div style={{ position: "relative" }}>
      <NotificationBadge noNumber {...args} />
    </div>
  ),
  args: {
    count: 1,
    variant: "primary",
    noNumber: true,
  },
};
