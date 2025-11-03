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
  EyeIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  BookOpenIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { ConfirmModal } from "components/shared/ConfirmModal";
import { Button } from "components/ui";
//import axios from "axios";
//import { toast } from "sonner";
import { useNavigate} from "react-router";

const confirmMessages = {
  pending: {
    description:
      "Are you sure you want to delete this order? Once deleted, it cannot be restored.",
  },
  success: {
    title: "Order Deleted",
  },
};

export function RowActions({ row, table }) {
  const navigate = useNavigate();
  //const location = useLocation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError] = useState(false);

  const permissions =
    localStorage.getItem("userPermissions")?.split(",").map(Number) || [];

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const openModal = () => {
    setDeleteModalOpen(true);
    //setDeleteError(false);
    setDeleteSuccess(false);
  };

  const handleDeleteRows = useCallback(() => {
    setConfirmDeleteLoading(true);
    setTimeout(() => {
      table.options.meta?.deleteRow(row);
      setDeleteSuccess(true);
      setConfirmDeleteLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  const state = deleteError ? "error" : deleteSuccess ? "success" : "pending";

  const actions = [
    // View Equipment History
    {
      label: "View Equipment History",
      icon: EyeIcon,
      permission: 401, // Add appropriate permission number
      onClick: () =>
        navigate(
          `/dashboards/material-list/reporting/view-equipment-history`
        ),
    },
    
    // Conditionally include "Edit" based on status
    ...(row.original.status === -1
      ? [
          {
            label: "Edit",
            icon: PencilIcon,
            permission: 98,
            onClick: () =>
              navigate(
                `/dashboards/material-list/reporting/Edit`
              ),
          },
        ]
      : []),

       {
      label: "Edit",
      icon: PencilIcon,
      permission: 402, // Add appropriate permission number
      onClick: () =>
        navigate(
                  `/dashboards/material-list/reporting/Edit/`   
     ),
    },
    // Maintenance Equipment History
    {
      label: "Maintenance Equipment History",
      icon: WrenchScrewdriverIcon,
      permission: 402, // Add appropriate permission number
      onClick: () =>
        navigate(
                  "/dashboards/material-list/reporting/maintenance-equipment-history"  
        ),
    },

    // View Checklist
    {
      label: "View Checklist",
      icon: ClipboardDocumentListIcon,
      permission: 403, // Add appropriate permission number
      onClick: () =>
        navigate(
                  `/dashboards/material-list/reporting/view-checklist`   
        ),
    },

    // View Verification List
    {
      label: "View Verification List",
      icon: ShieldCheckIcon,
      permission: 404, // Add appropriate permission number
      onClick: () =>
        navigate(
          `/dashboards/material-list/reporting/view-verification-list`
        ),
    },

    // Dump
    {
      label: "Dump",
      icon: DocumentTextIcon,
      permission: 405, // Add appropriate permission number
      onClick: () =>
        navigate(
          `/dashboards/material-list/reporting/dump`
        ),
    },

    // Log Book
    {
      label: "Log Book",
      icon: BookOpenIcon,
      permission: 406, // Add appropriate permission number
      onClick: () =>
        navigate(
          `/dashboards/material-list/reporting/log-book`
        ),
    },


    // Delete - This will be at the bottom with different styling
    {
      label: "Delete",
      icon: TrashIcon,
      permission: 408, // Add appropriate permission number
      onClick: openModal,
      isDelete: true, // Special flag for delete styling
    },
  ];

  // Filter actions based on permission (if defined)
  const filteredActions = actions.filter(
    (action) =>
      !action.permission || permissions.includes(action.permission)
  );

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
              {filteredActions.map((action) => (
                <MenuItem key={action.label}>
                  {({ focus }) => {
                    const IconComponent = action.icon || PencilIcon;
                    return (
                      <button
                        onClick={action.onClick}
                        className={clsx(
                          "flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-none transition-colors",
                          focus
                            ? "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100"
                            : "",
                          action.isDelete 
                            ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20" 
                            : ""
                        )}
                      >
                        <IconComponent className="size-4.5 stroke-1" />
                        <span>{action.label}</span>
                      </button>
                    );
                  }}
                </MenuItem>
              ))}
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

