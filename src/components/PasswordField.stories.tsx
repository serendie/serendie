import type { Meta, StoryObj } from "@storybook/react";
import { PasswordField } from "./PasswordField";
import figma from "@figma/code-connect";
import { TextField } from "./TextField";

const meta: Meta<typeof PasswordField> = {
  component: PasswordField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17427-3758&t=RkaxamT0s6oqwyiL-4",
      props: {
        textField: figma.nestedProps("TextField", {
          label: figma.string("Label"),
          disabled: figma.enum("State", { Disabled: true }),
          invalid: figma.enum("State", { Error: true }),
          invalidMessage: figma.string("InvalidMessage"),
          description: figma.string("Description"),
          placeholder: figma.string("Placeholder"),
          required: figma.boolean("Required"),
        }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  args: {
    required: true,
    disabled: false,
    invalid: false,
    label: "パスワード",
    placeholder: "パスワードを入力",
    invalidMessage: "パスワードは8文字以上必要です",
    description:
      "大文字、小文字、数字を含む8文字以上のパスワードを設定してください",
    disableToggle: false,
  },
};

function FigmaExample(
  props: React.ComponentProps<typeof PasswordField> & {
    textField: React.ComponentProps<typeof TextField>;
  }
) {
  return (
    <PasswordField
      label={props.textField.label}
      disabled={props.textField.disabled}
      invalid={props.textField.invalid}
      invalidMessage={props.textField.invalidMessage}
      description={props.textField.description}
      placeholder={props.textField.placeholder}
      required={props.textField.required}
      {...props}
    />
  );
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
