import React from 'react'

function MastersList({ masters }) {
  return (
    <React.Fragment> 
      <div className="mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="p-2 border border-gray-300 dark:border-gray-600 font-medium text-left text-gray-800 dark:text-white">
                          Reference Standard
                        </th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600 font-medium text-left text-gray-800 dark:text-white">
                          S.w/o
                        </th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600 font-medium text-left text-gray-800 dark:text-white">
                          LD.No.
                        </th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600 font-medium text-left text-gray-800 dark:text-white">
                          Certificate No.
                        </th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600 font-medium text-left text-gray-800 dark:text-white">
                          Valid Upto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {masters && masters.length > 0 ? (
                        masters.map((item, index) => (
                          <tr key={index} className="dark:bg-gray-800">
                            <td className="p-2 border border-gray-300 dark:border-gray-600 dark:text-white">
                              {item.name}
                            </td>
                            <td className="p-2 border border-gray-300 dark:border-gray-600 dark:text-white">
                              {item.serialno}
                            </td>
                            <td className="p-2 border border-gray-300 dark:border-gray-600 dark:text-white">
                              {item.idno}
                            </td>
                            <td className="p-2 border border-gray-300 dark:border-gray-600 dark:text-white">
                              {item.certificateno}
                            </td>
                            <td className="p-2 border border-gray-300 dark:border-gray-600 dark:text-white">
                              {item.enddate}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="p-2 border border-gray-300 dark:border-gray-600 text-center dark:text-white"
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
    </React.Fragment> 
  )
}

export default MastersList
