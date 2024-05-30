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
    <div style={{ width: 375 }}>
      <List>
        <ListItem text="リストスタイル0" />
        <ListItem
          text="リストスタイル1"
          description="補足テキスト補足テキスト10分前"
        />
        <ListItem
          text="リストスタイル2"
          leftIcon="search"
          description="補足テキスト補足テキスト10分前"
        />
        <ListItem
          text="リストスタイル3"
          leftIcon="search"
          description="補足テキスト補足テキスト10分前"
          rightIcon="chevron_right"
        />
        <ListItem
          text="リストスタイル3"
          leftIcon="search"
          description="補足テキスト補足テキスト10分前"
          badge={3}
        />
        <ListItem
          text="リストスタイル3"
          leftIcon="search"
          description="補足テキスト補足テキスト10分前"
          rightIcon="chevron_right"
          disabled
        />
        <ListItem text="リストスタイル4" />
      </List>
    </div>
  );
};

export const Basic: Story = {
  render: DialogOpenTemplate,
};
