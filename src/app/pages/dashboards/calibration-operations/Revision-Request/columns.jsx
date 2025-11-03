// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import {
  SelectCell,
  SelectHeader,
} from "components/shared/table/SelectCheckbox";

const columnHelper = createColumnHelper();

// ✅ Expandable ID Cell with + / – toggle
const ExpandableCell = ({ row, getValue }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Row ID with toggle icon */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button
          className={`w-6 h-6 rounded-full text-white font-bold flex items-center justify-center ${
            isExpanded ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isExpanded ? "−" : "+"}
        </button>
        <span className="text-gray-800 font-medium">{getValue()}</span>
      </div>

      {/* Expanded section */}
      {isExpanded && (
        <div className="mt-2 ml-8 border-l-2 border-gray-200 pl-3 text-sm text-gray-700 space-y-1">
          <p>
            <strong>Requested By:</strong> {row.original.requestedBy || "—"}
          </p>
          <p>
            <strong>Approved On:</strong> {row.original.approvedOn || "—"}
          </p>
          <p>
            <strong>Approved By:</strong> {row.original.approvedBy || "—"}
          </p>
        </div>
      )}
    </div>
  );
};

export const columns = [
  // ✅ Checkbox Selection
  columnHelper.display({
    id: "select",
    header: SelectHeader,
    cell: SelectCell,
  }),

  // ✅ ID (Expandable)
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => (
      <ExpandableCell row={info.row} getValue={info.getValue} />
    ),
  }),

  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("idNo", {
    header: "id no",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("serialNo", {
    header: "Serial no",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("customerName", {
    header: "Customer Name",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("inwardEntryNo", {
    header: "Inward Entry No",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("certificateNo", {
    header: "Certificate no",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("actions", {
    header: "Actions",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("revNo", {
    header: "Rev no",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("reason", {
    header: "Reason",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("remark", {
    header: "Remark",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("requestedOn", {
    header: "Requested On",
    cell: (info) => info.getValue(),
  }),
];
