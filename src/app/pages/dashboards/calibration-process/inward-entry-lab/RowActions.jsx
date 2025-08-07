
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useCallback, useState } from "react";
import PropTypes from "prop-types";

import { ConfirmModal } from "components/shared/ConfirmModal";
import { Button } from "components/ui";

import axios from "utils/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// ----------------------------------------------------------------------

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

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const openModal = () => {
    setDeleteModalOpen(true);
    setDeleteError(false);
    setDeleteSuccess(false);
  };

  const handleDeleteRows = useCallback(async () => {
    const id = row.original.id;
    setConfirmDeleteLoading(true);

    try {
      await axios.delete(
        `/calibrationoperations/calibration-method-destroy/${id}`
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
  }, [row, table]);

  const state = deleteError ? "error" : deleteSuccess ? "success" : "pending";

  // ✅ Clean reusable actions list with custom paths
  const actions = [
    // {
    //   label: "Edit CRF Entry Detail",
    //   onClick: () =>
    //     navigate(
    //       `/dashboards/calibration-process/inward-entry-lab/edit/${row.original.id}`
    //     ),
    // },
       {
  label: "Edit CRF Entry Detail",
  onClick: () => {
    const caliblocation = row.original.caliblocation || "Lab";
    const calibacc = row.original.calibacc || "Nabl";

    navigate(
      `/dashboards/calibration-process/inward-entry-lab/edit-inward-entry/${row.original.id}?caliblocation=${caliblocation}&calibacc=${calibacc}`
    );
  },
},
  
     {
  label: "Review Inward",
  onClick: () => {
    const caliblocation = row.original.caliblocation || "Lab";
    const calibacc = row.original.calibacc || "Nabl";

    navigate(
      `/dashboards/calibration-process/inward-entry-lab/review-inward/${row.original.id}?caliblocation=${caliblocation}&calibacc=${calibacc}`
    );
  },
},
    // {
    //   label: "Edit Bd Person",
    //   onClick: () =>
    //     navigate(
    //       `/dashboards/calibration-process/inward-entry-lab/edit-bd-person/${row.original.id}`
    //     ),
    // },
  {
  label: "Edit Bd Person",
  onClick: () => {
    const caliblocation = row.original.caliblocation || "Lab";
    const calibacc = row.original.calibacc || "Nabl";

    navigate(
      `/dashboards/calibration-process/inward-entry-lab/edit-bd-person/${row.original.id}?caliblocation=${caliblocation}&calibacc=${calibacc}`
    );
  },
},

    {
      label: "SRF View",
      onClick: () =>
        navigate(
          `/dashboards/calibration-process/inward-entry-lab/srf-view/${row.original.id}`
        ),
    },
    {
      label: "CRF View",
      onClick: () =>{
         const caliblocation = row.original.caliblocation || "Lab";
         const calibacc = row.original.calibacc || "Nabl";
        navigate(
          `/dashboards/calibration-process/inward-entry-lab/crf-view/${row.original.id}?caliblocation=${caliblocation}&calibacc=${calibacc}`
        );
      },
    },
    {
      label: "Edit Work Order detail",
      onClick: () =>
        navigate(
          `/dashboards/calibration-process/inward-entry-lab/edit-work-order/${row.original.id}`
        ),
    },
    {
      label: "Edit Customer Responsible for payment",
      onClick: () =>
        navigate(
          `/dashboards/calibration-process/inward-entry-lab/edit-customer/${row.original.id}`
        ),
    },
    {
      label: "Edit Billing Detail",
      onClick: () =>
        navigate(
          `/dashboards/calibration-process/inward-entry-lab/edit-billing/${row.original.id}`
        ),
    },
    {
      label: "Fill Feedback form",
      onClick: () =>
        navigate(
          `/dashboards/calibration-process/inward-entry-lab/fill-feedback/${row.original.id}`
        ),
    },
  ];

  return (
    <>
      <div className="flex justify-center space-x-1.5">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton as={Button} isIcon className="size-8 rounded-full">
            <EllipsisHorizontalIcon className="size-4.5" />
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <MenuItems
              anchor={{ to: "bottom end", gap: 12 }}
              className="absolute z-50 w-56 rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 dark:border-dark-500 dark:bg-dark-750 dark:shadow-none"
            >
              {actions.map((action) => (
                <MenuItem key={action.label}>
                  {({ focus }) => (
                    <button
                      onClick={action.onClick}
                      className={clsx(
                        "flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-none transition-colors",
                        focus
                          ? "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100"
                          : ""
                      )}
                    >
                      <PencilIcon className="size-4.5 stroke-1" />
                      <span>{action.label}</span>
                    </button>
                  )}
                </MenuItem>
              ))}

              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={openModal}
                    className={clsx(
                      "flex h-9 w-full items-center space-x-3 px-3 tracking-wide text-red-600 transition-colors",
                      focus ? "bg-red-50" : ""
                    )}
                  >
                    <TrashIcon className="size-4.5 stroke-1" />
                    <span>Delete</span>
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
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
