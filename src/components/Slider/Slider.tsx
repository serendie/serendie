import { Slider as ArkSlider, SliderRootProps } from "@ark-ui/react";
import { forwardRef, useState } from "react";
import { RecipeVariantProps, cx, sva } from "../../../styled-system/css";
import { Tooltip } from "../Tooltip/Tooltip";

export const SliderStyle = sva({
  slots: [
    "root",
    "label",
    "control",
    "track",
    "range",
    "thumb",
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
      backgroundColor: "sd.system.color.impression.primary",
      borderRadius: "sd.system.dimension.radius.full",
      borderWidth: 0,
      cursor: "pointer",
      transitionDuration: ".2s",
      transitionProperty: "transform, borderColor, backgroundColor, boxShadow",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      "&:hover:not([data-dragging='true'])": {
        boxShadow: "0 0 0 8px rgba(0, 0, 0, 0.08)",
      },
      "&[data-dragging='true']": {
        backgroundColor: "sd.system.color.component.surface",
        borderWidth: 2,
        borderColor: "sd.system.color.impression.primary",
      },
      _disabled: {
        backgroundColor: "sd.system.color.interaction.disabledOnSurface",
        cursor: "default",
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
      step,
      value: controlledValue,
      defaultValue,
      onValueChange: onValueChangeProp,
      onValueChangeStart: onValueChangeStartProp,
      onValueChangeEnd: onValueChangeEndProp,
      ...props
    },
    ref
  ) => {
    const [variantProps, elementProps] = SliderStyle.splitVariantProps(props);
    const styles = SliderStyle(variantProps);
    const [isDragging, setIsDragging] = useState(false);

    const sortedMarkerValues = showMarkers
      ? [...markerValues].sort((a, b) => a - b)
      : [];

    const snapToNearestMarker = (value: number) => {
      if (!showMarkers || sortedMarkerValues.length === 0) {
        return value;
      }

      let nearest = sortedMarkerValues[0];
      let minDiff = Math.abs(value - nearest);

      for (const markerValue of sortedMarkerValues) {
        const diff = Math.abs(value - markerValue);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = markerValue;
        }
      }

      return nearest;
    };

    const handleValueChange = (details: { value: number[] }) => {
      const snappedValue = snapToNearestMarker(details.value[0]);
      if (onValueChangeProp) {
        onValueChangeProp({ ...details, value: [snappedValue] });
      }
    };

    const handleValueChangeStart = (details: { value: number[] }) => {
      setIsDragging(true);
      if (onValueChangeStartProp) {
        onValueChangeStartProp(details);
      }
    };

    const handleValueChangeEnd = (details: { value: number[] }) => {
      setIsDragging(false);
      const snappedValue = snapToNearestMarker(details.value[0]);
      if (onValueChangeEndProp) {
        onValueChangeEndProp({ ...details, value: [snappedValue] });
      }
    };

    return (
      <ArkSlider.Root
        ref={ref}
        className={cx(styles.root, className)}
        min={min}
        max={max}
        step={step}
        value={controlledValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        onValueChangeStart={handleValueChangeStart}
        onValueChangeEnd={handleValueChangeEnd}
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
              {sortedMarkerValues.map((value) => (
                <ArkSlider.Marker
                  key={value}
                  value={value}
                  className={styles.marker}
                />
              ))}
            </ArkSlider.MarkerGroup>
          )}
          <ArkSlider.Context>
            {(api) => (
              <Tooltip
                content={showValue ? String(api.value[0]) : ""}
                placement="top"
                openDelay={0}
                closeDelay={0}
                disabled={!showValue || props.disabled}
              >
                <ArkSlider.Thumb
                  index={0}
                  className={styles.thumb}
                  data-dragging={isDragging ? "true" : "false"}
                >
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
