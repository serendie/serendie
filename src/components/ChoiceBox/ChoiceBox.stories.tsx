import type { Meta, StoryObj } from "@storybook/react";
import { ChoiceBox } from "./ChoiceBox";
import { RadioGroup } from "../RadioButton";
import figma from "@figma/code-connect";

const meta: Meta<typeof ChoiceBox> = {
  component: ChoiceBox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=6816-45671",
      props: {
        type: figma.enum("Type", {
          Radio: "radio",
          Checkbox: "checkbox",
        }),
        checked: figma.enum("State", { Selected: true }),
        disabled: figma.enum("State", {
          "Disabled-Enabled": true,
          "Disabled-Selected": true,
        }),
      },
      examples: [FigmaExample],
    },
  },
  decorators: [(Story) => <Story />],
};

function FigmaExample(props: React.ComponentProps<typeof ChoiceBox>) {
  return (
    <RadioGroup>
      <ChoiceBox {...props} value="itemA" />
    </RadioGroup>
  );
}

export default meta;
type Story = StoryObj<typeof ChoiceBox>;

export const Radio: Story = {
  render: () => (
    <RadioGroup>
      <ChoiceBox value="itemA" type="radio" />
    </RadioGroup>
  ),
};

export const Checkbox: Story = {
  args: {
    value: "itemA",
    type: "checkbox",
  },
};
