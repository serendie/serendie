import { SlotRecipeConfig } from "../../styled-system/types";

/**
 * 共通フォームスタイルレシピ
 * TextField、DatePicker、Select、TextAreaなどのフォームコンポーネントで共通のスタイルを定義
 */
export const textFieldRecipe: SlotRecipeConfig = {
  className: "input",
  slots: [
    "root",
    "label",
    "labelRequired",
    "inputWrapper",
    "input",
    "icon",
    "leftContent",
    "rightContent",
    "messageField",
    "description",
    "invalidMessage",
  ],
  base: {
    root: {
      display: "inline-grid",
      // 後から指定したCSSからwidthが上書きできないため、@layer componentsを指定
      "@layer components": {
        width: "min(100%, 300px)",
      },
      gridTemplateColumns: "auto",
      rowGap: "sd.system.dimension.spacing.extraSmall",
      textStyle: {
        base: "sd.system.typography.body.medium_compact",
        expanded: "sd.system.typography.body.medium_expanded",
      },
    },
    label: {
      textStyle: {
        base: "sd.system.typography.label.medium_compact",
        expanded: "sd.system.typography.label.medium_expanded",
      },
      color: "sd.system.color.component.onSurface",
      fontWeight: "medium",
    },
    labelRequired: {
      pl: "sd.system.dimension.spacing.extraSmall",
      color: "sd.system.color.impression.negative",
    },
    inputWrapper: {
      height: 48,
      display: "grid",
      gridTemplateColumns: "auto 1fr auto auto",
      alignItems: "center",
      outlineStyle: "solid",
      outlineWidth: "sd.system.dimension.border.medium",
      outlineColor: "sd.system.color.component.outline",
      borderRadius: "sd.system.dimension.radius.medium",
      backgroundColor: "sd.system.color.component.surface",
      '&:has([data-focus="true"])': {
        outlineWidth: "sd.system.dimension.border.thick",
        outlineColor: "sd.system.color.impression.primary",
      },
      _focusWithin: {
        outlineWidth: "sd.system.dimension.border.thick",
        outlineColor: "sd.system.color.impression.primary",
      },
      _disabled: {
        backgroundColor: "sd.system.color.interaction.disabled",
        cursor: "not-allowed",
      },
      _invalid: {
        outlineColor: "sd.system.color.impression.negative",
      },
    },
    leftContent: {
      paddingLeft: "sd.system.dimension.spacing.medium",
    },
    rightContent: {
      paddingRight: "sd.system.dimension.spacing.medium",
    },
    input: {
      outline: "none",
      paddingTop: "sd.system.dimension.spacing.extraSmall",
      paddingRight: "sd.system.dimension.spacing.twoExtraSmall",
      paddingBottom: "sd.system.dimension.spacing.extraSmall",
      paddingLeft: "sd.system.dimension.spacing.medium",
    },
    icon: {
      display: "grid",
      placeItems: "center",
      w: "48px",
      h: "48px",
      expanded: {
        w: "44px",
        h: "44px",
      },
    },
    messageField: {
      textStyle: {
        base: "sd.system.typography.body.extraSmall_compact",
        expanded: "sd.system.typography.body.extraSmall_expanded",
      },
    },
    description: {
      color: "sd.system.color.component.onSurfaceVariant",
    },
    invalidMessage: {
      color: "sd.system.color.impression.negative",
    },
  },
  variants: {
    fullWidth: {
      true: {
        root: {
          width: "100%",
        },
      },
    },
  },
};
