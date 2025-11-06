import React from 'react'

function EnvironmentalConditions({ formData, handleFormChange, errors, temperatureRange, humidityRange }) {
  return (
    <React.Fragment>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Temperature End (°C) <span className="text-red-500">*</span>:
                      </label>
                      <input
                        type="text"
                        name="tempend"
                        value={formData.tempend}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        placeholder="Enter temperature range"
                      // required attribute removed
                      />
                      {errors.tempend && <p className="text-red-500 text-xs mt-1">{errors.tempend}</p>}
                      {!errors.tempend && !formData.tempend && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                      {temperatureRange && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Range:{' '}
                          {temperatureRange.min
                            ? `${temperatureRange.min} - ${temperatureRange.max}`
                            : temperatureRange.value || 'N/A'}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        Humidity End (%RH) <span className="text-red-500">*</span>:
                      </label>
                      <input
                        type="text"
                        name="humiend"
                        value={formData.humiend}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                        placeholder="Enter humidity range"
                      // required attribute removed
                      />
                      {errors.humiend && <p className="text-red-500 text-xs mt-1">{errors.humiend}</p>}
                      {!errors.humiend && !formData.humiend && (
                        <p className="text-red-500 text-xs mt-1">This field is required</p>
                      )}
                      {humidityRange && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Range:{' '}
                          {humidityRange.min
                            ? `${humidityRange.min} - ${humidityRange.max}`
                            : humidityRange.value || 'N/A'}
                        </p>
                      )}
                    </div>
                  </div>

    </React.Fragment>
  )
}

export default EnvironmentalConditions
