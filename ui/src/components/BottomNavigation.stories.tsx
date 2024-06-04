import type { Meta, StoryObj } from "@storybook/react";

import { BottomNavigation } from "./BottomNavigation";
import { BottomNavigationItem } from "./BottomNavigationItem";

const meta: Meta<typeof BottomNavigationItem> = {
  component: BottomNavigationItem,
  decorators: [
    (Story) => (
      <BottomNavigation>
        <Story />
      </BottomNavigation>
    ),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BottomNavigationItem>;

export const Default: Story = {
  render: () => (
    <>
      <BottomNavigationItem icon="search" label="ホーム" isActive />
      <BottomNavigationItem icon="search" label="トーク" dot/>
      <BottomNavigationItem icon="search" label="カレンダー" count={3} />
      <BottomNavigationItem icon="search" label="アカウント" />
    </>
  ),
};
