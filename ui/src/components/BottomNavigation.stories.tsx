import type { Meta, StoryObj } from "@storybook/react";
import { BottomNavigation } from "./BottomNavigation";
import {
  BottomNavigationItem,
  BottomNavigationItemProps,
} from "./BottomNavigationItem";
import figma from "@figma/code-connect";
import { SvgIcon } from "./SvgIcon";

const meta: Meta<typeof BottomNavigationItem> = {
  component: BottomNavigationItem,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=1001-20737",
      props: {
        label: figma.string("Label"),
        icon: figma.instance("IconInstance"),
        dot: figma.enum("Type", { Badge: true }),
        count: figma.enum("Type", {
          "Badge with number": 12,
        }),
      },
      examples: [FigmaExample],
    },
  },
};

function FigmaExample(props: BottomNavigationItemProps) {
  return <BottomNavigation {...props} />;
}

export default meta;
type Story = StoryObj<typeof BottomNavigationItem>;

export const Default: Story = {
  render: (args: BottomNavigationItemProps) => (
    <BottomNavigation>
      <BottomNavigationItem {...args} />
      <BottomNavigationItem icon={<SvgIcon icon="search" />} label="検索" />
      <BottomNavigationItem
        icon={<SvgIcon icon="search" />}
        label="トーク"
        dot
      />
      <BottomNavigationItem
        icon={<SvgIcon icon="search" />}
        label="カレンダー"
        count={3}
      />
      <BottomNavigationItem
        icon={<SvgIcon icon="search" />}
        label="アカウント"
        count={100}
      />
    </BottomNavigation>
  ),
  args: {
    label: "ホーム",
    icon: <SvgIcon icon="search" />,
    isActive: true,
  },
};
