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

  // ✅ Serial Number
  columnHelper.accessor((_row, index) => index + 1, {
    id: "sr_no",
    header: "Sr No",
    cell: (info) => info.row.index + 1,
  }),

  // ✅ Name
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  // ✅ Document No./Procedure No
  columnHelper.accessor("documentNo", {
    id: "documentNo",
    header: "Document No./Procedure No",
    cell: (info) => info.getValue(),
  }),

  // ✅ Issue No
  columnHelper.accessor("issueNo", {
    id: "issueNo",
    header: "Issue No",
    cell: (info) => info.getValue(),
  }),

  // ✅ Rev No
  columnHelper.accessor("revNo", {
    id: "revNo",
    header: "Rev No",
    cell: (info) => info.getValue(),
  }),

  // ✅ Category
  columnHelper.accessor("category", {
    id: "category",
    header: "Category",
    cell: (info) => info.getValue(),
  }),

  // ✅ Header
  columnHelper.accessor("header", {
    id: "header",
    header: "Header",
    cell: (info) => info.getValue(),
  }),

  // ✅ Footer
  columnHelper.accessor("footer", {
    id: "footer",
    header: "Footer",
    cell: (info) => info.getValue(),
  }),

  // ✅ Added On
  columnHelper.accessor("addedOn", {
    id: "addedOn",
    header: "Added On",
    cell: (info) => info.getValue(),
  }),

  // ✅ Shared With
  columnHelper.accessor("sharedWith", {
    id: "sharedWith",
    header: "Shared With",
    cell: (info) => info.getValue(),
  }),

  // ✅ Actions
  columnHelper.display({
    id: "actions",
    header: "Action",
    cell: RowActions,
  }),
];