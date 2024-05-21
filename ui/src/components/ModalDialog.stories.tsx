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
  args: {},
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
        title="Dialog Title"
        closeButtonLabel="Close"
        buttonLabel="Button"
        onButtonClick={() => setIsOpen(false)}
        isOpen={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      </ModalDialog>
    </>
  );
};

export const Basic: Story = {
  render: DialogOpenTemplate,
};
