// https://ark-ui.com/docs/react/components/dialog

import { Dialog, DialogRootProps, Portal } from "@ark-ui/react";
import { RecipeVariantProps, sva } from "../../styled-system/css";
import { Button } from "./Button";

const ModalDialogStyle = sva({
  slots: [
    "backdrop",
    "content",
    "contentInner",
    "title",
    "description",
    "buttonWrapper",
    "closeTrigger",
  ],
  base: {
    backdrop: {
      background: "dic.system.color.component.scrim",
      position: "fixed",
      inset: 0,
      zIndex: "dic.system.elevation.zIndex.modal",
    },
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "calc(100% - {spacing.dic.system.dimension.spacing.large} * 2)",
      maxWidth: "408px",
      display: "grid",
      gap: "dic.system.dimension.spacing.twoExtraLarge",
      paddingTop: {
        base: "dic.system.dimension.spacing.extraLarge",
        expanded: "dic.system.dimension.spacing.large",
      },
      paddingRight: "dic.system.dimension.spacing.extraLarge",
      paddingBottom: "dic.system.dimension.spacing.large",
      paddingLeft: "dic.system.dimension.spacing.extraLarge",
      backgroundColor: "dic.system.color.component.surface",
      boxShadow: "dic.system.elevation.shadow.level5",
      borderRadius: "dic.system.dimension.radius.medium",
      zIndex: "dic.system.elevation.zIndex.modal",
    },
    contentInner: {
      display: "grid",
      gap: "dic.system.dimension.spacing.medium",
    },
    title: {
      textStyle: {
        base: "dic.system.typography.title.small_compact",
        expanded: "dic.system.typography.title.small_expanded",
      },
    },
    description: {
      textStyle: {
        base: "dic.system.typography.body.medium_compact",
        expanded: "dic.system.typography.body.medium_expanded",
      },
    },
    buttonWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "dic.system.dimension.spacing.medium",
      expanded: {
        flexDirection: "row-reverse",
        justifyContent: "end",
      },
    },
  },
});

type Props = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  cancelButtonLabel?: string;
  submitButtonLabel: string;
  onButtonClick: () => void;
};

export type ModalDialogProps = Props &
  DialogRootProps &
  RecipeVariantProps<typeof ModalDialogStyle>;

export const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  title,
  cancelButtonLabel,
  submitButtonLabel,
  onButtonClick,
  children,
  ...rest
}) => {
  const styles = ModalDialogStyle(rest);
  return (
    <Dialog.Root open={isOpen} {...rest}>
      <Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Positioner>
          <Dialog.Content className={styles.content}>
            <div className={styles.contentInner}>
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              <Dialog.Description className={styles.description}>
                {children}
              </Dialog.Description>
            </div>
            <div className={styles.buttonWrapper}>
              <Button onClick={onButtonClick}>{submitButtonLabel}</Button>
              <Dialog.CloseTrigger asChild>
                <Button styleType="ghost">
                  {cancelButtonLabel || "閉じる"}
                </Button>
              </Dialog.CloseTrigger>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
