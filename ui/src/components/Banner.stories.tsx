import { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  component: Banner,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    icon: {
      control: { type: "text" },
    },
    title: {
      control: { type: "text" },
    },
    text: {
      control: { type: "text" },
    },
    type: {
      options: ["information", "error", "warning"],
      control: { type: "radio" },
      defaultValue: "information",
    },
  },
  args: {
    icon: "add",
    title: "タイトルタイトルタイトルタ",
    text: "補足テキスト補足テキスト補足テキスト補足テキ",
  },
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Information: Story = {
  args: {
    type: "information",
  },
};

export const Error: Story = {
  args: {
    type: "error",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
  },
};
