import figma from "@figma/code-connect";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, waitFor, expect } from "@storybook/test";
import { FullscreenLayout } from "../../../.storybook/FullscreenLayout";
import { allModes } from "../../../.storybook/modes";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit",
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
    label: "日付",
    required: true,
    disabled: false,
    invalid: false,
    invalidMessage: "",
    placeholder: "日付を選択",
  },
};

function FigmaExample(props: React.ComponentProps<typeof DatePicker>) {
  return <DatePicker {...props} />;
}

export default meta;
type Story = StoryObj<typeof DatePicker>;

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
    invalidMessage: "有効な日付を入力してください",
  },
};

export const WithDefaultValue: Story = {
  args: {
    value: ["2024-01-15"],
  },
};

// カスタムフォーマットのストーリーは一旦コメントアウト
// export const CustomFormat: Story = {
//   args: {
//     format: "yyyy年MM月dd日",
//   },
// };

export const NoLabel: Story = {
  args: {
    label: undefined,
    required: false,
  },
};

export const PlayClickedDatePicker: Story = {
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
        <DatePicker {...args} />
      </FullscreenLayout>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parentElement = canvasElement.parentElement;
    if (!parentElement) return;
    const root = within(parentElement);

    // Find the calendar trigger button
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);

    await waitFor(
      async () => {
        // Wait for calendar to appear
        const calendar = await root.findByRole("grid");
        expect(calendar).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

export const PlayInputDate: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "large",
    },
  },
  render: (args) => {
    return (
      <FullscreenLayout>
        <DatePicker {...args} />
      </FullscreenLayout>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the date input
    const input = canvas.getByPlaceholderText("日付を選択");

    // Type a date
    await userEvent.type(input, "2024/12/25");

    // Verify the value
    expect(input).toHaveValue("2024/12/25");
  },
};
