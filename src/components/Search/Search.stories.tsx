import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "./Search";
import figma from "@figma/code-connect";
import { userEvent, within, waitFor, expect } from "@storybook/test";
import { FullscreenLayout } from "../../../.storybook/FullscreenLayout";
import { useState } from "react";

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
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onInputValueChange: (v) => console.log(v),
    disabled: false,
    placeholder: "デバイスIDなどを検索",
    items,
  },
  render: (args) => {
    return (
      <FullscreenLayout>
        <Search {...args} />
      </FullscreenLayout>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parentElement = canvasElement.parentElement;
    if (!parentElement) return;
    const root = within(parentElement);

    const input = canvas.getByRole("combobox");

    await userEvent.type(input, "a");

    await waitFor(
      async () => {
        const option = await root.findByText("Angular");
        expect(option).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

export const Filtered: Story = {
  args: {
    disabled: false,
    placeholder: "フレームワークを検索",
  },
  render: (args) => {
    const [filteredItems, setFilteredItems] = useState(items);

    const handleInputValueChange = (details: { inputValue: string }) => {
      const value = details.inputValue.toLowerCase();
      if (value === "") {
        setFilteredItems(items);
      } else {
        setFilteredItems(
          items.filter((item) => item.toLowerCase().includes(value))
        );
      }
    };

    return (
      <Search
        {...args}
        items={filteredItems}
        onInputValueChange={handleInputValueChange}
      />
    );
  },
};
