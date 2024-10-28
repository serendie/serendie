import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton, RadioButtonProps } from "./RadioButton";
import { RadioGroup } from "./RadioGroup";
import figma from "@figma/code-connect";

const meta: Meta<typeof RadioButton> = {
  component: RadioButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3354-7943",
      props: {
        label: figma.string("Label"),
        helperText: figma.enum("Lines", {
          "Multiple Lines": figma.string("HelperText"),
        }),
        disabled: figma.enum("State", {
          "Disabled-Enabled": true,
          "Disabled-Selected": true,
        }),
      },
      examples: [FigmaExample],
    },
  },
  decorators: [(Story) => <Story />],
  argTypes: {
    helperText: {
      control: { type: "text" },
      defaultValue: "",
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof RadioButton>) {
  return (
    <RadioGroup>
      <RadioButton {...props} value="item" />
    </RadioGroup>
  );
}

export default meta;
type Story = StoryObj<typeof RadioButton>;

const Template = (args: RadioButtonProps) => (
  <RadioGroup onValueChange={(e) => console.log(e.value)}>
    <RadioButton
      {...args}
      label="タイトルタイトル1"
      value="itemA"
      helperText={args.helperText}
    />
    <RadioButton
      {...args}
      label="タイトルタイトル2"
      value="itemB"
      helperText={args.helperText}
    />
    <RadioButton
      {...args}
      label="タイトルタイトル3"
      value="itemC"
      disabled={true}
    />
    <RadioButton
      {...args}
      label="タイトルタイトル4"
      value="itemD"
      helperText={args.helperText}
    />
  </RadioGroup>
);

export const Default: Story = {
  render: Template,
};

export const NoLabel: Story = {
  render: () => (
    <RadioGroup onValueChange={(e) => console.log(e.value)}>
      <RadioButton value="itemA" />
      <RadioButton value="itemB" />
      <RadioButton value="itemC" />
    </RadioGroup>
  ),
};

export const WithHelperText: Story = {
  render: Template,
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};

export const Disabled: Story = {
  render: (args: RadioButtonProps) => (
    <RadioGroup
      onValueChange={(e) => console.log(e.value)}
      defaultValue="itemE"
    >
      <RadioButton
        {...args}
        label="タイトルタイトル1"
        value="itemE"
        helperText={args.helperText}
        disabled
      />
      <RadioButton
        {...args}
        label="タイトルタイトル2"
        value="itemF"
        helperText={args.helperText}
        disabled
      />
    </RadioGroup>
  ),
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};
