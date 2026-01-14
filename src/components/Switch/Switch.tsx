import { Switch as ArkSwitch, SwitchRootProps } from "@ark-ui/react";
import { forwardRef } from "react";
import { RecipeVariantProps, css, cx, sva } from "../../../styled-system/css";

export const SwitchStyle = sva({
  slots: ["root", "control", "thumb", "label", "textGroup", "helperText"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.small",
      paddingX: "sd.system.dimension.spacing.medium",
      position: "relative",
      '&[data-focus="true"] .control': {
        borderColor: "sd.system.color.impression.primary",
      },
    },
    control: {
      cursor: "pointer",
      width: 52,
      height: 32,
      flexShrink: 0,
      backgroundColor: "sd.system.color.interaction.disabled",
      borderRadius: "sd.system.dimension.radius.full",
      borderWidth: 1,
      borderColor: "sd.system.color.component.outline",
      transitionDuration: ".2s",
      transitionProperty: "background, borderColor",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      _checked: {
        backgroundColor: "sd.system.color.impression.primary",
        borderColor: "sd.system.color.impression.primary",
        _disabled: {
          backgroundColor:
            "color-mix(in srgb, {colors.sd.system.color.impression.primary}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
          borderColor: "transparent",
        },
      },
      _disabled: {
        cursor: "default",
        background: "sd.system.color.interaction.disabled",
      },
      ".group:has(:focus-visible) &": {
        borderColor: "sd.system.color.impression.primary",
      },
    },
    thumb: {
      display: "block",
      width: 20,
      height: 20,
      marginY: 5,
      marginX: 6,
      background: "sd.system.color.component.surface",
      borderRadius: "sd.system.dimension.radius.full",
      borderColor: "sd.system.color.component.outline",
      borderWidth: 1,
      transitionDuration: ".3s",
      transitionProperty: "transform, borderColor",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      _checked: {
        transform: "translateX(19px)",
        borderColor: "sd.system.color.component.surface",
      },
    },
    label: {
      color: "sd.system.color.component.onSurface",
      textStyle: "sd.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
    textGroup: {
      display: "flex",
      flexFlow: "column",
      width: 160,
    },
    helperText: {
      color: "sd.system.color.component.onSurfaceVariant",
      marginTop: "sd.system.dimension.spacing.twoExtraSmall",
      lineHeight: "sd.reference.typography.lineHeight.tight",
      textStyle: "sd.system.typography.body.extraSmall_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
  },
});

type SwitchItemProps = {
  label: string;
  helperText?: string;
};

export type SwitchProps = SwitchRootProps &
  RecipeVariantProps<typeof SwitchStyle> &
  SwitchItemProps;

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  ({ label, helperText, className, ...props }, ref) => {
    const [variantProps, elementProps] = SwitchStyle.splitVariantProps(props);
    const styles = SwitchStyle(variantProps);

    return (
      <ArkSwitch.Root
        ref={ref}
        className={cx(
          "group",
          styles.root,
          helperText && css({ alignItems: "flex-start" }),
          className
        )}
        {...elementProps}
      >
        <div className={styles.textGroup}>
          <ArkSwitch.Label className={styles.label}>{label}</ArkSwitch.Label>
          {helperText && (
            <ArkSwitch.Label className={styles.helperText}>
              {helperText}
            </ArkSwitch.Label>
          )}
        </div>
        <ArkSwitch.Control className={cx("control", styles.control)}>
          <ArkSwitch.Thumb className={styles.thumb} />
        </ArkSwitch.Control>
        <ArkSwitch.HiddenInput />
      </ArkSwitch.Root>
    );
  }
);
