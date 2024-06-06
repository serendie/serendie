import { RecipeVariantProps, css, cx, sva } from "../../styled-system/css";

const topAppBarStyle = sva({
  slots: ["root", "container", "left", "buttonContainer", "title"],
  base: {
    root: {
      width: "100%",
      backgroundColor: "dic.system.color.component.surface",
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
      textStyle: "dic.system.typography.title.medium_compact",
      width: "100%",
      _expanded: {
        textStyle: "dic.system.typography.title.medium_expanded",
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
  title?: string;
} & VariantProps;

type NavbarProps = BaseProps & { type: "navbar"; title?: string };
type TitleBarProps = BaseProps & { type: "titleBar"; title: string };

type Props = React.FC<NavbarProps | TitleBarProps>;

export const TopAppBar: Props = ({
  headingIconButton,
  trailingIconButtons,
  title,
  ...props
}) => {
  const [variantProps, cssProps] = topAppBarStyle.splitVariantProps(props);

  // titleのみの場合はtitleBarTitleOnlyを適用
  const isTitleOnly = !headingIconButton && !trailingIconButtons && title;

  const classes = topAppBarStyle(variantProps);

  return (
    <nav className={cx(classes.root, css(cssProps))}>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.buttonContainer}>{headingIconButton}</div>
          <h1 className={classes.title}>{title}</h1>
        </div>
        <div className={classes.buttonContainer}>{trailingIconButtons}</div>
      </div>
    </nav>
  );
};
