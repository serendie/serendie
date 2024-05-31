import { Meta, StoryObj } from "@storybook/react";
import { TopAppBar } from "./TopAppBar";

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

export const Navbar: Story = {
  args: {
    pageTitle: "Navbar Title",
    buttons: {
      navbarLeft: [{ icon: "menu" }],
      navbarRight: [{ icon: "account_circle" }],
      pageTitleLeft: [{ icon: "chevron_left" }],
      pageTitleRight: [{ icon: "settings" }],
    },
  },
};

export const WithoutPageTitle: Story = {
  args: {
    buttons: {
      navbarLeft: [{ icon: "menu" }],
      navbarRight: [{ icon: "account_circle" }],
    },
  },
};

export const WithoutNavbar: Story = {
  args: {
    pageTitle: "Navbar Title",
    buttons: {},
  },
};

export const WithoutNavbarWithIcons: Story = {
  args: {
    pageTitle: "Navbar Title",
    buttons: {
      pageTitleLeft: [{ icon: "chevron_left" }],
      pageTitleRight: [{ icon: "settings" }],
    },
  },
};

export default meta;
