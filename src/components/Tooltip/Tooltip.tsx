import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import type { ComponentProps } from "react";
import { sva, type RecipeVariantProps } from "../../../styled-system/css";
import { cx } from "../../../styled-system/css";

const TooltipStyle = sva({
  slots: ["content", "arrow", "arrowTip"],
  base: {
    content: {
      backgroundColor: "sd.system.color.component.inverseSurface",
      color: "sd.system.color.component.inverseOnSurface",
      borderRadius: "sd.system.dimension.radius.small",
      px: "sd.system.dimension.spacing.extraSmall",
      py: "sd.system.dimension.spacing.twoExtraSmall",
      boxShadow: "sd.system.elevation.shadow.level3",
      maxWidth: "200px",
      textStyle: "sd.system.typography.body.extraSmall_expanded",
      zIndex: 1000,
    },
    arrow: {
      "--arrow-size": "8px",
      "--arrow-background": "colors.sd.system.color.component.inverseSurface",
      zIndex: 1001,
    },
  },
});

type TooltipVariantProps = RecipeVariantProps<typeof TooltipStyle>;

export type TooltipProps = {
  content: string;
  children: React.ReactNode;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "right";
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
  /** Controlled open state of the tooltip */
  open?: boolean;
  /** Callback when the tooltip open state changes */
  onOpenChange?: (details: { open: boolean }) => void;
} & ComponentProps<"div"> &
  TooltipVariantProps;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  openDelay = 700,
  closeDelay = 300,
  disabled = false,
  open,
  onOpenChange,
  className,
  ...props
}) => {
  const [variantProps, restProps] = TooltipStyle.splitVariantProps(props);
  const styles = TooltipStyle(variantProps);

  return (
    <ArkTooltip.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      positioning={{ placement, arrowPadding: 8 }}
      disabled={disabled}
      open={open}
      onOpenChange={onOpenChange}
    >
      <ArkTooltip.Trigger asChild>{children}</ArkTooltip.Trigger>
      <ArkTooltip.Positioner>
        <ArkTooltip.Content
          className={cx(styles.content, className)}
          {...restProps}
        >
          <ArkTooltip.Arrow className={styles.arrow}>
            <ArkTooltip.ArrowTip className={styles.arrowTip} />
          </ArkTooltip.Arrow>
          {content}
        </ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </ArkTooltip.Root>
  );
};

Tooltip.displayName = "Tooltip";
