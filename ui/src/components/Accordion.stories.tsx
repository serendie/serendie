import { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { AccordionGroup } from "./AccordionGroup";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => (
    <AccordionGroup>
      <Accordion {...args} title="ヘルプ1" />
      <Accordion {...args} title="ヘルプ2"/>
      <Accordion {...args} title="ヘルプ3"/>
    </AccordionGroup>
  ),
  args: {
    description:
      "詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります詳細内容テキストがはいります",
  },
};
