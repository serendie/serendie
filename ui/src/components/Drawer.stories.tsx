import { Meta, StoryObj } from "@storybook/react";

import { Drawer, DrawerProps } from "./Drawer";
import { useState } from "react";
import { Button } from "./Button";

const meta: Meta<typeof Drawer> = {
  component: Drawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const DrawerOpenTemplate = (args: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
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
