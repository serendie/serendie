import { createColumnHelper } from "./createColumnHelper";
import {
  DataTableComponent,
  DataTableComponentProps,
} from "./DataTableComponent";
import {
  BodyCell,
  Root,
  Row,
  HeaderRow,
  Thead,
  Tr,
  HeaderCheckbox,
  BodyCheckbox,
  Tbody,
  HeaderCell,
} from "./table";

interface DataTableCompound {
  <TData = Record<string, unknown>>(
    props: DataTableComponentProps<TData>
  ): JSX.Element;
  BodyCell: typeof BodyCell;
  BodyCheckbox: typeof BodyCheckbox;
  Tbody: typeof Tbody;
  HeaderCell: typeof HeaderCell;
  HeaderCheckbox: typeof HeaderCheckbox;
  HeaderRow: typeof HeaderRow;
  Root: typeof Root;
  Row: typeof Row;
  Thead: typeof Thead;
  Tr: typeof Tr;
  createColumnHelper: typeof createColumnHelper;
}

const DataTable = DataTableComponent as DataTableCompound;
DataTable.BodyCell = BodyCell;
DataTable.BodyCheckbox = BodyCheckbox;
DataTable.Tbody = Tbody;
DataTable.HeaderCell = HeaderCell;
DataTable.HeaderCheckbox = HeaderCheckbox;
DataTable.HeaderRow = HeaderRow;
DataTable.Root = Root;
DataTable.Row = Row;
DataTable.Thead = Thead;
DataTable.Tr = Tr;
DataTable.createColumnHelper = createColumnHelper;

export { DataTable, DataTableComponent };
