import { ChoiceBox, ChoiceBoxProps } from "../../ChoiceBox";
import { DataTable } from "..";

export const BodyCheckbox = ({
  checked,
  onChange,
  value,
  state = "enabled",
  ...props
}: {
  state?: "enabled" | "hovered" | "selected";
} & Omit<ChoiceBoxProps, "type">) => (
  <DataTable.BodyCell state={state}>
    <ChoiceBox
      {...props}
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
    />
  </DataTable.BodyCell>
);
