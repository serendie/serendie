import { Tabs as ArkTabs } from "@ark-ui/react";
import { cx, sva } from "../../styled-system/css";

export const TabsStyle = sva({
  slots: ["root", "list"],
  base: {
    root: {
      display: "flex",
      paddingX: "sd.system.dimension.spacing.medium",
    },
    list: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
    },
  },
});

export const Tabs = ({ children, className, ...props }: ArkTabs.RootProps) => {
  const [variantProps, elementProps] = TabsStyle.splitVariantProps(props);
  const styles = TabsStyle(variantProps);

  return (
    <ArkTabs.Root className={cx(styles.root, className)} {...elementProps}>
      <ArkTabs.List className={styles.list}>{children}</ArkTabs.List>
    </ArkTabs.Root>
  );
};
