import DataTableGrid from "./DataTableGrid";
import {
  BodyCell,
  Root,
  Row,
  Thead,
  Tr,
  HeaderCheckbox,
  BodyCheckbox,
  Tbody,
} from "./table";
import { HeaderCell } from "./table/HeaderCell";

// Create compound component pattern with DataTable.Root
const DataTable: typeof DataTableGrid & {
  Root: typeof Root;
  Thead: typeof Thead;
  Tr: typeof Tr;
  Row: typeof Row;
  BodyCell: typeof BodyCell;
  HeaderCell: typeof HeaderCell;
  HeaderCheckbox: typeof HeaderCheckbox;
  BodyCheckbox: typeof BodyCheckbox;
  Tbody: typeof Tbody;
} = Object.assign(DataTableGrid, {
  Root,
  Thead,
  Tr,
  Row,
  BodyCell,
  HeaderCell,
  HeaderCheckbox,
  BodyCheckbox,
  Tbody,
});

export { DataTable };
