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
  BookOpenIcon,
  DocumentPlusIcon,
  ClockIcon,  
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { ConfirmModal } from "components/shared/ConfirmModal";
import { Button } from "components/ui";
import { useNavigate, useLocation } from "react-router";

const confirmMessages = {
  pending: {
    description:
      "Are you sure you want to delete this order? Once deleted, it cannot be restored.",
  },
  success: {
    title: "Order Deleted",
  },
};

// Upload Certificate Scan Component
function UploadCertificateScanModal({ isOpen, onClose }) {
  const handleFileChange = (event) => {
    console.log("File selected:", event.target.files[0]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 border border-gray-300">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Upload Certificate Scan
            </h3>
            <Button  
              className="h-8 space-x-1.5 rounded-md px-3 text-xs"
              color="primary"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 w-20">File</span>
              <div className="flex-1">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-lg flex justify-end space-x-3">
          <Button  
            className="h-8 space-x-1.5 rounded-md px-3 text-xs"
            color="primary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button  
            className="h-8 space-x-1.5 rounded-md px-3 text-xs"
            color="primary"
          >
            Upload Certificate
          </Button>
        </div>
      </div>
    </div>
  );
}

UploadCertificateScanModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export function RowActions({ row, table }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError] = useState(false);

  // ✅ Get fid from URL and cid from row
  const params = new URLSearchParams(location.search);
  const fid = params.get("fid");
  const cid = row.original.id; // Certificate ID

  const permissions =
    localStorage.getItem("userPermissions")?.split(",").map(Number) || [];

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const openModal = () => {
    setDeleteModalOpen(true);
    setDeleteSuccess(false);
  };

  const openUploadModal = () => {
    setUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
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
    // ✅ View ReviewForm - Pass fid and cid
    {
      label: "View ReviewForm",
      icon: EyeIcon,
      permission: 401,
      onClick: () =>
        navigate(
          `/dashboards/material-list/electro-technical/maintenance-equipment-history/view-review-form?fid=${fid}&cid=${cid}`
        ),
    },

    // Change File
    {
      label: "Change File",
      icon: DocumentIcon,
      permission: 402,
      onClick: openUploadModal,
    },

    // ✅ View Certificate - Pass fid and cid
    {
      label: "View Certificate",
      icon: DocumentIcon,
      permission: 403,
      onClick: () =>
        navigate(
          `/dashboards/material-list/electro-technical/maintenance-equipment-history/view-certificate?fid=${fid}&cid=${cid}`
        ),
    },

    // ✅ Validity Detail - Pass fid and cid
    {
      label: "Validity Detail",
      icon: ClockIcon,
      permission: 404,
      onClick: () =>
        navigate(
          `/dashboards/material-list/electro-technical/maintenance-equipment-history/validity-detail?fid=${fid}&cid=${cid}`
        ),
    },

    // ✅ Edit Validity - Pass fid and cid
    {
      label: "Edit Validity",
      icon: PencilIcon,
      permission: 405,
      onClick: () =>
        navigate(
          `/dashboards/material-list/electro-technical/maintenance-equipment-history/edit-validity?fid=${fid}&cid=${cid}`
        ),
    },

    // ✅ Add IMC - Pass fid and cid
    {
      label: "Add IMC",
      icon: DocumentPlusIcon,
      permission: 406,
      onClick: () =>
        navigate(
          `/dashboards/material-list/electro-technical/maintenance-equipment-history/add-imc?fid=${fid}&cid=${cid}`
        ),
    },

    // ✅ Clone Certificate Details - Pass fid and cid
    {
      label: "Clone Certificate Details",
      icon: BookOpenIcon,
      permission: 407,
      onClick: () =>
        navigate(
          `/dashboards/material-list/electro-technical/maintenance-equipment-history/clone-certificate-details?fid=${fid}&cid=${cid}`
        ),
    },

    // Delete
    {
      label: "Delete",
      icon: TrashIcon,
      permission: 408,
      onClick: openModal,
      isDelete: true,
    },
  ];

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

      {/* Upload Certificate Scan Modal */}
      <UploadCertificateScanModal 
        isOpen={uploadModalOpen} 
        onClose={closeUploadModal} 
      />

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
