import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";
import { List } from "./List";

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  parameters: {
    controls: {
      expanded: true,
      include: ["text", "description", "rightIcon", "leftIcon", "badge", "disabled", "isLargeLeftIcon"],
    },
  },
  decorators: [(Story) => (
    <List style={{width: 375}}>
      <Story />
    </List>
  )
],
  argTypes: {
    badge: {
      control: { type: "number" },
      defaultValue: 0,
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    leftIcon: {
      control: { type: "text" },
    },
    rightIcon: {
      control: { type: "text" },
    },
    text: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  }
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Basic: Story = {
  args: {
    leftIcon: "search",
    text: "リストスタイル",
  }
};

export const Description: Story = {
  args: {
    leftIcon: "search",
    text: "リストスタイル",
    description: "補足テキスト補足テキスト",
  }
};

export const RightIcon: Story = {
  args: {
    rightIcon: "chevron_right",
    text: "リストスタイル",
  }
};

export const Badge: Story = {
  args: {
    leftIcon: "search",
    text: "リストスタイル1",
    description: "補足テキスト補足テキスト10分前",
    badge: 100,
  }
};
