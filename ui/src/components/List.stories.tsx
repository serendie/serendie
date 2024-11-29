import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";
import { List } from "./List";
import figma from "@figma/code-connect";
import { SvgIcon } from "./SvgIcon";

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3442-9387",
      props: {
        disabled: figma.enum("State", { Disabled: true }),
        selected: figma.enum("State", { Selected: true }),
        focusVisible: figma.enum("State", { Focused: true }),
        title: figma.string("Title"),
        description: figma.enum("Lines", {
          "Multiple Lines": figma.string("Description"),
        }),
        children: figma.enum("Lines", {
          "Multiple Lines": figma.string("SubDescription"),
        }),
        leftIcon: figma.enum("Heading Elements", {
          IconMedium: figma.instance("LeftIconInstance"),
          IconLarge: figma.instance("LeftLargeIconInstance"),
        }),
        isLargeLeftIcon: figma.enum("Heading Elements", { IconLarge: true }),
        rightIcon: figma.enum("Trailing Elements", {
          Icon: figma.instance("RightIconInstance"),
        }),
        badge: figma.enum("Trailing Elements", {
          Badge: 5,
        }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
      include: [
        "title",
        "description",
        "rightIcon",
        "leftIcon",
        "badge",
        "disabled",
        "selected",
        "isLargeLeftIcon",
      ],
    },
  },
  decorators: [
    (ListItem) => (
      <List style={{ width: 375 }}>
        <ListItem />
        <ListItem />
        <ListItem />
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
    selected: {
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

function FigmaExample(props: React.ComponentProps<typeof ListItem>) {
  return (
    <List>
      <ListItem {...props} />
    </List>
  );
}

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Basic: Story = {
  args: {
    leftIcon: <SvgIcon icon="texture" />,
    title: "リストスタイル",
  },
};

export const Description: Story = {
  args: {
    leftIcon: <SvgIcon icon="texture" />,
    title: "リストスタイル",
    description: "補足テキスト補足テキスト",
  },
};

export const RightIcon: Story = {
  args: {
    rightIcon: <SvgIcon icon="chevron_right" />,
    title: "リストスタイル",
  },
};

export const Badge: Story = {
  args: {
    leftIcon: <SvgIcon icon="texture" />,
    title: "リストスタイル1",
    description: "補足テキスト補足テキスト10分前",
    badge: 100,
  },
};
