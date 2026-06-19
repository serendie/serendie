import React, { ComponentProps, useEffect } from "react";
import { css, cx, sva } from "../../../styled-system/css";
import { NotificationBadge } from "../NotificationBadge";

export const ListItemStyle = sva({
  slots: [
    "root",
    "wrapper",
    "textGroup",
    "title",
    "description",
    "subDescription",
    "trailingElement",
    "headingElement",
    "badge",
  ],
  base: {
    root: {
      position: "relative",
    },
    wrapper: {
      minH: 48,
      display: "flex",
      alignItems: "center",
      paddingX: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.extraSmall",
      gap: "sd.system.dimension.spacing.small",
      cursor: "pointer",
      _hover: {
        background:
          "color-mix(in srgb, {colors.sd.system.color.interaction.hoveredVariant}, {colors.sd.system.color.component.surface});",
      },
      _focusVisible: {
        outline: "1px solid",
        outlineColor: "sd.system.color.component.outline",
      },
      _selected: {
        background: "sd.system.color.interaction.selectedSurface",
        _hover: {
          background: "sd.system.color.interaction.selectedSurface",
        },
      },
      _disabled: {
        opacity: 0.3,
        cursor: "not-allowed",
        _selected: {
          background: "transparent",
        },
      },
    },
    textGroup: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    title: {
      py: "sd.system.dimension.spacing.twoExtraSmall",
      textStyle: "sd.system.typography.label.extraLarge_compact",
      color: "sd.system.color.component.onSurface",
      _expanded: {
        textStyle: "sd.system.typography.label.extraLarge_expanded",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    description: {
      textStyle: "sd.system.typography.body.extraSmall_compact",
      color: "sd.system.color.component.onSurfaceVariant",
      _expanded: {
        textStyle: "sd.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    subDescription: {
      textStyle: "sd.system.typography.body.extraSmall_compact",
      color: "sd.system.color.component.onSurfaceVariant",
      _expanded: {
        textStyle: "sd.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    headingElement: {
      flexShrink: 0,
      "& svg": {
        display: "block",
        maxHeight: "100%",
        maxWidth: "100%",
        width: "24px",
        height: "24px",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    trailingElement: {
      flexShrink: 0,
      "& svg": {
        width: "24px",
        height: "24px",
      },
      _disabled: {
        opacity: 0.3,
      },
    },
    badge: {
      flexShrink: 0,
    },
  },
  variants: {
    isLargeHeadingElement: {
      true: {
        headingElement: {
          "& svg": {
            width: "40px",
            height: "40px",
          },
        },
      },
      false: {},
    },
    isLargeTrailingElement: {
      true: {
        trailingElement: {
          "& svg": {
            width: "40px",
            height: "40px",
          },
        },
      },
      false: {},
    },
    size: {
      small: {
        wrapper: {
          minH: 38,
        },
      },
    },
  },
});

type ListItemBaseProps = {
  title: string;
  description?: string;
  subDescription?: string;
  trailingElement?: React.ReactElement;
  headingElement?: React.ReactElement;
  isLargeHeadingElement?: boolean;
  isLargeTrailingElement?: boolean;
  badge?: number;
  children?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  focusVisible?: boolean;
  size?: "small";
  /** @deprecated `leftIcon` は廃止予定です。`headingElement` を使ってください */
  leftIcon?: React.ReactElement;
  /** @deprecated `rightIcon` は廃止予定です。`trailingElement` を使ってください */
  rightIcon?: React.ReactElement;
  /** @deprecated `isLargeLeftIcon` は廃止予定です。`isLargeHeadingElement` を使ってください */
  isLargeLeftIcon?: boolean;
  /** @deprecated `isLargeRightIcon` は廃止予定です。`isLargeTrailingElement` を使ってください */
  isLargeRightIcon?: boolean;
};

type ExclusiveTrailingItemProps =
  | ({
      badge?: number;
    } & {
      trailingElement?: never;
      isLargeTrailingElement?: never;
      /** @deprecated `rightIcon` は廃止予定です。`trailingElement` を使ってください */
      rightIcon?: never;
      /** @deprecated `isLargeRightIcon` は廃止予定です。`isLargeTrailingElement` を使ってください */
      isLargeRightIcon?: never;
    })
  | {
      badge?: never;
      trailingElement?: React.ReactElement;
      isLargeTrailingElement?: boolean;
      /** @deprecated `rightIcon` は廃止予定です。`trailingElement` を使ってください */
      rightIcon?: React.ReactElement;
      /** @deprecated `isLargeRightIcon` は廃止予定です。`isLargeTrailingElement` を使ってください */
      isLargeRightIcon?: boolean;
    };

type ListItemProps = ComponentProps<"li"> &
  ListItemBaseProps &
  ExclusiveTrailingItemProps;

export const ListItem: React.FC<ListItemProps> = ({
  headingElement,
  trailingElement,
  title,
  description,
  subDescription,
  badge,
  children,
  disabled,
  selected,
  focusVisible,
  className,
  leftIcon,
  rightIcon,
  isLargeLeftIcon,
  isLargeRightIcon,
  ...props
}) => {
  useEffect(() => {
    if (leftIcon) {
      console.warn(
        "[ListItem] `leftIcon` は廃止予定です。`headingElement` を使ってください。"
      );
    }
    if (rightIcon) {
      console.warn(
        "[ListItem] `rightIcon` は廃止予定です。`trailingElement` を使ってください。"
      );
    }
    if (isLargeLeftIcon) {
      console.warn(
        "[ListItem] `isLargeLeftIcon` は廃止予定です。`isLargeHeadingElement` を使ってください。"
      );
    }
    if (isLargeRightIcon) {
      console.warn(
        "[ListItem] `isLargeRightIcon` は廃止予定です。`isLargeTrailingElement` を使ってください。"
      );
    }
  }, [leftIcon, rightIcon, isLargeLeftIcon, isLargeRightIcon]);

  const resolvedHeadingElement = headingElement ?? leftIcon;
  const resolvedTrailingElement = trailingElement ?? rightIcon;
  const resolvedIsLargeHeadingElement =
    props.isLargeHeadingElement ?? isLargeLeftIcon;
  const resolvedIsLargeTrailingElement =
    props.isLargeTrailingElement ?? isLargeRightIcon;

  const [variantProps, elementProps] = ListItemStyle.splitVariantProps(props);
  const styles = ListItemStyle({
    ...variantProps,
    isLargeHeadingElement: resolvedIsLargeHeadingElement,
    isLargeTrailingElement: resolvedIsLargeTrailingElement,
  });

  const isLargeWithDescOnly =
    !!resolvedIsLargeHeadingElement && !!description && !subDescription;
  const isTopAlign =
    (!!description || !!subDescription) && !isLargeWithDescOnly;

  const wrapperClassName = cx(
    styles.wrapper,
    isTopAlign && css({ alignItems: "flex-start" })
  );

  const headingElementClassName = cx(
    styles.headingElement,
    isTopAlign &&
      css({ marginTop: "sd.system.dimension.spacing.twoExtraSmall" })
  );

  const trailingElementClassName = cx(
    styles.trailingElement,
    isTopAlign &&
      css({ marginTop: "sd.system.dimension.spacing.twoExtraSmall" })
  );

  return (
    <li className={cx(styles.root, className)} {...elementProps}>
      <div
        tabIndex={1}
        className={wrapperClassName}
        data-disabled={disabled ? true : undefined}
        data-selected={selected ? true : undefined}
        data-focus-visible={focusVisible ? true : undefined}
      >
        {resolvedHeadingElement && (
          <div
            className={headingElementClassName}
            style={
              resolvedIsLargeHeadingElement
                ? { padding: "0", width: "40px", height: "40px" }
                : { padding: "0", width: "24px", height: "24px" }
            }
          >
            {resolvedHeadingElement}
          </div>
        )}
        <div className={styles.textGroup}>
          <span className={styles.title}>{title}</span>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
          {subDescription && (
            <span className={styles.subDescription}>{subDescription}</span>
          )}
          {children}
        </div>
        {resolvedTrailingElement && (
          <div
            className={trailingElementClassName}
            style={
              resolvedIsLargeTrailingElement
                ? { width: "40px", height: "40px" }
                : { width: "24px", height: "24px" }
            }
          >
            {resolvedTrailingElement}
          </div>
        )}
        {badge != null && badge > 0 && (
          <div className={styles.badge}>
            <NotificationBadge
              count={badge}
              variant="secondary"
              size="small"
              position="relative"
            />
          </div>
        )}
      </div>
    </li>
  );
};
