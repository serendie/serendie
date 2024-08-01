import { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";
import figma from "@figma/code-connect";

const meta: Meta<typeof Banner> = {
  component: Banner,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-Design-System?node-id=4546-10391",
      props: {
        title: figma.string("Title"),
        description: figma.string("Description"),
        type: figma.enum("Type", {
          Information: "information",
          Error: "error",
          Warning: "warning",
        }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    icon: {
      control: { type: "text" },
    },
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    type: {
      options: ["information", "error", "warning"],
      control: { type: "radio" },
      defaultValue: "information",
    },
  },
  args: {
    title: "タイトルテキスト",
    description: "補足テキスト",
  },
};

function FigmaExample(props: React.ComponentProps<typeof Banner>) {
  return <Banner {...props} />;
}

export default meta;
type Story = StoryObj<typeof Banner>;

export const Information: Story = {
  args: {
    type: "information",
  },
};

export const Error: Story = {
  args: {
    type: "error",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
  },
};
