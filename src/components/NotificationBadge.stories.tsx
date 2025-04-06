import type { Meta, StoryObj } from "@storybook/react";
import { NotificationBadge } from "./NotificationBadge";
import figma from "@figma/code-connect";

const meta: Meta<typeof NotificationBadge> = {
  component: NotificationBadge,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=1262-28909",
      props: {
        variant: figma.enum("Color", {
          Primary: "primary",
          Secondary: "secondary",
        }),
        size: figma.enum("Size", {
          Small: "small",
          Medium: "medium",
        }),
        noNumber: figma.enum("Type", { "Non-number": true }),
        count: figma.enum("Type", { "With-number": figma.string("Count") }),
      },
      examples: [FigmaExample],
    },
  },
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

function FigmaExample(props: React.ComponentProps<typeof NotificationBadge>) {
  return <NotificationBadge {...props} />;
}

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
