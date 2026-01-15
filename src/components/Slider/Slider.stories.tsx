import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import figma from "@figma/code-connect";
import { allModes } from "../../../.storybook/modes";
import { Slider } from "./Slider";

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
          Default: false,
        }),
        value: figma.enum("Progress", {
          "0": [0],
          "50": [50],
          "100": [100],
        }),
      },
      examples: [FigmaExample],
    },
    chromatic: {
      modes: {
        small: allModes["small"],
        large: allModes["large"],
      },
    },
  },
  argTypes: {
    startLabel: {
      control: { type: "text" },
      description: "Label displayed at the start of the slider",
    },
    endLabel: {
      control: { type: "text" },
      description: "Label displayed at the end of the slider",
    },
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
    step: {
      control: { type: "number" },
      description: "Step value for the slider (default: 1)",
    },
    markerValues: {
      control: { type: "object" },
      description:
        "Custom marker positions (values between min and max, excluding boundaries)",
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
    endLabel: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
  },
};

export const Large: Story = {
  args: {
    startLabel: "Value",
    endLabel: "Value",
    size: "large",
    defaultValue: [50],
    min: 0,
    max: 100,
  },
};

export const Disabled: Story = {
  args: {
    startLabel: "Value",
    endLabel: "Value",
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
    endLabel: "Value",
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
    endLabel: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
    showMarkers: false,
  },
};

export const KeyboardInteraction: Story = {
  args: {
    startLabel: "Value",
    endLabel: "Value",
    size: "medium",
    defaultValue: [50],
    min: 0,
    max: 100,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thumb = canvas.getByRole("slider");

    // Focus the slider
    await userEvent.click(thumb);
    expect(thumb).toHaveFocus();

    // Test keyboard navigation
    await userEvent.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "51");

    await userEvent.keyboard("{ArrowLeft}");
    expect(thumb).toHaveAttribute("aria-valuenow", "50");
  },
};
