// https://ark-ui.com/docs/react/components/dialog

import { Dialog, DialogRootProps, Portal } from "@ark-ui/react";
import { RecipeVariantProps, css, sva } from "../../styled-system/css";
import { Button } from "./Button";

const ModalDialogStyle = sva({
  slots: ["root", "content", "title", "description", "closeTrigger"],
});

type Props = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  closeButtonLabel?: string;
  buttonLabel: string;
  onButtonClick: () => void;
};

export type ModalDialogProps = Props &
  DialogRootProps &
  RecipeVariantProps<typeof ModalDialogStyle>;

export const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  closeButtonLabel,
  children,
  ...rest
}) => {
  return (
    <Dialog.Root open={isOpen} {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>{children}</Dialog.Description>
            <Dialog.CloseTrigger asChild>
              <Button>{closeButtonLabel || "閉じる"}</Button>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
