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
  args: {},
};
type Story = StoryObj<typeof TopAppBar>;

export const All: Story = {
  render: (args) => {
    return (
      <>
        <TopAppBar
          type={"navbar"}
          headingIconButton={
            <>
              <IconButton shape="rectangle" styleType="ghost" icon="menu" />
            </>
          }
          trailingIconButtons={
            <>
              <IconButton shape="rectangle" styleType="ghost" icon="search" />
              <IconButton shape="rectangle" styleType="ghost" icon="add" />
              <IconButton shape="rectangle" styleType="ghost" icon="info" />
            </>
          }
        />
        <TopAppBar
          type={"titleBar"}
          title="Title Bar"
          headingIconButton={
            <>
              <IconButton
                shape="rectangle"
                styleType="ghost"
                icon="chevron_left"
              />
            </>
          }
          trailingIconButtons={
            <>
              <IconButton shape="rectangle" styleType="ghost" icon="add" />
            </>
          }
        />
      </>
    );
  },
};

export const Navbar: Story = {
  render: (args) => {
    return (
      <>
        <TopAppBar
          type={"navbar"}
          headingIconButton={
            <>
              <IconButton shape="rectangle" styleType="ghost" icon="menu" />
            </>
          }
          trailingIconButtons={
            <>
              <IconButton shape="rectangle" styleType="ghost" icon="search" />
              <IconButton shape="rectangle" styleType="ghost" icon="add" />
              <IconButton shape="rectangle" styleType="ghost" icon="info" />
            </>
          }
        />
      </>
    );
  },
};

export const Title: Story = {
  render: (args) => {
    return (
      <>
        <TopAppBar
          type={"titleBar"}
          title="Title Bar"
          headingIconButton={
            <>
              <IconButton
                shape="rectangle"
                styleType="ghost"
                icon="chevron_left"
              />
            </>
          }
          trailingIconButtons={
            <>
              <IconButton shape="rectangle" styleType="ghost" icon="add" />
            </>
          }
        />
      </>
    );
  },
};

export default meta;
