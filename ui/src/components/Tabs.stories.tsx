import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { TabItem, TabItemProps } from "./TabItem";
import figma from "@figma/code-connect";

const meta: Meta<typeof TabItem> = {
  component: TabItem,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-Design-System?node-id=3430-26917",
      props: {
        title: figma.string("Title"),
        disabled: figma.enum("State", { Disabled: true }),
        dot: figma.enum("Notification", { Dot: true }),
        badge: figma.enum("Notification", {
          Number: 5,
        }),
      },
      examples: [FigmaExample],
    },
  },
  argTypes: {
    title: {
      control: { type: "text" },
      defaultValue: "連絡先",
    },
    value: {
      control: { type: "text" },
      defaultValue: "1",
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    dot: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    badge: {
      control: { type: "number" },
      defaultValue: 0,
    },
  },
};

// TabsはStorybookに乗せていないのでfimga.connectのみ対応
figma.connect(
  Tabs,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-Design-System?node-id=3430-27569",
  {
    props: {
      children: figma.children("TabItem*"),
    },
    imports: ["import { Tabs, TabItem } from '@serendie/ui'"], // サンプル表示用
    example: (props) => <Tabs defaultValue="1">{props.children}</Tabs>,
  }
);

function FigmaExample(props: React.ComponentProps<typeof TabItem>) {
  return <TabItem {...props} value="1" />;
}

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
