import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  args: {
    label: "ラベル",
    required: true,
    disabled: false,
    invalid: false,
    invalidMessage: "入力の誤りに関するテキスト",
    description: "入力方法などに関するヘルプテキスト",
    placeholder: "プレースホルダー",
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const HasError: Story = {
  args: {
    invalid: true,
  },
};
