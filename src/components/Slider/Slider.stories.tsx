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
    showMarkers: {
      control: { type: "boolean" },
      defaultValue: true,
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
    startLabel: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
  },
};

export const Large: Story = {
  args: {
    startLabel: "Value",
    size: "large",
    defaultValue: [50],
    min: 0,
    max: 100,
  },
};

export const Disabled: Story = {
  args: {
    startLabel: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
    disabled: true,
  },
};

export const WithMarkerValues: Story = {
  args: {
    startLabel: "Value",
    size: "large",
    defaultValue: [50],
    min: 0,
    max: 100,
    markerValues: [0, 25, 50, 75, 100],
  },
};

export const WithoutMarkers: Story = {
  args: {
    startLabel: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
    showMarkers: false,
  },
};
