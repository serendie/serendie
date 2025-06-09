import { ChoiceBox, ChoiceBoxProps } from "../../ChoiceBox";
import { DataTable } from "..";
import { css } from "../../../../styled-system/css";

export const HeaderCheckbox: React.FC<Omit<ChoiceBoxProps, "type">> = ({
  checked,
  onChange,
  value,
  ...props
}) => {
  return (
    <DataTable.HeaderCell>
      <ChoiceBox
        {...props}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className={css({
          alignItems: "center",
          verticalAlign: "middle",
        })}
      />
    </DataTable.HeaderCell>
  );
};
