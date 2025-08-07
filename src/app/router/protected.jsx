// Import Dependencies
import { Navigate } from "react-router";

// Local Imports
import { AppLayout } from "app/layouts/AppLayout";
import { DynamicLayout } from "app/layouts/DynamicLayout";
import AuthGuard from "middleware/AuthGuard";

// ----------------------------------------------------------------------

const protectedRoutes = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboards" />,
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/home" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/home")).default,
              }),
            },
            {
              path: "reports",
              lazy: async () => ({
                Component: (await import("app/pages/dashboards/Reports"))
                  .default,
              }),
            },
            {
              path: "material-list",
              children: [
                {
                  path: "electro-technical",
                  lazy: async () => ({
                    Component: (
                      await import(
                        "app/pages/dashboards/material-list/ElectroTechnical"
                      )
                    ).default,
                  }),
                },
                // {
                //   path: "site-calibration",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/SiteCalibration")).default,
                //   }),
                // },
                // {
                //   path: "calibration",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/Calibration")).default,
                //   }),
                // },
                // {
                //   path: "chemical",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/Chemical")).default,
                //   }),
                // },
                // {
                //   path: "building-material",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/BuildingMaterial")).default,
                //   }),
                // },
                // {
                //   path: "reporting",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/Reporting")).default,
                //   }),
                // },
                // {
                //   path: "calibration-mechanical",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/CalibrationMechanical")).default,
                //   }),
                // },
                // {
                //   path: "calibration-bio-medical",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/CalibrationBioMedical")).default,
                //   }),
                // },
                // {
                //   path: "quality-department",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/QualityDepartment")).default,
                //   }),
                // },
                // {
                //   path: "store-department",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/StoreDepartment")).default,
                //   }),
                // },
                // {
                //   path: "mechanical",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/material-list/Mechanical")).default,
                //   }),
                // },
              ],
            },
            {
              path: "master-data",
              children: [
                {
                  path: "unit-types",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/UnitTypes"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "create",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/UnitTypes/AddUnitType"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/UnitTypes/EditUnitType"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                {
                  path: "modes",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import("app/pages/dashboards/master-data/Modes")
                        ).default,
                      }),
                    },
                    {
                      path: "create",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Modes/AddModes"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Modes/EditModes"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                {
                  path: "tax-slabs",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/TaxSlabs"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "create",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/TaxSlabs/AddTaxSlab"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/TaxSlabs/EditTaxSlab"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                {
                  path: "verticals",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Verticals"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "create",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Verticals/AddVertical"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Verticals/EditVertical"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                // {
                //   path: "document-master",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/DocumentMaster")).default,
                //   }),
                // },
                {
                  path: "currencies",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Currencies"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "create",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Currencies/AddCurrency"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Currencies/EditCurrency"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                {
                  path: "units",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import("app/pages/dashboards/master-data/Units")
                        ).default,
                      }),
                    },
                    {
                      path: "create",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Units/AddUnit"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/Units/EditUnit"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                // {
                //   path: "statuary-detail",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/StatuaryDetail")).default,
                //   }),
                // },
                // {
                //   path: "units-conversion",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/UnitsConversion")).default,
                //   }),
                // },
                {
                  path: "manage-labs",
                  children: [
                    {
                      index: true,
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/ManageLabs"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "create",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/ManageLabs/AddLab"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/master-data/ManageLabs/EditLab"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                // {
                //   path: "activity-log",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/ViewActivityLog")).default,
                //   }),
                // },
                // {
                //   path: "master-calibration-return",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/MasterCalibrationReturn")).default,
                //   }),
                // },
                // {
                //   path: "general-checklists",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/master-data/GeneralChecklists")).default,
                //   }),
                // },
              ],
            },
            {
              path: "calibration-process",
              children: [
                {
                  path: "inward-entry-lab",
                  children: [
                    {
                      path: "", // List Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add", // Add Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/AddInwardEntryLab"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit-inward-entry/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/EditInwardEntryLab"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit-bd-person/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/EditBdPerson"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "crf-view/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/CrfView"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "srf-view/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/SrfView"
                          )
                        ).default,
                      }),
                    },

                    {
                      path: "edit-billing/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/EditBilling"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit-customer/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/EditCustomer"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "fill-feedback/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/FillFeedback"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "review-inward/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/ReviewInward"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit-work-order/:id", // Edit Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-process/inward-entry-lab/EditWorkOrder"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
              ],
            },

            {
              path: "calibration-operations",
              children: [
                {
                  path: "calibration-standards",
                  children: [
                    {
                      path: "", // List Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/calibration-standards"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add", // Add Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/calibration-standards/AddCalibrationStandards"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/calibration-standards/EditCalibrationStandards"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                {
                  path: "calibration-methods",
                  children: [
                    {
                      path: "", // List Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/calibration-methods"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add", // Add Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/calibration-methods/AddCalibrationMethods"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/calibration-methods/EditCalibrationMethods"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                {
                  path: "instrument-list",
                  children: [
                    {
                      path: "", // List Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/instrument-list"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add", // Add Page
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/instrument-list/AddCalibrationInstrument"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/calibration-operations/instrument-list/EditCalibrationInstrumnet"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                // {
                //   path: "bio-medical-visual-test",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/BioMedicalVisualTest")).default,
                //   }),
                // },
                // {
                //   path: "bio-medical-electrical-safety",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/BioMedicalElectricalSafety")).default,
                //   }),
                // },
                // {
                //   path: "calibration-list-of-instruments",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/CalibrationListOfInstruments")).default,
                //   }),
                // },
                // {
                //   path: "discipline",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/Discipline")).default,
                //   }),
                // },
                // {
                //   path: "revision-requests",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/RevisionRequests")).default,
                //   }),
                // },
                // {
                //   path: "lrn-cancel-requests",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/LrnCancelRequests")).default,
                //   }),
                // },
                // {
                //   path: "cmc-scope-sheet",
                //   lazy: async () => ({
                //     Component: (await import("app/pages/dashboards/calibration-operations/CMCScopeSheet")).default,
                //   }),
                // },
              ],
            },
            {
              path: "people",
              children: [
                {
                  path: "customer-types",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/customer-types"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/customer-types/AddCustomerType"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/customer-types/EditCustomerType"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                {
                  path: "customer-categories",
                  lazy: async () => ({
                    Component: (
                      await import(
                        "app/pages/dashboards/people/customer-categories"
                      )
                    ).default,
                  }),
                },
                {
                  path: "customer-categories/add",
                  lazy: async () => ({
                    Component: (
                      await import(
                        "app/pages/dashboards/people/customer-categories/AddCustomerCategory"
                      )
                    ).default,
                  }),
                },

                {
                  path: "specific-purposes",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/specific-purposes"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/specific-purposes/AddSpecificPurpose"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/specific-purposes/EditSpecificPurpose"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                {
                  path: "customers",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import("app/pages/dashboards/people/customers")
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/customers/AddCustomer"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/customers/EditCustomer"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                {
                  path: "promoters",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import("app/pages/dashboards/people/promoters")
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/promoters/AddPromoter"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/people/promoters/EditPromoter"
                          )
                        ).default,
                      }),
                    },
                  ],
                },

                {
                  path: "suppliers",
                  lazy: async () => ({
                    Component: (
                      await import("app/pages/dashboards/people/suppliers")
                    ).default,
                  }),
                },
                {
                  path: "suppliers/add",
                  lazy: async () => ({
                    Component: (
                      await import(
                        "app/pages/dashboards/people/suppliers/AddSupplier"
                      )
                    ).default,
                  }),
                },

                {
                  path: "users",
                  lazy: async () => ({
                    Component: (
                      await import("app/pages/dashboards/people/users")
                    ).default,
                  }),
                },
                {
                  path: "users/add",
                  lazy: async () => ({
                    Component: (
                      await import("app/pages/dashboards/people/users/AddUser")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "inventory",
              children: [
                {
                  path: "categories",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/inventory/categories"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/inventory/categories/AddCategories"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/inventory/categories/EditCategories"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                {
                  path: "subcategories",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/inventory/subcategories"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/inventory/subcategories/AddSubCategories"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/inventory/subcategories/EditSubCategories"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
              ],
            },
            {
              path: "hrm",
              children: [
                {
                  path: "manage-branch",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import("app/pages/dashboards/hrm/manage-branch")
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/manage-branch/AddManageBranch"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/manage-branch/EditManageBranch"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                {
                  path: "salary-structure-design",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/salary-structure-design"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/salary-structure-design/AddSalaryStructureDesign"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/salary-structure-design/EditSalaryStructureDesign"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                {
                  path: "manage-departments",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/manage-departments"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/manage-departments/AddManageDepartment"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/manage-departments/EditManageDepartments"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
                {
                  path: "manage-designations",
                  children: [
                    {
                      path: "",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/manage-designations"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "add",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/manage-designations/AddManageDesignations"
                          )
                        ).default,
                      }),
                    },
                    {
                      path: "edit/:id",
                      lazy: async () => ({
                        Component: (
                          await import(
                            "app/pages/dashboards/hrm/manage-designations/EditManageDesignations"
                          )
                        ).default,
                      }),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (await import("app/pages/settings/sections/General"))
                  .default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
