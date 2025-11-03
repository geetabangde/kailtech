import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select, Pagination, PaginationItems, PaginationNext, PaginationPrevious } from "components/ui";

const Details = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
      const [printLoading, setPrintLoading] = useState(false);

    // Sample data based on your screenshots
    const [instrumentData] = useState([
        {
            id: 1,
            inwardId: 2932,
            lrn: '2409R1205230',
            brn: 'KTRC/2409R001130',
            instrumentName: 'Digital Multimeter',
            make: 'Fluke',
            model: '179',
            serialNo: '49060466',
            idNo: 'NA',
            dueDate: '2025-10-01',
            attachmentUrl: '/documents/digital-multimeter-2932.pdf' // Sample document URL
        },
        {
            id: 2,
            inwardId: 2997,
            lrn: '2410R1213723',
            brn: 'KTRC/2410R001923',
            instrumentName: 'Vernier Caliper',
            make: 'Mitutoyo',
            model: 'NA',
            serialNo: '13070131',
            idNo: 'NA',
            dueDate: '2025-10-28',
            attachmentUrl: '/documents/vernier-caliper-2997-1.pdf'
        },
        {
            id: 3,
            inwardId: 2997,
            lrn: '2410R1213823',
            brn: 'KTRC/2410R002023',
            instrumentName: 'Vernier Caliper',
            make: 'Mitutoyo',
            model: 'NA',
            serialNo: '1713820',
            idNo: 'NA',
            dueDate: '2025-10-28',
            attachmentUrl: '/documents/vernier-caliper-2997-2.pdf'
        },
        {
            id: 4,
            inwardId: 2997,
            lrn: '2410R1213923',
            brn: 'KTRC/2410R002123',
            instrumentName: 'External Micrometer',
            make: 'Mitutoyo',
            model: '103-137',
            serialNo: '64120937',
            idNo: 'NA',
            dueDate: '2025-10-28',
            attachmentUrl: '/documents/external-micrometer-2997.pdf'
        }
    ]);

    // Customer details data
    const customerDetails = {
        customerName: 'APPALTO ELECTRONICS PVT LTD',
        email: 'purchase@appalto.in',
        mobile: '9755590789',
        personalName: 'Mr. Sandeep Tripathi',
        personalMobile: '9755590789',
        reportingBillingAddress: '43B, -44 Electronic complex Industrial area, Indore, Indore (M.P.), 452010',
        reportingAddress: 'Plot 24-25, IT Park, Sinhasa, Dhar Road, Indore, 452013',
        city: 'Indore',
        state: 'MADHYA PRADESH',
        country: 'India',
        gstNumber: '23AADCA6195L1ZG',
        panNo: 'AADCA6195L'
    };

    // Handle back button click
    const handleBackClick = () => {
        navigate('/dashboards/calibration-process/lead-managements');
    };

    // Handle download attachment
    // const handleDownloadAttachment = (item) => {
    //     try {
    //         // Create a temporary link element
    //         const link = document.createElement('a');
    //         link.href = item.attachmentUrl;
    //         link.download = `${item.instrumentName}_${item.serialNo}_${item.inwardId}.pdf`;
    //         link.target = '_blank';
            
    //         // Append to body, click, and remove
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
            
    //         console.log(`Downloading attachment for: ${item.instrumentName} (ID: ${item.inwardId})`);
    //     } catch (error) {
    //         console.error('Error downloading attachment:', error);
    //         alert('Error downloading attachment. Please try again.');
    //     }
    // };

    // Sort function
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

     const handlePrint = () => {
    setPrintLoading(true);
    setTimeout(() => {
      window.print();
      setPrintLoading(false);
    }, 500);
  };
    // Filter and sort data
    const filteredData = instrumentData
        .filter(item =>
            Object.values(item).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .sort((a, b) => {
            if (!sortConfig.key) return 0;

            const aValue = a[sortConfig.key]?.toString().toLowerCase() || '';
            const bValue = b[sortConfig.key]?.toString().toLowerCase() || '';

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    // Pagination calculations
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const displayedData = filteredData.slice(startIndex, startIndex + pageSize);

    // Handle page size change
    const handlePageSizeChange = (e) => {
        const newPageSize = Number(e.target.value);
        setPageSize(newPageSize);
        setCurrentPage(1);
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Sort icon component
    const SortIcon = ({ column }) => {
        if (sortConfig.key !== column) {
            return (
                <div className="inline-flex flex-col ml-1">
                    <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 8l5-5 5 5H5z" />
                    </svg>
                    <svg className="w-3 h-3 text-gray-500 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 12l-5 5-5-5h10z" />
                    </svg>
                </div>
            );
        }

        if (sortConfig.direction === 'asc') {
            return (
                <svg className="w-4 h-4 inline ml-1 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 8l5-5 5 5H5z" />
                </svg>
            );
        }

        return (
            <svg className="w-4 h-4 inline ml-1 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 12l-5 5-5-5h10z" />
            </svg>
        );
    };

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header with Back Button */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h1 className="text-xl font-semibold text-gray-800">Customer Detail</h1>
                        <Button 
                            onClick={handleBackClick}
                            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            &lt;&lt; Back
                        </Button>
                    </div>
                </div>

                {/* Customer Details Section - Single Column Layout */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6">
                    <div className="overflow-hidden">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">Customer Name</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.customerName}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">Email</td>
                                    <td className="p-3 bg-white text-sm text-red-600">{customerDetails.email}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">Mobile</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.mobile}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">Personal Name</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.personalName}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">Personal Mobile</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.personalMobile}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">Reporting & Billing Address</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.reportingBillingAddress}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">Reporting Address</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.reportingAddress}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">City</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.city}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">State</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.state}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">Country</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.country}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">GST Number</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.gstNumber}</td>
                                </tr>
                                <tr>
                                    <td className="text-sm font-medium text-gray-700 bg-gray-100 p-3 border-r border-gray-300 w-48">PAN No.</td>
                                    <td className="p-3 bg-white text-sm">{customerDetails.panNo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Instruments Table Section */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
                    {/* Search and Info */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600">Showing 1 to 4 of 4 entries</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Search:</span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('inwardId')}
                                    >
                                        <div className="flex items-center">
                                            Inward Id
                                            <SortIcon column="inwardId" />
                                        </div>
                                    </th>
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('lrn')}
                                    >
                                        <div className="flex items-center">
                                            LRN
                                            <SortIcon column="lrn" />
                                        </div>
                                    </th>
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('brn')}
                                    >
                                        <div className="flex items-center">
                                            BRN
                                            <SortIcon column="brn" />
                                        </div>
                                    </th>
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('instrumentName')}
                                    >
                                        <div className="flex items-center">
                                            Instrument Name
                                            <SortIcon column="instrumentName" />
                                        </div>
                                    </th>
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('make')}
                                    >
                                        <div className="flex items-center">
                                            Make
                                            <SortIcon column="make" />
                                        </div>
                                    </th>
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('model')}
                                    >
                                        <div className="flex items-center">
                                            Model
                                            <SortIcon column="model" />
                                        </div>
                                    </th>
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('serialNo')}
                                    >
                                        <div className="flex items-center">
                                            Serial No
                                            <SortIcon column="serialNo" />
                                        </div>
                                    </th>
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('idNo')}
                                    >
                                        <div className="flex items-center">
                                            ID No
                                            <SortIcon column="idNo" />
                                        </div>
                                    </th>
                                    <th 
                                        className="text-left p-3 font-medium text-gray-700 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSort('dueDate')}
                                    >
                                        <div className="flex items-center">
                                            Due Date
                                            <SortIcon column="dueDate" />
                                        </div>
                                    </th>
                                    <th className="text-left p-3 font-medium text-gray-700 border border-gray-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedData.length > 0 ? (
                                    displayedData.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="p-3 border border-gray-200">{item.inwardId}</td>
                                            <td className="p-3 border border-gray-200">{item.lrn}</td>
                                            <td className="p-3 border border-gray-200">{item.brn}</td>
                                            <td className="p-3 border border-gray-200">{item.instrumentName}</td>
                                            <td className="p-3 border border-gray-200">{item.make}</td>
                                            <td className="p-3 border border-gray-200">{item.model}</td>
                                            <td className="p-3 border border-gray-200">{item.serialNo}</td>
                                            <td className="p-3 border border-gray-200">{item.idNo}</td>
                                            <td className="p-3 border border-gray-200">{item.dueDate}</td>
                                            <td className="p-3 border border-gray-200">
                                                 <div className="flex justify-end mt-6 no-print space-x-4">
          <Button onClick={handlePrint} color="success" disabled={printLoading}>
            {printLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
                </svg>
                Preparing...
              </div>
            ) : (
              "Download Dispatch Report"
            )}
          </Button>
          {/* <Button
            onClick={() => setShowApproveModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Approve
          </Button> */}
        </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="p-4 text-center text-gray-500">
                                            No instruments found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Section */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                            {/* Show entries section */}
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>Show</span>
                                <Select
                                    data={[10, 25, 50, 100]}
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                    classNames={{
                                        root: "w-fit",
                                        select: "h-7 rounded py-1 text-xs border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                                    }}
                                />
                                <span>entries</span>
                            </div>

                            {/* Pagination component */}
                            <div>
                                <Pagination
                                    total={totalPages}
                                    value={currentPage}
                                    onChange={handlePageChange}
                                    siblings={2}
                                    boundaries={1}
                                >
                                    <PaginationPrevious />
                                    <PaginationItems />
                                    <PaginationNext />
                                </Pagination>
                            </div>

                            {/* Entries info */}
                            <div className="truncate text-sm text-gray-600">
                                {filteredData.length > 0 ? (
                                    `${startIndex + 1} - ${Math.min(startIndex + pageSize, filteredData.length)} of ${filteredData.length} entries`
                                ) : (
                                    "0 entries"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;