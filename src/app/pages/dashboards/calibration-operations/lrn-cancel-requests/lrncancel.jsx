import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const LRNCancelRequestList = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [reasonToCancel, setReasonToCancel] = useState('');
  const [reasonForAction, setReasonForAction] = useState('');
  const [validationError, setValidationError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const data = [
    {
      id: 1,
      name: 'Analogue Pressure Gauge',
      inwardNo: 3618,
      dateOfReceive: '16/08/2025',
      idNo: 20,
      serialNo: 'na',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000216',
      lrnNo: '2508R1193216',
      reason: 'poor condition',
      requestedOn: '19/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'moin',
      inwardNo: 3618,
      dateOfReceive: '16/08/2025',
      idNo: 20,
      serialNo: 'na',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000116',
      lrnNo: '2508R1193116',
      reason: 'my name is moinuddin sheikh',
      requestedOn: '19/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Digital Multimeter',
      inwardNo: 3619,
      dateOfReceive: '17/08/2025',
      idNo: 21,
      serialNo: 'DM001',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000316',
      lrnNo: '2508R1193316',
      reason: 'calibration error',
      requestedOn: '20/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Temperature Sensor',
      inwardNo: 3620,
      dateOfReceive: '18/08/2025',
      idNo: 22,
      serialNo: 'TS002',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000416',
      lrnNo: '2508R1193416',
      reason: 'damaged during transport',
      requestedOn: '21/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 5,
      name: 'Oscilloscope',
      inwardNo: 3621,
      dateOfReceive: '19/08/2025',
      idNo: 23,
      serialNo: 'OSC003',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000516',
      lrnNo: '2508R1193516',
      reason: 'faulty display',
      requestedOn: '22/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 6,
      name: 'Power Supply',
      inwardNo: 3622,
      dateOfReceive: '20/08/2025',
      idNo: 24,
      serialNo: 'PS004',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000616',
      lrnNo: '2508R1193616',
      reason: 'voltage fluctuation',
      requestedOn: '23/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 7,
      name: 'Function Generator',
      inwardNo: 3623,
      dateOfReceive: '21/08/2025',
      idNo: 25,
      serialNo: 'FG005',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000716',
      lrnNo: '2508R1193716',
      reason: 'frequency drift',
      requestedOn: '24/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 8,
      name: 'Spectrum Analyzer',
      inwardNo: 3624,
      dateOfReceive: '22/08/2025',
      idNo: 26,
      serialNo: 'SA006',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000816',
      lrnNo: '2508R1193816',
      reason: 'noise interference',
      requestedOn: '25/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 9,
      name: 'Signal Generator',
      inwardNo: 3625,
      dateOfReceive: '23/08/2025',
      idNo: 27,
      serialNo: 'SG007',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R000916',
      lrnNo: '2508R1193916',
      reason: 'amplitude variation',
      requestedOn: '26/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 10,
      name: 'LCR Meter',
      inwardNo: 3626,
      dateOfReceive: '24/08/2025',
      idNo: 28,
      serialNo: 'LCR008',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R001016',
      lrnNo: '2508R1194016',
      reason: 'measurement inconsistency',
      requestedOn: '27/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 11,
      name: 'Network Analyzer',
      inwardNo: 3627,
      dateOfReceive: '25/08/2025',
      idNo: 29,
      serialNo: 'NA009',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R001116',
      lrnNo: '2508R1194116',
      reason: 'calibration expired',
      requestedOn: '28/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 12,
      name: 'Torque Wrench',
      inwardNo: 3628,
      dateOfReceive: '26/08/2025',
      idNo: 30,
      serialNo: 'TW010',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R001216',
      lrnNo: '2508R1194216',
      reason: 'mechanical wear',
      requestedOn: '29/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 13,
      name: 'Pressure Transducer',
      inwardNo: 3629,
      dateOfReceive: '27/08/2025',
      idNo: 31,
      serialNo: 'PT011',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R001316',
      lrnNo: '2508R1194316',
      reason: 'sensor drift',
      requestedOn: '30/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 14,
      name: 'pH Meter',
      inwardNo: 3630,
      dateOfReceive: '28/08/2025',
      idNo: 32,
      serialNo: 'PH012',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R001416',
      lrnNo: '2508R1194416',
      reason: 'electrode malfunction',
      requestedOn: '31/08/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    },
    {
      id: 15,
      name: 'Balance Scale',
      inwardNo: 3631,
      dateOfReceive: '29/08/2025',
      idNo: 33,
      serialNo: 'BS013',
      customerName: 'KAILTECH TEST & RESEARCH CENTRE PVT. LTD.',
      certificateNo: 'KTRC/2508R001516',
      lrnNo: '2508R1194516',
      reason: 'weighing accuracy issue',
      requestedOn: '01/09/2025',
      requestedBy: 'Er. Ruby S. Malhotra',
      approvedOn: '',
      approvedBy: '',
      status: 'Pending'
    }
  ];

  const toggleExpand = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleActionClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    setReasonToCancel(item.reason);
    setReasonForAction('');
    setValidationError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReasonToCancel('');
    setReasonForAction('');
    setValidationError('');
  };

  const handleApprove = () => {
    if (!reasonForAction.trim()) {
      setValidationError('This field is required');
      return;
    }
    console.log('Approved:', selectedItem);
    handleCloseModal();
  };

  const handleReject = () => {
    if (!reasonForAction.trim()) {
      setValidationError('This field is required');
      return;
    }
    console.log('Rejected:', selectedItem);
    handleCloseModal();
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.certificateNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const Button = ({ children, variant = "default", size = "default", onClick, className = "", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "underline-offset-4 hover:underline text-primary"
    };

    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10"
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Select = ({ children, value, onValueChange }) => {
    return (
      <select 
        value={value} 
        onChange={(e) => onValueChange(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        {children}
      </select>
    );
  };

  const SelectItem = ({ value, children }) => {
    return <option value={value}>{children}</option>;
  };

  return (
    <div className="bg-white min-h-screen relative">
      {/* Main Content */}
      <div className={`p-4 ${showModal ? 'opacity-30 pointer-events-none' : ''}`}>
        {/* Header with Title and Search in same div */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Lrn Cancel Request List</h2>
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Search:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-2 py-1 text-black text-xs w-48 border border-gray-300 rounded"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300">
          <table className="w-full text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Inward no</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Date of Receive</th>
                <th className="border border-gray-300 px-2 py-2 text-left">id no</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Serial no</th>
                <th className="border border-gray-300 px-2 py-2 text-left">customer Name</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Certificate no</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Lrn No</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Reject/Approve Reason</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Requested On</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Requested By</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Approved on</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Approved by</th>
                <th className="border border-gray-300 px-2 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <React.Fragment key={item.id}>
                  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-2 py-2">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer mr-2"
                          onClick={() => toggleExpand(item.id)}
                        >
                          <Plus className="w-2 h-2" />
                        </div>
                        {item.id}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">{item.name}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.inwardNo}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.dateOfReceive}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.idNo}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.serialNo}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.customerName}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.certificateNo}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.lrnNo}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.reason}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.requestedOn}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.requestedBy}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.approvedOn}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.approvedBy}</td>
                    <td className="border border-gray-300 px-2 py-2">{item.status}</td>
                  </tr>
                  {expandedRows[item.id] && (
                    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td colSpan="15" className="border border-gray-300 px-2 py-2">
                        <div className="ml-8">
                          <p className="text-xs mb-2"><strong>Actions:</strong></p>
                          <Button 
                            variant="default"
                            size="sm"
                            onClick={() => handleActionClick(item)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Approve/Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <span>Show:</span>
            <Select 
              value={itemsPerPage.toString()} 
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </Select>
            <span>entries</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        </div>
      </div>

      {/* Modal - now without black background */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 ml-50 rounded-lg shadow-xl w-150 relative border border-gray-300">
            {/* X Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold mb-4">Approve LRN Cancel Request</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reason to Cancel</label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 h-20 text-sm resize-none"
                value={reasonToCancel}
                onChange={(e) => setReasonToCancel(e.target.value)}
                placeholder="poor condition"
                readOnly
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Reason For Accept / Reject</label>
              <textarea
                className={`w-full border rounded px-3 py-2 h-20 text-sm resize-none ${
                  validationError ? 'border-red-500' : 'border-gray-300'
                }`}
                value={reasonForAction}
                onChange={(e) => {
                  setReasonForAction(e.target.value);
                  if (e.target.value.trim()) {
                    setValidationError('');
                  }
                }}
                placeholder="Reason For Accept / Reject"
              />
              {validationError && (
                <p className="text-red-500 text-xs mt-1">{validationError}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="destructive"
                onClick={handleReject}
              >
                Reject
              </Button>
              <Button
                variant="default"
                onClick={handleApprove}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LRNCancelRequestList;