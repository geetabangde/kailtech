// import { useState } from 'react';

// const Button = ({ onClick, className, children, ...props }) => (
//   <button
//     onClick={onClick}
//     className={className}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const ULRList = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedCustomer, setSelectedCustomer] = useState('');
//   const [showTable, setShowTable] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);

//   // Sample data for demonstration
//   const sampleData = [
//     {
//       id: 1,
//       name: "John Doe",
//       idNo: "ID001",
//       certificateNo: "CERT001",
//       ulrNo: "ULR001",
//       customerName: "KALTECH TEST & RESEARCH CENTRE PVT LTD",
//       receiveDate: "15/08/2025",
//       issueDate: "20/08/2025"
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       idNo: "ID002",
//       certificateNo: "CERT002",
//       ulrNo: "ULR002",
//       customerName: "KALTECH TEST & RESEARCH CENTRE PVT LTD",
//       receiveDate: "16/08/2025",
//       issueDate: "21/08/2025"
//     },
//     {
//       id: 3,
//       name: "Mike Johnson",
//       idNo: "ID003",
//       certificateNo: "CERT003",
//       ulrNo: "ULR003",
//       customerName: "KALTECH TEST & RESEARCH CENTRE PVT LTD",
//       receiveDate: "17/08/2025",
//       issueDate: "22/08/2025"
//     }
//   ];

//   const handleSearch = () => {
//     // Validation: Check if all fields are filled
//     if (!startDate || !endDate || !selectedCustomer) {
//       alert('Please fill in all fields (Start Date, End Date, and Customer) before searching.');
//       return;
//     }

//     // Additional validation: Check if end date is after start date
//     if (new Date(endDate) < new Date(startDate)) {
//       alert('End date must be after start date.');
//       return;
//     }

//     // If validation passes, show table with results
//     console.log('Search clicked:', { startDate, endDate, selectedCustomer });
//     setSearchResults(sampleData);
//     setShowTable(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100" style={{background:"none"}}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{background:"white"}}>
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h1 className="text-xl font-semibold text-gray-800">ULR List</h1>
//           </div>
//         </div>

//         {/* Search Form */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="p-6">
//             {/* First Row - Start Date and End Date */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {/* Start Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>

//               {/* End Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>
//             </div>

//             {/* Second Row - Customer and Search Button */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//               {/* Customer Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Customer
//                 </label>
//                 <select
//                   value={selectedCustomer}
//                   onChange={(e) => setSelectedCustomer(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
//                 >
//                   <option value="">Select Customer</option>
//                   <option value="KALTECH TEST & RESEARCH CENTRE PVT LTD (7364018482)">KALTECH TEST & RESEARCH CENTRE PVT LTD (7364018482)</option>
//                   <option value="ABC CORPORATION (1234567890)">ABC CORPORATION (1234567890)</option>
//                   <option value="XYZ INDUSTRIES (9876543210)">XYZ INDUSTRIES (9876543210)</option>
//                 </select>
//               </div>

//               {/* Search Button */}
//               <div style={{width:"200px"}}>
//                 <Button
//                   onClick={handleSearch}
//                   className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors w-full"
//                 >
//                   Search
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar Container */}
//           <div className="px-6 pb-6">
//             <div className="w-full bg-gray-200 rounded-full h-2 relative">
//               <div className="bg-blue-500 h-2 rounded-full absolute left-0 top-0" style={{ width: '75%' }}></div>
//               {/* Left Arrow */}
//               <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
//                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               {/* Right Arrow */}
//               <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
//                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Table - Only show when search is performed */}
//         {showTable && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="p-6">
//               <h2 className="text-lg font-medium text-gray-800 mb-4">Search Results</h2>
              
//               {/* Table */}
//               <div className="overflow-x-auto">
//                 <table className="min-w-full table-auto border-collapse">
//                   <thead>
//                     <tr className="bg-gray-50">
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID no</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Certificate no</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ULR No.</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Customer Name</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Receive Date</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Issue Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {searchResults.map((row) => (
//                       <tr key={row.id} className="hover:bg-gray-50">
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.id}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.name}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.idNo}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.certificateNo}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.ulrNo}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.customerName}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.receiveDate}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.issueDate}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Table Footer with Total Records */}
//               <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//                 <span>Total Records: {searchResults.length}</span>
//                 <span>Showing {searchResults.length} results</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ULRList;


// import { useState, useEffect } from 'react';

// const Button = ({ onClick, className, children, ...props }) => (
//   <button
//     onClick={onClick}
//     className={className}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const ULRList = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedCustomer, setSelectedCustomer] = useState('');
//   const [showTable, setShowTable] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch customers from API
//  useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         // Get token from local storage
//         const token = localStorage.getItem('authToken');
        
//         if (!token) {
//           throw new Error('Authentication token not found in local storage');
//         }

//         const response = await fetch('https://lims.kailtech.in/api/people/get-all-customers', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
           
//           }
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error('Authentication failed. Please check your token.');
//           }
//           throw new Error(`API request failed with status ${response.status}`);
//         }

//         const data = await response.json();
        
//         // API response structure check karein
//         console.log('API Response:', data);
        
//         // Different possible response structures handle karein
//         if (data && Array.isArray(data)) {
//           setCustomers(data);
//         } else if (data && data.data && Array.isArray(data.data)) {
//           // Agar response { data: [] } format mein hai
//           setCustomers(data.data);
//         } else if (data && data.customers && Array.isArray(data.customers)) {
//           // Agar response { customers: [] } format mein hai
//           setCustomers(data.customers);
//         } else {
//           throw new Error('Invalid API response format');
//         }
//       } catch (err) {
//         console.error('Error fetching customers:', err);
//         setError(err.message || 'Failed to load customers. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);


//   // Sample data for demonstration
//   const sampleData = [
//     {
//       id: 1,
//       name: "John Doe",
//       idNo: "ID001",
//       certificateNo: "CERT001",
//       ulrNo: "ULR001",
//       customerName: "KALTECH TEST & RESEARCH CENTRE PVT LTD",
//       receiveDate: "15/08/2025",
//       issueDate: "20/08/2025"
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       idNo: "ID002",
//       certificateNo: "CERT002",
//       ulrNo: "ULR002",
//       customerName: "KALTECH TEST & RESEARCH CENTRE PVT LTD",
//       receiveDate: "16/08/2025",
//       issueDate: "21/08/2025"
//     },
//     {
//       id: 3,
//       name: "Mike Johnson",
//       idNo: "ID003",
//       certificateNo: "CERT003",
//       ulrNo: "ULR003",
//       customerName: "KALTECH TEST & RESEARCH CENTRE PVT LTD",
//       receiveDate: "17/08/2025",
//       issueDate: "22/08/2025"
//     }
//   ];

//   const handleSearch = () => {
//     // Validation: Check if all fields are filled
//     if (!startDate || !endDate || !selectedCustomer) {
//       alert('Please fill in all fields (Start Date, End Date, and Customer) before searching.');
//       return;
//     }

//     // Additional validation: Check if end date is after start date
//     if (new Date(endDate) < new Date(startDate)) {
//       alert('End date must be after start date.');
//       return;
//     }

//     // If validation passes, show table with results
//     console.log('Search clicked:', { startDate, endDate, selectedCustomer });
//     setSearchResults(sampleData);
//     setShowTable(true);
//   };

//   // Function to format customer display name
//   const getCustomerDisplayName = (customer) => {
//     // Adjust this based on your API response structure
//     // Example: if customer has name and phone/mobile fields
//     if (customer.name && customer.mobile) {
//       return `${customer.name} (${customer.mobile})`;
//     } else if (customer.name && customer.phone) {
//       return `${customer.name} (${customer.phone})`;
//     } else if (customer.companyName && customer.contactNumber) {
//       return `${customer.companyName} (${customer.contactNumber})`;
//     }
//     return customer.name || customer.companyName || 'Unknown Customer';
//   };

//   return (
//     <div className="min-h-screen bg-gray-100" style={{background:"none"}}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{background:"white"}}>
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h1 className="text-xl font-semibold text-gray-800">ULR List</h1>
//           </div>
//         </div>

//         {/* Search Form */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="p-6">
//             {/* First Row - Start Date and End Date */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {/* Start Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>

//               {/* End Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>
//             </div>

//             {/* Second Row - Customer and Search Button */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//               {/* Customer Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Customer
//                 </label>
//                 <select
//                   value={selectedCustomer}
//                   onChange={(e) => setSelectedCustomer(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
//                   disabled={loading}
//                 >
//                   <option value="">Select Customer</option>
//                   {loading && <option value="">Loading customers...</option>}
//                   {error && <option value="">Error loading customers</option>}
//                   {customers.map((customer, index) => (
//                     <option key={customer.id || index} value={getCustomerDisplayName(customer)}>
//                       {getCustomerDisplayName(customer)}
//                     </option>
//                   ))}
//                 </select>
//                 {error && (
//                   <p className="text-red-500 text-xs mt-1">{error}</p>
//                 )}
//               </div>

//               {/* Search Button */}
//               <div style={{width:"200px"}}>
//                 <Button
//                   onClick={handleSearch}
//                   className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors w-full"
//                   disabled={loading}
//                 >
//                   {loading ? 'Loading...' : 'Search'}
//                 </Button>
//               </div>
//             </div>
//           </div>


//         </div>

//         {/* Results Table - Only show when search is performed */}
//         {showTable && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="p-6">
//               <h2 className="text-lg font-medium text-gray-800 mb-4">Search Results</h2>
              
//               {/* Table */}
//               <div className="overflow-x-auto">
//                 <table className="min-w-full table-auto border-collapse">
//                   <thead>
//                     <tr className="bg-gray-50">
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID no</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Certificate no</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ULR No.</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Customer Name</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Receive Date</th>
//                       <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Issue Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {searchResults.map((row) => (
//                       <tr key={row.id} className="hover:bg-gray-50">
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.id}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.name}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.idNo}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.certificateNo}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.ulrNo}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.customerName}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.receiveDate}</td>
//                         <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.issueDate}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Table Footer with Total Records */}
//               <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//                 <span>Total Records: {searchResults.length}</span>
//                 <span>Showing {searchResults.length} results</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ULRList;


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router';


// const Button = ({ onClick, className, children, ...props }) => (
//   <button
//     onClick={onClick}
//     className={className}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const ULRList = () => {

//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedCustomer, setSelectedCustomer] = useState('');
//   const [selectedCustomerId, setSelectedCustomerId] = useState('');
//   const [showTable] = useState(false);
//   const [searchResults] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [ulrLoading, setUlrLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate= useNavigate();

//   // Fetch customers from API
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         // Get token from local storage
//         const token = localStorage.getItem('authToken');
        
//         if (!token) {
//           throw new Error('Authentication token not found in local storage');
//         }

//         const response = await axios.get('https://lims.kailtech.in/api/people/get-all-customers', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         const data = response.data;
        
//         console.log('Customers API Response:', data);
        
//         // Different possible response structures handle karein
//         if (data && Array.isArray(data)) {
//           setCustomers(data);
//         } else if (data && data.data && Array.isArray(data.data)) {
//           setCustomers(data.data);
//         } else if (data && data.customers && Array.isArray(data.customers)) {
//           setCustomers(data.customers);
//         } else {
//           throw new Error('Invalid API response format');
//         }
//       } catch (err) {
//         console.error('Error fetching customers:', err);
//         setError(err.message || 'Failed to load customers. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Fetch ULR data function
//   const fetchULRData = async (startDate, customerId) => {
//     try {
//       const token = localStorage.getItem('authToken');
      
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }

//       const response = await axios.get(
//         `https://lims.kailtech.in/api/calibrationprocess/get-ulrno-list?startdate=${startDate}&customerid=${customerId}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       const data = response.data;
      
//       console.log('ULR API Response:', data);
      
//       if (data && data.success && Array.isArray(data.data)) {
//         return data.data;
//       } else {
//         throw new Error('Invalid ULR data response format');
//       }
//     } catch (err) {
//       console.error('Error fetching ULR data:', err);
//       throw err;
//     }
//   };

// const handleSearch = async () => {
//   if (!startDate || !endDate || !selectedCustomerId) {
//     alert('Please fill in all fields (Start Date, End Date, and Customer) before searching.');
//     return;
//   }

//   if (new Date(endDate) < new Date(startDate)) {
//     alert('End date must be after start date.');
//     return;
//   }

//   setUlrLoading(true);
//   setError('');

//   try {
//     console.log('Searching with:', { startDate, endDate, selectedCustomerId });

//     const ulrData = await fetchULRData(startDate, selectedCustomerId);

//     const formattedData = ulrData.map(item => ({
//       id: item.id,
//       name: item.name,
//       idNo: item.idno,
//       certificateNo: item.certificateno,
//       ulrNo: item.ulrno,
//       customerName: item.customername,
//       receiveDate: formatDate(item.inwarddate),
//       issueDate: formatDate(item.issuedate),
//       serialNo: item.serialno,
//     }));

//     // ✅ Navigate and pass results & filters to new page
//     navigate('/dashboards/calibration-process/ulr-details', {
//       state: {
//         results: formattedData,
//         filters: {
//           startDate,
//           endDate,
//           customerName: selectedCustomer,
//           customerId: selectedCustomerId,
//         },
//       },
//     });

//   } catch (err) {
//     console.error('Search error:', err);
//     setError('Failed to fetch ULR data.');
//     alert('Failed to fetch data. Please check your inputs and try again.');
//   } finally {
//     setUlrLoading(false);
//   }
// };


//   // Date formatting function
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
    
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
//     } catch (error) {
//       console.log(error)
//       return dateString;
//     }
//   };

//   // Function to format customer display name
//   const getCustomerDisplayName = (customer) => {
//     // Different possible customer object structures handle karein
//     if (customer.name && customer.mobile) {
//       return `${customer.name} (${customer.mobile})`;
//     } else if (customer.name && customer.phone) {
//       return `${customer.name} (${customer.phone})`;
//     } else if (customer.companyName && customer.contactNumber) {
//       return `${customer.companyName} (${customer.contactNumber})`;
//     } else if (customer.customerName && customer.phone) {
//       return `${customer.customerName} (${customer.phone})`;
//     } else if (customer.fullName && customer.mobileNumber) {
//       return `${customer.fullName} (${customer.mobileNumber})`;
//     } else if (customer.name) {
//       return customer.name;
//     } else if (customer.companyName) {
//       return customer.companyName;
//     } else if (customer.customerName) {
//       return customer.customerName;
//     }
//     return 'Unknown Customer';
//   };

//   // Function to get customer ID
//   const getCustomerId = (customer) => {
//     return customer.id || customer.customerId || customer._id;
//   };

//   // Handle customer selection change
//   const handleCustomerChange = (e) => {
//     const selectedValue = e.target.value;
//     setSelectedCustomer(selectedValue);
    
//     // Find the selected customer object and set its ID
//     const selectedCustomerObj = customers.find(customer => 
//       getCustomerDisplayName(customer) === selectedValue
//     );
    
//     if (selectedCustomerObj) {
//       setSelectedCustomerId(getCustomerId(selectedCustomerObj));
//     } else {
//       setSelectedCustomerId('');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100" style={{background:"none"}}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{background:"white"}}>
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h1 className="text-xl font-semibold text-gray-800">ULR List</h1>
//           </div>
//         </div>

//         {/* Search Form */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="p-6">
//             {/* First Row - Start Date and End Date */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {/* Start Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>

//               {/* End Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>
//             </div>

//             {/* Second Row - Customer and Search Button */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//               {/* Customer Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Customer
//                 </label>
//                 <select
//                   value={selectedCustomer}
//                   onChange={handleCustomerChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
//                   disabled={loading}
//                 >
//                   <option value="">Select Customer</option>
//                   {loading && <option value="">Loading customers...</option>}
//                   {error && <option value="">Error loading customers</option>}
//                   {customers.length === 0 && !loading && !error && (
//                     <option value="">No customers found</option>
//                   )}
//                   {customers.map((customer, index) => (
//                     <option key={getCustomerId(customer) || index} value={getCustomerDisplayName(customer)}>
//                       {getCustomerDisplayName(customer)}
//                     </option>
//                   ))}
//                 </select>
//                 {error && (
//                   <p className="text-red-500 text-xs mt-1">{error}</p>
//                 )}
//                 {!error && customers.length > 0 && (
//                   <p className="text-green-500 text-xs mt-1">
//                     {customers.length} customers loaded
//                     {selectedCustomerId && ` | Selected ID: ${selectedCustomerId}`}
//                   </p>
//                 )}
//               </div>

//               {/* Search Button */}
//               <div style={{width:"200px"}}>
//                 <Button
//   onClick={handleSearch}
//                   className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors w-full"
//                   disabled={loading || ulrLoading}
//                 >
//                   {ulrLoading ? 'Searching...' : (loading ? 'Loading...' : 'Search')}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar Container */}
//           <div className="px-6 pb-6">
//             <div className="w-full bg-gray-200 rounded-full h-2 relative">
//               <div className="bg-blue-500 h-2 rounded-full absolute left-0 top-0" style={{ width: '75%' }}></div>
//               {/* Left Arrow */}
//               <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
//                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               {/* Right Arrow */}
//               <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
//                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Table - Only show when search is performed */}
//         {showTable && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="p-6">
//               <h2 className="text-lg font-medium text-gray-800 mb-4">Search Results</h2>
              
//               {ulrLoading ? (
//                 <div className="text-center py-4">
//                   <p>Loading ULR data...</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Table */}
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full table-auto border-collapse">
//                       <thead>
//                         <tr className="bg-gray-50">
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID no</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Certificate no</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ULR No.</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Customer Name</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Receive Date</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Issue Date</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {searchResults.map((row) => (
//                           <tr key={row.id} className="hover:bg-gray-50">
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.id}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.name}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.idNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.certificateNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.ulrNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.customerName}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.receiveDate}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.issueDate}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Table Footer with Total Records */}
//                   <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//                     <span>Total Records: {searchResults.length}</span>
//                     <span>Showing {searchResults.length} results</span>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ULRList;




// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router';
// import Select from 'react-select'; // Import react-select

// const Button = ({ onClick, className, children, ...props }) => (
//   <button
//     onClick={onClick}
//     className={className}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const ULRList = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedCustomer, setSelectedCustomer] = useState(null); // Changed to null for react-select
//   const [selectedCustomerId, setSelectedCustomerId] = useState('');
//   const [showTable, setShowTable] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [ulrLoading, setUlrLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Fetch customers from API
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const token = localStorage.getItem('authToken');
        
//         if (!token) {
//           throw new Error('Authentication token not found in local storage');
//         }

//         const response = await axios.get('https://lims.kailtech.in/api/people/get-all-customers', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         const data = response.data;
        
//         console.log('Customers API Response:', data);
        
//         if (data && Array.isArray(data)) {
//           setCustomers(data);
//         } else if (data && data.data && Array.isArray(data.data)) {
//           setCustomers(data.data);
//         } else if (data && data.customers && Array.isArray(data.customers)) {
//           setCustomers(data.customers);
//         } else {
//           throw new Error('Invalid API response format');
//         }
//       } catch (err) {
//         console.error('Error fetching customers:', err);
//         setError(err.message || 'Failed to load customers. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Fetch ULR data function
//   const fetchULRData = async (startDate, customerId) => {
//     try {
//       const token = localStorage.getItem('authToken');
      
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }

//       const response = await axios.get(
//         `https://lims.kailtech.in/api/calibrationprocess/get-ulrno-list?startdate=${startDate}&customerid=${customerId}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       const data = response.data;
      
//       console.log('ULR API Response:', data);
      
//       if (data && data.success && Array.isArray(data.data)) {
//         return data.data;
//       } else {
//         throw new Error('Invalid ULR data response format');
//       }
//     } catch (err) {
//       console.error('Error fetching ULR data:', err);
//       throw err;
//     }
//   };

//   const handleSearch = async () => {
//     if (!startDate || !endDate || !selectedCustomerId) {
//       alert('Please fill in all fields (Start Date, End Date, and Customer) before searching.');
//       return;
//     }

//     if (new Date(endDate) < new Date(startDate)) {
//       alert('End date must be after start date.');
//       return;
//     }

//     setUlrLoading(true);
//     setError('');

//     try {
//       console.log('Searching with:', { startDate, endDate, selectedCustomerId });

//       const ulrData = await fetchULRData(startDate, selectedCustomerId);

//       const formattedData = ulrData.map(item => ({
//         id: item.id,
//         name: item.name,
//         idNo: item.idno,
//         certificateNo: item.certificateno,
//         ulrNo: item.ulrno,
//         customerName: item.customername,
//         receiveDate: formatDate(item.inwarddate),
//         issueDate: formatDate(item.issuedate),
//         serialNo: item.serialno,
//       }));

//       setSearchResults(formattedData);
//       setShowTable(true);

//       navigate('/dashboards/calibration-process/ulr-details', {
//         state: {
//           results: formattedData,
//           filters: {
//             startDate,
//             endDate,
//             customerName: selectedCustomer ? selectedCustomer.label : '',
//             customerId: selectedCustomerId,
//           },
//         },
//       });

//     } catch (err) {
//       console.error('Search error:', err);
//       setError('Failed to fetch ULR data.');
//       alert('Failed to fetch data. Please check your inputs and try again.');
//     } finally {
//       setUlrLoading(false);
//     }
//   };

//   // Date formatting function
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
    
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
//     } catch (error) {
//       console.log(error);
//       return dateString;
//     }
//   };

//   // Function to format customer display name
//   const getCustomerDisplayName = (customer) => {
//     if (customer.name && customer.mobile) {
//       return `${customer.name} (${customer.mobile})`;
//     } else if (customer.name && customer.phone) {
//       return `${customer.name} (${customer.phone})`;
//     } else if (customer.companyName && customer.contactNumber) {
//       return `${customer.companyName} (${customer.contactNumber})`;
//     } else if (customer.customerName && customer.phone) {
//       return `${customer.customerName} (${customer.phone})`;
//     } else if (customer.fullName && customer.mobileNumber) {
//       return `${customer.fullName} (${customer.mobileNumber})`;
//     } else if (customer.name) {
//       return customer.name;
//     } else if (customer.companyName) {
//       return customer.companyName;
//     } else if (customer.customerName) {
//       return customer.customerName;
//     }
//     return 'Unknown Customer';
//   };

//   // Function to get customer ID
//   const getCustomerId = (customer) => {
//     return customer.id || customer.customerId || customer._id;
//   };

//   // Handle customer selection change for react-select
//   const handleCustomerChange = (selectedOption) => {
//     setSelectedCustomer(selectedOption);
//     if (selectedOption) {
//       const selectedCustomerObj = customers.find(customer =>
//         getCustomerDisplayName(customer) === selectedOption.label
//       );
//       setSelectedCustomerId(selectedCustomerObj ? getCustomerId(selectedCustomerObj) : '');
//     } else {
//       setSelectedCustomerId('');
//     }
//   };

//   // Prepare options for react-select
//   const customerOptions = customers.map(customer => ({
//     value: getCustomerId(customer),
//     label: getCustomerDisplayName(customer),
//   }));

//   return (
//     <div className="min-h-screen bg-gray-100" style={{ background: "none" }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: "white" }}>
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h1 className="text-xl font-semibold text-gray-800">ULR List</h1>
//           </div>
//         </div>

//         {/* Search Form */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="p-6">
//             {/* First Row - Start Date and End Date */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {/* Start Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>

//               {/* End Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>
//             </div>

//             {/* Second Row - Customer and Search Button */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//               {/* Customer Dropdown with react-select */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Customer
//                 </label>
//                 <Select
//                   value={selectedCustomer}
//                   onChange={handleCustomerChange}
//                   options={customerOptions}
//                   isLoading={loading}
//                   isDisabled={loading}
//                   placeholder={loading ? 'Loading customers...' : error ? 'Error loading customers' : 'Select Customer'}
//                   noOptionsMessage={() => (customers.length === 0 && !loading && !error ? 'No customers found' : 'Type to search')}
//                   className="w-full text-sm"
//                   classNamePrefix="react-select"
//                   styles={{
//                     control: (base) => ({
//                       ...base,
//                       borderRadius: '0.375rem',
//                       borderColor: '#d1d5db',
//                       '&:hover': { borderColor: '#93c5fd' },
//                       boxShadow: 'none',
//                       '&:focus-within': {
//                         borderColor: '#3b82f6',
//                         boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
//                       },
//                     }),
//                     menu: (base) => ({
//                       ...base,
//                       maxHeight: '200px',
//                       overflowY: 'auto',
//                     }),
//                   }}
//                 />
//                 {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//                 {!error && customers.length > 0 && (
//                   <p className="text-green-500 text-xs mt-1">
//                     {customers.length} customers loaded
//                     {selectedCustomerId && ` | Selected ID: ${selectedCustomerId}`}
//                   </p>
//                 )}
//               </div>

//               {/* Search Button */}
//               <div style={{ width: "200px" }}>
//                 <Button
//                   onClick={handleSearch}
//                   className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors w-full"
//                   disabled={loading || ulrLoading}
//                 >
//                   {ulrLoading ? 'Searching...' : (loading ? 'Loading...' : 'Search')}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar Container */}
//           <div className="px-6 pb-6">
//             <div className="w-full bg-gray-200 rounded-full h-2 relative">
//               <div className="bg-blue-500 h-2 rounded-full absolute left-0 top-0" style={{ width: '75%' }}></div>
//               {/* Left Arrow */}
//               <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
//                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               {/* Right Arrow */}
//               <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
//                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Table - Only show when search is performed */}
//         {showTable && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="p-6">
//               <h2 className="text-lg font-medium text-gray-800 mb-4">Search Results</h2>
              
//               {ulrLoading ? (
//                 <div className="text-center py-4">
//                   <p>Loading ULR data...</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Table */}
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full table-auto border-collapse">
//                       <thead>
//                         <tr className="bg-gray-50">
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID no</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Certificate no</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ULR No.</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Customer Name</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Receive Date</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Issue Date</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {searchResults.map((row) => (
//                           <tr key={row.id} className="hover:bg-gray-50">
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.id}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.name}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.idNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.certificateNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.ulrNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.customerName}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.receiveDate}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.issueDate}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Table Footer with Total Records */}
//                   <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//                     <span>Total Records: {searchResults.length}</span>
//                     <span>Showing {searchResults.length} results</span>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ULRList;

//---------------------correct ---------------

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// //import { useNavigate } from 'react-router';
// import Select from 'react-select'; // Import react-select

// const Button = ({ onClick, className, children, ...props }) => (
//   <button
//     onClick={onClick}
//     className={className}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const ULRList = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedCustomer, setSelectedCustomer] = useState(null); // Changed to null for react-select
//   const [selectedCustomerId, setSelectedCustomerId] = useState('');
//   const [showTable, setShowTable] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [ulrLoading, setUlrLoading] = useState(false);
//   const [error, setError] = useState('');
//  // const navigate = useNavigate();

//   // Fetch customers from API
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const token = localStorage.getItem('authToken');
        
//         if (!token) {
//           throw new Error('Authentication token not found in local storage');
//         }

//         const response = await axios.get('https://lims.kailtech.in/api/people/get-all-customers', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         const data = response.data;
        
//         console.log('Customers API Response:', data);
        
//         if (data && Array.isArray(data)) {
//           setCustomers(data);
//         } else if (data && data.data && Array.isArray(data.data)) {
//           setCustomers(data.data);
//         } else if (data && data.customers && Array.isArray(data.customers)) {
//           setCustomers(data.customers);
//         } else {
//           throw new Error('Invalid API response format');
//         }
//       } catch (err) {
//         console.error('Error fetching customers:', err);
//         setError(err.message || 'Failed to load customers. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Fetch ULR data function
// // Fetch ULR data function
//   const fetchULRData = async (startDate, endDate, customerId) => {
//     try {
//       const token = localStorage.getItem('authToken');
      
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }

//       const response = await axios.get(
//         `https://lims.kailtech.in/api/calibrationprocess/get-ulrno-list?startdate=${startDate}&enddate=${endDate}&customerid=${customerId}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       const data = response.data;
      
//       console.log('ULR API Response:', data);
      
//       if (data && data.success && Array.isArray(data.data)) {
//         return data.data;
//       } else {
//         throw new Error('Invalid ULR data response format');
//       }
//     } catch (err) {
//       console.error('Error fetching ULR data:', err);
//       throw err;
//     }
//   };

//   const handleSearch = async () => {
//     if (!startDate || !endDate || !selectedCustomerId) {
//       alert('Please fill in all fields (Start Date, End Date, and Customer) before searching.');
//       return;
//     }

//     if (new Date(endDate) < new Date(startDate)) {
//       alert('End date must be after start date.');
//       return;
//     }

//     setUlrLoading(true);
//     setError('');
//     setShowTable(false); // Reset table visibility during loading

//     try {
//       console.log('Searching with:', { startDate, endDate, selectedCustomerId });

//       const ulrData = await fetchULRData(startDate, selectedCustomerId);

//       const formattedData = ulrData.map(item => ({
//         id: item.id,
//         name: item.name,
//         idNo: item.idno,
//         certificateNo: item.certificateno,
//         ulrNo: item.ulrno,
//         customerName: item.customername,
//         receiveDate: formatDate(item.inwarddate),
//         issueDate: formatDate(item.issuedate),
//         serialNo: item.serialno,
//       }));

//       setSearchResults(formattedData);
//       setShowTable(true);

//     } catch (err) {
//       console.error('Search error:', err);
//       setError('Failed to fetch ULR data.');
//       alert('Failed to fetch data. Please check your inputs and try again.');
//     } finally {
//       setUlrLoading(false);
//     }
//   };

//   // Date formatting function
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
    
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
//     } catch (error) {
//       console.log(error);
//       return dateString;
//     }
//   };

//   // Function to format customer display name
//   const getCustomerDisplayName = (customer) => {
//     if (customer.name && customer.mobile) {
//       return `${customer.name} (${customer.mobile})`;
//     } else if (customer.name && customer.phone) {
//       return `${customer.name} (${customer.phone})`;
//     } else if (customer.companyName && customer.contactNumber) {
//       return `${customer.companyName} (${customer.contactNumber})`;
//     } else if (customer.customerName && customer.phone) {
//       return `${customer.customerName} (${customer.phone})`;
//     } else if (customer.fullName && customer.mobileNumber) {
//       return `${customer.fullName} (${customer.mobileNumber})`;
//     } else if (customer.name) {
//       return customer.name;
//     } else if (customer.companyName) {
//       return customer.companyName;
//     } else if (customer.customerName) {
//       return customer.customerName;
//     }
//     return 'Unknown Customer';
//   };

//   // Function to get customer ID
//   const getCustomerId = (customer) => {
//     return customer.id || customer.customerId || customer._id;
//   };

//   // Handle customer selection change for react-select
//   const handleCustomerChange = (selectedOption) => {
//     setSelectedCustomer(selectedOption);
//     if (selectedOption) {
//       const selectedCustomerObj = customers.find(customer =>
//         getCustomerDisplayName(customer) === selectedOption.label
//       );
//       setSelectedCustomerId(selectedCustomerObj ? getCustomerId(selectedCustomerObj) : '');
//     } else {
//       setSelectedCustomerId('');
//     }
//   };

//   // Prepare options for react-select
//   const customerOptions = customers.map(customer => ({
//     value: getCustomerId(customer),
//     label: getCustomerDisplayName(customer),
//   }));

//   return (
//     <div className="min-h-screen bg-gray-100" style={{ background: "none" }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: "white" }}>
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h1 className="text-xl font-semibold text-gray-800">ULR List</h1>
//           </div>
//         </div>

//         {/* Search Form */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="p-6">
//             {/* First Row - Start Date and End Date */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               {/* Start Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>

//               {/* End Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                 />
//               </div>
//             </div>

//             {/* Second Row - Customer and Search Button */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//               {/* Customer Dropdown with react-select */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Customer
//                 </label>
//                 <Select
//                   value={selectedCustomer}
//                   onChange={handleCustomerChange}
//                   options={customerOptions}
//                   isLoading={loading}
//                   isDisabled={loading}
//                   placeholder={loading ? 'Loading customers...' : error ? 'Error loading customers' : 'Select Customer'}
//                   noOptionsMessage={() => (customers.length === 0 && !loading && !error ? 'No customers found' : 'Type to search')}
//                   className="w-full text-sm"
//                   classNamePrefix="react-select"
//                   styles={{
//                     control: (base) => ({
//                       ...base,
//                       borderRadius: '0.375rem',
//                       borderColor: '#d1d5db',
//                       '&:hover': { borderColor: '#93c5fd' },
//                       boxShadow: 'none',
//                       '&:focus-within': {
//                         borderColor: '#3b82f6',
//                         boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
//                       },
//                     }),
//                     menu: (base) => ({
//                       ...base,
//                       maxHeight: '200px',
//                       overflowY: 'auto',
//                     }),
//                   }}
//                 />
//                 {/* {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//                 {!error && customers.length > 0 && (
//                   <p className="text-green-500 text-xs mt-1">
//                     {customers.length} customers loaded
//                     {selectedCustomerId && ` | Selected ID: ${selectedCustomerId}`}
//                   </p>
//                 )} */}
//               </div>

//               {/* Search Button */}
//               <div style={{ width: "200px" }}>
//                 <Button
//                   onClick={handleSearch}
//                   className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors w-full"
//                   disabled={loading || ulrLoading}
//                 >
//                   {ulrLoading ? 'Searching...' : (loading ? 'Loading...' : 'Search')}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar Container */}
//           <div className="px-6 pb-6">
//             <div className="w-full bg-gray-200 rounded-full h-2 relative">
//               <div className="bg-blue-500 h-2 rounded-full absolute left-0 top-0" style={{ width: '75%' }}></div>
//               {/* Left Arrow */}
//               <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
//                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               {/* Right Arrow */}
//               <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
//                 <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Table - Only show when search is performed */}
//         {showTable && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             <div className="p-6">
//               <h2 className="text-lg font-medium text-gray-800 mb-4">Search Results</h2>
              
//               {ulrLoading ? (
//                 <div className="text-center py-4">
//                   <p>Loading ULR data...</p>
//                 </div>
//               ) : (
//                 <>
//                   {/* Table */}
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full table-auto border-collapse">
//                       <thead>
//                         <tr className="bg-gray-50">
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID no</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Certificate no</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ULR No.</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Customer Name</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Receive Date</th>
//                           <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Issue Date</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {searchResults.map((row) => (
//                           <tr key={row.id} className="hover:bg-gray-50">
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.id}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.name}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.idNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.certificateNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.ulrNo}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.customerName}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.receiveDate}</td>
//                             <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.issueDate}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Table Footer with Total Records */}
//                   <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//                     <span>Total Records: {searchResults.length}</span>
//                     <span>Showing {searchResults.length} results</span>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ULRList;

import { useState, useEffect } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router';
import Select from 'react-select'; // Import react-select

const Button = ({ onClick, className, children, ...props }) => (
  <button
    onClick={onClick}
    className={className}
    {...props}
  >
    {children}
  </button>
);

const ULRList = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Changed to null for react-select
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ulrLoading, setUlrLoading] = useState(false);
  const [error, setError] = useState('');
 // const navigate = useNavigate();

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('Authentication token not found in local storage');
        }

        const response = await axios.get('https://lims.kailtech.in/api/people/get-all-customers', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = response.data;
        
        console.log('Customers API Response:', data);
        
        if (data && Array.isArray(data)) {
          setCustomers(data);
        } else if (data && data.data && Array.isArray(data.data)) {
          setCustomers(data.data);
        } else if (data && data.customers && Array.isArray(data.customers)) {
          setCustomers(data.customers);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError(err.message || 'Failed to load customers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch ULR data function
  const fetchULRData = async (startDate, endDate, customerId) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(
        `https://lims.kailtech.in/api/calibrationprocess/get-ulrno-list?startdate=${startDate}&enddate=${endDate}&customerid=${customerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = response.data;
      
      console.log('ULR API Response:', data);
      
      if (data && data.success && Array.isArray(data.data)) {
        return data.data;
      } else {
        throw new Error('Invalid ULR data response format');
      }
    } catch (err) {
      console.error('Error fetching ULR data:', err);
      throw err;
    }
  };

  const handleSearch = async () => {
    if (!startDate || !endDate || !selectedCustomerId) {
      alert('Please fill in all fields (Start Date, End Date, and Customer) before searching.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert('End date must be after start date.');
      return;
    }

    setUlrLoading(true);
    setError('');
    setShowTable(false); // Reset table visibility during loading

    try {
      console.log('Searching with:', { startDate, endDate, selectedCustomerId });

      // FIXED: Pass all three parameters in correct order
      const ulrData = await fetchULRData(startDate, endDate, selectedCustomerId);

      const formattedData = ulrData.map(item => ({
        id: item.id,
        name: item.name,
        idNo: item.idno,
        certificateNo: item.certificateno,
        ulrNo: item.ulrno,
        customerName: item.customername,
        receiveDate: formatDate(item.inwarddate),
        issueDate: formatDate(item.issuedate),
        serialNo: item.serialno,
      }));

      setSearchResults(formattedData);
      setShowTable(true);

    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch ULR data.');
      alert('Failed to fetch data. Please check your inputs and try again.');
    } finally {
      setUlrLoading(false);
    }
  };

  // Date formatting function - DD/MM/YYYY format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.log(error);
      return dateString;
    }
  };

  // Function to format customer display name
  const getCustomerDisplayName = (customer) => {
    if (customer.name && customer.mobile) {
      return `${customer.name} (${customer.mobile})`;
    } else if (customer.name && customer.phone) {
      return `${customer.name} (${customer.phone})`;
    } else if (customer.companyName && customer.contactNumber) {
      return `${customer.companyName} (${customer.contactNumber})`;
    } else if (customer.customerName && customer.phone) {
      return `${customer.customerName} (${customer.phone})`;
    } else if (customer.fullName && customer.mobileNumber) {
      return `${customer.fullName} (${customer.mobileNumber})`;
    } else if (customer.name) {
      return customer.name;
    } else if (customer.companyName) {
      return customer.companyName;
    } else if (customer.customerName) {
      return customer.customerName;
    }
    return 'Unknown Customer';
  };

  // Function to get customer ID
  const getCustomerId = (customer) => {
    return customer.id || customer.customerId || customer._id;
  };

  // Handle customer selection change for react-select
  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption);
    if (selectedOption) {
      const selectedCustomerObj = customers.find(customer =>
        getCustomerDisplayName(customer) === selectedOption.label
      );
      setSelectedCustomerId(selectedCustomerObj ? getCustomerId(selectedCustomerObj) : '');
    } else {
      setSelectedCustomerId('');
    }
  };

  // Prepare options for react-select
  const customerOptions = customers.map(customer => ({
    value: getCustomerId(customer),
    label: getCustomerDisplayName(customer),
  }));

  return (
    <div className="min-h-screen bg-gray-100" style={{ background: "none" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: "white" }}>
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">ULR List</h1>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            {/* First Row - Start Date and End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Second Row - Customer and Search Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              {/* Customer Dropdown with react-select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer
                </label>
                <Select
                  value={selectedCustomer}
                  onChange={handleCustomerChange}
                  options={customerOptions}
                  isLoading={loading}
                  isDisabled={loading}
                  placeholder={loading ? 'Loading customers...' : error ? 'Error loading customers' : 'Select Customer'}
                  noOptionsMessage={() => (customers.length === 0 && !loading && !error ? 'No customers found' : 'Type to search')}
                  className="w-full text-sm"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.375rem',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#93c5fd' },
                      boxShadow: 'none',
                      '&:focus-within': {
                        borderColor: '#3b82f6',
                        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: '200px',
                      overflowY: 'auto',
                    }),
                  }}
                />
              </div>

              {/* Search Button */}
              <div style={{ width: "200px" }}>
                <Button
                  onClick={handleSearch}
                  className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors w-full"
                  disabled={loading || ulrLoading}
                >
                  {ulrLoading ? 'Searching...' : (loading ? 'Loading...' : 'Search')}
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="px-6 pb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 relative">
              <div className="bg-blue-500 h-2 rounded-full absolute left-0 top-0" style={{ width: '75%' }}></div>
              {/* Left Arrow */}
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {/* Right Arrow */}
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-300 hover:bg-gray-400 rounded-full p-1 transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Results Table - Only show when search is performed */}
        {showTable && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Search Results</h2>
              
              {ulrLoading ? (
                <div className="text-center py-4">
                  <p>Loading ULR data...</p>
                </div>
              ) : (
                <>
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ID no</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Certificate no</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">ULR No.</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Customer Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Receive Date</th>
                          <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Issue Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.idNo}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.certificateNo}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.ulrNo}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.customerName}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.receiveDate}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{row.issueDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer with Total Records */}
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                    <span>Total Records: {searchResults.length}</span>
                    <span>Showing {searchResults.length} results</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ULRList;