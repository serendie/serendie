import { sva } from "../../styled-system/css";
import { Toast as ArkToast, createToaster } from "@ark-ui/react";
import { SvgIcon } from "..";
import { SvgIconName } from "./SvgIcon";

export const ToastStyle = sva({
  slots: ["root", "textGroup", "text"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      paddingX: "dic.system.dimension.spacing.extraLarge",
      borderRadius: "dic.system.dimension.radius.medium",
      boxShadow: "dic.system.elevation.shadow.level3",
      height: 40,
    },
    textGroup: {
      display: "flex",
      alignItems: "center",
      gap: "dic.system.dimension.spacing.twoExtraSmall",
    },
    text: {
      textStyle: "dic.system.typography.body.small_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.small_expanded",
      },
    },
  },
  variants: {
    variant: {
      default: {
        root: {
          background: "dic.system.color.component.inverseSurface",
        },
        text: {
          color: "dic.system.color.component.inverseOnSurface",
        },
      },
      error: {
        root: {
          background: "dic.system.color.impression.negativeContainer",
          borderColor: "dic.system.color.impression.negative",
          borderWidth: 1,
        },
        text: {
          color: "dic.system.color.impression.negative",
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  }
});

const [Toast, toaster] = createToaster({
  placement: "bottom",
  render: (toast) => {
    const type = toast.type === "error" ? "error" : "default";
    const styles = ToastStyle({ variant: type });

    type ToastType = "success" | "custom" | "error"
    const iconMap: { [key in ToastType]?: SvgIconName  } = {
      success: "checkCircle",
      custom: "check",
      error: "error",
    };

    const iconType: SvgIconName | undefined = iconMap[toast.type as ToastType]

    return (
      <ArkToast.Root key={toast.rootProps.id} className={styles.root}>
        <div className={styles.textGroup}>
          {iconType && <SvgIcon icon={iconType} size="24px" />}
          <ArkToast.Title className={styles.text}>{toast.title}</ArkToast.Title>
        </div>
      </ArkToast.Root>
    );
  },
});

export { Toast, toaster };
