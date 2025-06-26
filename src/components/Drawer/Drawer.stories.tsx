import { Meta, StoryObj } from "@storybook/react";
import { Drawer, DrawerProps } from "./Drawer";
import { useState } from "react";
import { IconButton } from "../IconButton";
import figma from "@figma/code-connect";
import { SerendieSymbolMenu } from "@serendie/symbols";
import { userEvent, within, waitFor, expect } from "@storybook/test";
import { FullscreenLayout } from "../../../.storybook/FullscreenLayout";

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3223-28928",
      props: {
        type: figma.enum("Type", {
          Full: "full",
          Right: "right",
          Left: "left",
        }),
      },
      examples: [FigmaExample],
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

function FigmaExample(props: React.ComponentProps<typeof Drawer>) {
  return <Drawer {...props} />;
}

const DrawerOpenTemplate = (args: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton
        shape="rectangle"
        icon={<SerendieSymbolMenu />}
        styleType="outlined"
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

export const PlayClickedButton: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => {
    return (
      <FullscreenLayout>
        <DrawerOpenTemplate {...args} />
      </FullscreenLayout>
    );
  },
  args: {
    type: "left",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button");

    await userEvent.click(button);

    await waitFor(async () => {
      const drawer = await canvas.findByRole("dialog");
      expect(drawer).toBeInTheDocument();
    });
  },
};
