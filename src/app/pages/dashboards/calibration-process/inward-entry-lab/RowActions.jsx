import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { ConfirmModal } from "components/shared/ConfirmModal";
import { Button } from "components/ui";
import axios from "utils/axios";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router";

const confirmMessages = {
  pending: {
    description:
      "Are you sure you want to delete this Inward Entry? Once deleted, it cannot be restored.",
  },
  success: {
    title: "Inward Entry operation deleted",
  },
};
export function RowActions({ row, table }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  // Convert localStorage string to array of numbers
  const permissions =
    localStorage.getItem("userPermissions")?.split(",").map(Number) || [];

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteRows = useCallback(async () => {
    const id = row.original.id;
    const params = new URLSearchParams(location.search);
    const caliblocation =
      params.get("caliblocation") || row.original.caliblocation || "Lab";
    const calibacc =
      params.get("calibacc") || row.original.calibacc || "Nabl";

    setConfirmDeleteLoading(true);

    try {
      await axios.delete(
        `/calibrationoperations/calibration-method-destroy/${id}?caliblocation=${encodeURIComponent(
          caliblocation
        )}&calibacc=${encodeURIComponent(calibacc)}`
      );
      table.options.meta?.deleteRow(row);
      setDeleteSuccess(true);
      toast.success("Calibration operation deleted ✅", {
        duration: 1000,
        icon: "🗑️",
      });
    } catch (error) {
      console.error("Delete failed:", error);
      setDeleteError(true);
      toast.error("Failed to delete calibration operation ❌", {
        duration: 2000,
      });
    } finally {
      setConfirmDeleteLoading(false);
    }
  }, [row, table, location.search]);

  const state = deleteError ? "error" : deleteSuccess ? "success" : "pending";

  const getNavigationUrl = (path) => {
    const params = new URLSearchParams(location.search);
    const caliblocation =
      params.get("caliblocation") || row.original.caliblocation || "Lab";
    const calibacc =
      params.get("calibacc") || row.original.calibacc || "Nabl";
    return `${path}?caliblocation=${encodeURIComponent(
      caliblocation
    )}&calibacc=${encodeURIComponent(calibacc)}`;
  };

  // Actions list with permission property - ALL UNIFORM COLOR
  const actions = [
    ...(row.original.status === -1
      ? [
        {
          label: "Add Inward Item",
          permission: 98,
          onClick: () =>
            navigate(
              getNavigationUrl(
                `/dashboards/calibration-process/inward-entry-lab/add-inward-item/${row.original.id}`
              )
            ),
        },
      ]
      : []),
    {
      label: "Edit CRF Entry Detail",
      onClick: () =>
        navigate(
          getNavigationUrl(
            `/dashboards/calibration-process/inward-entry-lab/edit-inward-entry/${row.original.id}`
          )
        ),
    },
    ...(row.original.status === 0
      ? [
        {
          label: "Review Inward",
          permission: 99,
          onClick: () =>
            navigate(
              getNavigationUrl(
                `/dashboards/calibration-process/inward-entry-lab/review-inward/${row.original.id}`
              )
            ),
        },
      ]
      : []),
    ...(row.original.status === 1
      ? [
        {
          label: "Technical Acceptance",
          permission: 100,
          onClick: () =>
            navigate(
              getNavigationUrl(
                `/dashboards/calibration-process/inward-entry-lab/technical-acceptance/${row.original.id}`
              )
            ),
        },
      ]
      : []),
    ...(row.original.status === 4
      ? [
        {
          label: "Perform Calibration",
          permission: 97,
          onClick: () =>
            navigate(
              getNavigationUrl(
                `/dashboards/calibration-process/inward-entry-lab/perform-calibration/${row.original.id}`
              )
            ),
        },
      ]
      : []),
    {
      label: "Edit Bd Person",
      permission: 406,
      onClick: () =>
        navigate(
          getNavigationUrl(
            `/dashboards/calibration-process/inward-entry-lab/edit-bd-person/${row.original.id}`
          )
        ),
    },
    ...(row.original.status === 2
      ? [
        {
          label: "Transfer In lab",
          onClick: () =>
            navigate(
              getNavigationUrl(
                `/dashboards/calibration-process/inward-entry-lab/sample-transfer-in-lab/${row.original.id}`
              )
            ),
        },
      ]
      : []),
    {
      label: "SRF View",
      permission: 372,
      onClick: () =>
        navigate(
          getNavigationUrl(
            `/dashboards/calibration-process/inward-entry-lab/srf-view/${row.original.id}`
          )
        ),
    },
    {
      label: "CRF View",
      permission: 373,
      onClick: () =>
        navigate(
          getNavigationUrl(
            `/dashboards/calibration-process/inward-entry-lab/crf-view/${row.original.id}`
          )
        ),
    },
    {
      label: "Edit Work Order detail",
      onClick: () =>
        navigate(
          getNavigationUrl(
            `/dashboards/calibration-process/inward-entry-lab/edit-work-order/${row.original.id}`
          )
        ),
    },
    {
      label: "Edit Customer Responsible for payment",
      permission: 297,
      onClick: () =>
        navigate(
          getNavigationUrl(
            `/dashboards/calibration-process/inward-entry-lab/edit-customer/${row.original.id}`
          )
        ),
    },
    {
      label: "Edit Billing Detail",
      permission: 407,
      onClick: () =>
        navigate(
          getNavigationUrl(
            `/dashboards/calibration-process/inward-entry-lab/edit-billing/${row.original.id}`
          )
        ),
    },
    {
      label: "Fill Feedback form",
      onClick: () =>
        navigate(
          getNavigationUrl(
            `/dashboards/calibration-process/inward-entry-lab/edit-billing/${row.original.id}`
          )
        ),
    },
  ];

  // Filter actions based on permission (if defined)
  const filteredActions = actions.filter(
    (action) =>
      !action.permission || permissions.includes(action.permission)
  );

  return (
    <>
      <div className="flex flex-wrap justify-left gap-1.5">
        {filteredActions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            className="h-7 rounded bg-blue-500 px-2.5 py-1 text-xs font-medium text-black outline-none transition-all hover:bg-blue-600 hover:shadow-md"
          >
            <span>{action.label}</span>
          </Button>
        ))}
      </div>

      <ConfirmModal
        show={deleteModalOpen}
        onClose={closeModal}
        messages={confirmMessages}
        onOk={handleDeleteRows}
        confirmLoading={confirmDeleteLoading}
        state={state}
      />
    </>
  );
}

RowActions.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
};