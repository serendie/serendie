import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { ListItem } from "./ListItem";

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

const DialogOpenTemplate = () => {
  return (
    <List>
      <ListItem text="リストスタイル1" leftIcon="search" />
      <ListItem
        text="リストスタイル2"
        leftIcon="search"
        description="補足テキスト補足テキスト10分前"
      />
      <ListItem text="リストスタイル3" />
      <ListItem text="リストスタイル4" />
    </List>
  );
};

export const Basic: Story = {
  render: DialogOpenTemplate,
};
