import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";
import figma from "@figma/code-connect";

const meta: Meta<typeof Slider> = {
  component: Slider,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=26255-202",
      props: {
        size: figma.enum("Size", {
          Medium: "medium",
          Large: "large",
        }),
        disabled: figma.enum("State", {
          Disabled: true,
        }),
        value: figma.enum("Progress", {
          "0": [0],
          "50": [50],
          "100": [100],
        }),
      },
      examples: [FigmaExample],
    },
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "large"],
      defaultValue: "medium",
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    showValue: {
      control: { type: "boolean" },
      defaultValue: true,
    },
    showMarkers: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof Slider>) {
  return <Slider {...props} />;
}

export default meta;
type Story = StoryObj<typeof Slider>;

export const Medium: Story = {
  args: {
    label: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
    showValue: true,
    showMarkers: false,
  },
};

export const Large: Story = {
  args: {
    label: "Value",
    size: "large",
    defaultValue: [50],
    min: 0,
    max: 100,
    showValue: true,
    showMarkers: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
    disabled: true,
    showValue: true,
  },
};

export const WithoutValue: Story = {
  args: {
    label: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
    showValue: false,
  },
};

export const Progress0: Story = {
  args: {
    label: "Value",
    size: "medium",
    defaultValue: [0],
    min: 0,
    max: 100,
    showValue: true,
  },
};

export const Progress25: Story = {
  args: {
    label: "Value",
    size: "medium",
    defaultValue: [25],
    min: 0,
    max: 100,
    showValue: true,
  },
};

export const Progress50: Story = {
  args: {
    label: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
    showValue: true,
  },
};

export const Progress100: Story = {
  args: {
    label: "Value",
    size: "medium",
    defaultValue: [100],
    min: 0,
    max: 100,
    showValue: true,
  },
};
