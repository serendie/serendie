// https://ark-ui.com/docs/react/components/dialog

import { Dialog, DialogRootProps, Portal } from "@ark-ui/react";
import { RecipeVariantProps, css, sva } from "../../styled-system/css";
import { Button } from "./Button";

const ModalDialogStyle = sva({
  slots: [
    "root",
    "content",
    "title",
    "description",
    "buttonWrapper",
    "closeTrigger",
  ],
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
  title,
  closeButtonLabel,
  buttonLabel,
  onButtonClick,
  children,
  ...rest
}) => {
  return (
    <Dialog.Root open={isOpen} {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{children}</Dialog.Description>
            <div>
              <Dialog.CloseTrigger asChild>
                <Button>{closeButtonLabel || "閉じる"}</Button>
              </Dialog.CloseTrigger>
              <Button onClick={onButtonClick}>{buttonLabel}</Button>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
