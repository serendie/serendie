import React, { ComponentProps } from "react";
import {
  SerendieSymbolChevronRight,
  SerendieSymbolMoreHorizontal,
} from "@serendie/symbols";
import { cx, sva, RecipeVariantProps } from "../../../styled-system/css";

export const breadcrumbsStyle = sva({
  slots: ["root", "list", "item", "link", "separator", "ellipsis", "icon"],
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
    },
    list: {
      display: "flex",
      alignItems: "center",
      listStyle: "none",
      margin: 0,
      padding: 0,
      flexWrap: "wrap",
    },
    item: {
      display: "inline-flex",
      alignItems: "center",
    },
    link: {
      display: "inline-flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.twoExtraSmall",
      color: "sd.system.color.impression.primary",
      textDecoration: "none",
      cursor: "pointer",
      borderRadius: "sd.system.dimension.radius.small",
      transition: "background-color 0.2s",
      _hover: {
        backgroundColor: "sd.system.color.interaction.hoveredVariant",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "sd.system.color.impression.primary",
        outlineOffset: "2px",
      },
      "&[aria-current='page']": {
        color: "sd.system.color.component.onSurface",
        fontWeight: "bold",
        cursor: "default",
        _hover: {
          backgroundColor: "transparent",
        },
      },
    },
    separator: {
      display: "inline-flex",
      alignItems: "center",
      color: "sd.system.color.component.onSurfaceVariant",
      userSelect: "none",
    },
    ellipsis: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "sd.system.color.component.onSurfaceVariant",
      cursor: "default",
      borderRadius: "sd.system.dimension.radius.small",
    },
    icon: {
      display: "inline-flex",
      alignItems: "center",
      flexShrink: 0,
    },
  },
  variants: {
    size: {
      medium: {
        list: {
          gap: "sd.system.dimension.spacing.twoExtraSmall",
        },
        link: {
          textStyle: "sd.system.typography.body.medium_compact",
          paddingInline: "sd.system.dimension.spacing.twoExtraSmall",
          paddingBlock: "sd.system.dimension.spacing.twoExtraSmall",
          _expanded: {
            textStyle: "sd.system.typography.body.medium_expanded",
          },
        },
        separator: {
          textStyle: "sd.system.typography.body.medium_compact",
          paddingInline: "sd.system.dimension.spacing.twoExtraSmall",
          _expanded: {
            textStyle: "sd.system.typography.body.medium_expanded",
          },
        },
        ellipsis: {
          textStyle: "sd.system.typography.body.medium_compact",
          paddingInline: "sd.system.dimension.spacing.twoExtraSmall",
          paddingBlock: "sd.system.dimension.spacing.twoExtraSmall",
          _expanded: {
            textStyle: "sd.system.typography.body.medium_expanded",
          },
        },
        icon: {
          width: "sd.reference.dimension.scale.7",
          height: "sd.reference.dimension.scale.7",
          "& svg": {
            width: "sd.reference.dimension.scale.7",
            height: "sd.reference.dimension.scale.7",
          },
        },
      },
      small: {
        list: {
          gap: "sd.system.dimension.spacing.twoExtraSmall",
        },
        link: {
          textStyle: "sd.system.typography.body.small_compact",
          paddingInline: "sd.system.dimension.spacing.twoExtraSmall",
          paddingBlock: "sd.system.dimension.spacing.twoExtraSmall",
          _expanded: {
            textStyle: "sd.system.typography.body.small_expanded",
          },
        },
        separator: {
          textStyle: "sd.system.typography.body.small_compact",
          paddingInline: "sd.system.dimension.spacing.twoExtraSmall",
          _expanded: {
            textStyle: "sd.system.typography.body.small_expanded",
          },
        },
        ellipsis: {
          textStyle: "sd.system.typography.body.small_compact",
          paddingInline: "sd.system.dimension.spacing.twoExtraSmall",
          paddingBlock: "sd.system.dimension.spacing.twoExtraSmall",
          _expanded: {
            textStyle: "sd.system.typography.body.small_expanded",
          },
        },
        icon: {
          width: "sd.reference.dimension.scale.6",
          height: "sd.reference.dimension.scale.6",
          "& svg": {
            width: "sd.reference.dimension.scale.6",
            height: "sd.reference.dimension.scale.6",
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type BreadcrumbsVariantProps = RecipeVariantProps<typeof breadcrumbsStyle>;

export type BreadcrumbsProps = ComponentProps<"nav"> &
  BreadcrumbsVariantProps & {
    separator?: "chevron" | "slash";
  };

export type BreadcrumbItemProps = ComponentProps<"li"> & {
  href?: string;
  current?: boolean;
  icon?: React.ReactElement;
};

export type BreadcrumbEllipsisProps = ComponentProps<"li">;

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, separator = "chevron", className, size, ...props }, ref) => {
    const styles = breadcrumbsStyle({ size });

    const items = React.Children.toArray(children).filter(React.isValidElement);

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cx(styles.root, className)}
        {...props}
      >
        <ol className={styles.list}>
          {items.map((child, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                {React.isValidElement(child) &&
                  React.cloneElement(
                    child as React.ReactElement<{
                      _styles?: ReturnType<typeof breadcrumbsStyle>;
                    }>,
                    { _styles: styles }
                  )}
                {!isLast && (
                  <li
                    className={styles.separator}
                    role="presentation"
                    aria-hidden="true"
                  >
                    {separator === "chevron" ? (
                      <SerendieSymbolChevronRight
                        width={size === "small" ? 16 : 20}
                        height={size === "small" ? 16 : 20}
                      />
                    ) : (
                      "/"
                    )}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps & {
    _styles?: ReturnType<typeof breadcrumbsStyle>;
  }
>(({ children, href, current, icon, className, _styles, ...props }, ref) => {
  const styles = _styles || breadcrumbsStyle();

  const linkProps = current
    ? { "aria-current": "page" as const }
    : { href: href };

  const Tag = current ? "span" : "a";

  return (
    <li ref={ref} className={cx(styles.item, className)} {...props}>
      <Tag className={styles.link} {...linkProps}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </Tag>
    </li>
  );
});

BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbEllipsis = React.forwardRef<
  HTMLLIElement,
  BreadcrumbEllipsisProps & {
    _styles?: ReturnType<typeof breadcrumbsStyle>;
  }
>(({ className, _styles, ...props }, ref) => {
  const styles = _styles || breadcrumbsStyle();

  return (
    <li
      ref={ref}
      className={cx(styles.ellipsis, className)}
      role="presentation"
      {...props}
    >
      <SerendieSymbolMoreHorizontal width={20} height={20} />
    </li>
  );
});

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
