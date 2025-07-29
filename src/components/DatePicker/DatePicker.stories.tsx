import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import figma from "@figma/code-connect";
import { useState } from "react";
import {
  DatePickerValueChangeDetails,
  DateValue,
  parseDate,
} from "@ark-ui/react/date-picker";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  parameters: {
    design: {
      type: "figma",
      // TODO: FigmaのDatePickerコンポーネントのURLに置き換えてください
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=XXXX-XXXXX",
      props: {
        label: figma.string("Label"),
        disabled: figma.enum("State", { Disabled: true }),
        invalid: figma.enum("State", { Error: true }),
        invalidMessage: figma.string("InvalidMessage"),
        placeholder: figma.string("Placeholder"),
        required: figma.boolean("Required"),
        selectionMode: figma.enum("SelectionMode", {
          Single: "single",
          Range: "range",
        }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  args: {
    placeholder: "日付を選択",
    startPlaceholder: "開始日",
    endPlaceholder: "終了日",
    locale: "ja-JP",
    onValueChange: (details) => {
      console.log("Date changed:", details);
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof DatePicker>) {
  return <DatePicker {...props} />;
}

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = {};

export const WithLabel: Story = {
  args: {
    label: "予定日",
  },
};

export const Required: Story = {
  args: {
    label: "納期",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "日付",
    disabled: true,
  },
};

export const HasError: Story = {
  args: {
    label: "開始日",
    invalid: true,
    invalidMessage: "正しい日付を入力してください",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "記念日",
    value: [parseDate("2025-01-01")],
  },
};

export const Range: Story = {
  args: {
    label: "期間",
    selectionMode: "range",
    closeOnSelect: false,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<DateValue[]>([parseDate("2025-01-01")]);

    const handleChange = (details: DatePickerValueChangeDetails) => {
      console.log("Date changed:", details);
      setValue(details.value);
    };

    return (
      <DatePicker
        {...args}
        label="制御されたDatePicker"
        value={value}
        onValueChange={handleChange}
      />
    );
  },
};

export const ControlledRange: Story = {
  render: (args) => {
    const [value, setValue] = useState<DateValue[]>([
      parseDate("2025-01-01"),
      parseDate("2025-01-07"),
    ]);

    const handleChange = (details: DatePickerValueChangeDetails) => {
      console.log("Date range changed:", details);
      setValue(details.value);
    };

    return (
      <DatePicker
        {...args}
        label="期間選択"
        selectionMode="range"
        closeOnSelect={false}
        value={value}
        onValueChange={handleChange}
      />
    );
  },
};
