import { ComponentProps, forwardRef } from "react";
import { RecipeVariantProps, cx, sva } from "../../../styled-system/css";

const TestNotificationBadgeStyle = sva({
  slots: ["root", "text"],
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: 24,
      minWidth: 24,
      color: "sd.system.color.impression.onNegative",
      borderRadius: "sd.system.dimension.radius.full",
      paddingX: "sd.system.dimension.spacing.twoExtraSmall",
      textStyle: "sd.system.typography.label.small_compact",
      _expanded: {
        textStyle: "sd.system.typography.label.small_expanded",
      },
    },
    text: {
      height: 24,
      lineHeight: "24px",
    },
  },
  variants: {
    size: {
      small: {
        root: {
          height: 16,
          minWidth: 16,
          paddingX: "sd.system.dimension.spacing.twoExtraSmall",
        },
      },
      medium: {
        root: {
          height: 24,
          minWidth: 24,
          paddingX: "sd.system.dimension.spacing.extraSmall",
        },
      },
    },
    variant: {
      primary: {
        root: {
          backgroundColor: "sd.system.color.impression.negative",
        },
      },
      secondary: {
        root: {
          backgroundColor: "sd.system.color.impression.primary",
        },
      },
    },
    dot: {
      true: {
        root: {
          height: 8,
          minWidth: 8,
          paddingX: 0,
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export type TestNotificationBadgeProps = {
  /** 通知件数。max を超えると "max+" と表示 / Notification count (clamped to max) */
  count?: number;
  /** 件数の表示上限 / Maximum displayed count (e.g. 99 -> "99+") */
  max?: number;
  /** 件数を出さずドットだけ表示 / Show a dot instead of a count */
  dot?: boolean;
  /** スクリーンリーダー向けラベル / Accessible label */
  "aria-label"?: string;
} & ComponentProps<"span"> &
  RecipeVariantProps<typeof TestNotificationBadgeStyle>;

export const TestNotificationBadge = forwardRef<
  HTMLSpanElement,
  TestNotificationBadgeProps
>(
  (
    { count, max = 99, dot, className, "aria-label": ariaLabel, ...props },
    ref
  ) => {
    const [variantProps, elementProps] =
      TestNotificationBadgeStyle.splitVariantProps(props);
    const styles = TestNotificationBadgeStyle({ dot, ...variantProps });

    const label =
      ariaLabel ??
      (dot
        ? "New notifications"
        : count !== undefined
          ? `${Math.min(count, max)}${count > max ? "+" : ""} notifications`
          : undefined);

    if (dot) {
      return (
        <span
          ref={ref}
          role="status"
          aria-label={label}
          className={cx(styles.root, className)}
          {...elementProps}
        />
      );
    }

    if (!count || count < 1) {
      return null;
    }

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cx(styles.root, className)}
        {...elementProps}
      >
        <span className={styles.text} aria-hidden="true">
          {count > max ? `${max}+` : count}
        </span>
      </span>
    );
  }
);

TestNotificationBadge.displayName = "TestNotificationBadge";
