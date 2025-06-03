export { HeaderCheckbox } from "./HeaderCheckbox";
export { BodyCheckbox } from "./BodyCheckbox";

// Backwards compatibility - keep the original component
import { ChoiceBox } from "../../ChoiceBox";
import { DataTable } from "..";

export const CheckboxCell = ({
  checked,
  onChange,
  value,
  header,
  state = "enabled",
}: {
  checked: boolean;
  onChange: () => void;
  value: string;
  header?: boolean;
  state?: "enabled" | "hovered" | "selected";
}) =>
  header ? (
    <DataTable.HeaderCell>
      <ChoiceBox
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ borderRadius: 2, borderColor: "#C8C7C2" }}
      />
    </DataTable.HeaderCell>
  ) : (
    <DataTable.BodyCell state={state}>
      <ChoiceBox
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ borderRadius: 2, borderColor: "#C8C7C2" }}
      />
    </DataTable.BodyCell>
  );

// Export as TableCheckboxCell for backwards compatibility
export const TableCheckboxCell = CheckboxCell;
