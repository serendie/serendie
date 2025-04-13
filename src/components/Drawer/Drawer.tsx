import { Dialog, DialogRootProps, Portal } from "@ark-ui/react";
import { SerendieSymbol } from "@serendie/symbols";
import { cx, RecipeVariantProps, sva } from "../../../styled-system/css";
import { IconButton } from "../IconButton";

const DrawerStyle = sva({
  slots: ["backdrop", "content", "contentInner", "closeTrigger"],
  base: {
    backdrop: {
      background: "sd.system.color.component.scrim",
      position: "fixed",
      inset: 0,
      zIndex: "sd.system.elevation.zIndex.modal",
    },
    content: {
      position: "fixed",
      top: "0",
      width: "calc(100% - {spacing.sd.system.dimension.spacing.extraLarge})",
      maxWidth: "375px",
      height: "100vh",
      gap: "sd.system.dimension.spacing.twoExtraLarge",
      backgroundColor: "sd.system.color.component.surface",
      boxShadow: "sd.system.elevation.shadow.level5",
      zIndex: "sd.system.elevation.zIndex.modal",
    },
    contentInner: {
      display: "grid",
      gap: "sd.system.dimension.spacing.medium",
    },
    closeTrigger: {
      display: "flex",
      alignItems: "flex-start",
      padding: "sd.system.dimension.spacing.twoExtraSmall",
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
  contentClassName?: string;
  backdropClassName?: string;
  onOpenChange: (e: { open: boolean }) => void;
};

export type DrawerProps = Props &
  DialogRootProps &
  RecipeVariantProps<typeof DrawerStyle>;

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  children,
  contentClassName,
  backdropClassName,
  ...props
}) => {
  const [variantProps, elementProps] = DrawerStyle.splitVariantProps(props);
  const styles = DrawerStyle(variantProps);

  return (
    <Dialog.Root open={isOpen} {...elementProps}>
      <Portal>
        <Dialog.Backdrop className={cx(styles.backdrop, backdropClassName)} />
        <Dialog.Positioner>
          <Dialog.Content className={cx(styles.content, contentClassName)}>
            <header className={styles.closeTrigger}>
              <Dialog.CloseTrigger asChild>
                <IconButton
                  icon={<SerendieSymbol name="close" />}
                  shape="rectangle"
                  styleType="ghost"
                />
              </Dialog.CloseTrigger>
            </header>
            {children}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
