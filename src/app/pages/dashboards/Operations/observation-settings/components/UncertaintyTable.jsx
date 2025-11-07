import React from 'react'
import Select from "react-select";
import { TrashIcon } from "@heroicons/react/24/outline";

function UncertaintyTable({
  rows,
  tableList,
  customSelectStyles,
  handleCheckbox,
  handleInputChange,
  handleTableSelection,
  handleFieldnameChange,
  addRow,
  removeRow,
  loading
}) {
  return (
    <React.Fragment>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainty Setting</h1>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
            <table className="min-w-[1300px] w-full table-fixed border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="w-12 px-2 py-3 text-left text-sm font-semibold text-gray-700 border-b">S.No</th>
                  <th className="w-16 px-2 py-3 text-left text-sm font-semibold text-gray-700 border-b">Check</th>
                  <th className="w-[250px] px-3 py-3 text-left text-sm font-semibold text-gray-700 border-b">Fieldname</th>
                  <th className="w-[160px] px-3 py-3 text-left text-sm font-semibold text-gray-700 border-b">Set Variable</th>
                  <th className="w-[180px] px-3 py-3 text-left text-sm font-semibold text-gray-700 border-b">Field Heading</th>
                  <th className="w-[100px] px-3 py-3 text-left text-sm font-semibold text-gray-700 border-b">Position</th>
                  {/* 👇 Make formula column wider */}
                  <th className="w-[400px] px-3 py-3 text-left text-sm font-semibold text-gray-700 border-b">Formula</th>
                  <th className="w-[80px] px-2 py-3 text-left text-sm font-semibold text-gray-700 border-b">Action</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="w-12 px-2 py-3 text-sm text-center">{index + 1}</td>
                    <td className="w-16 px-2 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => handleCheckbox(row.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>

                    {/* Fieldname column */}
                    <td className="w-[250px] px-3 py-3">
                      <div className="space-y-2">
                        <Select
                          value={row.selectedTable}
                          onChange={(selectedOption) =>
                            handleTableSelection(row.id, selectedOption)
                          }
                          options={tableList}
                          placeholder="Select table..."
                          isClearable
                          styles={customSelectStyles}
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                        />
                        {row.selectedTable && (
                          <Select
                            value={row.fieldname}
                            onChange={(selectedOption) =>
                              handleFieldnameChange(row.id, selectedOption)
                            }
                            options={row.fieldnameOptions || []}
                            placeholder="Select fieldname..."
                            isClearable
                            styles={customSelectStyles}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                          />
                        )}
                      </div>
                    </td>

                    <td className="w-[160px] px-3 py-3">
                      <input
                        type="text"
                        value={row.setVariable || ""}
                        onChange={(e) =>
                          handleInputChange(row.id, "setVariable", e.target.value)
                        }
                        className="w-full px-2 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="$variable"
                      />
                    </td>

                    <td className="w-[180px] px-3 py-3">
                      <input
                        type="text"
                        value={row.fieldHeading}
                        onChange={(e) =>
                          handleInputChange(row.id, "fieldHeading", e.target.value)
                        }
                        className="w-full px-2 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Heading"
                      />
                    </td>

                    <td className="w-[100px] px-3 py-3">
                      <input
                        type="number"
                        value={row.fieldPosition}
                        onChange={(e) =>
                          handleInputChange(row.id, "fieldPosition", e.target.value)
                        }
                        className="w-full px-2 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="1"
                      />
                    </td>

                    {/* ✅ Wider formula cell */}
                    <td className="w-[450px] px-3 py-3 align-top">
                      <textarea
                        value={row.formula}
                        onChange={(e) => handleInputChange(row.id, "formula", e.target.value)}
                        rows="4" /* 👈 height increased from 2 to 4 */
                        className="w-full h-[120px] px-2 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                        placeholder="Formula"
                      />
                    </td>

                    <td className="w-[80px] px-2 py-3 text-center">
                      <button
                        onClick={() => removeRow(row.id)}
                        disabled={rows.length === 1}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <TrashIcon className="size-4.5 stroke-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

            <div className="p-4 border-t flex justify-end">
              <button 
                style={{ cursor: 'pointer' }}
                onClick={addRow} 
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
              >
                Add Row
              </button>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default UncertaintyTable;