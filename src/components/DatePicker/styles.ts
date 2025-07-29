import { sva } from "../../../styled-system/css";

export const datePickerStyles = sva({
  slots: [
    "positioner",
    "content",
    "view",
    "viewControl",
    "prevTrigger",
    "nextTrigger",
    "viewTrigger",
    "viewTriggerWrapper",
    "rangeText",
    "monthSelect",
    "table",
    "tableHead",
    "tableHeader",
    "tableBody",
    "tableRow",
    "tableCell",
    "tableCellTrigger",
  ],
  base: {
    positioner: {
      position: "relative",
      zIndex: "sd.system.elevation.zIndex.dropdown",
    },
    content: {
      background: "sd.system.color.component.surface",
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
    prevTrigger: {
      alignItems: "center",
      cursor: "pointer",
      display: "inline-flex",
      justifyContent: "center",
      borderRadius: "sd.system.dimension.radius.medium",
      h: "32px",
      minW: "32px",
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
      h: "32px",
      minW: "32px",
      color: "sd.system.color.component.onSurface",
      _hover: {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
    },
    viewTrigger: {
      alignItems: "center",
      cursor: "pointer",
      display: "inline-flex",
      justifyContent: "center",
      borderRadius: "sd.system.dimension.radius.small",
      h: "32px",
      fontWeight: "normal",
      px: "sd.system.dimension.spacing.extraSmall",
      gap: "sd.system.dimension.spacing.extraSmall",
      color: "sd.system.color.component.onSurface",
      background: "transparent",
      border: "none",
      _hover: {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
    },
    viewTriggerWrapper: {
      display: "flex",
      gap: "sd.system.dimension.spacing.extraSmall",
      alignItems: "center",
    },
    rangeText: {
      textStyle: "sd.system.typography.body.medium_compact",
    },
    monthSelect: {
      flex: "1",
      textStyle: "sd.system.typography.body.medium_compact",
      color: "sd.system.color.component.onSurface",
      textAlign: "center",
    },
    table: {
      width: "full",
      borderCollapse: "separate",
      borderSpacing: "0",
    },
    tableHead: {
      // tableHeadスタイルは必要に応じて追加
    },
    tableHeader: {
      color: "sd.system.color.component.onSurfaceVariant",
      fontWeight: "normal",
      h: "40px",
      textStyle: "sd.system.typography.body.small_compact",
      textAlign: "center",
    },
    tableBody: {
      // tableBodyスタイルは必要に応じて追加
    },
    tableRow: {
      // tableRowスタイルは必要に応じて追加
    },
    tableCell: {
      textAlign: "center",
      p: "0",
      position: "relative",
    },
    tableCellTrigger: {
      alignItems: "center",
      borderRadius: "9999px",
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
      _hover: {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
      _today: {
        borderWidth: "sd.system.dimension.border.medium",
        borderColor: "sd.system.color.component.outline",
        borderStyle: "solid",
      },
      _selected: {
        background: "sd.system.color.impression.primaryContainer",
        color: "sd.system.color.impression.onPrimaryContainer",
        _hover: {
          background: "sd.system.color.impression.primaryContainer",
        },
      },
      "&[data-in-range]": {
        background: "sd.system.color.interaction.selectedSurface",
        borderRadius: "0",
        _before: {
          content: "''",
          position: "absolute",
          inset: "0",
          bg: "sd.system.color.interaction.selectedSurface",
          zIndex: "-1",
        },
      },
      "&[data-range-start]": {
        borderTopLeftRadius: "9999px",
        borderBottomLeftRadius: "9999px",
        _before: {
          borderTopLeftRadius: "9999px",
          borderBottomLeftRadius: "9999px",
        },
      },
      "&[data-range-end]": {
        borderTopRightRadius: "9999px",
        borderBottomRightRadius: "9999px",
        _before: {
          borderTopRightRadius: "9999px",
          borderBottomRightRadius: "9999px",
        },
      },
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
        cursor: "not-allowed",
        _hover: {
          background: "transparent",
        },
      },
      _unavailable: {
        color: "sd.system.color.interaction.disabledOnSurface",
        cursor: "not-allowed",
        textDecoration: "line-through",
        _hover: {
          background: "transparent",
        },
      },
    },
  },
  defaultVariants: {},
});
