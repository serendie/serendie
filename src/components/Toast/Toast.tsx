import {
  Toast as ArkToast,
  Toaster as ArkToaster,
  createToaster,
} from "@ark-ui/react";
import {
  SerendieSymbolAlertCircleFilled,
  SerendieSymbolCheckCircleFilled,
} from "@serendie/symbols";
import { sva } from "../../../styled-system/css";

export const ToastStyle = sva({
  slots: ["root", "textGroup", "text", "icon"],
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
    icon: {
      color: "sd.system.color.component.inverseOnSurface",
    },
  },
  variants: {
    variant: {
      default: {
        root: {
          background: "sd.system.color.impression.positiveContainer",
        },
        text: {
          color: "sd.system.color.impression.onPositiveContainer",
        },
        icon: {
          color: "sd.system.color.impression.onPositiveContainer",
        },
      },
      error: {
        root: {
          background: "sd.system.color.impression.negativeContainer",
        },
        text: {
          color: "sd.system.color.impression.negative",
        },
        icon: {
          color: "sd.system.color.impression.negative",
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const toaster: ReturnType<typeof createToaster> = createToaster({
  placement: "bottom",
});

type ToastProps = {
  toaster: typeof toaster;
};

const Toast: React.FC<ToastProps> = ({ toaster }) => {
  return (
    <ArkToaster toaster={toaster}>
      {(toast) => {
        const type = toast.type === "error" ? "error" : "default";
        const styles = ToastStyle({ variant: type });

        const Icon =
          type === "error" ? (
            <SerendieSymbolAlertCircleFilled className={styles.icon} />
          ) : (
            <SerendieSymbolCheckCircleFilled className={styles.icon} />
          );

        return (
          <ArkToast.Root key={toast.id} className={styles.root}>
            <div className={styles.textGroup}>
              {Icon}
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
export { Toast, toaster };
