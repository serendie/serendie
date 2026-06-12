import React, { ComponentProps, useState } from "react";
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
        outlineWidth: "sd.system.dimension.border.medium",
        outlineStyle: "solid",
        outlineColor: "sd.system.color.impression.primary",
      },
      "&[aria-current='page']": {
        color: "sd.system.color.component.onSurface",
        fontWeight: "sd.reference.typography.fontWeight.regular",
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
      cursor: "pointer",
      borderRadius: "sd.system.dimension.radius.small",
      transition: "background-color 0.2s",
      "& button": {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        color: "inherit",
        cursor: "pointer",
        padding: 0,
        borderRadius: "sd.system.dimension.radius.small",
        _hover: {
          backgroundColor: "sd.system.color.interaction.hoveredVariant",
        },
        _focusVisible: {
          outlineWidth: "sd.system.dimension.border.medium",
          outlineStyle: "solid",
          outlineColor: "sd.system.color.impression.primary",
        },
      },
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
    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
  };

export type BreadcrumbItemProps = ComponentProps<"li"> & {
  href?: string;
  current?: boolean;
  icon?: React.ReactElement;
};

export type BreadcrumbEllipsisProps = ComponentProps<"li">;

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      children,
      separator = "chevron",
      className,
      size,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      ...props
    },
    ref
  ) => {
    const styles = breadcrumbsStyle({ size });
    const [expanded, setExpanded] = useState(false);

    const allItems = React.Children.toArray(children).filter(
      React.isValidElement
    );

    const shouldCollapse =
      maxItems !== undefined && allItems.length > maxItems && !expanded;

    const visibleItems = shouldCollapse
      ? [
          ...allItems.slice(0, itemsBeforeCollapse),
          ...allItems.slice(allItems.length - itemsAfterCollapse),
        ]
      : allItems;

    const renderSeparator = () => (
      <li className={styles.separator} role="presentation" aria-hidden="true">
        {separator === "chevron" ? (
          <SerendieSymbolChevronRight
            width={size === "small" ? 16 : 20}
            height={size === "small" ? 16 : 20}
          />
        ) : (
          "/"
        )}
      </li>
    );

    const renderItem = (child: React.ReactElement) =>
      React.cloneElement(
        child as React.ReactElement<{
          _styles?: ReturnType<typeof breadcrumbsStyle>;
        }>,
        { _styles: styles }
      );

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cx(styles.root, className)}
        {...props}
      >
        <ol className={styles.list}>
          {visibleItems.map((child, index) => {
            const isLast = index === visibleItems.length - 1;
            const showEllipsis =
              shouldCollapse && index === itemsBeforeCollapse - 1;

            return (
              <React.Fragment key={index}>
                {React.isValidElement(child) && renderItem(child)}
                {showEllipsis && (
                  <>
                    {renderSeparator()}
                    <li className={styles.ellipsis}>
                      <button
                        type="button"
                        aria-label="Show more breadcrumbs"
                        onClick={() => setExpanded(true)}
                      >
                        <SerendieSymbolMoreHorizontal
                          width={size === "small" ? 16 : 20}
                          height={size === "small" ? 16 : 20}
                        />
                      </button>
                    </li>
                  </>
                )}
                {!isLast && renderSeparator()}
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
    _onExpand?: () => void;
    _size?: "medium" | "small";
  }
>(({ className, _styles, _onExpand, _size, ...props }, ref) => {
  const styles = _styles || breadcrumbsStyle();

  return (
    <li ref={ref} className={cx(styles.ellipsis, className)} {...props}>
      <button
        type="button"
        aria-label="Show more breadcrumbs"
        onClick={_onExpand}
      >
        <SerendieSymbolMoreHorizontal
          width={_size === "small" ? 16 : 20}
          height={_size === "small" ? 16 : 20}
        />
      </button>
    </li>
  );
});

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
