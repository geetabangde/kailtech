// // Import Dependencies
// import { createColumnHelper } from "@tanstack/react-table";

// // Local Imports
// import { RowActions } from "./RowActions";
// import {
//   SelectCell,
//   SelectHeader,
// } from "components/shared/table/SelectCheckbox";

// const columnHelper = createColumnHelper();

// export const columns = [
//   columnHelper.display({
//     id: "select",
//     header: SelectHeader,
//     cell: SelectCell,
//   }),

//   // ✅ Serial Number


//   // ✅ Mode Name (from API)
//   columnHelper.accessor("name", {
//     id: "name",
//     header: "Mode Name",
//     cell: (info) => info.getValue(),
//   }),



//   // ✅ Actions
//   columnHelper.display({
//     id: "actions",
//     header: "Actions",
//     cell: RowActions,
//   }),
// ];




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
  // ✅ Select Checkbox
  columnHelper.display({
    id: "select",
    header: SelectHeader,
    cell: SelectCell,
  }),

  // ✅ ID
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
    cell: (info) => info.getValue(),
  }),

  // ✅ From
  columnHelper.accessor("from", {
    id: "from",
    header: "From",
    cell: (info) => info.getValue(),
  }),

  // ✅ To
  columnHelper.accessor("to", {
    id: "to",
    header: "To",
    cell: (info) => info.getValue(),
  }),

  // ✅ Mode Name


  // ✅ Actions
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: RowActions,
  }),
];