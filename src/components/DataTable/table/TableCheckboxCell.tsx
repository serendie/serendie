import { ChoiceBox } from "@serendie/ui";
import { TableCell } from "./TableCell";
import { TableHeaderCell } from "./TableHeaderCell";

export const TableCheckboxCell = ({
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
    <TableHeaderCell>
      <ChoiceBox
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ borderRadius: 2, borderColor: "#C8C7C2" }}
      />
    </TableHeaderCell>
  ) : (
    <TableCell state={state}>
      <ChoiceBox
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ borderRadius: 2, borderColor: "#C8C7C2" }}
      />
    </TableCell>
  );
