import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";
import { List } from "./List";

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  parameters: {
    controls: {
      expanded: true,
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
    text: "リストスタイル0",
    rightIcon: "chevron_right",
  }
};

export const Badge: Story = {
  args: {
    leftIcon: "error",
    isLargeLeftIcon: true,
    text: "リストスタイル1",
    description: "補足テキスト補足テキスト10分前",
    badge: 100,
  }
};
