import type { Meta, StoryObj } from "@storybook/react";
import { ModalDialog, ModalDialogProps } from "./ModalDialog";
import { useState } from "react";
import { Button } from "../Button";
import figma from "@figma/code-connect";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { allModes } from "../../../.storybook/modes";
import { FullscreenLayout } from "../../../.storybook/FullscreenLayout";

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
  render: (args) => {
    return (
      <FullscreenLayout>
        <DialogOpenTemplate {...args} />
      </FullscreenLayout>
    );
  },
  parameters: {
    chromatic: {
      modes: {
        small: allModes["small"],
        large: allModes["large"],
      },
    },
    layout: "fullscreen",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    if (canvasElement.parentElement === null) {
      return;
    }
    const root = within(canvasElement.parentElement);

    const button = canvas.getByRole("button");

    await userEvent.click(button);

    await waitFor(async () => {
      const modalHeading = await root.findByText("Dialog Title");
      expect(modalHeading).toBeInTheDocument();
    });
  },
};

export const PreventCloseOnEscape: Story = {
  render: (args) => {
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
          closeOnEscape={false}
        />
      </>
    );
  },
  args: {
    title: "Dialog (closeOnEscape=false)",
    cancelButtonLabel: "Close",
    submitButtonLabel: "Submit",
    children: "Escキーではモーダルを閉じることができません。",
  },
};

export const PreventCloseOnInteractOutside: Story = {
  render: (args) => {
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
          closeOnInteractOutside={false}
          hideCancelButton
        />
      </>
    );
  },
  args: {
    title: "Dialog (closeOnInteractOutside=false)",
    submitButtonLabel: "Submit",
    children:
      "バックドロップをクリックしてもモーダルを閉じることができません。",
  },
};

export const PreventAllAutoClose: Story = {
  render: (args) => {
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
          closeOnEscape={false}
          closeOnInteractOutside={false}
        />
      </>
    );
  },
  args: {
    title: "Dialog (both disabled)",
    cancelButtonLabel: "Close",
    submitButtonLabel: "Submit",
    children:
      "Escキーとバックドロップクリックの両方が無効化されています。ボタンでのみ閉じることができます。",
  },
};
