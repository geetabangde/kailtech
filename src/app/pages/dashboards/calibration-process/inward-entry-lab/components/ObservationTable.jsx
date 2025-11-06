import React from 'react'
import Select from "react-select";

function ObservationTable({
  observationTemplate,
  selectedTableData,
  tableStructure,
  tableInputValues,
  observationErrors,
  handleInputChange,
  handleObservationBlur,
  handleRowSave,
  unitsList,
  dynamicHeadings,
  suffix,
  renderThermalCoefficientSection,
  setObservationErrors,
  observations
}) {
  return (
    <React.Fragment>
      {renderThermalCoefficientSection()}

              <div className="mb-6">
                <h2 className="text-md font-medium text-gray-800 dark:text-white mb-4">Observation Detail</h2>
                {observationTemplate && (
                  <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Current Observation Template:</strong> {observationTemplate}
                    </p>
                  </div>
                )}

                {selectedTableData && tableStructure && (
                  <div className="space-y-6">
                      {dynamicHeadings && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                          <p className="text-sm text-green-800">
                           <strong>Dynamic Mode Active:</strong> Using custom column names for suffix &quot;{suffix}&quot;
                          </p>  
                        </div>
                      )}

                    {selectedTableData.id === 'observationmm' && selectedTableData.unitTypes ? (
                      // Render separate tables for each unit type in MM
                      selectedTableData.unitTypes.map((unitTypeGroup, groupIndex) => {
                        if (!unitTypeGroup || !unitTypeGroup.calibration_points) return null;

                        // Calculate starting row index for this unit type group
                        let startingRowIndex = 0;
                        for (let i = 0; i < groupIndex; i++) {
                          if (selectedTableData.unitTypes[i] && selectedTableData.unitTypes[i].calibration_points) {
                            startingRowIndex += selectedTableData.unitTypes[i].calibration_points.length;
                          }
                        }

                        const unitTypeRows = unitTypeGroup.calibration_points.map(point => {
                          const observations = [];
                          if (point.observations && Array.isArray(point.observations)) {
                            for (let i = 0; i < 5; i++) {
                              observations.push(point.observations[i]?.value || '');
                            }
                          }
                          while (observations.length < 5) {
                            observations.push('');
                          }

                          return [
                            point.sequence_number?.toString() || '',
                            point.mode || 'Measure',
                            point.range || '',
                            (point.nominal_values?.calculated_master?.value || ''),
                            (point.nominal_values?.master?.value || '') ,
                            ...observations,
                            point.calculations?.average || '',
                            point.calculations?.error || ''
                          ];
                        });

                        return (
                          <div key={groupIndex} className="mb-8">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 bg-blue-50 dark:bg-blue-900 p-2 rounded">
                              {unitTypeGroup.unit_type}
                            </h3>


                            
                            <div className="overflow-x-auto border border-gray-200 dark:border-gray-600">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                                    {tableStructure.headers.map((header, index) => (
                                      <th
                                        key={index}
                                        colSpan={header.colspan}
                                        className="px-3 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider border-r border-gray-300 dark:border-gray-600 last:border-r-0"
                                      >
                                        {header.name}
                                      </th>
                                    ))}
                                  </tr>
                                  {tableStructure.subHeadersRow.some((item) => item !== null) && (
                                    <tr className="bg-gray-50 dark:bg-gray-600 border-b border-gray-300 dark:border-gray-600">
                                      {tableStructure.subHeadersRow.map((subHeader, index) => (
                                        <th
                                          key={index}
                                          className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 last:border-r-0"
                                        >
                                          {subHeader}
                                        </th>
                                      ))}
                                    </tr>
                                  )}
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                  {unitTypeRows.map((row, rowIndex) => {
                                    // Fixed: Use correct row index for this specific unit type group
                                    const actualRowIndex = startingRowIndex + rowIndex;

                                    return (
                                      <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        {row.map((cell, colIndex) => {
                                          const key = `${actualRowIndex}-${colIndex}`;
                                          const currentValue = tableInputValues[key] ?? (cell?.toString() || '');

                                          const isDisabled =
                                            colIndex === 0 || // SR No
                                            colIndex === 1 || // Mode
                                            colIndex === 3 || // Calculated master (read-only)
                                            colIndex === 4 || // Master value (read-only)
                                            colIndex === 10 || // Average
                                            colIndex === 11; // Error

                                          return (
                                            <td
                                              key={colIndex}
                                              className="px-3 py-2 whitespace-nowrap text-sm border-r border-gray-200 dark:border-gray-600 last:border-r-0"
                                            >
                                              <input
                                                type="text"
                                                className={`w-full px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${isDisabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''
                                                  } ${observationErrors[key] ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                                                value={currentValue}
                                                onChange={(e) => {
                                                  if (isDisabled) return;
                                                  handleInputChange(actualRowIndex, colIndex, e.target.value);
                                                  // Clear error when user starts typing
                                                  if (observationErrors[key]) {
                                                    setObservationErrors(prev => {
                                                      const newErrors = { ...prev };
                                                      delete newErrors[key];
                                                      return newErrors;
                                                    });
                                                  }
                                                }}
                                                onBlur={(e) => {
                                                  if (isDisabled) return;
                                                  handleObservationBlur(actualRowIndex, colIndex, e.target.value);
                                                }}
                                                disabled={isDisabled}
                                              />
                                              {observationErrors[key] && (
                                                <div className="text-red-500 text-xs mt-1">{observationErrors[key]}</div>
                                              )}
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      // Original single table rendering for other observation types


                      
                      <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 gita">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                              {tableStructure.headers.map((header, index) => (
                                <th
                                  key={index}
                                  colSpan={header.colspan}
                                  className="px-3 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider border-r border-gray-300 dark:border-gray-600 last:border-r-0"
                                >
                                  {header.name}
                                </th>
                              ))}
                            </tr>
                            {tableStructure.subHeadersRow.some((item) => item !== null) && (
                              <tr className="bg-gray-50 dark:bg-gray-600 border-b border-gray-300 dark:border-gray-600">
                                {tableStructure.subHeadersRow.map((subHeader, index) => (
                                  <th
                                    key={index}
                                    className="px-3 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 border-r border-gray-300 dark:border-gray-600 last:border-r-0"
                                  >
                                    {subHeader}
                                  </th>
                                ))}
                              </tr>
                            )}
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 bangde">
                            {(selectedTableData.staticRows?.length > 0
                              ? selectedTableData.staticRows
                              : [Array(tableStructure.subHeadersRow.length).fill('')]
                            ).map((row, rowIndex) => (
                              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                {row.map((cell, colIndex) => {
                                  const key = `${rowIndex}-${colIndex}`;
                                  const currentValue = tableInputValues[key] ?? (cell?.toString() || '');

                                  // ✅ ADD GTM UNIT SELECT HANDLING (BEFORE RTD WI)
                                  if (selectedTableData.id === 'observationgtm' && cell === 'UNIT_SELECT') {
                                    return (
                                      <td key={colIndex} className="px-3 py-2 whitespace-nowrap text-sm border-r border-gray-200 dark:border-gray-600 last:border-r-0">
                                        <Select
                                          options={unitsList}
                                          className="w-full text-sm"
                                          classNamePrefix="select"
                                          placeholder="Select unit..."
                                          value={unitsList.find(u => u.label === currentValue)}
                                          styles={{
                                            control: (base) => ({
                                              ...base,
                                              minHeight: '32px',
                                              fontSize: '0.875rem'
                                            })
                                          }}
                                          onChange={(selected) => {
                                            handleInputChange(rowIndex, colIndex, selected?.label || '');
                                            handleObservationBlur(rowIndex, colIndex, selected?.value?.toString() || '');
                                          }}
                                        />
                                      </td>
                                    );
                                  }

                                  // ✅ ADD GTM STATIC TEXT HANDLING (BEFORE RTD WI)
                                  if (selectedTableData.id === 'observationgtm' && (cell === '-' || cell === 'UUC' || cell === 'Master')) {
                                    return (
                                      <td key={colIndex} className="px-3 py-2 whitespace-nowrap text-sm border-r border-gray-200 dark:border-gray-600 last:border-r-0 text-center font-medium">
                                        {cell}
                                      </td>
                                    );
                                  }

                                  // Special handling for UNIT_SELECT in observationrtdwi Master row
                                  if (selectedTableData.id === 'observationrtdwi' && cell === 'UNIT_SELECT') {
                                    return (
                                      <td key={colIndex} className="px-3 py-2 whitespace-nowrap text-sm border-r border-gray-200 dark:border-gray-600 last:border-r-0">
                                        <Select
                                          options={unitsList}
                                          className="w-full text-sm"
                                          classNamePrefix="select"
                                          placeholder="Select unit..."
                                          value={unitsList.find(u => u.label === currentValue)}
                                          styles={{
                                            control: (base) => ({
                                              ...base,
                                              minHeight: '32px',
                                              fontSize: '0.875rem'
                                            })
                                          }}
                                          onChange={(selected) => {
                                            handleInputChange(rowIndex, colIndex, selected?.label || '');
                                            handleObservationBlur(rowIndex, colIndex, selected?.value?.toString() || '');
                                          }}
                                        />
                                      </td>
                                    );
                                  }


                                  if (selectedTableData.id === 'observationrtdwi' && (cell === '-' || cell === 'UUC' || cell === 'Master')) {
                                    return (
                                      <td key={colIndex} className="px-3 py-2 whitespace-nowrap text-sm border-r border-gray-200 dark:border-gray-600 last:border-r-0 text-center font-medium">
                                        {cell}
                                      </td>
                                    );
                                  }

                                  let isDisabled = colIndex === 0;

                                  if (selectedTableData.id === 'observationrtdwi') {
                                    const rowType = row[2];
                                    isDisabled = isDisabled || [2].includes(colIndex) || cell === '-';
                                    if (rowType === 'UUC') {
                                      isDisabled = isDisabled || [1, 10, 11, 12, 13, 14].includes(colIndex);
                                    }
                                    if (rowType === 'Master') {
                                      if ([11].includes(colIndex)) {
                                        isDisabled = false;
                                      } else if ([0, 1, 4, 12, 13, 14].includes(colIndex)) {
                                        isDisabled = true;
                                      }
                                    }
                                  }

                                  else if (selectedTableData.id === 'observationgtm') {
                                    const rowType = row[2];
                                    isDisabled = isDisabled || [2].includes(colIndex) || cell === '-';
                                    if (rowType === 'UUC') {
                                      // UUC row: SR No, Value Of, Sensitivity Coefficient, Average (Ω), Average (°C), Deviation disabled
                                      isDisabled = isDisabled || [0, 1, 2, 4, 5, 11, 12, 13].includes(colIndex);
                                    }
                                    if (rowType === 'Master') {
                                      // Master row: SR No, Set Point, Value Of, Range, Deviation disabled
                                      isDisabled = isDisabled || [0, 1, 2, 3, 11, 13].includes(colIndex);
                                    }
                                  }// In the table rendering section, add DG disabled fields logic:

                                  else if (selectedTableData.id === 'observationdg') {
                                    // Sr No, and all calculated fields (cols 6-10) are disabled
                                    isDisabled = isDisabled || [0, 1, 6, 7, 8, 9, 10].includes(colIndex);
                                  }
                                  else if (selectedTableData.id === 'observationdpg') {
                                    isDisabled = isDisabled || [1, 2, 6, 7, 8, 9].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationodfm') {
                                    isDisabled = isDisabled || [2, 8, 9].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationppg') {
                                    isDisabled = isDisabled || [1, 2, 9, 10, 11, 12].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationapg') {
                                    isDisabled = isDisabled || [1, 2, 5, 6, 7].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationctg') {
                                    isDisabled = isDisabled || [1, 7, 8].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationmsr') {
                                    isDisabled = isDisabled || [1, 7, 8].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationmg') {
                                    isDisabled = isDisabled || [5, 6, 7].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationavg') {
                                    isDisabled = isDisabled || [5, 6, 7].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationit') {
                                    isDisabled = isDisabled || [1, 7, 8].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationexm') {
                                    isDisabled = isDisabled || [1, 7, 8].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationfg') {
                                    isDisabled = isDisabled || [7, 8].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationhg') {
                                    isDisabled = isDisabled || [1, 7, 8].includes(colIndex);
                                  } else if (selectedTableData.id === 'observationmt') {
                                    isDisabled = isDisabled || [1, 7, 8].includes(colIndex);
                                  }

                                  return (
                                    <td
                                      key={colIndex}
                                      className="px-3 py-2 whitespace-nowrap text-sm border-r border-gray-200 dark:border-gray-600 last:border-r-0"
                                    >
                                      <input
                                        type="text"
                                        className={`w-full px-2 py-1 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white ${isDisabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''
                                          } ${observationErrors[key] ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                                        value={currentValue}
                                        onChange={(e) => {
                                          if (isDisabled) return;
                                          handleInputChange(rowIndex, colIndex, e.target.value);
                                          if (observationErrors[key]) {
                                            setObservationErrors(prev => {
                                              const newErrors = { ...prev };
                                              delete newErrors[key];
                                              return newErrors;
                                            });
                                          }
                                        }}
                                        onBlur={(e) => {
                                          if (isDisabled) return;
                                          if (selectedTableData.id === 'observationctg' ||
                                            selectedTableData.id === 'observationdpg' ||
                                            selectedTableData.id === 'observationodfm' ||
                                            selectedTableData.id === 'observationmm' ||
                                            selectedTableData.id === 'observationit' ||
                                            selectedTableData.id === 'observationmt' ||
                                            selectedTableData.id === 'observationmg' ||
                                            selectedTableData.id === 'observationfg' ||
                                            selectedTableData.id === 'observationhg' ||
                                            selectedTableData.id === 'observationppg' ||
                                            selectedTableData.id === 'observationexm' ||
                                            selectedTableData.id === 'observationmsr' ||
                                            selectedTableData.id === 'observationgtm' ||
                                            selectedTableData.id === 'observationdg' ||
                                            selectedTableData.id === 'observationrtdwi') {
                                            handleObservationBlur(rowIndex, colIndex, e.target.value);
                                          } else {
                                            handleRowSave(rowIndex);
                                          }
                                        }}
                                        disabled={isDisabled}
                                      />
                                      {observationErrors[key] && (
                                        <div className="text-red-500 text-xs mt-1">{observationErrors[key]}</div>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {observationTemplate && observations.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No observations found for template: {observationTemplate}</p>
                  </div>
                )}
              </div>

      
    </React.Fragment>
  )
}

export default ObservationTable
