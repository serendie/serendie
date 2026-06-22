import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { SerendieSymbolArticle, SerendieSymbolHome } from "@serendie/symbols";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/%F0%9F%9B%A0%EF%B8%8F-Serendie-UI-Kit?node-id=32021-1776",
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
    separator: {
      control: { type: "radio" },
      options: ["chevron", "slash"],
    },
    maxItems: {
      control: { type: "number" },
    },
    itemsBeforeCollapse: {
      control: { type: "number" },
    },
    itemsAfterCollapse: {
      control: { type: "number" },
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof Breadcrumbs>) {
  return (
    <Breadcrumbs {...props}>
      <BreadcrumbItem href="/" icon={<SerendieSymbolHome />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/category" icon={<SerendieSymbolArticle />}>
        Category
      </BreadcrumbItem>
      <BreadcrumbItem current icon={<SerendieSymbolArticle />}>
        Current Page
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Basic: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" icon={<SerendieSymbolHome />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/category" icon={<SerendieSymbolArticle />}>
        Category
      </BreadcrumbItem>
      <BreadcrumbItem href="/subcategory" icon={<SerendieSymbolArticle />}>
        Subcategory
      </BreadcrumbItem>
      <BreadcrumbItem current icon={<SerendieSymbolArticle />}>
        Current Page
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
  args: {
    size: "medium",
    separator: "chevron",
  },
};

export const Medium: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" icon={<SerendieSymbolHome />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/category" icon={<SerendieSymbolArticle />}>
        Category
      </BreadcrumbItem>
      <BreadcrumbItem href="/subcategory" icon={<SerendieSymbolArticle />}>
        Subcategory
      </BreadcrumbItem>
      <BreadcrumbItem current icon={<SerendieSymbolArticle />}>
        Current Page
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
  args: {
    size: "medium",
    separator: "chevron",
  },
};

export const Small: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" icon={<SerendieSymbolHome />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/category" icon={<SerendieSymbolArticle />}>
        Category
      </BreadcrumbItem>
      <BreadcrumbItem current icon={<SerendieSymbolArticle />}>
        Current Page
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
  args: {
    size: "small",
    separator: "chevron",
  },
};

export const Chevron: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" icon={<SerendieSymbolHome />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/category" icon={<SerendieSymbolArticle />}>
        Category
      </BreadcrumbItem>
      <BreadcrumbItem href="/subcategory" icon={<SerendieSymbolArticle />}>
        Subcategory
      </BreadcrumbItem>
      <BreadcrumbItem current icon={<SerendieSymbolArticle />}>
        Current Page
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
  args: {
    size: "medium",
    separator: "chevron",
  },
};

export const Slash: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" icon={<SerendieSymbolHome />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/category" icon={<SerendieSymbolArticle />}>
        Category
      </BreadcrumbItem>
      <BreadcrumbItem href="/subcategory" icon={<SerendieSymbolArticle />}>
        Subcategory
      </BreadcrumbItem>
      <BreadcrumbItem current icon={<SerendieSymbolArticle />}>
        Current Page
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
  args: {
    size: "medium",
    separator: "slash",
  },
};

export const WithEllipsis: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/" icon={<SerendieSymbolHome />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/category" icon={<SerendieSymbolArticle />}>
        Category
      </BreadcrumbItem>
      <BreadcrumbItem href="/subcategory" icon={<SerendieSymbolArticle />}>
        Subcategory
      </BreadcrumbItem>
      <BreadcrumbItem href="/detail" icon={<SerendieSymbolArticle />}>
        Detail
      </BreadcrumbItem>
      <BreadcrumbItem current icon={<SerendieSymbolArticle />}>
        Current Page
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
  args: {
    size: "medium",
    separator: "chevron",
    maxItems: 3,
  },
};

export const WithoutIcons: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/category">Category</BreadcrumbItem>
      <BreadcrumbItem href="/subcategory">Subcategory</BreadcrumbItem>
      <BreadcrumbItem current>Current Page</BreadcrumbItem>
    </Breadcrumbs>
  ),
  args: {
    size: "medium",
    separator: "chevron",
  },
};
