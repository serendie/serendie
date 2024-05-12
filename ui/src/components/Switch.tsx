import { Switch as ArkSwitch, SwitchRootProps } from "@ark-ui/react";
import { CSSProperties, forwardRef } from "react";
import { RecipeVariantProps, cx, sva } from "../../styled-system/css";

export const SwitchStyle = sva({
  slots: ["root", "control", "thumb", "label", "textGroup", "helperText"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "dic.system.dimension.spacing.medium",
      paddingY: "dic.system.dimension.spacing.small",
      paddingX: "dic.system.dimension.spacing.medium",
    },
    control: {
      cursor: "pointer",
      width: 52,
      height: 32,
      flexShrink: 0,
      backgroundColor: "dic.system.color.interaction.disabled",
      borderRadius: "dic.system.dimension.radius.full",
      borderWidth: 1,
      borderColor: "dic.system.color.component.outline",
      transitionDuration: ".2s",
      transitionProperty: "background, borderColor",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      _checked: {
        backgroundColor: "dic.system.color.impression.primary",
        borderColor: "dic.system.color.impression.primary",
        _disabled: {
          backgroundColor:
            "color-mix(in srgb, {colors.dic.system.color.impression.primary}, {colors.dic.system.color.interaction.hoveredOnPrimary});",
          borderColor: "transparent",
        },
      },
      _disabled: {
        cursor: "default",
        background: "dic.system.color.interaction.disabled",
      },
      ".group:has(:focus-visible) &": {
        borderColor: "dic.system.color.impression.primary",
      },
    },
    thumb: {
      display: "block",
      width: "dic.reference.dimension.scale.7",
      height: "dic.reference.dimension.scale.7",
      marginY: 5,
      marginX: 6,
      background: "dic.system.color.component.surface",
      borderRadius: "dic.system.dimension.radius.full",
      borderColor: "dic.system.color.component.outline",
      borderWidth: 1,
      transitionDuration: ".3s",
      transitionProperty: "transform, borderColor",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      _checked: {
        transform: "translateX(19px)",
        borderColor: "dic.system.color.component.surface",
      },
    },
    label: {
      lineHeight: "dic.system.dimension.lineHeight.medium",
      fontFamily: "dic.reference.typography.fontFamily.primary",
      color: "dic.system.color.component.onSurface",
      textStyle: "dic.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.medium_expanded",
      },
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
    textGroup: {
      display: "flex",
      flexFlow: "column",
      width: 160,
    },
    helperText: {
      color: "dic.system.color.component.onSurfaceVariant",
      marginTop: "dic.system.dimension.spacing.twoExtraSmall",
      lineHeight: "dic.reference.typography.lineHeight.tight",
      textStyle: "dic.system.typography.body.extraSmall_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
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
  ({ label, helperText, ...props }, ref) => {
    const [cssProps, switchProps] = SwitchStyle.splitVariantProps(props);
    const styles = SwitchStyle(cssProps);
    const rootStyle: CSSProperties = helperText
      ? { alignItems: "flex-start" }
      : {};

    return (
      <ArkSwitch.Root
        ref={ref}
        className={cx("group", styles.root)}
        style={rootStyle}
        {...switchProps}
      >
        <div className={styles.textGroup}>
          <ArkSwitch.Label className={styles.label}>{label}</ArkSwitch.Label>
          {helperText && (
            <ArkSwitch.Label className={styles.helperText}>
              {helperText}
            </ArkSwitch.Label>
          )}
        </div>
        <ArkSwitch.Control className={styles.control}>
          <ArkSwitch.Thumb className={styles.thumb} />
        </ArkSwitch.Control>
      </ArkSwitch.Root>
    );
  }
);
