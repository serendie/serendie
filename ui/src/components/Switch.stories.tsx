import type { Meta, StoryObj } from "@storybook/react";
import { Switch, SwitchProps } from "./Switch";
import figma from "@figma/code-connect";

const Template = (args: SwitchProps) => (
  <Switch {...args} label="タイトルタイトル1" helperText={args.helperText} />
);

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-Design-System?node-id=3311-28493",
      props: {
        label: figma.string("Label"),
        helperText: figma.enum("Line", {
          Multiple: figma.string("HelperText"),
        }),
        disabled: figma.enum("State", {
          Disabled: true,
          "Disabled-Selected": true,
        }),
        checked: figma.enum("State", {
          Selected: true,
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

function FigmaExample(props: React.ComponentProps<typeof Switch>) {
  return <Switch {...props} />;
}

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: Template,
};

export const WithHelperText: Story = {
  render: Template,
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};

export const Disabled: Story = {
  render: (args: SwitchProps) => (
    <>
      <Switch
        {...args}
        label="タイトルタイトル1"
        helperText={args.helperText}
        checked
        disabled
      />
      <Switch
        {...args}
        label="タイトルタイトル1"
        helperText={args.helperText}
        disabled
      />
    </>
  ),
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};
