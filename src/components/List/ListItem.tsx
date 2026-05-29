import React, { ComponentProps } from "react";
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
      width: "100%",
      minH: 48,
      display: "flex",
      alignItems: "center",
      paddingX: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.extraSmall",
      gap: "sd.system.dimension.spacing.small",
      cursor: "pointer",
      background: "transparent",
      border: "none",
      textAlign: "left",
      textDecoration: "none",
      color: "inherit",
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
  href?: string;
};

type ExclusiveTrailingItemProps =
  | ({
      badge?: number;
    } & { trailingElement?: never; isLargeTrailingElement?: never })
  | {
      badge?: never;
      trailingElement?: React.ReactElement;
      isLargeTrailingElement?: boolean;
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
  href,
  className,
  ...props
}) => {
  const [variantProps, elementProps] = ListItemStyle.splitVariantProps(props);
  const styles = ListItemStyle(variantProps);

  const isLargeWithDescOnly =
    !!props.isLargeHeadingElement && !!description && !subDescription;
  const isTopAlign =
    (!!description || !!subDescription) && !isLargeWithDescOnly;

  const wrapperClassName = cx(
    styles.wrapper,
    isTopAlign && css({ alignItems: "flex-start" })
  );

  const wrapperDataAttrs = {
    "data-disabled": disabled ? true : undefined,
    "data-selected": selected ? true : undefined,
    "data-focus-visible": focusVisible ? true : undefined,
  };

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

  const wrapperContent = (
    <>
      {headingElement && (
        <div
          className={headingElementClassName}
          style={
            props.isLargeHeadingElement
              ? { padding: "0", width: "40px", height: "40px" }
              : { padding: "0", width: "24px", height: "24px" }
          }
        >
          {headingElement}
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
      {trailingElement && (
        <div
          className={trailingElementClassName}
          style={
            props.isLargeTrailingElement
              ? { width: "40px", height: "40px" }
              : { width: "24px", height: "24px" }
          }
        >
          {trailingElement}
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
    </>
  );

  return (
    <li className={cx(styles.root, className)} {...elementProps}>
      {href ? (
        <a
          href={href}
          className={wrapperClassName}
          aria-disabled={disabled || undefined}
          {...wrapperDataAttrs}
        >
          {wrapperContent}
        </a>
      ) : (
        <button
          type="button"
          className={wrapperClassName}
          disabled={disabled}
          {...wrapperDataAttrs}
        >
          {wrapperContent}
        </button>
      )}
    </li>
  );
};
