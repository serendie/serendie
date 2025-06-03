import { DataTableGrid } from "./DataTableGrid";
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
import { ColumnDef } from "@tanstack/react-table";

interface DataTableCompound
  extends React.FC<{
    data: unknown[];
    columns: ColumnDef<unknown, unknown>[];
  }> {
  Root: typeof Root;
  Thead: typeof Thead;
  Tr: typeof Tr;
  Row: typeof Row;
  BodyCell: typeof BodyCell;
  HeaderCell: typeof HeaderCell;
  HeaderCheckbox: typeof HeaderCheckbox;
  BodyCheckbox: typeof BodyCheckbox;
  Tbody: typeof Tbody;
}

const DataTable = DataTableGrid as DataTableCompound;
DataTable.Root = Root;
DataTable.Thead = Thead;
DataTable.Tr = Tr;
DataTable.Row = Row;
DataTable.BodyCell = BodyCell;
DataTable.HeaderCell = HeaderCell;
DataTable.HeaderCheckbox = HeaderCheckbox;
DataTable.BodyCheckbox = BodyCheckbox;
DataTable.Tbody = Tbody;

export { DataTable, DataTableGrid };
