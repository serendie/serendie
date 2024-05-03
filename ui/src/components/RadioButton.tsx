import {
  RadioGroup,
  RadioGroupItemControlProps,
  RadioGroupItemProps,
  RadioGroupItemTextProps,
} from "@ark-ui/react";

import { RecipeVariantProps, sva } from "../../styled-system/css";
import { CSSProperties } from "react";

export const RadioButtonStyle = sva({
  slots: ["item", "itemControl", "itemTextGroup", "itemText", "helperText"],
  base: {
    item: {
      alignItems: "center",
      display: "flex",
      cursor: "pointer",
      gap: "dic.system.dimension.spacing.medium",
      paddingY: "dic.system.dimension.spacing.small",
      paddingX: "dic.system.dimension.spacing.medium",
    },
    itemControl: {
      borderColor: "dic.system.color.component.outline",
      borderRadius: "dic.system.dimension.radius.full",
      borderWidth: "1.5px",
      height: "17.5px",
      width: "17.5px",
      margin: "3.25px",
      flexShrink: 0,
      _checked: {
        background: "dic.system.color.impression.primary",
        outlineColor: "dic.system.color.component.inverseOnSurface",
        outlineStyle: "solid",
        outlineWidth: "1.25px",
        outlineOffset: "-2.5px",
        borderColor: "dic.system.color.impression.primary",
      },
      _disabled: {
        opacity: 0.6,
      },
    },
    itemTextGroup: {
      display: "flex",
      flexFlow: "column",
    },
    itemText: {
      fontFamily: "dic.reference.typography.fontFamily.primary",
      color: "dic.system.color.component.onSurface",
      lineHeight: 1,
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
    helperText: {
      fontFamily: "dic.reference.typography.fontFamily.primary",
      color: "dic.system.color.component.onSurfaceVariant",
      marginTop: "dic.system.dimension.spacing.twoExtraSmall",
      lineHeight: 1.4,
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      }
    },
  },
  defaultVariants: {
    variant: "expanded",
  },
  // TODO: system.typography.body を参照できないため後で差し替える
  variants: {
    variant: {
      expanded: {
        itemText: {
          fontSize: "dic.reference.typography.scale.expanded.small",
        },
        helperText: {
          fontSize: "dic.reference.typography.scale.expanded.twoExtraSmall",
        },
      },
      compact: {
        itemText: {
          fontSize: "dic.reference.typography.scale.compact.large",
        },
        helperText: {
          fontSize: "dic.reference.typography.scale.compact.small",
        },
      },
    },
  },
});

type RadioButtonItemProps = {
  label: string;
  helperText?: string;
  variant?: "expanded" | "compact";
};

export type RadioButtonProps = RadioGroupItemProps &
  RadioGroupItemControlProps &
  RadioGroupItemTextProps &
  RecipeVariantProps<typeof RadioButtonStyle> &
  RadioButtonItemProps;

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  helperText,
  ...props
}) => {
  const styles = RadioButtonStyle(props);
  const itemStyle: CSSProperties = helperText
    ? { alignItems: "flex-start" }
    : {};

  return (
    <RadioGroup.Item
      key={value}
      value={value}
      className={styles.item}
      style={itemStyle}
      {...props}
    >
      <RadioGroup.ItemControl className={styles.itemControl} />
      <div className={styles.itemTextGroup}>
        <RadioGroup.ItemText className={styles.itemText}>
          {label}
        </RadioGroup.ItemText>
        {helperText && (
          <RadioGroup.ItemText className={styles.helperText}>
            {helperText}
          </RadioGroup.ItemText>
        )}
      </div>
    </RadioGroup.Item>
  );
};
