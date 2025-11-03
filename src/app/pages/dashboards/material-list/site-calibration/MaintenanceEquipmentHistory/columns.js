import { createColumnHelper } from "@tanstack/react-table";
import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";
import { DateCell } from "./rows";

const columnHelper = createColumnHelper();

export const columns = [
  // ✅ Row selection
  columnHelper.display({
    id: "select",
    label: "Row Selection",
    header: SelectHeader,
    cell: SelectCell,
  }),

  // ✅ S No
  columnHelper.accessor((_row, index) => index + 1, {
    id: "s_no",
    header: "S No",
    cell: (info) => info.row.index + 1,
  }),

    columnHelper.accessor((row) => row.type_of_service, {
    id: "type_of_service",
    header: "Type Of Service",
    cell: (info) => info.getValue() || "-",
  }),

  // ✅ Type Of Service
  // columnHelper.accessor("type_of_service", {
  //   id: "type_of_service",
  //   header: "Type Of Service",
  //   cell: (info) => info.getValue() || "-",
  // }),

  // ✅ Name and address of service provider
  columnHelper.accessor("name_and_address_of_service_provider", {
    id: "name_and_address_of_service_provider",
    header: "Name and address of service provider",
    cell: (info) => info.getValue() || "-",
  }),

  // ✅ Certificate No
  columnHelper.accessor("certificate_no", {
    id: "certificate_no",
    header: "Certificate No",
    cell: (info) => info.getValue() || "-",
  }),

  // ✅ Start Date
  columnHelper.accessor("start_date", {
    id: "start_date",
    header: "Start Date",
    cell: DateCell,
  }),

  // ✅ End Date
  columnHelper.accessor("end_date", {
    id: "end_date",
    header: "End Date",
    cell: DateCell,
  }),

  // ✅ Action
  columnHelper.display({
    id: "actions",
    label: "Row Actions",
    header: "Action",
    cell: RowActions,
  }),
];

// import { createColumnHelper } from "@tanstack/react-table";
// import { DateCell } from "./rows"; // Aapki existing DateCell component use kar sakte hain

// const columnHelper = createColumnHelper();

// export const serviceColumns = [
//     // ✅ S No
//     columnHelper.accessor((_row, index) => index + 1, {
//         id: "s_no",
//         header: "S No",
//         cell: (info) => info.row.index + 1,
//     }),

//     // ✅ Type Of Service
//     columnHelper.accessor("type_of_service", {
//         id: "type_of_service",
//         header: "Type Of Service",
//         cell: (info) => info.getValue(),
//     }),

//     // ✅ Name and address of service provider
//     columnHelper.accessor("service_provider", {
//         id: "service_provider",
//         header: "Name and address of service provider",
//         cell: (info) => info.getValue(),
//     }),

//     // ✅ Certificate No
//     columnHelper.accessor("certificate_no", {
//         id: "certificate_no",
//         header: "Certificate No",
//         cell: (info) => info.getValue(),
//     }),

//     // ✅ Start Date
//     columnHelper.accessor((row) => Number(row.start_date), {
//         id: "start_date",
//         header: "Start Date",
//         cell: DateCell, // Aapki existing DateCell use karein
//     }),

//     // ✅ End Date
//     columnHelper.accessor((row) => Number(row.end_date), {
//         id: "end_date",
//         header: "End Date",
//         cell: DateCell, // Aapki existing DateCell use karein
//     }),
// ];