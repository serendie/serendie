import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, IconButtonStyle } from "./IconButton";
import figma from "@figma/code-connect";
import { SvgIcon } from "./SvgIcon";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3107-13402",
      props: {
        shape: figma.enum("Shape", {
          Circle: "circle",
          Rectangle: "rectangle",
        }),
        size: figma.enum("Size", {
          Large: "large",
          Medium: "medium",
          Small: "small",
        }),
        styleType: figma.enum("Type", {
          Filled: "filled",
          Outlined: "outlined",
          Ghost: "ghost",
        }),
        disabled: figma.enum("State", { Disabled: true }),
        icon: figma.instance("IconInstance"),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
      include: ["shape", "styleType", "size", "disabled"],
    },
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    shape: {
      options: IconButtonStyle.variantMap.shape,
      control: { type: "radio" },
      defaultValue: "circle",
    },
    styleType: {
      options: IconButtonStyle.variantMap.styleType,
      control: { type: "radio" },
      defaultValue: "filled",
    },
    size: {
      options: IconButtonStyle.variantMap.size,
      control: { type: "radio" },
      defaultValue: "medium",
    },
    icon: {
      control: { type: "object" },
      defaultValue: <SvgIcon icon={"add"} />,
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof IconButton>) {
  return <IconButton {...props} />;
}

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Rectangle: Story = {
  args: {
    shape: "rectangle",
    icon: <SvgIcon icon={"add"} />,
    size: "medium",
    disabled: false,
  },
  render: (props) => <IconButton {...props} />,
};

export const Circle: Story = {
  args: {
    shape: "circle",
    icon: <SvgIcon icon={"add"} />,
    size: "medium",
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    shape: "circle",
    icon: <SvgIcon icon={"add"} />,
    size: "small",
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    shape: "circle",
    icon: <SvgIcon icon={"add"} />,
    size: "medium",
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    shape: "circle",
    icon: <SvgIcon icon={"add"} />,
    size: "large",
    disabled: false,
  },
};

export const Filled: Story = {
  args: {
    shape: "circle",
    icon: <SvgIcon icon={"add"} />,
    size: "medium",
    styleType: "filled",
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    shape: "circle",
    icon: <SvgIcon icon={"add"} />,
    size: "medium",
    styleType: "outlined",
    disabled: false,
  },
};

export const Ghost: Story = {
  args: {
    shape: "circle",
    icon: <SvgIcon icon={"add"} />,
    size: "medium",
    styleType: "ghost",
    disabled: false,
  },
};
