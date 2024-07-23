import { Meta, StoryObj } from "@storybook/react";
import { ProgressIndicator } from "./ProgressIndicator";
import figma from "@figma/code-connect";

const meta: Meta<typeof ProgressIndicator> = {
  component: ProgressIndicator,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-Design-System?node-id=1322-31566",
      props: {
        size: figma.enum("Size", {
          Small: "small",
          Medium: "medium",
          Large: "large",
        }),
      },
      examples: [FigmaExample],
    },
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof ProgressIndicator>) {
  return <ProgressIndicator {...props} />;
}

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
