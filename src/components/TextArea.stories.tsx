import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";
import figma from "@figma/code-connect";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=1406-17592",
      props: {
        label: figma.string("Label"),
        placeholder: figma.string("Placeholder"),
        description: figma.string("Description"),
        disabled: figma.enum("State", { Disabled: true }),
        invalid: figma.enum("State", { Error: true }),
        invalidMessage: figma.string("InvalidMessage"),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  args: {
    label: "ラベル",
    required: true,
    disabled: false,
    invalid: false,
    invalidMessage: "入力の誤りに関するテキスト",
    description: "入力方法などに関するヘルプテキスト",
    placeholder: "プレースホルダー",
  },
};

function FigmaExample(props: React.ComponentProps<typeof TextArea>) {
  return <TextArea {...props} />;
}

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const HasError: Story = {
  args: {
    invalid: true,
  },
};

export const AutoAdjustHeight: Story = {
  args: {
    autoAdjustHeight: true,
  },
};
