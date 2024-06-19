import type { Meta, StoryObj } from "@storybook/react";

import { DropdownMenu, MenuItemProps } from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  decorators: [(Story) => <Story />],
};


export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const sampleItems: MenuItemProps[] = [
  { label: "リストタイトル", value: "value1", icon: "texture" },
  { label: "リストタイトル", value: "value2", icon: "texture" },
  { label: "リストタイトル", value: "value3", icon: "texture" },
  { label: "リストタイトル", value: "value4", icon: "texture" },
  { label: "リストタイトル", value: "value5", icon: "texture" },
]

export const Default: Story = {
  render: () => <DropdownMenu title="menu" items={sampleItems}/>,
};

export const Icon: Story = {
  render: () => <DropdownMenu title="menu" items={sampleItems} isIconMenu/>,
};