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

export const HorizontalDefault: Story = {
  args: {
    items: threeStepsItems,
    direction: "horizontal",
    type: "default",
  },
};

export const HorizontalSubtle: Story = {
  args: {
    items: threeStepsItems,
    direction: "horizontal",
    type: "subtle",
  },
};

export const VerticalDefault: Story = {
  args: {
    items: threeStepsItems,
    direction: "vertical",
    type: "default",
  },
};

export const VerticalSubtle: Story = {
  args: {
    items: threeStepsItems,
    direction: "vertical",
    type: "subtle",
  },
};

export const FourStepsHorizontal: Story = {
  args: {
    items: fourStepsItems,
    direction: "horizontal",
    type: "default",
  },
};

export const FiveStepsHorizontal: Story = {
  args: {
    items: fiveStepsItems,
    direction: "horizontal",
    type: "default",
  },
};

export const FourStepsVertical: Story = {
  args: {
    items: fourStepsItems,
    direction: "vertical",
    type: "default",
  },
};

export const FiveStepsVertical: Story = {
  args: {
    items: fiveStepsItems,
    direction: "vertical",
    type: "default",
  },
};
