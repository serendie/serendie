import { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionProps } from "./Accordion";
import { AccordionGroup } from "./AccordionGroup";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    title: {
      control: { type: "text" },
      defaultValue: "タイトル",
    },
    isLeftIcon: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    description: {
      control: { type: "text" },
      defaultValue: "詳細内容テキストがはいります",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const Template = (args: AccordionProps) => (
  <AccordionGroup>
    <Accordion {...args} title="ヘルプ1" />
    <Accordion {...args} title="ヘルプ2" />
    <Accordion {...args} title="ヘルプ3" />
  </AccordionGroup>
);

export const Default: Story = {
  render: Template,
  args: {
    description:
      "詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります",
  },
};

export const isLeftIcon: Story = {
  render: Template,
  args: {
    description:
      "詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります",
    isLeftIcon: true,
  },
};
