import type { Meta, StoryObj } from "@storybook/react";
import { CheckBox, CheckBoxProps } from "./CheckBox";
import figma from "@figma/code-connect";

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=5129-40889",
      props: {
        label: figma.string("Label"),
        helperText: figma.enum("Lines", {
          "Multiple Lines": figma.string("HelperText"),
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

function FigmaExample(props: React.ComponentProps<typeof CheckBox>) {
  return <CheckBox {...props} value="item" />;
}

export default meta;
type Story = StoryObj<typeof CheckBox>;

const Template = (args: CheckBoxProps) => (
  <>
    <CheckBox
      {...args}
      label="タイトルタイトル1"
      value="itemA"
      helperText={args.helperText}
    />
    <CheckBox
      {...args}
      label="タイトルタイトル2"
      value="itemB"
      helperText={args.helperText}
    />
    <CheckBox
      {...args}
      label="タイトルタイトル3"
      value="itemC"
      disabled={true}
    />
    <CheckBox
      {...args}
      label="タイトルタイトル4"
      value="itemD"
      helperText={args.helperText}
    />
  </>
);

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
  render: (args: CheckBoxProps) => (
    <>
      <CheckBox
        {...args}
        label="タイトルタイトル2"
        value="itemB"
        helperText={args.helperText}
        defaultChecked
        disabled
      />
      <CheckBox {...args} label="タイトルタイトル3" value="itemC" disabled />
    </>
  ),
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};
