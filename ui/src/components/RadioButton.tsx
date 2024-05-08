import { RadioGroup, RadioGroupItemProps } from "@ark-ui/react";
import { RecipeVariantProps, sva } from "../../styled-system/css";
import { CSSProperties } from "react";

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
      _focusVisible: {
        outlineStyle: "solid",
        outlineOffset: "-2px",
        outlineWidth: "1.5px",
        outlineColor: "dic.system.color.impression.primary",
        borderRadius: "dic.system.dimension.radius.full",
      },
    },
    checkedIcon: {
      color: "dic.system.color.impression.primary",
      _disabled: {
        "& .isDisabled": {
          color: "dic.system.color.interaction.hoveredOnPrimary",
        },
      },
    },
    unCheckedIcon: {
      color: "dic.system.color.component.outlineVariant",
      _disabled: {
        "& .isDisabled": {
          color: "dic.system.color.interaction.hoveredOnPrimary",
        },
      },
    },
    itemTextGroup: {
      display: "flex",
      flexFlow: "column",
    },
    itemText: {
      color: "dic.system.color.component.onSurface",
      lineHeight: "dic.reference.typography.lineHeight.tight",
      textStyle: "dic.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.medium_expanded",
      },
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
    helperText: {
      color: "dic.system.color.component.onSurfaceVariant",
      marginTop: "dic.system.dimension.spacing.twoExtraSmall",
      lineHeight: "dic.reference.typography.lineHeight.tight",
      textStyle: "dic.system.typography.body.extraSmall_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.extraSmall_expanded",
      },
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
  },
});

type RadioButtonItemProps = {
  label: string;
  helperText?: string;
};

export type RadioButtonProps = RadioGroupItemProps &
  RecipeVariantProps<typeof RadioButtonStyle> &
  RadioButtonItemProps;

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  helperText,
  ...props
}) => {
  const [cssProps, radioProps] = RadioButtonStyle.splitVariantProps(props);
  const styles = RadioButtonStyle(cssProps);
  const itemStyle: CSSProperties = helperText
    ? { alignItems: "flex-start" }
    : {};

  return (
    <RadioGroup.Item
      value={value}
      className={styles.item}
      style={itemStyle}
      {...radioProps}
    >
      {(state) => (
        <>
          <RadioGroup.ItemControl className={styles.itemControl} asChild>
            {state.isChecked ? (
              <CheckedIcon className={styles.checkedIcon} />
            ) : (
              <UnCheckedIcon className={styles.unCheckedIcon} />
            )}
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
        </>
      )}
    </RadioGroup.Item>
  );
};

// TODO: アイコンコンポーネントは後で別ファイルに切り出す
// Disabled のスタイルが2色をブレンドしているため2つのpathを重ねているが方針決めたら修正
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
      d="M12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75ZM3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12Z"
      fill="currentColor"
      className="isDisabled"
    />
    <path
      d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
      fill="currentColor"
    />
    <path
      d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
      fill="currentColor"
      className="isDisabled"
    />
  </svg>
);

const UnCheckedIcon: React.FC<IconProps> = (props) => (
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
      d="M12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75ZM3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12Z"
      fill="currentColor"
      className="isDisabled"
    />
  </svg>
);
