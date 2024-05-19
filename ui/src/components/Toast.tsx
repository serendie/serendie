import { sva } from "../../styled-system/css";
import { Toast as ArkToast, createToaster } from "@ark-ui/react";
import CheckIcon from "../assets/check.svg?react";

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
});

const [Toast, toaster] = createToaster({
  placement: "bottom",
  render: (toast) => {
    const styles = ToastStyle();

    return (
      <ArkToast.Root key={toast.rootProps.id} className={styles.root}>
        <div className={styles.textGroup}>
          {toast.type === "success" && <CheckIcon className={styles.icon} />}
          <ArkToast.Title className={styles.text}>{toast.title}</ArkToast.Title>
        </div>
      </ArkToast.Root>
    );
  },
});

export { Toast, toaster };
