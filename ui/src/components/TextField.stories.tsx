import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";
import figma from "@figma/code-connect";

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=5113-4273",
      props: {
        label: figma.string("Label"),
        disabled: figma.enum("State", { Disabled: true }),
        invalid: figma.enum("State", { Error: true }),
        invalidMessage: figma.string("InvalidMessage"),
        description: figma.string("Description"),
        placeholder: figma.string("Placeholder"),
        required: figma.boolean("Required"),
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
    onChange: (e) => {
      console.log(e);
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof TextField>) {
  return <TextField {...props} />;
}

export default meta;
type Story = StoryObj<typeof TextField>;

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
