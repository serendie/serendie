import { ChoiceBox } from "../../ChoiceBox";
import { DataTable } from "..";

export const HeaderCheckbox = ({
  checked,
  onChange,
  value,
  indeterminate,
  ...props
}: {
  checked: boolean;
  onChange: (event: unknown) => void;
  value: string;
  indeterminate?: boolean;
}) => {
  return (
    <DataTable.HeaderCell>
      <ChoiceBox
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        indeterminate={indeterminate}
        {...props}
      />
    </DataTable.HeaderCell>
  );
};
