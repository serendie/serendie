import { ChoiceBox, ChoiceBoxProps } from "../../ChoiceBox";
import { DataTable } from "..";
import { css, cx } from "../../../../styled-system/css";

export const HeaderCheckbox: React.FC<Omit<ChoiceBoxProps, "type">> = ({
  ...props
}) => {
  return (
    <DataTable.HeaderCell>
      <ChoiceBox
        {...props}
        type="checkbox"
        className={cx(
          css({
            alignItems: "center",
            verticalAlign: "middle",
          }),
          props.className
        )}
      />
    </DataTable.HeaderCell>
  );
};
