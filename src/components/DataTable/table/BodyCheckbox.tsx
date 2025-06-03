import { ChoiceBox } from "../../ChoiceBox";
import { DataTable } from "..";

export const BodyCheckbox = ({
  checked,
  onChange,
  value,
  state = "enabled",
}: {
  checked: boolean;
  onChange: () => void;
  value: string;
  state?: "enabled" | "hovered" | "selected";
}) => (
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
