import type { Meta, StoryObj } from "@storybook/react";
import { ModalDialog, ModalDialogProps } from "./ModalDialog";
import { useState } from "react";
import { Button } from "./Button";
import figma from "@figma/code-connect";
import { userEvent, within } from "@storybook/test";

const meta: Meta<typeof ModalDialog> = {
  component: ModalDialog,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/8oZpZ2xolRhCUPDGSlWXr0/Serendie-UI-Kit?node-id=3311-28000",
      props: {
        title: figma.string("Title"),
        description: figma.string("Description"),
        submitButtonProps: figma.nestedProps("PrimaryButton", {
          label: figma.string("Label"),
        }),
        cancelButtonProps: figma.nestedProps("SecondaryButton", {
          label: figma.string("Label"),
        }),
      },
      examples: [FigmaExample],
    },
    controls: {
      expanded: true,
    },
  },
  args: {
    title: "Dialog Title",
    cancelButtonLabel: "Close",
    submitButtonLabel: "Button",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam",
  },
  decorators: [(Story) => <Story />],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FigmaExample({ cancelButtonProps, submitButtonProps, ...props }: any) {
  return (
    <ModalDialog
      {...props}
      submitButtonLabel={submitButtonProps.label}
      cancelButtonLabel={cancelButtonProps.label}
    />
  );
}

export default meta;
type Story = StoryObj<typeof ModalDialog>;

const DialogOpenTemplate = (args: ModalDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <ModalDialog
        {...args}
        isOpen={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        onButtonClick={() => {
          alert("Button clicked");
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const Basic: Story = {
  render: DialogOpenTemplate,
};

export const PlayClickedButton: Story = {
  render: DialogOpenTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button");

    await userEvent.click(button);
  },
};
