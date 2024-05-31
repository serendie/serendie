import { ComponentProps } from "react";
import { css, cx, sva } from "../../styled-system/css";
import { IconButton } from "./IconButton";

const topAppBarStyle = sva({
  slots: [
    "root",
    "navbar",
    "navbarItem",
    "pageTitleContainer",
    "pageTitleContainerLeft",
    "pageTitleContainerRight",
    "pageTitle",
    "button",
  ],
  base: {
    root: {
      width: "100%",
      backgroundColor: "dic.system.color.component.surface",
    },
    navbar: {
      height: "48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    navbarItem: {
      display: "flex",
      alignItems: "center",
    },
    pageTitleContainer: {
      pt: "dic.system.dimension.spacing.small",
      pr: "dic.system.dimension.spacing.medium",
      pb: "dic.system.dimension.spacing.medium",
      pl: "dic.system.dimension.spacing.medium",
    },
    pageTitleContainerLeft: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    pageTitleContainerRight: {
      display: "flex",
      alignItems: "center",
    },
    pageTitle: {
      textStyle: "dic.system.typography.title.medium_compact",
      width: "100%",
      _expanded: {
        textStyle: "dic.system.typography.title.medium_expanded",
      },
    },
    button: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: "4px",
    },
  },
  variants: {
    type: {
      pageTitleWithIcons: {
        pageTitleContainer: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pt: "initial",
          pr: "initial",
          pb: "initial",
          pl: "initial",
        },
      },
    },
  },
});

type Item = ComponentProps<typeof IconButton>[];
type Props = React.FC<{
  buttons?: {
    navbarLeft?: Item;
    navbarRight?: Item;
    pageTitleLeft?: Item;
    pageTitleRight?: Item;
  };
  pageTitle?: string;
}>;

export const TopAppBar: Props = ({
  buttons: { navbarLeft, navbarRight, pageTitleLeft, pageTitleRight } = {},
  pageTitle,
  ...props
}) => {
  const [, cssProps] = topAppBarStyle.splitVariantProps(props);

  const classes = topAppBarStyle({
    type: pageTitleLeft || pageTitleRight ? "pageTitleWithIcons" : undefined,
  });

  const renderButtons = (buttons?: Item) =>
    buttons?.map(({ id, shape, styleType, ...props }) => (
      <div className={classes.button} key={id}>
        <IconButton
          shape={shape || "rectangle"}
          styleType={styleType || "ghost"}
          {...props}
        ></IconButton>
      </div>
    ));

  return (
    <nav className={cx(classes.root, css(cssProps))}>
      {(navbarLeft || navbarRight) && (
        <ul className={classes.navbar}>
          <li className={classes.navbarItem}>{renderButtons(navbarLeft)}</li>
          <li className={classes.navbarItem}>{renderButtons(navbarRight)}</li>
        </ul>
      )}
      {(pageTitle || (pageTitleLeft && pageTitleRight)) && (
        <div className={classes.pageTitleContainer}>
          <div className={classes.pageTitleContainerLeft}>
            {renderButtons(pageTitleLeft)}
            <h1 className={classes.pageTitle}>{pageTitle}</h1>
          </div>
          <div className={classes.pageTitleContainerRight}>
            {renderButtons(pageTitleRight)}
          </div>
        </div>
      )}
    </nav>
  );
};
