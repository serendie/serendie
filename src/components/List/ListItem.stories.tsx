import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListItem } from "./ListItem";
import { List } from "./List";
import figma from "@figma/code-connect";
import {
  SerendieSymbolChevronRight,
  SerendieSymbolPlaceholder,
} from "@serendie/symbols";

const meta: Meta<typeof ListItem> = {
  title: "Components/ListItem",
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
        subDescription: figma.enum("Lines", {
          "Multiple Lines": figma.string("SubDescription"),
        }),
        headingElement: figma.enum("Heading Elements", {
          IconMedium: figma.instance("LeftIconInstance"),
          IconLarge: figma.instance("LeftLargeIconInstance"),
        }),
        isLargeHeadingElement: figma.enum("Heading Elements", {
          IconLarge: true,
        }),
        trailingElement: figma.enum("Trailing Elements", {
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
        "subDescription",
        "trailingElement",
        "headingElement",
        "badge",
        "disabled",
        "selected",
        "isLargeHeadingElement",
        "isLargeTrailingElement",
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
    headingElement: {
      control: { type: "text" },
    },
    trailingElement: {
      control: { type: "text" },
    },
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    subDescription: {
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
    headingElement: <SerendieSymbolPlaceholder />,
    title: "リストスタイル",
  },
};

export const Description: Story = {
  args: {
    headingElement: <SerendieSymbolPlaceholder />,
    title: "リストスタイル",
    description: "補足テキスト補足テキスト",
  },
};

export const SubDescription: Story = {
  args: {
    headingElement: <SerendieSymbolPlaceholder />,
    title: "リストスタイル",
    description: "補足テキスト補足テキスト",
    subDescription: "10分前",
  },
};

export const TrailingIcon: Story = {
  args: {
    trailingElement: <SerendieSymbolChevronRight />,
    title: "リストスタイル",
  },
};

export const Badge: Story = {
  args: {
    headingElement: <SerendieSymbolPlaceholder />,
    title: "リストスタイル1",
    description: "補足テキスト補足テキスト",
    subDescription: "10分前",
    badge: 100,
  },
};

export const LargeHeadingElement: Story = {
  args: {
    headingElement: <SerendieSymbolPlaceholder />,
    isLargeHeadingElement: true,
    title: "リストスタイル",
    description: "補足テキスト補足テキスト",
  },
};

export const LargeTrailingElement: Story = {
  args: {
    headingElement: <SerendieSymbolPlaceholder />,
    isLargeHeadingElement: true,
    trailingElement: <SerendieSymbolChevronRight />,
    isLargeTrailingElement: true,
    title: "リストスタイル",
  },
};

export const WithBadgeAndLargeIcon: Story = {
  args: {
    headingElement: <SerendieSymbolPlaceholder />,
    isLargeHeadingElement: true,
    title: "リストスタイル",
    description: "補足テキスト補足テキスト",
    badge: 5,
  },
};

export const Disabled: Story = {
  args: {
    headingElement: <SerendieSymbolPlaceholder />,
    trailingElement: <SerendieSymbolChevronRight />,
    title: "無効なアイテム",
    disabled: true,
  },
};

export const Selected: Story = {
  args: {
    headingElement: <SerendieSymbolPlaceholder />,
    trailingElement: <SerendieSymbolChevronRight />,
    title: "選択されたアイテム",
    selected: true,
  },
};
