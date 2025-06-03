import { cva } from "../../../../styled-system/css";

const cellStyle = cva({
  base: {
    borderBottom: "1px solid",
    borderColor: "sd.system.color.component.outline",
    fontFamily: "Roboto, sans-serif",
    color: "sd.system.color.component.onSurface",
    textAlign: "left",
    verticalAlign: "middle",
    fontWeight: 400,
    fontSize: "13px",
    px: "sd.system.dimension.spacing.extraSmall",
    py: "sd.system.dimension.spacing.twoExtraSmall",
    height: "32px",
    background: "sd.system.color.component.surface",
  },
  variants: {
    type: {
      default: {
        background: "sd.system.color.component.surface",
      },
      success: { background: "sd.system.color.impression.positiveContainer" },
      notice: { background: "sd.system.color.impression.noticeContainer" },
      error: {
        background: "sd.system.color.impression.negativeContainer",
        color: "sd.system.color.impression.onNegativeContainer",
      },
    },
    state: {
      enabled: {},
      hovered: {
        background: `color-mix(in srgb, token(colors.sd.system.color.component.surface) 95%, token(colors.sd.system.color.component.inverseSurface) 5%)`,
      },
      selected: {
        background: "sd.system.color.component.inversePrimary",
      },
    },
    size: {
      small: { fontSize: "11px", height: "24px" },
      medium: { fontSize: "13px", height: "32px" },
      large: { fontSize: "15px", height: "40px" },
    },
  },
  compoundVariants: [
    {
      type: "success",
      state: "hovered",
      css: {
        background: `color-mix(in srgb, token(colors.sd.system.color.impression.positiveContainerVariant) 95%, token(colors.sd.system.color.component.inverseSurface) 5%)`,
        opacity: 0.95,
      },
    },
    {
      type: "notice",
      state: "hovered",
      css: {
        background: `color-mix(in srgb, token(colors.sd.system.color.impression.noticeContainerVariant) 95%, token(colors.sd.system.color.component.inverseSurface) 5%)`,
        opacity: 0.95,
      },
    },
    {
      type: "error",
      state: "hovered",
      css: {
        background: `color-mix(in srgb, token(colors.sd.system.color.impression.negativeContainerVariant) 95%, token(colors.sd.system.color.component.inverseSurface) 5%)`,
        opacity: 0.95,
      },
    },
    {
      type: "success",
      state: "selected",
      css: {
        background: `color-mix(in srgb, token(colors.sd.system.color.impression.positiveContainerVariant) 95%, token(colors.sd.system.color.component.inverseSurface) 5%)`,
        opacity: 0.98,
      },
    },
    {
      type: "notice",
      state: "selected",
      css: {
        background: `color-mix(in srgb, token(colors.sd.system.color.impression.noticeContainerVariant) 95%, token(colors.sd.system.color.component.inverseSurface) 5%)`,
        opacity: 0.98,
      },
    },
    {
      type: "error",
      state: "selected",
      css: {
        background: `color-mix(in srgb, token(colors.sd.system.color.impression.negativeContainerVariant) 95%, token(colors.sd.system.color.component.inverseSurface) 5%)`,
        opacity: 0.98,
      },
    },
  ],
  defaultVariants: {
    type: "default",
    state: "enabled",
  },
});

export const BodyCell = ({
  children,
  size = "medium",
  type = "default",
  state = "enabled",
  ...props
}: React.PropsWithChildren<{
  size?: "small" | "medium" | "large";
  type?: "default" | "success" | "notice" | "error";
  state?: "enabled" | "hovered" | "selected";
}> &
  React.ComponentProps<"td">) => (
  <td
    role="cell"
    data-type={type}
    data-state={state}
    className={cellStyle({ size, type, state })}
    {...props}
  >
    {children}
  </td>
);
