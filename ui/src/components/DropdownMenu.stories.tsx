import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu, DropdownMenuProps, MenuItemProps } from "./DropdownMenu";
import figma from "@figma/code-connect";
import { SvgIcon } from "./SvgIcon";

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=6375-6010",
      props: {
        title: figma.string("Title"),
        disabled: figma.enum("State", { Disabled: true }),
        isIconMenu: figma.enum("Type", { IconButton: true }),
      },
      examples: [FigmaExample],
    },
  },
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
    },
  },
};

function FigmaExample(props: DropdownMenuProps) {
  return (
    <DropdownMenu
      {...props}
      items={[
        {
          label: "list title",
          value: "value1",
          icon: <SvgIcon icon="texture" />,
        },
      ]}
    />
  );
}

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const sampleItems: MenuItemProps[] = [
  {
    label: "リストタイトル",
    value: "value1",
    icon: <SvgIcon icon="texture" />,
  },
  {
    label: "リストタイトル",
    value: "value2",
    icon: <SvgIcon icon="texture" />,
  },
  {
    label: "リストタイトル",
    value: "value3",
    icon: <SvgIcon icon="texture" />,
  },
  {
    label: "リストタイトル",
    value: "value4",
    icon: <SvgIcon icon="texture" />,
  },
  {
    label: "リストタイトル",
    value: "value5",
    icon: <SvgIcon icon="texture" />,
  },
];

const Template = (args: DropdownMenuProps) => (
  <DropdownMenu {...args} items={sampleItems} />
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
