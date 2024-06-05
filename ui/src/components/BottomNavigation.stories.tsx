import type { Meta, StoryObj } from "@storybook/react";

import { BottomNavigation } from "./BottomNavigation";
import {
  BottomNavigationItem,
  BottomNavigationItemProps,
} from "./BottomNavigationItem";

const meta: Meta<typeof BottomNavigationItem> = {
  component: BottomNavigationItem,
};

export default meta;
type Story = StoryObj<typeof BottomNavigationItem>;

export const Default: Story = {
  render: (args: BottomNavigationItemProps) => (
    <BottomNavigation>
      <BottomNavigationItem {...args} />
      <BottomNavigationItem icon="search" label="検索" />
      <BottomNavigationItem icon="search" label="トーク" dot />
      <BottomNavigationItem icon="search" label="カレンダー" count={3} />
      <BottomNavigationItem icon="search" label="アカウント" count={100} />
    </BottomNavigation>
  ),
  args: {
    label: "ホーム",
    icon: "search",
    isActive: true,
  },
};
