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
    step: {
      control: { type: "number" },
      description: "Current step (0-indexed, controlled mode)",
    },
    defaultStep: {
      control: { type: "number" },
      description: "Initial step (0-indexed, uncontrolled mode)",
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
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
];

const fourStepsItems = [
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
];

const fiveStepsItems = [
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
  {
    title: "タイトル",
    description: "ヘルプテキスト",
  },
];

export const HorizontalDefault: Story = {
  args: {
    items: threeStepsItems,
    direction: "horizontal",
    type: "default",
    step: 1, // 2番目のステップがアクティブ (0-indexed)
  },
};

export const HorizontalSubtle: Story = {
  args: {
    items: threeStepsItems,
    direction: "horizontal",
    type: "subtle",
    step: 1,
  },
};

export const VerticalDefault: Story = {
  args: {
    items: threeStepsItems,
    direction: "vertical",
    type: "default",
    step: 1,
  },
};

export const VerticalSubtle: Story = {
  args: {
    items: threeStepsItems,
    direction: "vertical",
    type: "subtle",
    step: 1,
  },
};

export const FourStepsHorizontal: Story = {
  args: {
    items: fourStepsItems,
    direction: "horizontal",
    type: "default",
    step: 2, // 3番目のステップがアクティブ
  },
};

export const FiveStepsHorizontal: Story = {
  args: {
    items: fiveStepsItems,
    direction: "horizontal",
    type: "default",
    step: 3, // 4番目のステップがアクティブ
  },
};

export const FourStepsVertical: Story = {
  args: {
    items: fourStepsItems,
    direction: "vertical",
    type: "default",
    step: 2,
  },
};

export const FiveStepsVertical: Story = {
  args: {
    items: fiveStepsItems,
    direction: "vertical",
    type: "default",
    step: 3,
  },
};
