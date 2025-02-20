import { Select } from "./Select";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, fn } from "@storybook/test";
import figma from "@figma/code-connect";

const items = [
  { label: "React", value: "React" },
  { label: "Vue", value: "Vue" },
  { label: "Angular", value: "Angular" },
  { label: "Svelte", value: "Svelte" },
  { label: "Ember", value: "Ember" },
];

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3154-26212",
      props: {
        label: figma.string("Label"),
        placeholder: figma.string("Placeholder"),
        disabled: figma.enum("State", { Disabled: true }),
        invalid: figma.enum("State", { Error: true }),
        invalidMessage: figma.string("InvalidMessage"),
        size: figma.enum("Size", { Small: "small", Medium: "medium" }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  args: {
    onValueChange: (v) => console.log(v),
    label: "ラベル",
    required: true,
    disabled: false,
    invalid: false,
    invalidMessage: "",
    placeholder: "選択してください",
    items,
  },
};

function FigmaExample(props: React.ComponentProps<typeof Select>) {
  return (
    <Select
      {...props}
      items={[{ label: "SelectItem", value: "select-item" }]}
    />
  );
}

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const HasError: Story = {
  args: {
    onValueChange: (v) => console.log(v),
    invalid: true,
    invalidMessage: "エラーメッセージ",
  },
};

export const PlayClickedSelect: Story = {
  render: (args) => {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Select {...args} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole("combobox");

    await userEvent.click(select);
  },
};
