// https://ark-ui.com/docs/react/components/dialog

import { Dialog, DialogRootProps, Portal } from "@ark-ui/react";
import { cx, RecipeVariantProps, sva } from "../../../styled-system/css";
import { Button, ButtonProps } from "../Button";
import { useTranslations } from "../../i18n";

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
      background: "sd.system.color.component.scrim",
      position: "fixed",
      inset: 0,
      zIndex: "sd.system.elevation.zIndex.modal",
    },
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "calc(100% - {spacing.sd.system.dimension.spacing.large} * 2)",
      maxWidth: "408px",
      display: "grid",
      gap: "sd.system.dimension.spacing.twoExtraLarge",
      paddingTop: {
        base: "sd.system.dimension.spacing.extraLarge",
        expanded: "sd.system.dimension.spacing.large",
      },
      paddingRight: "sd.system.dimension.spacing.extraLarge",
      paddingBottom: "sd.system.dimension.spacing.large",
      paddingLeft: "sd.system.dimension.spacing.extraLarge",
      backgroundColor: "sd.system.color.component.surfaceContainerBright",
      boxShadow: "sd.system.elevation.shadow.level5",
      borderRadius: "sd.system.dimension.radius.medium",
      zIndex: "sd.system.elevation.zIndex.modal",
    },
    contentInner: {
      display: "grid",
      gap: "sd.system.dimension.spacing.medium",
    },
    title: {
      textStyle: {
        base: "sd.system.typography.title.small_compact",
        expanded: "sd.system.typography.title.small_expanded",
      },
    },
    description: {
      textStyle: {
        base: "sd.system.typography.body.medium_compact",
        expanded: "sd.system.typography.body.medium_expanded",
      },
    },
    buttonWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.medium",
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
  className?: string;
  cancelButtonLabel?: string;
  submitButtonLabel: string;
  onButtonClick: () => void;
  submitButtonProps?: ButtonProps;
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
  submitButtonProps,
  children,
  className,
  ...rest
}) => {
  const t = useTranslations();
  const styles = ModalDialogStyle(rest);
  return (
    <Dialog.Root open={isOpen} {...rest}>
      <Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Positioner>
          <Dialog.Content className={cx(styles.content, className)}>
            <div className={styles.contentInner}>
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              <Dialog.Description className={styles.description}>
                {children}
              </Dialog.Description>
            </div>
            <div className={styles.buttonWrapper}>
              <Button {...submitButtonProps} onClick={onButtonClick}>
                {submitButtonLabel}
              </Button>
              <Dialog.CloseTrigger asChild>
                <Button styleType="ghost">
                  {cancelButtonLabel || t("modalDialog.close")}
                </Button>
              </Dialog.CloseTrigger>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
