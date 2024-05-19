import { sva } from "../../styled-system/css";
import { Toast as ArkToast, createToaster } from "@ark-ui/react";

export const ToastStyle = sva({
  slots: ["root", "text"],
  base: {
    root: {
      background: "dic.system.color.component.inverseSurface",
      paddingX: "dic.system.dimension.spacing.extraLarge",
      paddingY: "dic.system.dimension.spacing.small",
      borderRadius: "dic.system.dimension.radius.medium",
    },
    text: {
      color: "dic.system.color.component.inverseOnSurface",
      textStyle: "dic.system.typography.body.small_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.small_expanded",
      }
    },
  },
});

const [Toast, toaster] = createToaster({
  placement: "bottom",
  render: (toast) => {
    const styles = ToastStyle();

    return (
      <ArkToast.Root key={toast.rootProps.id} className={styles.root}>
        <ArkToast.Title className={styles.text}>{toast.title}</ArkToast.Title>
      </ArkToast.Root>
    );
  },
});

export { Toast, toaster };
