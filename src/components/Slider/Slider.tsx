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
        backgroundColor: "sd.reference.color.scale.gray.400",
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
  markerValues?: number[];
  showMarkers?: boolean;
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
      step,
      className,
      min = 0,
      max = 100,
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

    const snapPoints = markerValues?.length
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
        ];

    const displayMarkers = snapPoints.filter((v) => v !== min && v !== max);

    const snapToNearestMarker = (value: number) => {
      if (snapPoints.length === 0) {
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
      const newValue = showMarkers
        ? snapToNearestMarker(details.value[0])
        : details.value[0];
      const newArray = [newValue];

      if (!isControlled && newValue !== internalValue[0]) {
        setInternalValue(newArray);
      }

      if (onValueChangeProp) {
        onValueChangeProp({ ...details, value: newArray });
      }
    };

    const handleValueChangeEnd = (details: { value: number[] }) => {
      setIsDragging(false);
      const newValue = showMarkers
        ? snapToNearestMarker(details.value[0])
        : details.value[0];
      if (onValueChangeEndProp) {
        onValueChangeEndProp({ ...details, value: [newValue] });
      }
    };

    const handlePointerDown = () => {
      setIsGrabbed(true);
      setIsDragging(true);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (elementProps.disabled) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      if (showMarkers) {
        e.preventDefault();

        const curr = currentValue[0];
        let idx = 0;
        let minDiff = Math.abs(curr - snapPoints[0]);
        for (let i = 1; i < snapPoints.length; i++) {
          const d = Math.abs(curr - snapPoints[i]);
          if (d < minDiff) {
            minDiff = d;
            idx = i;
          }
        }

        if (e.key === "ArrowLeft") idx = Math.max(0, idx - 1);
        else idx = Math.min(snapPoints.length - 1, idx + 1);

        const next = snapPoints[idx];
        if (!isControlled) setInternalValue([next]);
        if (onValueChangeProp) {
          onValueChangeProp({ value: [next] });
        }
      }
    };

    useEffect(() => {
      const handlePointerUp = () => {
        setIsGrabbed(false);
        setIsDragging(false);
      };

      const handlePointerCancel = () => {
        setIsGrabbed(false);
        setIsDragging(false);
      };

      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerCancel);

      return () => {
        window.removeEventListener("pointerup", handlePointerUp);
        window.removeEventListener("pointercancel", handlePointerCancel);
      };
    }, []);

    const effectiveStep = showMarkers
      ? (max - min) / 1000 // markerあり: 細かいstep
      : (step ?? 1); // markerなし: ユーザー指定（デフォルト: 1）

    return (
      <ArkSlider.Root
        ref={ref}
        className={cx(styles.root, className)}
        min={min}
        max={max}
        step={effectiveStep}
        value={currentValue}
        defaultValue={undefined}
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
          <Tooltip
            content={String(currentValue[0])}
            placement="top"
            openDelay={250}
            closeDelay={150}
            disabled={Boolean(elementProps.disabled) || isDragging}
          >
            <ArkSlider.Thumb
              index={0}
              className={styles.thumb}
              data-dragging={isDragging ? "true" : "false"}
              data-grabbed={isGrabbed ? "true" : "false"}
              onPointerDown={handlePointerDown}
              onKeyDown={handleKeyDown}
            >
              <ArkSlider.HiddenInput />
            </ArkSlider.Thumb>
          </Tooltip>
        </ArkSlider.Control>
      </ArkSlider.Root>
    );
  }
);

Slider.displayName = "Slider";
