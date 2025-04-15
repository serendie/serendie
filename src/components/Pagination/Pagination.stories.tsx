import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=17965-15475&m=dev",
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    count: {
      control: { type: "number" },
    },
    page: {
      control: { type: "number" },
      defaultValue: 3,
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof Pagination>) {
  return <Pagination {...props} count={99} page={1} />;
}

export default meta;
type Story = StoryObj<typeof Pagination>;

// 基本的なページネーション
export const Basic: Story = {
  args: {
    count: 10,
  },
};

// 少ないページ数
export const FewPages: Story = {
  args: {
    count: 5,
  },
};

// 多くのページ数
export const ManyPages: Story = {
  args: {
    count: 100,
  },
};

// 両側に表示するページ数を増やす
export const WithMoreSiblings: Story = {
  args: {
    count: 100,
    siblingCount: 4,
  },
};
