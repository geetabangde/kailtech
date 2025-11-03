// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.display({
    id: "select",
    header: SelectHeader,
    cell: SelectCell,
  }),


  columnHelper.accessor((_row, index) => index + 1, {
    id: "id",
    header: "ID",
    cell: (info) => info.row.index + 1,
  }),

    columnHelper.accessor("customerName", {
    id: "customerName",
    header: "Customer Name",
    cell: (info) => info.getValue(),
  }),


  columnHelper.accessor("dueDate", {
    id: "dueDate",
    header: "Due Date",
    cell: (info) => info.getValue(),
  }),

 

  // ✅ Actions
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: RowActions,
  }),
];
