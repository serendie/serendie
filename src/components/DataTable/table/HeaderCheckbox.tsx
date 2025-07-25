import { ChoiceBox, ChoiceBoxProps } from "../../ChoiceBox";
import { DataTable } from "..";
import { css, cx } from "../../../../styled-system/css";

export const HeaderCheckbox: React.FC<Omit<ChoiceBoxProps, "type">> = ({
  className,
  ...props
}) => {
  return (
    <DataTable.HeaderCell
      className={cx(
        css({
          width: "sd.system.dimension.spacing.twoExtraLarge",
        })
      )}
    >
      <ChoiceBox
        {...props}
        type="checkbox"
        className={cx(
          css({
            alignItems: "center",
            verticalAlign: "middle",
          }),
          className
        )}
      />
    </DataTable.HeaderCell>
  );
};
