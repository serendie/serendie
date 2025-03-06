import type { Meta, StoryObj } from "@storybook/react";
import { PasswordField } from "./PasswordField";
import figma from "@figma/code-connect";

const meta: Meta<typeof PasswordField> = {
  component: PasswordField,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  args: {
    label: "パスワード",
    required: true,
    disabled: false,
    invalid: false,
    invalidMessage: "パスワードは8文字以上必要です",
    description:
      "大文字、小文字、数字を含む8文字以上のパスワードを設定してください",
    placeholder: "パスワードを入力",
    disableToggle: false,
  },
};

function FigmaExample(props: React.ComponentProps<typeof PasswordField>) {
  return <PasswordField {...props} />;
}

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Basic: Story = {};

export const DisabledToggle: Story = {
  args: {
    disableToggle: true,
  },
};

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

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
};
