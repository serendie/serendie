import type { Meta, StoryObj } from "@storybook/react";
import { Steps } from "./Steps";
import figma from "@figma/code-connect";

const meta: Meta<typeof Steps> = {
  component: Steps,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/lSVFj134YofggF05HeVDh5/Steps?node-id=25102-555",
      props: {
        direction: figma.enum("Direction", {
          Horizontal: "horizontal",
          Vertical: "vertical",
        }),
        size: figma.enum("Size", {
          Large: "large",
          Small: "small",
        }),
        type: figma.enum("Type", {
          Default: "default",
          Subtle: "subtle",
        }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    direction: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
      defaultValue: "horizontal",
    },
    size: {
      options: ["large", "small"],
      control: { type: "radio" },
      defaultValue: "large",
    },
    type: {
      options: ["default", "subtle"],
      control: { type: "radio" },
      defaultValue: "default",
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof Steps>) {
  return <Steps {...props} />;
}

export default meta;
type Story = StoryObj<typeof Steps>;

const threeStepsItems = [
  {
    status: "checked" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 1,
  },
  {
    status: "active" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 2,
  },
  {
    status: "disabled" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 3,
  },
];

const fourStepsItems = [
  {
    status: "checked" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 1,
  },
  {
    status: "checked" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 2,
  },
  {
    status: "active" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 3,
  },
  {
    status: "disabled" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 4,
  },
];

const fiveStepsItems = [
  {
    status: "checked" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 1,
  },
  {
    status: "checked" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 2,
  },
  {
    status: "checked" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 3,
  },
  {
    status: "active" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 4,
  },
  {
    status: "disabled" as const,
    title: "タイトル",
    description: "ヘルプテキスト",
    index: 5,
  },
];

export const HorizontalLargeDefault: Story = {
  args: {
    items: threeStepsItems,
    direction: "horizontal",
    size: "large",
    type: "default",
  },
};

export const HorizontalSmallDefault: Story = {
  args: {
    items: threeStepsItems,
    direction: "horizontal",
    size: "small",
    type: "default",
  },
};

export const HorizontalLargeSubtle: Story = {
  args: {
    items: threeStepsItems,
    direction: "horizontal",
    size: "large",
    type: "subtle",
  },
};

export const HorizontalSmallSubtle: Story = {
  args: {
    items: threeStepsItems,
    direction: "horizontal",
    size: "small",
    type: "subtle",
  },
};

export const VerticalLargeDefault: Story = {
  args: {
    items: threeStepsItems,
    direction: "vertical",
    size: "large",
    type: "default",
  },
};

export const VerticalSmallDefault: Story = {
  args: {
    items: threeStepsItems,
    direction: "vertical",
    size: "small",
    type: "default",
  },
};

export const VerticalLargeSubtle: Story = {
  args: {
    items: threeStepsItems,
    direction: "vertical",
    size: "large",
    type: "subtle",
  },
};

export const VerticalSmallSubtle: Story = {
  args: {
    items: threeStepsItems,
    direction: "vertical",
    size: "small",
    type: "subtle",
  },
};

export const FourStepsHorizontal: Story = {
  args: {
    items: fourStepsItems,
    direction: "horizontal",
    size: "large",
    type: "default",
  },
};

export const FiveStepsHorizontal: Story = {
  args: {
    items: fiveStepsItems,
    direction: "horizontal",
    size: "large",
    type: "default",
  },
};

export const FourStepsVertical: Story = {
  args: {
    items: fourStepsItems,
    direction: "vertical",
    size: "large",
    type: "default",
  },
};

export const FiveStepsVertical: Story = {
  args: {
    items: fiveStepsItems,
    direction: "vertical",
    size: "large",
    type: "default",
  },
};
