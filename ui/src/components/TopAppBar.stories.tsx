import { Meta, StoryObj } from "@storybook/react";
import { TopAppBar } from "./TopAppBar";
import { IconButton } from "./IconButton";

const meta: Meta<typeof TopAppBar> = {
  component: TopAppBar,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};
type Story = StoryObj<typeof TopAppBar>;

export const All: StoryObj<typeof AllTemplate> = {
  args: {
    arg1: {
      type: "navbar",
      headingIconButton: (
        <>
          <IconButton shape="rectangle" styleType="ghost" icon="menu" />
        </>
      ),
      trailingIconButtons: (
        <>
          <IconButton shape="rectangle" styleType="ghost" icon="search" />
          <IconButton shape="rectangle" styleType="ghost" icon="add" />
          <IconButton shape="rectangle" styleType="ghost" icon="info" />
        </>
      ),
    },
    arg2: {
      type: "titleBar",
      title: "Title Bar",
      headingIconButton: (
        <>
          <IconButton shape="rectangle" styleType="ghost" icon="chevron_left" />
        </>
      ),
      trailingIconButtons: (
        <>
          <IconButton shape="rectangle" styleType="ghost" icon="add" />
        </>
      ),
    },
  },
  render: (args) => {
    return <AllTemplate {...args} />;
  },
};

type AllTemplateProps = {
  arg1: {
    type: "navbar";
    headingIconButton: React.ReactNode;
    trailingIconButtons: React.ReactNode;
  };
  arg2: {
    type: "titleBar";
    title: string;
    headingIconButton: React.ReactNode;
    trailingIconButtons: React.ReactNode;
  };
};

const AllTemplate: React.FC<AllTemplateProps> = ({ arg1, arg2 }) => {
  return (
    <>
      <TopAppBar {...arg1} />
      <TopAppBar {...arg2} />
    </>
  );
};

export const Navbar: Story = {
  args: {
    type: "navbar",
    headingIconButton: (
      <IconButton shape="rectangle" styleType="ghost" icon="menu" />
    ),
    trailingIconButtons: (
      <>
        <IconButton shape="rectangle" styleType="ghost" icon="search" />
        <IconButton shape="rectangle" styleType="ghost" icon="add" />
        <IconButton shape="rectangle" styleType="ghost" icon="info" />
      </>
    ),
  },
  render: (args) => {
    return <TopAppBar {...args} />;
  },
};

export const Title: Story = {
  args: {
    type: "titleBar",
    title: "Title Bar",
    headingIconButton: (
      <IconButton shape="rectangle" styleType="ghost" icon="chevron_left" />
    ),
    trailingIconButtons: (
      <IconButton shape="rectangle" styleType="ghost" icon="add" />
    ),
  },
  render: (args) => {
    return <TopAppBar {...args} />;
  },
};

export default meta;
