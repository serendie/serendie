import { Checkbox as ArkCheckbox, CheckboxRootProps } from "@ark-ui/react";
import { RecipeVariantProps, sva } from "../../styled-system/css";
import { CSSProperties } from "react";

export const CheckboxStyle = sva({
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
      gap: "dic.system.dimension.spacing.medium",
      paddingY: "dic.system.dimension.spacing.small",
      paddingX: "dic.system.dimension.spacing.medium",
      cursor: "pointer",
    },
    itemControl: {
      flexShrink: 0,
    },
    checkedIcon: {
      width: "dic.reference.dimension.scale.8",
      height: "dic.reference.dimension.scale.8",
      color: "dic.system.color.impression.primary",
      "& .checkmark": {
        color: "dic.system.color.impression.onPrimaryContainer",
      },
      _disabled: {
        color:
          "color-mix(in srgb, {colors.dic.system.color.impression.primary}, {colors.dic.system.color.interaction.hoveredOnPrimary});",
        "& .checkmark": {
          color:
            "color-mix(in srgb, {colors.dic.system.color.interaction.disabled}, {colors.dic.system.color.impression.onPrimaryContainer});",
        },
      },
    },

    uncheckedIcon: {
      width: "dic.reference.dimension.scale.8",
      height: "dic.reference.dimension.scale.8",
      color: "dic.system.color.component.outlineVariant",
      _disabled: {
        color: "dic.system.color.interaction.disabledOnSurface",
      },
    },
    itemTextGroup: {
      display: "flex",
      flexFlow: "column",
    },
    itemText: {
      color: "dic.system.color.component.onSurface",
      lineHeight: "dic.reference.typography.lineHeight.normal",
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

type CheckboxItemProps = {
  label: string;
  helperText?: string;
};

export type CheckboxProps = CheckboxRootProps &
  RecipeVariantProps<typeof CheckboxStyle> &
  CheckboxItemProps;

export const Checkbox: React.FC<CheckboxProps> = ({
  value,
  label,
  helperText,
  ...props
}) => {
  const [cssProps, checkboxProps] = CheckboxStyle.splitVariantProps(props);
  const styles = CheckboxStyle(cssProps);
  const rootStyle: CSSProperties = helperText
    ? { alignItems: "flex-start" }
    : {};

  return (
    <ArkCheckbox.Root
      key={value}
      value={value}
      className={styles.root}
      style={rootStyle}
      {...checkboxProps}
    >
      {(state) => (
        <>
          <ArkCheckbox.Control className={styles.itemControl} asChild>
            {state.isChecked ? (
              <CheckboxCheckedIcon className={styles.checkedIcon} />
            ) : (
              <CheckboxUncheckedIcon className={styles.uncheckedIcon} />
            )}
          </ArkCheckbox.Control>
          <div className={styles.itemTextGroup}>
            <ArkCheckbox.Label className={styles.itemText}>
              {label}
            </ArkCheckbox.Label>
            {helperText && (
              <ArkCheckbox.Label className={styles.helperText}>
                {helperText}
              </ArkCheckbox.Label>
            )}
          </div>
        </>
      )}
    </ArkCheckbox.Root>
  );
};

// TODO: アイコンコンポーネントは後で別ファイルに切り出す
interface IconProps extends React.SVGProps<SVGSVGElement> {}

const CheckboxCheckedIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25H18C19.5188 3.25 20.75 4.48122 20.75 6V18C20.75 19.5188 19.5188 20.75 18 20.75H6C4.48122 20.75 3.25 19.5188 3.25 18V6Z"
      fill="currentColor"
    />
    <path
      d="M16.5294 9.52941L10.9991 15.0597L7.46875 11.5294L8.52941 10.4688L10.9991 12.9384L15.4688 8.46875L16.5294 9.52941Z"
      fill="currentColor"
      className="checkmark"
    />
  </svg>
);

const CheckboxUncheckedIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.25 6C3.25 4.48122 4.48122 3.25 6 3.25H18C19.5188 3.25 20.75 4.48122 20.75 6V18C20.75 19.5188 19.5188 20.75 18 20.75H6C4.48122 20.75 3.25 19.5188 3.25 18V6ZM6 4.75C5.30964 4.75 4.75 5.30964 4.75 6V18C4.75 18.6904 5.30964 19.25 6 19.25H18C18.6904 19.25 19.25 18.6904 19.25 18V6C19.25 5.30964 18.6904 4.75 18 4.75H6Z"
      fill="currentColor"
    />
  </svg>
);
