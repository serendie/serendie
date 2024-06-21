import { sva } from "../../styled-system/css";
import {
  Toast as ArkToast,
  createToaster,
  Toaster as ArkToaster,
} from "@ark-ui/react";
import { SvgIcon } from "..";
import { SvgIconName } from "./SvgIcon";

export const ToastStyle = sva({
  slots: ["root", "textGroup", "text"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      paddingX: "sd.system.dimension.spacing.extraLarge",
      borderRadius: "sd.system.dimension.radius.medium",
      boxShadow: "sd.system.elevation.shadow.level3",
      height: 40,
    },
    textGroup: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.twoExtraSmall",
    },
    text: {
      textStyle: "sd.system.typography.body.small_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.small_expanded",
      },
    },
  },
  variants: {
    variant: {
      default: {
        root: {
          background: "sd.system.color.component.inverseSurface",
        },
        text: {
          color: "sd.system.color.component.inverseOnSurface",
        },
      },
      error: {
        root: {
          background: "sd.system.color.impression.negativeContainer",
          borderColor: "sd.system.color.impression.negative",
          borderWidth: 1,
        },
        text: {
          color: "sd.system.color.impression.negative",
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ToastProps = {
  toaster: ReturnType<typeof createToaster>;
};

const Toast: React.FC<ToastProps> = ({ toaster }) => {
  type ToastType = "success" | "custom" | "error";
  const iconMap: { [key in ToastType]?: SvgIconName } = {
    success: "checkCircle",
    custom: "check",
    error: "errorCircle",
  };

  return (
    <ArkToaster toaster={toaster}>
      {(toast) => {
        const type = toast.type === "error" ? "error" : "default";
        const styles = ToastStyle({ variant: type });

        const iconType: SvgIconName | undefined =
          iconMap[toast.type as ToastType];

        return (
          <ArkToast.Root key={toast.id} className={styles.root}>
            <div className={styles.textGroup}>
              {iconType && <SvgIcon icon={iconType} size="24px" />}
              <ArkToast.Title className={styles.text}>
                {toast.title}
              </ArkToast.Title>
            </div>
          </ArkToast.Root>
        );
      }}
    </ArkToaster>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { Toast, createToaster };
