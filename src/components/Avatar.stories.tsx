import figma from "@figma/code-connect";
import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3661-24552",
      props: {
        size: figma.enum("Size", {
          Small: "small",
          Medium: "medium",
          Large: "large",
        }),
        src: figma.enum("Type", { Image: "https://i.pravatar.cc/300" }),
        placeholder: figma.enum("Type", {
          Image: "filled",
          Icon: "outlined",
        }),
        text: figma.enum("Type", { Text: figma.string("Text") }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
      defaultValue: "medium",
    },
    text: {
      control: { type: "text" },
      defaultValue: "",
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof Avatar>) {
  return <Avatar {...props} />;
}

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Image: Story = {
  args: {
    size: "medium",
    src: "https://i.pravatar.cc/300?img=1",
    text: "AB",
  },
};

export const Text: Story = {
  args: {
    size: "medium",
    text: "AB",
  },
};

export const PlaceholderFilled: Story = {
  args: {
    size: "medium",
  },
};

export const PlaceholderOutlined: Story = {
  args: {
    size: "medium",
    placeholder: "outlined",
  },
};
