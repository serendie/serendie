import { Dialog, DialogRootProps, Portal } from "@ark-ui/react";
import { RecipeVariantProps, sva } from "../../styled-system/css";
import { IconButton } from "./IconButton";

const DrawerStyle = sva({
  slots: ["backdrop", "content", "contentInner", "closeTrigger"],
  base: {
    backdrop: {
      background: "dic.system.color.component.scrim",
      position: "fixed",
      inset: 0,
      zIndex: "dic.system.elevation.zIndex.modal",
    },
    content: {
      position: "fixed",
      top: "0",
      width: "calc(100% - {spacing.dic.system.dimension.spacing.extraLarge})",
      maxWidth: "375px",
      height: "100vh",
      gap: "dic.system.dimension.spacing.twoExtraLarge",
      backgroundColor: "dic.system.color.component.surface",
      boxShadow: "dic.system.elevation.shadow.level5",
      zIndex: "dic.system.elevation.zIndex.modal",
    },
    contentInner: {
      display: "grid",
      gap: "dic.system.dimension.spacing.medium",
    },
    closeTrigger: {
      display: "flex",
      alignItems: "flex-start",
      padding: "dic.system.dimension.spacing.twoExtraSmall",
    },
  },
  variants: {
    type: {
      left: {
        content: {
          left: "0",
          justifyContent: "flex-start",
        },
      },
      full: {
        content: {
          left: "0",
          width: "100%",
          minWidth: "100%",
          maxWidth: "100%",
        },
      },
      right: {
        content: {
          right: "0",
        },
        closeTrigger: {
          justifyContent: "flex-end",
        },
      },
    },
  },
  defaultVariants: {
    type: "right",
  },
});

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange: (e: { open: boolean }) => void;
};

export type DrawerProps = Props &
  DialogRootProps &
  RecipeVariantProps<typeof DrawerStyle>;

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  children,
  ...props
}) => {
  const [variantProps, rest] = DrawerStyle.splitVariantProps(props);
  const styles = DrawerStyle(variantProps);

  return (
    <Dialog.Root open={isOpen} {...rest}>
      <Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Positioner>
          <Dialog.Content className={styles.content}>
            <header className={styles.closeTrigger}>
              <Dialog.CloseTrigger asChild>
                <IconButton icon="close" shape="rectangle" styleType="ghost" />
              </Dialog.CloseTrigger>
            </header>
            {children}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
