import React, {
  ComponentProps,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SerendieSymbolChevronRight,
  SerendieSymbolMoreHorizontal,
} from "@serendie/symbols";
import { cx, sva, RecipeVariantProps } from "../../../styled-system/css";
import { useTranslations } from "../../i18n";

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
      gap: "sd.system.dimension.spacing.extraSmall",
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
      color: "sd.system.color.impression.primary",
      cursor: "pointer",
      "& button": {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        color: "inherit",
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
        link: {
          textStyle: "sd.system.typography.body.small_compact",
          paddingInline: "sd.system.dimension.spacing.extraSmall",
          paddingBlock: "sd.system.dimension.spacing.twoExtraSmall",
          minHeight: "sd.reference.dimension.scale.10",
          _expanded: {
            textStyle: "sd.system.typography.body.small_expanded",
          },
        },
        separator: {
          _expanded: {
            textStyle: "sd.system.typography.body.small_expanded",
          },
        },
        ellipsis: {
          "& button": {
            paddingInline: "sd.system.dimension.spacing.extraSmall",
            paddingBlock: "sd.system.dimension.spacing.twoExtraSmall",
            minHeight: "sd.reference.dimension.scale.10",
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
        link: {
          textStyle: "sd.system.typography.label.medium_compact",
          paddingInline: "sd.system.dimension.spacing.twoExtraSmall",
          paddingBlock: "sd.system.dimension.spacing.twoExtraSmall",
          gap: "sd.system.dimension.spacing.twoExtraSmall",
          minHeight: "sd.reference.dimension.scale.10",
          _expanded: {
            textStyle: "sd.system.typography.label.medium_expanded",
          },
        },
        separator: {
          _expanded: {
            textStyle: "sd.system.typography.label.medium_expanded",
          },
        },
        ellipsis: {
          "& button": {
            paddingInline: "sd.system.dimension.spacing.twoExtraSmall",
            paddingBlock: "sd.system.dimension.spacing.twoExtraSmall",
            minHeight: "sd.reference.dimension.scale.10",
          },
        },
        icon: {
          width: "14px",
          height: "14px",
          "& svg": {
            width: "14px",
            height: "14px",
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

type BreadcrumbsContextValue = {
  styles: ReturnType<typeof breadcrumbsStyle>;
  size: "medium" | "small";
};

const BreadcrumbsContext = createContext<BreadcrumbsContextValue | null>(null);

const useBreadcrumbsContext = () => {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    return {
      styles: breadcrumbsStyle(),
      size: "medium" as const,
    };
  }
  return context;
};

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      children,
      separator = "chevron",
      className,
      size = "medium",
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      ...props
    },
    ref
  ) => {
    const styles = breadcrumbsStyle({ size });
    const [expanded, setExpanded] = useState(false);
    const t = useTranslations();

    const allItems = React.Children.toArray(children).filter(
      React.isValidElement
    );

    // children変更時にexpandedをリセット
    const childCount = allItems.length;
    useEffect(() => {
      setExpanded(false);
    }, [childCount]);

    const shouldCollapse =
      maxItems !== undefined &&
      allItems.length > maxItems &&
      allItems.length > itemsBeforeCollapse + itemsAfterCollapse &&
      !expanded;

    const safeBeforeCollapse = Math.max(0, itemsBeforeCollapse);
    const safeAfterCollapse = Math.max(0, itemsAfterCollapse);

    const visibleItems = shouldCollapse
      ? [
          ...allItems.slice(0, safeBeforeCollapse),
          ...allItems.slice(allItems.length - safeAfterCollapse),
        ]
      : allItems;

    const separatorWidth = size === "small" ? 16 : 32;
    const separatorHeight = 32;

    const renderSeparator = () => (
      <li className={styles.separator} role="presentation" aria-hidden="true">
        {separator === "chevron" ? (
          <SerendieSymbolChevronRight
            width={separatorWidth}
            height={separatorHeight}
          />
        ) : (
          <svg
            width={separatorWidth}
            height={separatorHeight}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.5 10L13 21" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )}
      </li>
    );

    return (
      <BreadcrumbsContext.Provider value={{ styles, size }}>
        <nav
          ref={ref}
          aria-label={t("breadcrumbs.label")}
          className={cx(styles.root, className)}
          {...props}
        >
          <ol className={styles.list}>
            {visibleItems.map((child, index) => {
              const isLast = index === visibleItems.length - 1;
              const showEllipsisBefore =
                shouldCollapse && index === safeBeforeCollapse;

              return (
                <React.Fragment key={index}>
                  {showEllipsisBefore && (
                    <>
                      <li className={styles.ellipsis}>
                        <button
                          type="button"
                          aria-label={t("breadcrumbs.showMore")}
                          onClick={() => setExpanded(true)}
                        >
                          <SerendieSymbolMoreHorizontal
                            width={size === "small" ? 14 : 20}
                            height={size === "small" ? 17 : 20}
                          />
                        </button>
                      </li>
                      {renderSeparator()}
                    </>
                  )}
                  {child}
                  {!isLast && renderSeparator()}
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </BreadcrumbsContext.Provider>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(({ children, href, current, icon, className, ...props }, ref) => {
  const { styles } = useBreadcrumbsContext();

  const Tag = current ? "span" : href ? "a" : "span";
  const linkProps = current
    ? { "aria-current": "page" as const }
    : href
      ? { href }
      : {};

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
