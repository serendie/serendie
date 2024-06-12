import { Tabs as ArkTabs, TabsRootProps } from "@ark-ui/react";
import { sva } from "../../styled-system/css";

export const TabsStyle = sva({
  slots: ["root", "list"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
    },
    list: {
      display: "flex",
      gap: "dic.system.dimension.spacing.medium",
    },
  },
});

type TabsBaseProps = {
  children: React.ReactNode;
};

export type TabsProps = TabsBaseProps & TabsRootProps;

export const Tabs: React.FC<TabsProps> = ({ children, ...props }) => {
  const [cssProps, componentProps] =
  TabsStyle.splitVariantProps(props);
  const styles = TabsStyle(cssProps);

  return (
    <ArkTabs.Root className={styles.root} {...componentProps} >
      <ArkTabs.List>
        {children}
      </ArkTabs.List>
    </ArkTabs.Root>
  );
};
