import figma from "@figma/code-connect";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, waitFor, expect } from "@storybook/test";
import { FullscreenLayout } from "../../../.storybook/FullscreenLayout";
import { allModes } from "../../../.storybook/modes";
import { Select } from "./Select";

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
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "large",
    },
    chromatic: {
      modes: {
        small: allModes["small"],
      },
    },
  },
  render: (args) => {
    return (
      <FullscreenLayout>
        <Select {...args} />
      </FullscreenLayout>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole("combobox");

    await userEvent.click(select);

    await waitFor(async () => {
      const option = await canvas.findByText("React");
      expect(option).toBeInTheDocument();
    });
  },
};
