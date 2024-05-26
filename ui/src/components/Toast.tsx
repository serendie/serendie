import { sva } from "../../styled-system/css";
import { Toast as ArkToast, createToaster } from "@ark-ui/react";
import { SvgIcon } from "..";
import { SvgIconName } from "./SvgIcon";

export const ToastStyle = sva({
  slots: ["root", "textGroup", "icon", "text"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      background: "dic.system.color.component.inverseSurface",
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
    icon: {
      width: 24,
      height: 24,
      color: "dic.system.color.impression.positive",
    },
    text: {
      color: "dic.system.color.component.inverseOnSurface",
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

    let iconType: SvgIconName | undefined = undefined;
    if (toast.type === "success") {
      iconType = "checkCircle";
    } else if (toast.type === "custom") {
      iconType = "check";
    } else if (toast.type === "error") {
      iconType = "error";
    }

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
