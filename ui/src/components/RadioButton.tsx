import {
  RadioGroup,
  RadioGroupItemControlProps,
  RadioGroupItemProps,
  RadioGroupItemTextProps,
} from "@ark-ui/react";

import { RecipeVariantProps, sva } from "../../styled-system/css";

export const RadioButtonStyle = sva({
  slots: ["item", "itemControl", "itemText"],
  base: {
    item: {
      alignItems: "center",
      display: "flex",
      cursor: "pointer",
      gap: "dic.system.dimension.spacing.small",
      paddingY: "dic.system.dimension.spacing.small",
      paddingX: "dic.system.dimension.spacing.medium",
    },
    itemControl: {
      borderColor: "dic.system.color.component.outline",
      borderRadius: "dic.system.dimension.radius.full",
      borderWidth: "dic.system.dimension.border.medium",
      height: "16px",
      width: "16px",
      margin: "4px",
      _checked: {
        background: "dic.system.color.impression.primary",
        outlineColor: "dic.system.color.component.inverseOnSurface",
        outlineStyle: "solid",
        outlineWidth: "2px",
        outlineOffset: "-3px",
        borderColor: "dic.system.color.impression.primary",
      },
      _disabled: {
        opacity: 0.6,
      },
    },
    itemText: {
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
  },
  defaultVariants: {
    variant: "expanded"
  },
  variants: {
    variant: {
      expanded: {
        itemText: {
          fontSize: "dic.reference.typography.scale.expanded.medium"
        }
      },
      compact: {
        itemText: {
          fontSize: "dic.reference.typography.scale.expanded.large"
        }
      }
    }
  }
});

type RadioButtonItemProps = {
  label: string;
  description?: string;
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
  description,
  ...props
}) => {
  const styles = RadioButtonStyle(props);

  return (
    <RadioGroup.Item
      key={value}
      value={value}
      className={styles.item}
      {...props}
    >
      <RadioGroup.ItemControl className={styles.itemControl} />
      <RadioGroup.ItemText className={styles.itemText}>
        {label}
      </RadioGroup.ItemText>
      {description && description}
    </RadioGroup.Item>
  );
};
