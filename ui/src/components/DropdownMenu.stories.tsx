import type { Meta, StoryObj } from "@storybook/react";

import { DropdownMenu, DropdownMenuProps, MenuItemProps } from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  decorators: [(Story) => <Story />],
  argTypes: {
    title: {
      control: { type: "text" },
      defaultValue: "メニュータイトル",
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    isIconMenu: {
      control: { type: "boolean" },
      defaultValue: false,
    }
  },
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

const Template = (args: DropdownMenuProps) => (
  <DropdownMenu {...args} items={sampleItems}/>
);

export const Default: Story = {
  render: Template,
  args: {
    title: "メニュータイトル",
  },
};

export const Icon: Story = {
  render: Template,
  args: {
    title: "メニュータイトル",
    isIconMenu: true,
  },
};