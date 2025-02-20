import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "./Search";
import figma from "@figma/code-connect";
import { userEvent, within } from "@storybook/test";

const items = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Ember",
  "jQuery",
  "Vanilla",
];

const meta: Meta<typeof Search> = {
  component: Search,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3311-28188",
      props: {
        placeholder: figma.string("Placeholder"),
        size: figma.enum("Size", { Small: "small", Medium: "medium" }),
        disabled: figma.enum("State", { Disabled: true }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof Search>) {
  return <Search {...props} items={["ItemLabel"]} />;
}

export default meta;
type Story = StoryObj<typeof Search>;

export const Basic: Story = {
  args: {
    onInputValueChange: (v) => console.log(v),
    disabled: false,
    placeholder: "デバイスIDなどを検索",
    items,
  },
};

export const Small: Story = {
  args: {
    onInputValueChange: (v) => console.log(v),
    disabled: false,
    placeholder: "デバイスIDなどを検索",
    size: "small",
    items,
  },
};

export const Disabled: Story = {
  args: {
    onInputValueChange: (v) => console.log(v),
    disabled: true,
    placeholder: "デバイスIDなどを検索",
    items,
  },
};

export const PlayDisplayMenu: Story = {
  args: {
    onInputValueChange: (v) => console.log(v),
    disabled: false,
    placeholder: "デバイスIDなどを検索",
    items,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button");

    await userEvent.type(button, "a");

    await userEvent.click(button);
  },
};
