import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit",
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    count: {
      control: { type: "number" },
      defaultValue: 100,
    },
    pageSize: {
      control: { type: "number" },
      defaultValue: 10,
    },
    siblingCount: {
      control: { type: "number" },
      defaultValue: 1,
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof Pagination>) {
  return <Pagination {...props} />;
}

export default meta;
type Story = StoryObj<typeof Pagination>;

// 基本的なページネーション
export const Basic: Story = {
  args: {
    count: 100,
    pageSize: 10,
  },
};

// 少ないページ数
export const FewPages: Story = {
  args: {
    count: 30,
    pageSize: 10,
  },
};

// 多くのページ数
export const ManyPages: Story = {
  args: {
    count: 1000,
    pageSize: 10,
  },
};

// 両側に表示するページ数を増やす
export const WithMoreSiblings: Story = {
  args: {
    count: 100,
    pageSize: 10,
    siblingCount: 2,
  },
};
