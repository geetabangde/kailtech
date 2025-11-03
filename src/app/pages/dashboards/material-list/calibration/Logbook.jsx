import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select, Pagination, PaginationItems, PaginationNext, PaginationPrevious } from "components/ui";

const Logbook = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data based on your screenshot
  const logData = [
    {
      id: 1,
      startDateTime: '2024-03-13 16:37:30',
      endDateTime: '2024-04-16 16:10:55',
      chemist: 'Pawan Shakya'
    },
    {
      id: 2,
      startDateTime: '2024-03-13 16:18:33',
      endDateTime: '2024-04-16 15:53:49',
      chemist: 'Pawan Shakya'
    },
    {
      id: 3,
      startDateTime: '2023-04-07 11:10:29',
      endDateTime: '2023-06-10 17:32:13',
      chemist: 'Pawan Shakya'
    },
    {
      id: 4,
      startDateTime: '2023-04-07 09:55:00',
      endDateTime: '2023-06-14 14:30:22',
      chemist: 'Pawan Shakya'
    },
    {
      id: 5,
      startDateTime: '2023-01-04 15:02:47',
      endDateTime: '2023-02-16 10:33:55',
      chemist: 'Pawan Shakya'
    },
    {
      id: 6,
      startDateTime: '2022-10-28 18:00:52',
      endDateTime: '2022-10-29 10:01:58',
      chemist: 'Pawan Shakya'
    }
  ];

  const handleBackToCalibration = () => {
    // Navigate back to the MM Instrument List page
    navigate('/dashboards/material-list/calibration');
  };

  const handleEntriesChange = (value) => {
    setEntriesPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Filter data based on search term
  const filteredData = logData.filter(item =>
    item.chemist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.startDateTime.includes(searchTerm) ||
    item.endDateTime.includes(searchTerm)
  );

  // Calculate pagination
  const totalEntries = filteredData.length;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div style={{marginLeft:"20px"}}>
            <h1 className="text-lg font-medium text-gray-900" >Log Book</h1>
            <p className="text-sm text-gray-600">Deep Freezer (KTRC-EQ-0585)</p>
          </div>
          <Button
            onClick={handleBackToCalibration}
            className="text-white bg-indigo-500 hover:bg-fuchsia-500 px-6 py-2"
          >
            Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6" style={{background:"white"}}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Controls */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Show</span>
                  <Select
                    value={entriesPerPage.toString()}
                    onValueChange={handleEntriesChange}
                    className="w-20"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Select>
                  <span className="text-sm text-gray-700">entries</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Search:</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Start Date Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    End Date Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Chemist
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.startDateTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.endDateTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.chemist}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
              </div>
              
              <div className="flex items-center space-x-2">
                <Pagination>
                  <PaginationPrevious 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </PaginationPrevious>
                  
                  <PaginationItems>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className={`px-3 py-1 text-sm border rounded ${
                        currentPage === 1 
                          ? 'bg-blue-500 text-white border-blue-500' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      1
                    </button>
                  </PaginationItems>
                  
                  <PaginationNext 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </PaginationNext>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logbook;