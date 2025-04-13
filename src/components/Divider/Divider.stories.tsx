import { Meta, StoryObj } from "@storybook/react";
import { Divider, DividerStyle } from "./Divider";
import figma from "@figma/code-connect";

const meta: Meta<typeof Divider> = {
  component: Divider,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    color: {
      options: DividerStyle.variantMap.color,
      control: { type: "select" },
      defaultValue: "normal",
    },
    type: {
      options: DividerStyle.variantMap.type,
      control: { type: "select" },
      defaultValue: "horizontal",
    },
  },
  args: {
    color: "normal",
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  args: {
    type: "horizontal",
  },
};

export const Vertical: Story = {
  args: {
    type: "vertical",
  },
};

// Horizontal/VerticalがFigma上では別コンポーネント、Reactでは共通コンポーネントのため、例外的にfigma.connect()を利用
figma.connect(
  Divider,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3122-30116",
  {
    props: {
      color: figma.enum("Color", {
        Light: "light",
        Normal: "normal",
        Dark: "dark",
      }),
    },
    example: ({ color }) => <Divider color={color} type="horizontal" />,
  }
);
figma.connect(
  Divider,
  "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3122-30141",
  {
    props: {
      color: figma.enum("Color", {
        Light: "light",
        Normal: "normal",
        Dark: "dark",
      }),
    },
    example: ({ color }) => <Divider color={color} type="vertical" />,
  }
);
