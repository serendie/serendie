import { sva } from "../../../styled-system/css";

export const checkboxIconCss = {
  flexShrink: 0,
  cursor: "pointer",
  ".group:has(:focus-visible) &": {
    outlineStyle: "solid",
    outlineOffset: "-2px",
    outlineWidth: "1.5px",
    outlineColor: "sd.system.color.impression.primary",
    borderRadius: "sd.system.dimension.radius.small",
  },
  _disabled: {
    _checked: {
      "& svg": {
        color:
          "color-mix(in srgb, {colors.sd.system.color.impression.primary}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
      },
      "& .checkmark": {
        color:
          "color-mix(in srgb, {colors.sd.system.color.interaction.disabled}, {colors.sd.system.color.impression.onPrimaryContainer});",
      },
    },
  },
};

export const checkboxCheckedIconCss = {
  width: 24,
  height: 24,
  color: "sd.system.color.impression.primary",
  "& .checkmark": {
    color: "sd.system.color.impression.onPrimaryContainer",
  },
};

export const checkboxUncheckedIconCss = {
  width: 24,
  height: 24,
  color: "sd.system.color.component.outline",
  _disabled: {
    color:
      "color-mix(in srgb, {colors.sd.system.color.component.outline}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
  },
};

export const CheckBoxStyle = sva({
  slots: [
    "root",
    "itemControl",
    "checkedIcon",
    "uncheckedIcon",
    "itemTextGroup",
    "itemText",
    "helperText",
  ],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.small",
      paddingX: "sd.system.dimension.spacing.medium",
      cursor: "pointer",
    },
    itemControl: checkboxIconCss,
    checkedIcon: checkboxCheckedIconCss,
    uncheckedIcon: checkboxUncheckedIconCss,
    itemTextGroup: {
      display: "flex",
      flexFlow: "column",
    },
    itemText: {
      color: "sd.system.color.component.onSurface",
      textStyle: "sd.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
      _disabled: {
        color: "sd.system.color.interaction.disabledOnSurface",
      },
    },
    helperText: {
      color: "sd.system.color.component.onSurfaceVariant",
      marginTop: "sd.system.dimension.spacing.twoExtraSmall",
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
