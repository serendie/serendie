import { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionProps } from "./Accordion";
import { AccordionGroup } from "./AccordionGroup";
import figma from "@figma/code-connect";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-Design-System?node-id=4728-44779",
      props: {
        title: figma.string("Title"),
        description: figma.enum("State", {
          Expanded: figma.string("Description"),
        }),
        isIconLeft: figma.enum("Icon", { Left: true }),
      },
      examples: [FigmaExample],
    },
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

function FigmaExample(props: AccordionProps) {
  return (
    <AccordionGroup>
      <Accordion {...props} />
    </AccordionGroup>
  );
}

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

export const IsLeftIcon: Story = {
  render: Template,
  args: {
    description:
      "詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります",
    isLeftIcon: true,
  },
};
