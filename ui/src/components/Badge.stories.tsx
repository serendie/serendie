import { Meta, StoryObj } from "@storybook/react";
import { Badge, BadgeCloseButton, BadgeStyle } from "./Badge";
import figma from "@figma/code-connect";

const meta: Meta<typeof Badge> = {
  component: Badge,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-Design-System?node-id=3285-27625",
      props: {
        label: figma.string("Label"),
        size: figma.enum("Size", {
          Small: "small",
          Medium: "medium",
          Large: "large",
        }),
        styleColor: figma.enum("Color", {
          Gray: "gray",
          "Gray-subtle": "gray-subtle",
          Blue: "blue",
          "Blue-subtle": "blue-subtle",
          Green: "green",
          "Green-subtle": "green-subtle",
          Yellow: "yellow",
          "Yellow-subtle": "yellow-subtle",
          Orange: "orange",
          "Orange-subtle": "orange-subtle",
          Red: "red",
          "Red-subtle": "red-subtle",
        }),
        closeButton: figma.boolean("ShowCloseButton", {
          true: <BadgeCloseButton />,
          false: undefined,
        }),
      },
      examples: [FigmaExample],
    },
    controls: { expanded: true },
  },
  argTypes: {
    size: {
      options: BadgeStyle.variantMap.size,
      control: { type: "select" },
      defaultValue: "medium",
    },
    styleColor: {
      options: BadgeStyle.variantMap.styleColor,
      control: { type: "select" },
      defaultValue: "gray",
    },
  },
  args: {
    children: "Badge",
    styleColor: "gray",
  },
};

function FigmaExample(props: React.ComponentProps<typeof Badge>) {
  return <Badge {...props} />;
}

export default meta;
type Story = StoryObj<typeof Badge>;

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

export const Chip: Story = {
  args: {
    size: "medium",
    closeButton: <BadgeCloseButton />,
  },
};
