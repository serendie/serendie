import { Meta, StoryObj } from "@storybook/react";

import { Drawer, DrawerProps } from "./Drawer";
import { useState } from "react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof Drawer> = {
  component: Drawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const DrawerOpenTemplate = (args: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton
        shape="rectangle"
        icon="add"
        onClick={() => setIsOpen(true)}
      />
      <Drawer
        {...args}
        isOpen={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
      />
    </>
  );
};

export const Left: Story = {
  render: DrawerOpenTemplate,
  args: {
    type: "left",
  },
};

export const Right: Story = {
  render: DrawerOpenTemplate,
  args: {
    type: "right",
  },
};

export const Full: Story = {
  render: DrawerOpenTemplate,
  args: {
    type: "full",
  },
};
