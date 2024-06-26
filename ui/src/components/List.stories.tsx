import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";
import { List } from "./List";

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  parameters: {
    controls: {
      expanded: true,
      include: [
        "title",
        "description",
        "rightIcon",
        "leftIcon",
        "badge",
        "disabled",
        "isLargeLeftIcon",
      ],
    },
  },
  decorators: [
    (Story) => (
      <List style={{ width: 375 }}>
        <Story />
        <Story />
        <Story />
      </List>
    ),
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
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Basic: Story = {
  args: {
    leftIcon: "texture",
    title: "リストスタイル",
  },
};

export const Description: Story = {
  args: {
    leftIcon: "texture",
    title: "リストスタイル",
    description: "補足テキスト補足テキスト",
  },
};

export const RightIcon: Story = {
  args: {
    rightIcon: "chevron_right",
    title: "リストスタイル",
  },
};

export const Badge: Story = {
  args: {
    leftIcon: "texture",
    title: "リストスタイル1",
    description: "補足テキスト補足テキスト10分前",
    badge: 100,
  },
};
