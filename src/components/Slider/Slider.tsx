import { Slider as ArkSlider, SliderRootProps } from "@ark-ui/react";
import { forwardRef } from "react";
import { RecipeVariantProps, cx, sva } from "../../../styled-system/css";

export const SliderStyle = sva({
  slots: [
    "root",
    "label",
    "control",
    "track",
    "range",
    "thumb",
    "valueText",
    "markerGroup",
    "marker",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.small",
      width: "100%",
    },
    label: {
      color: "sd.system.color.component.onSurface",
      textStyle: "sd.system.typography.body.medium_compact",
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
    control: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    track: {
      position: "relative",
      width: "100%",
      backgroundColor: "sd.reference.color.scale.gray.200",
      borderRadius: "sd.system.dimension.radius.full",
      cursor: "pointer",
      _disabled: {
        backgroundColor: "sd.system.color.interaction.disabled",
        cursor: "default",
      },
    },
    range: {
      position: "absolute",
      backgroundColor: "sd.system.color.impression.primary",
      borderRadius: "sd.system.dimension.radius.full",
      height: "100%",
      _disabled: {
        backgroundColor:
          "color-mix(in srgb, {colors.sd.system.color.impression.primary}, {colors.sd.system.color.interaction.hoveredOnPrimary})",
      },
    },
    thumb: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "sd.system.color.component.surface",
      borderRadius: "sd.system.dimension.radius.full",
      borderWidth: 1,
      borderColor: "sd.system.color.component.outline",
      cursor: "pointer",
      transitionDuration: ".2s",
      transitionProperty: "transform, borderColor",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      _focus: {
        borderColor: "sd.system.color.impression.primary",
        outline: "2px solid",
        outlineColor: "sd.system.color.impression.primary",
        outlineOffset: 2,
      },
      _disabled: {
        backgroundColor: "sd.system.color.component.surface",
        borderColor: "sd.system.color.component.outline",
        cursor: "default",
      },
    },
    valueText: {
      position: "absolute",
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "4px 8px",
      backgroundColor: "sd.reference.color.scale.gray.900",
      color: "sd.system.color.component.surface",
      borderRadius: "sd.system.dimension.radius.small",
      textStyle: "sd.system.typography.body.small_compact",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      opacity: 0,
      transitionDuration: ".2s",
      transitionProperty: "opacity",
      _hover: {
        opacity: 1,
      },
    },
    markerGroup: {
      position: "absolute",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    },
    marker: {
      position: "absolute",
      width: 4,
      height: 4,
      backgroundColor: "sd.reference.color.scale.gray.400",
      borderRadius: "sd.system.dimension.radius.full",
      transform: "translate(-50%, -50%)",
      top: "50%",
    },
  },
  variants: {
    size: {
      medium: {
        track: {
          height: 4,
        },
        thumb: {
          width: 16,
          height: 16,
        },
        marker: {
          display: "none",
        },
      },
      large: {
        track: {
          height: 8,
        },
        thumb: {
          width: 24,
          height: 24,
        },
        marker: {
          display: "block",
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type SliderItemProps = {
  label?: string;
  showValue?: boolean;
  showMarkers?: boolean;
  markerValues?: number[];
};

export type SliderProps = SliderRootProps &
  RecipeVariantProps<typeof SliderStyle> &
  SliderItemProps;

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      label,
      showValue = true,
      showMarkers = false,
      markerValues = [0, 25, 50, 75, 100],
      className,
      min = 0,
      max = 100,
      ...props
    },
    ref
  ) => {
    const [variantProps, elementProps] = SliderStyle.splitVariantProps(props);
    const styles = SliderStyle(variantProps);

    return (
      <ArkSlider.Root
        ref={ref}
        className={cx(styles.root, className)}
        min={min}
        max={max}
        {...elementProps}
      >
        {label && (
          <ArkSlider.Label className={styles.label}>{label}</ArkSlider.Label>
        )}
        <ArkSlider.Control className={styles.control}>
          <ArkSlider.Track className={styles.track}>
            <ArkSlider.Range className={styles.range} />
          </ArkSlider.Track>
          {showMarkers && (
            <ArkSlider.MarkerGroup className={styles.markerGroup}>
              {markerValues.map((value) => (
                <ArkSlider.Marker
                  key={value}
                  value={value}
                  className={styles.marker}
                />
              ))}
            </ArkSlider.MarkerGroup>
          )}
          <ArkSlider.Thumb index={0} className={styles.thumb}>
            {showValue && <ArkSlider.ValueText className={styles.valueText} />}
          </ArkSlider.Thumb>
        </ArkSlider.Control>
        <ArkSlider.HiddenInput index={0} />
      </ArkSlider.Root>
    );
  }
);
