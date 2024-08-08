import { ComponentProps } from "react";
import { RecipeVariantProps, cx, sva } from "../../styled-system/css";
import { NotificationBadge, NotificationBadgeProps } from "./NotificationBadge";

const topAppBarStyle = sva({
  slots: ["root", "container", "left", "buttonContainer", "title"],
  base: {
    root: {
      width: "100%",
      backgroundColor: "sd.system.color.component.surface",
    },
    container: {
      height: "48px",
      display: "flex",
      justifyContent: "space-between",
      gap: "8px",
      alignItems: "center",
    },
    left: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    title: {
      textStyle: "sd.system.typography.title.medium_compact",
      maxW: "100%",
      _expanded: {
        textStyle: "sd.system.typography.title.medium_expanded",
      },
    },
  },
  variants: {
    type: {
      navbar: {},
      titleBar: {},
      titleBarTitleOnly: {
        root: {
          _lastOfType: {
            paddingBottom: "8px",
          },
          _firstOfType: {
            paddingBottom: "0px",
          },
        },
      },
    },
  },
  defaultVariants: {
    type: "navbar",
  },
});

type VariantProps = Omit<RecipeVariantProps<typeof topAppBarStyle>, "type">;

type BaseProps = {
  headingIconButton?: React.ReactNode;
  trailingIconButtons?: React.ReactNode;
  badge?: NotificationBadgeProps["count"];
  title?: string;
} & VariantProps &
  ComponentProps<"nav">;

type NavbarProps = BaseProps & { type: "navbar"; title?: string };
type TitleBarProps = BaseProps & { type: "titleBar"; title: string };

type Props = React.FC<NavbarProps | TitleBarProps>;

export const TopAppBar: Props = ({
  headingIconButton,
  trailingIconButtons,
  badge,
  title,
  ...props
}) => {
  const [variantProps, { className, ...elementProps }] =
    topAppBarStyle.splitVariantProps(props);
  const styles = topAppBarStyle(variantProps);

  return (
    <nav className={cx(styles.root, className)} {...elementProps}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.buttonContainer}>{headingIconButton}</div>
          <h1 className={styles.title}>{title}</h1>
          {badge && <NotificationBadge count={badge} position="relative" />}
        </div>
        <div className={styles.buttonContainer}>{trailingIconButtons}</div>
      </div>
    </nav>
  );
};
