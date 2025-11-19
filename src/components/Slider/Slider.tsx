import { Slider as ArkSlider, SliderRootProps } from "@ark-ui/react";
import { forwardRef, useEffect, useState } from "react";
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
      backgroundColor: "sd.reference.color.scale.gray.200",
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
        backgroundColor:
          "color-mix(in srgb, {colors.sd.system.color.impression.secondary}, {colors.sd.system.color.interaction.hoveredOnPrimary})",
      },
    },
    thumb: {
      position: "absolute",
      top: "50% !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "sd.system.color.impression.primary",
      borderRadius: "sd.system.dimension.radius.full",
      borderWidth: 0,
      cursor: "pointer",
      outline: "none",
      zIndex: 2,
      transform: "translate(-50%, -50%) !important",
      transitionDuration: ".2s",
      transitionProperty: "transform, borderColor, backgroundColor, boxShadow",
      transitionTimingFunction: "cubic-bezier(.2, 0, 0, 1)",
      "&:hover:not([data-dragging='true']):not([data-grabbed='true'])": {
        boxShadow: "0 0 0 8px rgba(0, 0, 0, 0.08)",
      },
      "&:focus": {
        outline: "none",
      },
      "&:focus-visible": {
        outline: "none",
      },
      "&[data-dragging='true'], &[data-grabbed='true']": {
        backgroundColor: "sd.system.color.component.surface",
        borderWidth: 1,
        borderColor: "sd.system.color.impression.primary",
        boxShadow: "none",
        outline: "none",
      },
      _disabled: {
        backgroundColor: "sd.system.color.interaction.disabledOnSurface",
        cursor: "default",
      },
    },
    markerGroup: {
      position: "absolute",
      top: "0 !important",
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
      transform: "translate(-50%, -50%) !important",
      top: "50% !important",
    },
    markerInRange: {
      backgroundColor: "sd.system.color.impression.primary",
    },
    markerAfterRange: {
      backgroundColor: "sd.reference.color.scale.gray.400",
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
      startLabel,
      endLabel,
      showValue = true,
      showMarkers = false,
      markerValues,
      className,
      min = 0,
      max = 100,
      step,
      value: controlledValue,
      defaultValue,
      onValueChange: onValueChangeProp,
      onValueChangeEnd: onValueChangeEndProp,
      ...props
    },
    ref
  ) => {
    const [variantProps, elementProps] = SliderStyle.splitVariantProps(props);
    const styles = SliderStyle(variantProps);
    const [isDragging, setIsDragging] = useState(false);
    const [isGrabbed, setIsGrabbed] = useState(false);

    const snapPoints = showMarkers
      ? markerValues?.length
        ? Array.from(
            new Set([
              min,
              ...markerValues.filter((v) => v >= min && v <= max),
              max,
            ])
          ).sort((a, b) => a - b)
        : [
            min,
            ...Array.from(
              { length: 9 },
              (_, i) => min + ((max - min) * (i + 1)) / 10
            ),
            max,
          ]
      : [];

    const displayMarkers = snapPoints.filter((v) => v !== min && v !== max);

    const snapToNearestMarker = (value: number) => {
      if (!showMarkers || snapPoints.length === 0) {
        return value;
      }

      let nearest = snapPoints[0];
      let minDiff = Math.abs(value - nearest);

      for (const markerValue of snapPoints) {
        const diff = Math.abs(value - markerValue);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = markerValue;
        }
      }

      return nearest;
    };

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<number[]>(
      defaultValue || [min]
    );

    const currentValue = isControlled ? controlledValue : internalValue;

    const handleValueChange = (details: { value: number[] }) => {
      const snappedValue = snapToNearestMarker(details.value[0]);
      const snappedArray = [snappedValue];

      if (!isControlled && snappedValue !== internalValue[0]) {
        setInternalValue(snappedArray);
      }

      if (onValueChangeProp) {
        onValueChangeProp({ ...details, value: snappedArray });
      }
    };

    const handleValueChangeEnd = (details: { value: number[] }) => {
      setIsDragging(false);
      const snappedValue = snapToNearestMarker(details.value[0]);
      if (onValueChangeEndProp) {
        onValueChangeEndProp({ ...details, value: [snappedValue] });
      }
    };

    const handlePointerDown = () => {
      setIsGrabbed(true);
      setIsDragging(true);
    };

    useEffect(() => {
      const handlePointerUp = () => {
        setIsGrabbed(false);
      };

      const handlePointerCancel = () => {
        setIsGrabbed(false);
      };

      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerCancel);

      return () => {
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerCancel);
      };
    }, []);

    const effectiveStep = showMarkers ? (max - min) / 1000 : step;

    return (
      <ArkSlider.Root
        ref={ref}
        className={cx(styles.root, className)}
        min={min}
        max={max}
        step={effectiveStep}
        value={showMarkers ? currentValue : controlledValue}
        defaultValue={showMarkers ? undefined : defaultValue}
        onValueChange={handleValueChange}
        onValueChangeEnd={handleValueChangeEnd}
        {...elementProps}
      >
        {(startLabel || endLabel) && (
          <div className={styles.labels}>
            {startLabel && (
              <ArkSlider.Label className={styles.label}>
                {startLabel}
              </ArkSlider.Label>
            )}
            {endLabel && <div className={styles.labelEnd}>{endLabel}</div>}
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
                  data-grabbed={isGrabbed ? "true" : "false"}
                  onPointerDown={handlePointerDown}
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
