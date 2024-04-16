import type { Meta, StoryObj } from "@storybook/react";

import { SvgIcon } from "./SvgIcon";

const meta: Meta<typeof SvgIcon> = {
  component: SvgIcon,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: "chevron_left",
    size: "2em",
  },
};
