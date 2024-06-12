import { sva } from "../../styled-system/css";

export const BottomNavigationStyle = sva({
  slots: ["root"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      height: 64,
      paddingX: "dic.system.dimension.spacing.medium",
      borderTop: "1px solid",
      borderTopColor: "dic.system.color.component.outline",
    },
  },
});

type BottomNavigationProps = {
  children: React.ReactNode;
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  children,
  ...props
}) => {
  const [cssProps, componentProps] =
    BottomNavigationStyle.splitVariantProps(props);
  const styles = BottomNavigationStyle(cssProps);

  return (
    <nav className={styles.root} {...componentProps}>
      {children}
    </nav>
  );
};
