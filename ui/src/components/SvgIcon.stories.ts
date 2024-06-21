import type { Meta, StoryObj } from "@storybook/react";

import { SvgIcon } from "./SvgIcon";
import { css } from "../../styled-system/css";

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

export const CustomClassName: Story = {
  args: {
    icon: "chevron_left",
    size: "2em",
    className: css({
      color: "sd.reference.color.scale.orange.500",
    }),
  },
};
