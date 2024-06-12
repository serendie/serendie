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
    <Tabs>
      <TabItem {...args} />
      <TabItem title="タイトル2" value="2" />
      <TabItem title="タイトル3" value="3" disabled />
    </Tabs>
  ),
  args: {
    title: "タイトル1",
    value: "1",
  },
};