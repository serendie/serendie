import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";
import figma from "@figma/code-connect";
import {
  SerendieSymbolInformation,
  SerendieSymbolMail,
  SerendieSymbolMagnifyingGlass,
} from "@serendie/symbols";
import { Box } from "../../../styled-system/jsx";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=5113-4273",
      props: {
        label: figma.string("Label"),
        disabled: figma.enum("State", { Disabled: true }),
        invalid: figma.enum("State", { Error: true }),
        invalidMessage: figma.string("InvalidMessage"),
        description: figma.string("Description"),
        placeholder: figma.string("Placeholder"),
        required: figma.boolean("Required"),
      },
      examples: [FigmaExample],
    },
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
    fullWidth: false,
    onChange: (e) => {
      console.log(e);
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof TextField>) {
  return <TextField {...props} />;
}

export default meta;
type Story = StoryObj<typeof TextField>;

const onBlurSpy = fn();

export const Basic: Story = {
  args: {
    onBlur: onBlurSpy,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    onBlurSpy.mockClear();

    await userEvent.click(input);
    await userEvent.type(input, "abc");

    const clearButton = canvas.getByRole("button", { name: /クリア|clear/i });
    await userEvent.click(clearButton);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    expect(onBlurSpy).not.toHaveBeenCalled();

    await userEvent.click(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
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

export const WithleftContent: Story = {
  args: {
    leftContent: <SerendieSymbolMagnifyingGlass width={20} height={20} />,
    placeholder: "検索キーワードを入力",
  },
};

export const WithrightContent: Story = {
  args: {
    rightContent: <SerendieSymbolInformation width={20} height={20} />,
    placeholder: "情報を入力",
  },
};

export const WithBothContents: Story = {
  args: {
    leftContent: <SerendieSymbolMail width={20} height={20} />,
    rightContent: <SerendieSymbolInformation width={20} height={20} />,
    placeholder: "メールアドレスを入力",
  },
};

export const WithText: Story = {
  args: {
    leftContent: (
      <Box
        textStyle="sd.system.typography.label.medium_compact"
        color={"sd.system.color.component.onSurfaceVariant"}
      >
        serendie.design/
      </Box>
    ),
    placeholder: "URLを入力",
    label: "URL",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};
