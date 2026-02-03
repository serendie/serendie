import { sva } from "../../../styled-system/css";

export const datePickerStyles = sva({
  slots: [
    "positioner",
    "content",
    "view",
    "viewControl",
    "prevTrigger",
    "nextTrigger",
    "table",
    "tableHeader",
    "tableCell",
    "tableCellTrigger",
    "select",
    "selectWrapper",
    "selectIcon",
  ],
  base: {
    positioner: {
      position: "relative",
      zIndex: "sd.system.elevation.zIndex.dropdown",
    },
    content: {
      background: "sd.system.color.component.surfaceContainerBright",
      borderRadius: "sd.system.dimension.radius.medium",
      boxShadow: "sd.system.elevation.shadow.level1",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.small",
      p: "sd.system.dimension.spacing.small",
      width: "fit-content",
      zIndex: "sd.system.elevation.zIndex.dropdown",
      _open: {
        display: "flex",
        animation: "fadeIn 0.25s ease-out",
      },
      _closed: {
        display: "none",
        animation: "fadeOut 0.2s ease-out",
      },
    },
    view: {
      display: "flex",
      flexDirection: "column",
      gap: "sd.system.dimension.spacing.small",
      _hidden: {
        display: "none",
      },
    },
    viewControl: {
      display: "flex",
      gap: "sd.system.dimension.spacing.extraSmall",
      justifyContent: "space-between",
      alignItems: "center",
      h: "40px",
      px: "sd.system.dimension.spacing.twoExtraSmall",
    },
    select: {
      appearance: "none",
      paddingRight: "30px",
    },
    selectWrapper: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    selectIcon: {
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
    },
    prevTrigger: {
      alignItems: "center",
      cursor: "pointer",
      display: "inline-flex",
      justifyContent: "center",
      borderRadius: "sd.system.dimension.radius.medium",
      color: "sd.system.color.component.onSurface",
      _hover: {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
    },
    nextTrigger: {
      alignItems: "center",
      cursor: "pointer",
      display: "inline-flex",
      justifyContent: "center",
      borderRadius: "sd.system.dimension.radius.medium",
      color: "sd.system.color.component.onSurface",
      _hover: {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
    },
    table: {
      width: "full",
      borderCollapse: "separate",
      borderSpacing: "0",
    },
    tableHeader: {
      color: "sd.system.color.component.onSurfaceVariant",
      fontWeight: "normal",
      h: "40px",
      textStyle: "sd.system.typography.body.small_compact",
      textAlign: "center",
    },
    tableCell: {
      textAlign: "center",
      p: "0",
      position: "relative",
    },
    tableCellTrigger: {
      alignItems: "center",
      borderRadius: "sd.system.dimension.radius.full",
      cursor: "pointer",
      display: "inline-flex",
      fontVariantNumeric: "tabular-nums",
      justifyContent: "center",
      h: "40px",
      w: "40px",
      position: "relative",
      color: "sd.system.color.component.onSurface",
      border: "none",
      background: "transparent",
      textStyle: "sd.system.typography.body.small_compact",
      zIndex: "2",
      _hover: {
        _before: {
          bg: "sd.system.color.interaction.hoveredVariant",
        },
      },
      _before: {
        content: "''",
        position: "absolute",
        inset: "0",
        zIndex: "-1",
        borderRadius: "sd.system.dimension.radius.full",
      },
      _today: {
        _before: {
          borderWidth: "sd.system.dimension.border.medium",
          borderColor: "sd.system.color.component.outline",
          borderStyle: "solid",
        },
        "&[data-in-range]": {
          _before: {
            borderColor: "sd.reference.color.scale.white.1000",
          },
        },
      },
      "&[data-in-range]": {
        bg: "sd.system.color.interaction.selectedSurface",
        borderRadius: "0px",
      },
      "&[data-in-range]&[data-in-hover-range]": {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
      "&[data-hover-range-start]": {
        bg: "sd.system.color.interaction.hoveredVariant",
        borderTopLeftRadius: "sd.system.dimension.radius.full",
        borderBottomLeftRadius: "sd.system.dimension.radius.full",
        borderTopRightRadius: "0px",
        borderBottomRightRadius: "0px",
      },
      "&[data-hover-range-end]": {
        bg: "sd.system.color.interaction.hoveredVariant",
        borderTopRightRadius: "sd.system.dimension.radius.full",
        borderBottomRightRadius: "sd.system.dimension.radius.full",
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
      },
      "&[data-hover-range-start]&[data-hover-range-end]": {
        borderTopLeftRadius: "sd.system.dimension.radius.full",
        borderBottomLeftRadius: "sd.system.dimension.radius.full",
        borderTopRightRadius: "sd.system.dimension.radius.full",
        borderBottomRightRadius: "sd.system.dimension.radius.full",
      },
      "&[data-range-start]": {
        borderTopLeftRadius: "sd.system.dimension.radius.full",
        borderBottomLeftRadius: "sd.system.dimension.radius.full",
      },
      "&[data-range-end]": {
        borderTopRightRadius: "sd.system.dimension.radius.full",
        borderBottomRightRadius: "sd.system.dimension.radius.full",
      },
      _selected: {
        color: "sd.system.color.impression.onPrimaryContainer",
        _hover: {
          _before: {
            background: "sd.system.color.impression.primaryContainer",
          },
        },
        _before: {
          background: "sd.system.color.impression.primaryContainer",
        },
        zIndex: "100",
      },
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
        cursor: "not-allowed",
        _hover: {
          _before: {
            background: "transparent",
          },
        },
      },
      _unavailable: {
        color: "sd.system.color.interaction.disabledOnSurface",
        cursor: "not-allowed",
        textDecoration: "line-through",
        _hover: {
          _before: {
            background: "transparent",
          },
        },
      },
    },
  },
  defaultVariants: {},
});
