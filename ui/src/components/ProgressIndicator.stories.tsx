import { Meta, StoryObj } from "@storybook/react";
import { ProgressIndicator } from "./ProgressIndicator";

const meta: Meta<typeof ProgressIndicator> = {
  component: ProgressIndicator,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};
