import type { Meta, StoryObj } from "@storybook/react";
import { ModalDialog, ModalDialogProps } from "./ModalDialog";
import { useState } from "react";
import { Button } from "./Button";

const meta: Meta<typeof ModalDialog> = {
  component: ModalDialog,
  parameters: {
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
};

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
