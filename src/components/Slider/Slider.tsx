import { Slider as ArkSlider, SliderRootProps } from "@ark-ui/react";
import { forwardRef } from "react";
import { RecipeVariantProps, cx, sva } from "../../../styled-system/css";
import { Tooltip } from "../Tooltip/Tooltip";

export const SliderStyle = sva({
  slots: [
    "root",
    "labels",
    "label",
    "labelEnd",
    "control",
    "track",
    "range",
    "thumb",
    "markerGroup",
    "marker",
    "markerInRange",
    "markerAfterRange",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.small",
      width: "100%",
    },
    labels: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    label: {
      color: "sd.system.color.component.onSurface",
      textStyle: "sd.system.typography.body.medium_compact",
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
    labelEnd: {
      color: "sd.system.color.component.onSurface",
      textStyle: "sd.system.typography.body.medium_compact",
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
    control: {
      position: "relative",
      width: "100%",
    },
    track: {
      position: "relative",
      width: "100%",
      backgroundColor: "sd.system.color.component.outlineBright",
      borderRadius: "sd.system.dimension.radius.full",
      cursor: "pointer",
      zIndex: 0,
      _disabled: {
        backgroundColor: "sd.system.color.interaction.disabled",
        cursor: "default",
      },
    },
    range: {
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "sd.system.color.impression.secondary",
      borderRadius: "sd.system.dimension.radius.full",
      height: "100%",
      zIndex: 1,
      _disabled: {
        backgroundColor: "sd.reference.color.scale.gray.400",
      },
    },
    thumb: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "sd.system.color.impression.primary",
      borderRadius: "sd.system.dimension.radius.full",
      borderWidth: 0,
      cursor: "pointer",
      outline: "none",
      zIndex: 2,
      "&:hover:not(:focus-visible):not([data-disabled]), &[data-dragging]:not([data-disabled])":
        {
          backgroundImage:
            "linear-gradient(0deg, {colors.sd.system.color.interaction.hovered} 0%, {colors.sd.system.color.interaction.hovered} 100%)",
        },
      "&:focus": {
        outline: "none",
      },
      "&:focus-visible": {
        backgroundColor: "sd.system.color.component.surface",
        borderWidth: 1,
        borderColor: "sd.system.color.impression.primary",
        boxShadow: "none",
        outline: "none",
      },
      _disabled: {
        backgroundColor: "sd.reference.color.scale.gray.400",
        cursor: "default",
      },
    },
    markerGroup: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 2,
    },
    marker: {
      position: "absolute",
      width: 2,
      height: 2,
      borderRadius: "sd.system.dimension.radius.full",
      transform: "translate(-50%, -50%)",
      top: "50%",
    },
    markerInRange: {
      backgroundColor: "sd.system.color.impression.primary",
      _disabled: {
        backgroundColor: "sd.reference.color.scale.gray.400",
      },
    },
    markerAfterRange: {
      backgroundColor: "sd.reference.color.scale.gray.400",
      _disabled: {
        backgroundColor: "sd.reference.color.scale.gray.400",
      },
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
          width: 2,
          height: 2,
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
          width: 4,
          height: 4,
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type SliderItemProps = {
  startLabel?: string;
  endLabel?: string;
  /** Custom marker positions for display only (does not affect snapping). Defaults to 10% increments. */
  markerValues?: number[];
  /** Whether to show markers on the track. Defaults to true. */
  showMarkers?: boolean;
  /** Step value for the slider. Defaults to 1. */
  step?: number;
};

export type SliderProps = SliderRootProps &
  RecipeVariantProps<typeof SliderStyle> &
  SliderItemProps;

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      startLabel,
      endLabel,
      markerValues,
      showMarkers = true,
      step = 1,
      className,
      min = 0,
      max = 100,
      ...props
    },
    ref
  ) => {
    const [variantProps, elementProps] = SliderStyle.splitVariantProps(props);
    const styles = SliderStyle(variantProps);

    const displayMarkers = markerValues?.length
      ? markerValues.filter((v) => v > min && v < max)
      : Array.from({ length: 9 }, (_, i) => min + ((max - min) * (i + 1)) / 10);

    return (
      <ArkSlider.Root
        ref={ref}
        className={cx(styles.root, className)}
        min={min}
        max={max}
        step={step}
        {...elementProps}
      >
        {(startLabel || endLabel) && (
          <div className={styles.labels}>
            {startLabel && (
              <ArkSlider.Label className={styles.label}>
                {startLabel}
              </ArkSlider.Label>
            )}
            {endLabel && <span className={styles.labelEnd}>{endLabel}</span>}
          </div>
        )}
        <ArkSlider.Control className={styles.control}>
          <ArkSlider.Track className={styles.track}>
            <ArkSlider.Range className={styles.range} />
            {showMarkers && (
              <ArkSlider.Context>
                {(api) => (
                  <ArkSlider.MarkerGroup className={styles.markerGroup}>
                    {displayMarkers.map((value) => {
                      const inRange = value <= api.value[0];
                      return (
                        <ArkSlider.Marker
                          key={value}
                          value={value}
                          className={cx(
                            styles.marker,
                            inRange
                              ? styles.markerInRange
                              : styles.markerAfterRange
                          )}
                        />
                      );
                    })}
                  </ArkSlider.MarkerGroup>
                )}
              </ArkSlider.Context>
            )}
          </ArkSlider.Track>
          <ArkSlider.Context>
            {(api) => (
              <Tooltip
                content={String(api.value[0])}
                placement="top"
                openDelay={0}
                closeDelay={0}
                disabled={elementProps.disabled || api.dragging}
              >
                <ArkSlider.Thumb index={0} className={styles.thumb}>
                  <ArkSlider.HiddenInput />
                </ArkSlider.Thumb>
              </Tooltip>
            )}
          </ArkSlider.Context>
        </ArkSlider.Control>
      </ArkSlider.Root>
    );
  }
);

Slider.displayName = "Slider";
