import type { Meta, StoryObj } from "@storybook/react";

import { NotificationBadge } from "./NotificationBadge";

const meta: Meta<typeof NotificationBadge> = {
  component: NotificationBadge,
  decorators: [(Story) => <Story />],
  argTypes: {
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
      <NotificationBadge variant="secondary" count={args.count} />
    </div>
  ),
  args: {
    count: 1,
  },
};
