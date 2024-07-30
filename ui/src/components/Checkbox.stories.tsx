import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxProps } from "./Checkbox";
import figma from "@figma/code-connect";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-Design-System?node-id=5129-40889",
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

function FigmaExample(props: React.ComponentProps<typeof Checkbox>) {
  return <Checkbox {...props} value="item" />;
}

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Template = (args: CheckboxProps) => (
  <>
    <Checkbox
      {...args}
      label="タイトルタイトル1"
      value="itemA"
      helperText={args.helperText}
    />
    <Checkbox
      {...args}
      label="タイトルタイトル2"
      value="itemB"
      helperText={args.helperText}
    />
    <Checkbox
      {...args}
      label="タイトルタイトル3"
      value="itemC"
      disabled={true}
    />
    <Checkbox
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
  render: (args: CheckboxProps) => (
    <>
      <Checkbox
        {...args}
        label="タイトルタイトル2"
        value="itemB"
        helperText={args.helperText}
        defaultChecked
        disabled
      />
      <Checkbox {...args} label="タイトルタイトル3" value="itemC" disabled />
    </>
  ),
  args: {
    helperText:
      "補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト補足テキスト",
  },
};
