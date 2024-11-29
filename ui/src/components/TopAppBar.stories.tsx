import { Meta, StoryObj } from "@storybook/react";
import { TopAppBar } from "./TopAppBar";
import { IconButton } from "./IconButton";
import figma from "@figma/code-connect";
import React from "react";
import { SerendieSymbol } from "@serendie/symbols";

const meta: Meta<typeof TopAppBar> = {
  component: TopAppBar,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=1353-14085",
      props: {
        title: figma.string("Title"),
        type: figma.enum("Navbar", { True: "navbar", False: "titleBar" }),
        badge: figma.boolean("ShowNotificationBadge", {
          true: 5,
          false: undefined,
        }),
        headingIconButton: figma.children("HeadingIconButton"),
        trailingIconButtons: figma.children("TrailingIconButton"),
      },
      // TopAppBarを再帰的に組み合わせる構造がCode Connectでは完全再現しづらいため、一部疑似サンプル
      examples: [
        {
          example: FigmaExample,
        },
        {
          example: FigmaExample2,
          variant: { Navbar: "True", Type: "TitleOnly" },
        },
        {
          example: FigmaExample3,
          variant: { Navbar: "True", Type: "TitleWithIcons" },
        },
      ],
    },
    controls: {
      expanded: true,
    },
  },
};

function FigmaExample(props: React.ComponentProps<typeof TopAppBar>) {
  return <TopAppBar {...props} />;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function FigmaExample2({ type, title, ...props }: any) {
  return (
    <>
      <TopAppBar type="navbar" {...props} />
      <TopAppBar type="titleBar" title={title} />
    </>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function FigmaExample3({ type, title, ...props }: any) {
  return (
    <>
      <TopAppBar type="navbar" {...props} />
      <TopAppBar type="titleBar" title={title} {...props} />
    </>
  );
}

type Story = StoryObj<typeof TopAppBar>;
export default meta;

export const All: StoryObj<typeof AllTemplate> = {
  args: {
    arg1: {
      type: "navbar",
      headingIconButton: (
        <>
          <IconButton
            shape="rectangle"
            styleType="ghost"
            icon={<SerendieSymbol name="menu" />}
          />
        </>
      ),
      trailingIconButtons: (
        <>
          <IconButton
            shape="rectangle"
            styleType="ghost"
            icon={<SerendieSymbol name="magnifying-glass" />}
          />
          <IconButton
            shape="rectangle"
            styleType="ghost"
            icon={<SerendieSymbol name="plus" />}
          />
          <IconButton
            shape="rectangle"
            styleType="ghost"
            icon={<SerendieSymbol name="information" />}
          />
        </>
      ),
    },
    arg2: {
      type: "titleBar",
      title: "Title Bar",
      headingIconButton: (
        <>
          <IconButton
            shape="rectangle"
            styleType="ghost"
            icon={<SerendieSymbol name="chevron-left" />}
          />
        </>
      ),
      trailingIconButtons: (
        <>
          <IconButton
            shape="rectangle"
            styleType="ghost"
            icon={<SerendieSymbol name="plus" />}
          />
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
    headingIconButton: React.ReactElement;
    trailingIconButtons: React.ReactElement;
  };
  arg2: {
    type: "titleBar";
    title: string;
    headingIconButton: React.ReactElement;
    trailingIconButtons: React.ReactElement;
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
      <IconButton
        shape="rectangle"
        styleType="ghost"
        icon={<SerendieSymbol name="menu" />}
      />
    ),
    trailingIconButtons: (
      <>
        <IconButton
          shape="rectangle"
          styleType="ghost"
          icon={<SerendieSymbol name="magnifying-glass" />}
        />
        <IconButton
          shape="rectangle"
          styleType="ghost"
          icon={<SerendieSymbol name="plus" />}
        />
        <IconButton
          shape="rectangle"
          styleType="ghost"
          icon={<SerendieSymbol name="information" />}
        />
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
      <IconButton
        shape="rectangle"
        styleType="ghost"
        icon={<SerendieSymbol name="chevron-left" />}
      />
    ),
    trailingIconButtons: (
      <IconButton
        shape="rectangle"
        styleType="ghost"
        icon={<SerendieSymbol name="plus" />}
      />
    ),
  },
  render: (args) => {
    return <TopAppBar {...args} />;
  },
};

export const NotificationBadgeExample: Story = {
  args: {
    type: "titleBar",
    title: "Title Bar",
    headingIconButton: (
      <IconButton
        shape="rectangle"
        styleType="ghost"
        icon={<SerendieSymbol name="chevron-left" />}
      />
    ),
    trailingIconButtons: (
      <IconButton
        shape="rectangle"
        styleType="ghost"
        icon={<SerendieSymbol name="plus" />}
      />
    ),
    badge: 3,
  },
  render: (args) => {
    return <TopAppBar {...args} />;
  },
};
