import {
  RadioGroup,
  RadioGroupItemControlProps,
  RadioGroupItemProps,
  RadioGroupItemTextProps,
} from "@ark-ui/react";
import { RecipeVariantProps, sva } from "../../styled-system/css";
import { CSSProperties } from "react";

export const RadioButtonStyle = sva({
  slots: [
    "item",
    "itemControl",
    "checkedIcon",
    "itemTextGroup",
    "itemText",
    "helperText",
  ],
  base: {
    item: {
      display: "flex",
      alignItems: "center",
      gap: "dic.system.dimension.spacing.medium",
      paddingY: "dic.system.dimension.spacing.small",
      paddingX: "dic.system.dimension.spacing.medium",
      cursor: "pointer",
    },
    itemControl: {
      flexShrink: 0,
      _disabled: {
        opacity: 0.6,
      },
    },
    checkedIcon: {
      width: "dic.reference.dimension.scale.8",
      height: "dic.reference.dimension.scale.8",
      color: "dic.system.color.component.outline",
      // ark-ui の checked のプロパティの取得方法が不明なため、暫定対応でスタイルで調整
      "& .checkedCircle": {
        opacity: 0,
      },
      _checked: {
        color: "dic.system.color.impression.primary",
        "& .checkedCircle": {
          opacity: 1,
        },
      },
    },
    itemTextGroup: {
      display: "flex",
      flexFlow: "column",
    },
    itemText: {
      fontFamily: "dic.reference.typography.fontFamily.primary",
      color: "dic.system.color.component.onSurface",
      lineHeight: "dic.reference.typography.lineHeight.tight",
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
    helperText: {
      fontFamily: "dic.reference.typography.fontFamily.primary",
      color: "dic.system.color.component.onSurfaceVariant",
      marginTop: "dic.system.dimension.spacing.twoExtraSmall",
      lineHeight: "dic.reference.typography.lineHeight.tight",
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
  },
  defaultVariants: {
    variant: "expanded",
  },
  // TODO: fontSize で system.typography.body を参照できないため後で差し替える
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
      <RadioGroup.ItemControl className={styles.itemControl} asChild>
        <CheckedIcon className={styles.checkedIcon} />
      </RadioGroup.ItemControl>
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

// TODO: アイコンコンポーネントは後で別ファイルに切り出す
interface IconProps extends React.SVGProps<SVGSVGElement> {}

const CheckedIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75ZM3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12Z"
      fill="currentColor"
    />
    <path
      d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
      fill="currentColor"
      className="checkedCircle"
    />
  </svg>
);
