import { createColumnHelper } from "@tanstack/react-table";
import { RowActions } from "./RowActions";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";

const columnHelper = createColumnHelper();

// Main Validity Columns
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
  
  // ✅ Unit Type
  columnHelper.accessor("unit_type", {
    id: "unit_type",
    header: "Unit Type",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Mode
  columnHelper.accessor("mode", {
    id: "mode",
    header: "Mode",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Unit
  columnHelper.accessor("unit", {
    id: "unit",
    header: "Unit",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Instrument Range
  columnHelper.accessor("instrument_range", {
    id: "instrument_range",
    header: "Instrument Range",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Calibrated Range
  columnHelper.accessor("calibrated_range", {
    id: "calibrated_range",
    header: "Calibrated Range",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Least Count
  columnHelper.accessor("least_count", {
    id: "least_count",
    header: "Least Count",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Stability
  columnHelper.accessor("stability", {
    id: "stability",
    header: "Stability",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Uniformity
  columnHelper.accessor("uniformity", {
    id: "uniformity",
    header: "Uniformity",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Accuracy
  columnHelper.accessor("accuracy", {
    id: "accuracy",
    header: "Accuracy",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Action
  columnHelper.display({
    id: "actions",
    label: "Row Actions",
    header: "Action",
    cell: RowActions,
  }),
];

// uncertinity Columns
export const uncertinityColumns = [
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
  
  // ✅ Unit Type
  columnHelper.accessor("unit_type", {
    id: "unit_type",
    header: "Unit Type",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Mode
  columnHelper.accessor("mode", {
    id: "mode",
    header: "Mode",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Unit
  columnHelper.accessor("unit", {
    id: "unit",
    header: "Unit",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Point
  columnHelper.accessor("point", {
    id: "point",
    header: "Point",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ CMC
  columnHelper.accessor("cmc", {
    id: "cmc",
    header: "Cmc",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Drift
  columnHelper.accessor("drift", {
    id: "drift",
    header: "Drift",
    cell: (info) => info.getValue() || "-",
  }),
  
  // ✅ Action
  columnHelper.display({
    id: "actions",
    label: "Row Actions",
    header: "Action",
    cell: RowActions,
  }),
];