import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./Tabs";
import { TabItem, TabItemProps } from "./TabItem";

const meta: Meta<typeof TabItem> = {
  component: TabItem,
};

export default meta;
type Story = StoryObj<typeof TabItem>;

export const Default: Story = {
  render: (args: TabItemProps) => (
    <Tabs defaultValue="2">
      <TabItem {...args} />
      <TabItem title="トーク" value="2" />
      <TabItem title="売上履歴" value="3" disabled dot />
      <TabItem title="入出金" value="4" badge={3} />
    </Tabs>
  ),
  args: {
    title: "連絡先",
    value: "1",
  },
};