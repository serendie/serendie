import { sva } from "../../../styled-system/css";

export const radioIconCss = {
  flexShrink: 0,
  cursor: "pointer",
  ".group:has(:focus-visible) &": {
    backgroundColor: "sd.system.color.interaction.selectedSurface",
    borderRadius: "sd.system.dimension.radius.full",
  },
};

export const radioCheckedIconCss = {
  color: "sd.system.color.impression.primary",
  _disabled: {
    color:
      "color-mix(in srgb, {colors.sd.system.color.impression.primary}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
  },
};

export const radioUncheckedIconCss = {
  color: "sd.system.color.component.outlineVariant",
  _disabled: {
    color:
      "color-mix(in srgb, {colors.sd.system.color.component.outlineVariant}, {colors.sd.system.color.interaction.hoveredOnPrimary});",
  },
};

export const RadioButtonStyle = sva({
  slots: [
    "item",
    "itemControl",
    "checkedIcon",
    "unCheckedIcon",
    "itemTextGroup",
    "itemText",
    "helperText",
  ],
  base: {
    item: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.small",
      paddingX: "sd.system.dimension.spacing.medium",
      cursor: "pointer",
    },
    itemControl: radioIconCss,
    checkedIcon: radioCheckedIconCss,
    unCheckedIcon: radioUncheckedIconCss,
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
