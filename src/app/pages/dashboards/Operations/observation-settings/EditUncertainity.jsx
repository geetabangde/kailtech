// import { useState } from 'react';
// import Select from 'react-select';

// // Assuming you have fieldnameOptions fetched similarly as in your main code.
// // If not, you can pass it as a prop or fetch inside this component.

// export default function NewTableUI({ fieldnameOptions = [] }) {
//   const [rows, setRows] = useState([]);

//   // Custom styles for React Select (copied from your code)
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: '42px',
//       borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
//       boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
//       '&:hover': {
//         borderColor: '#3b82f6'
//       }
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50
//     })
//   };

//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: false, // Default unchecked
//     fieldname: null, // For select
//     fieldHeading: '',
//     formula: '',
//     fieldPosition: ''
//   });

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows(rows.map(row =>
//       row.id === id ? { ...row, checked: !row.checked } : row
//     ));
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows(rows.map(row =>
//       row.id === id ? { ...row, [field]: value } : row
//     ));
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows(rows.map(row =>
//       row.id === id ? { ...row, [field]: selectedOption } : row
//     ));
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   // Function to get the payload data for this table (only include checked rows)
// //   const getTablePayload = () => {
// //     return rows
// //       .filter(row => row.checked && row.fieldname?.value) // Only checked rows with fieldname
// //       .map(row => ({
// //         fieldname: row.fieldname.value,
// //         field_heading: row.fieldHeading,
// //         formula: row.formula,
// //         field_position: parseInt(row.fieldPosition) || 0,
// //       }));
// //   };

//   // You can call getTablePayload() when saving, and add it to your main payload, e.g., resultsetting.new_settings = getTablePayload();

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="p-4 border-b border-gray-200">
//         <h1 className="text-2xl font-bold text-gray-800">New Table Settings</h1>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">S. No.</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Checkbox</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Fieldname</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Field Heading</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Formula</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Field Position</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row) => (
//               <tr key={row.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-3 text-sm">{row.id}</td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="checkbox"
//                     checked={row.checked}
//                     onChange={() => handleCheckbox(row.id)}
//                     className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <Select
//                     value={row.fieldname}
//                     onChange={(selectedOption) => handleSelectChange(row.id, 'fieldname', selectedOption)}
//                     options={fieldnameOptions}
//                     placeholder="Select fieldname..."
//                     isClearable
//                     styles={customSelectStyles}
//                     menuPortalTarget={document.body}
//                     menuPosition="fixed"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="text"
//                     value={row.fieldHeading}
//                     onChange={(e) => handleInputChange(row.id, 'fieldHeading', e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                     placeholder="heading"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="text"
//                     value={row.formula}
//                     onChange={(e) => handleInputChange(row.id, 'formula', e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                     placeholder="formula"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="text"
//                     value={row.fieldPosition}
//                     onChange={(e) => handleInputChange(row.id, 'fieldPosition', e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                     placeholder="position"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="p-4 border-t flex justify-end">
//         <button
//           onClick={addRow}
//           className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//         >
//           Add Row
//         </button>
//       </div>
//     </div>
//   );
// }





// import { useState } from "react";
// import Select from "react-select";

// export default function NewTableUI({ fieldnameOptions = [] }) {
//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: false,
//     fieldname: null,
//     fieldHeading: "",
//     formula: "",
//     fieldPosition: "",
//   });

//   // ✅ Initialize with one default row
//   const [rows, setRows] = useState([createEmptyRow(1)]);

//   // Custom styles for React Select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "42px",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
//         : "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50,
//     }),
//   };

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, checked: !row.checked } : row
//       )
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: selectedOption } : row
//       )
//     );
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="p-4 border-b border-gray-200">
//         <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainity Setting</h1>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                 S. No.
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                 Checkbox
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                 Fieldname
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                 Field Heading
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                 Formula
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                 Field Position
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row) => (
//               <tr key={row.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-3 text-sm">{row.id}</td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="checkbox"
//                     checked={row.checked}
//                     onChange={() => handleCheckbox(row.id)}
//                     className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <Select
//                     value={row.fieldname}
//                     onChange={(selectedOption) =>
//                       handleSelectChange(row.id, "fieldname", selectedOption)
//                     }
//                     options={fieldnameOptions}
//                     placeholder="Select fieldname..."
//                     isClearable
//                     styles={customSelectStyles}
//                     menuPortalTarget={document.body}
//                     menuPosition="fixed"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="text"
//                     value={row.fieldHeading}
//                     onChange={(e) =>
//                       handleInputChange(row.id, "fieldHeading", e.target.value)
//                     }
//                     className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                     placeholder="heading"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="text"
//                     value={row.formula}
//                     onChange={(e) =>
//                       handleInputChange(row.id, "formula", e.target.value)
//                     }
//                     className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                     placeholder="formula"
//                   />
//                 </td>
//                 <td className="px-4 py-3">
//                   <input
//                     type="text"
//                     value={row.fieldPosition}
//                     onChange={(e) =>
//                       handleInputChange(row.id, "fieldPosition", e.target.value)
//                     }
//                     className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                     placeholder="position"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="p-4 border-t flex justify-end">
//         <button
//           onClick={addRow}
//           className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//         >
//           Add Row
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import axios from "axios";
// import Select from "react-select";

// export default function NewTableUI() {
//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: false,
//     fieldname: null,
//     fieldHeading: "",
//     formula: "",
//     fieldPosition: "",
//   });

//   // ✅ Initialize with one default row
//   const [rows, setRows] = useState([createEmptyRow(1)]);
//   const [fieldnameOptions, setFieldnameOptions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch fieldname options on component mount
//   useEffect(() => {
//     fetchFieldnameOptions();
//   }, []);

//   const fetchFieldnameOptions = async () => {
//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/get-all-summary-type',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success && response.data.data) {
//         const options = response.data.data.map(fieldname => ({
//           value: fieldname,
//           label: fieldname
//         }));
//         setFieldnameOptions(options);
//       }
//     } catch (error) {
//       console.error('Error fetching fieldname options:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Custom styles for React Select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "42px",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
//         : "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50,
//     }),
//   };

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, checked: !row.checked } : row
//       )
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: selectedOption } : row
//       )
//     );
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="p-4 border-b border-gray-200">
//         <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainity Setting</h1>
//       </div>

//       {loading ? (
//         <div className="p-8 text-center text-gray-500">Loading fieldname options...</div>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                     S. No.
//                   </th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                     Checkbox
//                   </th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                     Fieldname
//                   </th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                     Field Heading
//                   </th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                     Formula
//                   </th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                     Field Position
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row) => (
//                   <tr key={row.id} className="border-b hover:bg-gray-50">
//                     <td className="px-4 py-3 text-sm">{row.id}</td>
//                     <td className="px-4 py-3">
//                       <input
//                         type="checkbox"
//                         checked={row.checked}
//                         onChange={() => handleCheckbox(row.id)}
//                         className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                       />
//                     </td>
//                     <td className="px-4 py-3">
//                       <Select
//                         value={row.fieldname}
//                         onChange={(selectedOption) =>
//                           handleSelectChange(row.id, "fieldname", selectedOption)
//                         }
//                         options={fieldnameOptions}
//                         placeholder="Select fieldname..."
//                         isClearable
//                         styles={customSelectStyles}
//                         menuPortalTarget={document.body}
//                         menuPosition="fixed"
//                       />
//                     </td>
//                     <td className="px-4 py-3">
//                       <input
//                         type="text"
//                         value={row.fieldHeading}
//                         onChange={(e) =>
//                           handleInputChange(row.id, "fieldHeading", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                         placeholder="heading"
//                       />
//                     </td>
//                     <td className="px-4 py-3">
//                       <input
//                         type="text"
//                         value={row.formula}
//                         onChange={(e) =>
//                           handleInputChange(row.id, "formula", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                         placeholder="formula"
//                       />
//                     </td>
//                     <td className="px-4 py-3">
//                       <input
//                         type="text"
//                         value={row.fieldPosition}
//                         onChange={(e) =>
//                           handleInputChange(row.id, "fieldPosition", e.target.value)
//                         }
//                         className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                         placeholder="position"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="p-4 border-t flex justify-end">
//             <button
//               onClick={addRow}
//               className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//             >
//               Add Row
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Select from "react-select";

// export default function NewTableUI() {
//   const { id: formatId } = useParams();
  
//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: false,
//     fieldname: null,
//     fieldHeading: "",
//     formula: "",
//     fieldPosition: "",
//   });

//   // ✅ Initialize with one default row
//   const [rows, setRows] = useState([createEmptyRow(1)]);
//   const [fieldnameOptions, setFieldnameOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fetch fieldname options on component mount
//   useEffect(() => {
//     fetchFieldnameOptions();
//   }, []);

//   const fetchFieldnameOptions = async () => {
//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/get-all-summary-type',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success && response.data.data) {
//         const options = response.data.data.map(fieldname => ({
//           value: fieldname,
//           label: fieldname
//         }));
//         setFieldnameOptions(options);
//       }
//     } catch (error) {
//       console.error('Error fetching fieldname options:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Custom styles for React Select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "42px",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
//         : "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50,
//     }),
//   };

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, checked: !row.checked } : row
//       )
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: selectedOption } : row
//       )
//     );
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   const handleSave = async () => {
//     if (!formatId) {
//       alert('Format ID is missing!');
//       return;
//     }

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');

//       // Transform rows data to match API format
//       const uncertainty_settings = rows
//         .filter(row => row.fieldname && row.fieldname.value) // Only include rows with fieldname
//         .map(row => ({
//           fieldname: row.fieldname.value,
//           field_heading: row.fieldHeading,
//           formula: row.formula,
//           field_position: parseInt(row.fieldPosition) || 0,
//           checkbox: row.checked ? 'yes' : 'no'
//         }));

//       // Prepare payload
//       const payload = {
//         observation_id: parseInt(formatId),
//         uncertainty_settings: uncertainty_settings
//       };

//       console.log('Sending payload:', payload);

//       // Make POST request
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/update-uncertainty-setting',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success) {
//         setSuccessMessage('Data saved successfully!');
//         console.log('Response:', response.data);
//         // Hide message after 3 seconds
//         setTimeout(() => setSuccessMessage(''), 3000);
//       } else {
//         alert('Failed to save data. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error saving uncertainty settings:', error);
//       alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save data'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!formatId) {
//     return <div className="p-6 text-red-600">Invalid format ID.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainity Setting</h1>
//           </div>

//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading fieldname options...</div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         S. No.
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Checkbox
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Fieldname
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Heading
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Formula
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Position
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row) => (
//                       <tr key={row.id} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm">{row.id}</td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="checkbox"
//                             checked={row.checked}
//                             onChange={() => handleCheckbox(row.id)}
//                             className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <Select
//                             value={row.fieldname}
//                             onChange={(selectedOption) =>
//                               handleSelectChange(row.id, "fieldname", selectedOption)
//                             }
//                             options={fieldnameOptions}
//                             placeholder="Select fieldname..."
//                             isClearable
//                             styles={customSelectStyles}
//                             menuPortalTarget={document.body}
//                             menuPosition="fixed"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldHeading}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldHeading", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="heading"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.formula}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "formula", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="formula"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldPosition}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldPosition", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="position"
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="p-4 border-t flex justify-end">
//                 <button
//                   onClick={addRow}
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//                 >
//                   Add Row
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="flex flex-col items-end gap-2">
//           <div>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {loading ? 'Saving...' : 'Save All'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Toast-style Success Message - Center of Screen */}
//       {successMessage && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//           <div className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-semibold shadow-2xl animate-bounce">
//             {successMessage}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Select from "react-select";

// export default function NewTableUI() {
//   const { id: formatId } = useParams();
  
//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: true, // default "yes"
//     fieldname: null,
//     fieldHeading: "",
//     formula: "",
//     fieldPosition: "",
//   });

//   // ✅ Initialize with one default row
//   const [rows, setRows] = useState([createEmptyRow(1)]);
//   const [fieldnameOptions, setFieldnameOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fetch fieldname options on component mount
//   useEffect(() => {
//     fetchFieldnameOptions();
//   }, []);

//   const fetchFieldnameOptions = async () => {
//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/get-all-summary-type',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success && response.data.data) {
//         const options = response.data.data.map(fieldname => ({
//           value: fieldname,
//           label: fieldname
//         }));
//         setFieldnameOptions(options);
//       }
//     } catch (error) {
//       console.error('Error fetching fieldname options:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Custom styles for React Select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "42px",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
//         : "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50,
//     }),
//   };

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, checked: !row.checked } : row
//       )
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: selectedOption } : row
//       )
//     );
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   const handleSave = async () => {
//     if (!formatId) {
//       alert('Format ID is missing!');
//       return;
//     }

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');

//       // Transform rows data to match API format exactly as shown in Postman
//       const uncertaintysetting = rows
//         .filter(row => row.fieldname && row.fieldname.value) // Only include rows with fieldname
//         .map(row => ({
//           fieldname: row.fieldname.value,
//           field_heading: row.fieldHeading,
//           field_position: parseInt(row.fieldPosition) || 0,
//           formula: row.formula,
//           checkbox: row.checked ? 'yes' : 'no'
//         }));

//       // Prepare payload - exact structure as your Postman
//       const payload = {
//         observation_id: parseInt(formatId),
//         resultsetting: {
//           uncertaintysetting: uncertaintysetting
//         }
//       };

//       console.log('Sending payload:', payload);

//       // Make POST request to the correct endpoint
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/set-uncertainty-setting',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success) {
//         setSuccessMessage('Observation setting updated successfully!');
//         console.log('Response:', response.data);
//         // Hide message after 3 seconds
//         setTimeout(() => setSuccessMessage(''), 3000);
//       } else {
//         alert('Failed to save data. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error saving uncertainty settings:', error);
//       alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save data'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!formatId) {
//     return <div className="p-6 text-red-600">Invalid format ID.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainity Setting</h1>
//           </div>

//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading fieldname options...</div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         S. No.
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Checkbox
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Fieldname
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Heading
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Formula
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Position
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row) => (
//                       <tr key={row.id} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm">{row.id}</td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-4">
//                             <label className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name={`checkbox-${row.id}`}
//                                 checked={row.checked === true}
//                                 onChange={() => {
//                                   if (!row.checked) handleCheckbox(row.id);
//                                 }}
//                                 className="w-4 h-4 text-blue-600"
//                               />
//                               <span className="text-sm">Yes</span>
//                             </label>
//                             <label className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name={`checkbox-${row.id}`}
//                                 checked={row.checked === false}
//                                 onChange={() => {
//                                   if (row.checked) handleCheckbox(row.id);
//                                 }}
//                                 className="w-4 h-4 text-blue-600"
//                               />
//                               <span className="text-sm">No</span>
//                             </label>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <Select
//                             value={row.fieldname}
//                             onChange={(selectedOption) =>
//                               handleSelectChange(row.id, "fieldname", selectedOption)
//                             }
//                             options={fieldnameOptions}
//                             placeholder="Select fieldname..."
//                             isClearable
//                             styles={customSelectStyles}
//                             menuPortalTarget={document.body}
//                             menuPosition="fixed"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldHeading}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldHeading", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="heading"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.formula}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "formula", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="formula"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldPosition}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldPosition", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="position"
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="p-4 border-t flex justify-end">
//                 <button
//                   onClick={addRow}
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//                 >
//                   Add Row
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="flex flex-col items-end gap-2">
//           <div>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {loading ? 'Saving...' : 'Save All'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Toast-style Success Message - Center of Screen */}
//       {successMessage && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//           <div className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-semibold shadow-2xl animate-bounce">
//             {successMessage}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Select from "react-select";

// export default function NewTableUI() {
//   const { id: formatId } = useParams();
  
//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: true, // default "yes"
//     fieldname: null,
//     fieldHeading: "",
//     formula: "",
//     fieldPosition: "",
//   });

//   // ✅ Initialize with one default row
//   const [rows, setRows] = useState([createEmptyRow(1)]);
//   const [fieldnameOptions, setFieldnameOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fetch fieldname options on component mount
//   useEffect(() => {
//     fetchFieldnameOptions();
//   }, []);

//   const fetchFieldnameOptions = async () => {
//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/get-all-summary-type',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success && response.data.data) {
//         const options = response.data.data.map(fieldname => ({
//           value: fieldname,
//           label: fieldname
//         }));
//         setFieldnameOptions(options);
//       }
//     } catch (error) {
//       console.error('Error fetching fieldname options:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Custom styles for React Select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "42px",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
//         : "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50,
//     }),
//   };

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, checked: !row.checked } : row
//       )
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: selectedOption } : row
//       )
//     );
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   const handleSave = async () => {
//     if (!formatId) {
//       alert('Format ID is missing! Please check the URL parameter.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');

//       if (!authToken) {
//         alert('Authentication token not found! Please login again.');
//         setLoading(false);
//         return;
//       }

//       // Transform rows data - EXACTLY like Postman payload
//       const uncertaintysetting = rows
//         .filter(row => row.fieldname && row.fieldname.value) // Only rows with fieldname
//         .map(row => ({
//           fieldname: row.fieldname.value,
//           field_heading: row.fieldHeading,
//           field_position: parseInt(row.fieldPosition) || 0,
//           formula: row.formula,
//           checkbox: row.checked ? 'yes' : 'no'
//         }));

//       // Check if there's data to send
//       if (uncertaintysetting.length === 0) {
//         alert('Please fill at least one row with fieldname before saving!');
//         setLoading(false);
//         return;
//       }

//       // Prepare payload - EXACTLY like your Postman
//       const payload = {
//         observation_id: parseInt(formatId),
//         resultsetting: {
//           uncertaintysetting: uncertaintysetting
//         }
//       };

//       console.log('=== SENDING PAYLOAD ===');
//       console.log(JSON.stringify(payload, null, 2));

//       // Make POST request
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/set-uncertainty-setting',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('=== API RESPONSE ===');
//       console.log(response.data);

//       if (response.data.success) {
//         setSuccessMessage('Observation setting updated successfully!');
//         setTimeout(() => setSuccessMessage(''), 3000);
//       } else {
//         alert('Failed to save data. Please try again.');
//       }
//     } catch (error) {
//       console.error('=== ERROR ===', error);
//       alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save data'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainity Setting</h1>
//             <p className="text-sm text-gray-500 mt-1">Format ID: {formatId || 'Not Found'}</p>
//           </div>

//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading...</div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         S. No.
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Checkbox
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Fieldname
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Heading
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Formula
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Position
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row) => (
//                       <tr key={row.id} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm">{row.id}</td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-4">
//                             <label className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name={`checkbox-${row.id}`}
//                                 checked={row.checked === true}
//                                 onChange={() => {
//                                   if (!row.checked) handleCheckbox(row.id);
//                                 }}
//                                 className="w-4 h-4 text-blue-600"
//                               />
//                               <span className="text-sm">Yes</span>
//                             </label>
//                             <label className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name={`checkbox-${row.id}`}
//                                 checked={row.checked === false}
//                                 onChange={() => {
//                                   if (row.checked) handleCheckbox(row.id);
//                                 }}
//                                 className="w-4 h-4 text-blue-600"
//                               />
//                               <span className="text-sm">No</span>
//                             </label>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <Select
//                             value={row.fieldname}
//                             onChange={(selectedOption) =>
//                               handleSelectChange(row.id, "fieldname", selectedOption)
//                             }
//                             options={fieldnameOptions}
//                             placeholder="Select fieldname..."
//                             isClearable
//                             styles={customSelectStyles}
//                             menuPortalTarget={document.body}
//                             menuPosition="fixed"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldHeading}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldHeading", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="heading"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.formula}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "formula", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="formula"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldPosition}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldPosition", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="position"
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="p-4 border-t flex justify-end">
//                 <button
//                   onClick={addRow}
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//                 >
//                   Add Row
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="flex flex-col items-end gap-2">
//           <div>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {loading ? 'Saving...' : 'Save All'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Toast-style Success Message */}
//       {successMessage && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//           <div className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-semibold shadow-2xl animate-bounce">
//             {successMessage}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Select from "react-select";

// export default function NewTableUI() {
//   const { id: formatId } = useParams();
  
//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: true, // default "yes"
//     fieldname: null,
//     fieldHeading: "",
//     formula: "",
//     fieldPosition: "",
//   });

//   // ✅ Initialize with one default row
//   const [rows, setRows] = useState([createEmptyRow(1)]);
//   const [fieldnameOptions, setFieldnameOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Auto-fetch data when formatId is available
//   useEffect(() => {
//     if (formatId) {
//       fetchUncertaintySettings(formatId);
//     }
//     fetchFieldnameOptions();
//   }, [formatId]);

//   const fetchFieldnameOptions = async () => {
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/get-all-summary-type',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success && response.data.data) {
//         const options = response.data.data.map(fieldname => ({
//           value: fieldname,
//           label: fieldname
//         }));
//         setFieldnameOptions(options);
//       }
//     } catch (error) {
//       console.error('Error fetching fieldname options:', error);
//     }
//   };

//   const fetchUncertaintySettings = async (fid) => {
//     if (!fid) return;

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.get(
//         `https://lims.kailtech.in/api/observationsetting/get-observation-setting/${fid}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success) {
//         const data = response.data.data;

//         // Check if uncertaintysetting exists and has data
//         if (data.uncertaintysetting && data.uncertaintysetting.uncertaintysetting && data.uncertaintysetting.uncertaintysetting.length > 0) {
//           const uncertaintyData = data.uncertaintysetting.uncertaintysetting.map((item, index) => ({
//             id: index + 1,
//             checked: item.checkbox === 'yes',
//             fieldname: item.fieldname ? { value: item.fieldname, label: item.fieldname } : null,
//             fieldHeading: item.field_heading,
//             formula: item.formula,
//             fieldPosition: item.field_position.toString(),
//           }));

//           setRows(uncertaintyData);
//         } else {
//           // No data → show 1 empty row
//           setRows([createEmptyRow(1)]);
//         }
//       } else {
//         // No data → show 1 empty row
//         setRows([createEmptyRow(1)]);
//       }
//     } catch (error) {
//       console.error('Error fetching uncertainty settings:', error);
//       // On error → show 1 empty row
//       setRows([createEmptyRow(1)]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Custom styles for React Select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "42px",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
//         : "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50,
//     }),
//   };

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, checked: !row.checked } : row
//       )
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: selectedOption } : row
//       )
//     );
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   const handleSave = async () => {
//     if (!formatId) {
//       alert('Format ID is missing! Please check the URL parameter.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');

//       if (!authToken) {
//         alert('Authentication token not found! Please login again.');
//         setLoading(false);
//         return;
//       }

//       // Transform rows data - EXACTLY like Postman payload
//       const uncertaintysetting = rows
//         .filter(row => row.fieldname && row.fieldname.value) // Only rows with fieldname
//         .map(row => ({
//           fieldname: row.fieldname.value,
//           field_heading: row.fieldHeading,
//           field_position: parseInt(row.fieldPosition) || 0,
//           formula: row.formula,
//           checkbox: row.checked ? 'yes' : 'no'
//         }));

//       // Check if there's data to send
//       if (uncertaintysetting.length === 0) {
//         alert('Please fill at least one row with fieldname before saving!');
//         setLoading(false);
//         return;
//       }

//       // Prepare payload - EXACTLY like your Postman
//       const payload = {
//         observation_id: parseInt(formatId),
//         resultsetting: {
//           uncertaintysetting: uncertaintysetting
//         }
//       };

//       console.log('=== SENDING PAYLOAD ===');
//       console.log(JSON.stringify(payload, null, 2));

//       // Make POST request
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/set-uncertainty-setting',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('=== API RESPONSE ===');
//       console.log(response.data);

//       if (response.data.success) {
//         setSuccessMessage('Observation setting updated successfully!');
//         setTimeout(() => setSuccessMessage(''), 3000);
//         // Refresh the data after save
//         fetchUncertaintySettings(formatId);
//       } else {
//         alert('Failed to save data. Please try again.');
//       }
//     } catch (error) {
//       console.error('=== ERROR ===', error);
//       alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save data'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!formatId) {
//     return <div className="p-6 text-red-600">Invalid format ID.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainity Setting</h1>
//           </div>

//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading...</div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         S. No.
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Checkbox
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Fieldname
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Heading
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Formula
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Position
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row) => (
//                       <tr key={row.id} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm">{row.id}</td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-4">
//                             <label className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name={`checkbox-${row.id}`}
//                                 checked={row.checked === true}
//                                 onChange={() => {
//                                   if (!row.checked) handleCheckbox(row.id);
//                                 }}
//                                 className="w-4 h-4 text-blue-600"
//                               />
//                               <span className="text-sm">Yes</span>
//                             </label>
//                             <label className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name={`checkbox-${row.id}`}
//                                 checked={row.checked === false}
//                                 onChange={() => {
//                                   if (row.checked) handleCheckbox(row.id);
//                                 }}
//                                 className="w-4 h-4 text-blue-600"
//                               />
//                               <span className="text-sm">No</span>
//                             </label>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <Select
//                             value={row.fieldname}
//                             onChange={(selectedOption) =>
//                               handleSelectChange(row.id, "fieldname", selectedOption)
//                             }
//                             options={fieldnameOptions}
//                             placeholder="Select fieldname..."
//                             isClearable
//                             styles={customSelectStyles}
//                             menuPortalTarget={document.body}
//                             menuPosition="fixed"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldHeading}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldHeading", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="heading"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.formula}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "formula", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="formula"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldPosition}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldPosition", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="position"
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="p-4 border-t flex justify-end">
//                 <button
//                   onClick={addRow}
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//                 >
//                   Add Row
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="flex flex-col items-end gap-2">
//           <div>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {loading ? 'Saving...' : 'Save All'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Toast-style Success Message */}
//       {successMessage && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//           <div className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-semibold shadow-2xl animate-bounce">
//             {successMessage}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }












//---------------------updated---------------------




// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Select from "react-select";

// export default function NewTableUI() {
//   const { id: formatId } = useParams();
  
//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: true, // default "yes"
//     fieldname: null,
//     fieldHeading: "",
//     formula: "",
//     fieldPosition: "",
//   });

//   // ✅ Initialize with one default row
//   const [rows, setRows] = useState([createEmptyRow(1)]);
//   const [fieldnameOptions, setFieldnameOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Auto-fetch data when formatId is available
//   useEffect(() => {
//     if (formatId) {
//       fetchUncertaintySettings(formatId);
//     }
//     fetchFieldnameOptions();
//   }, [formatId]);

//   const fetchFieldnameOptions = async () => {
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/get-all-summary-type',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success && response.data.data) {
//         const options = response.data.data.map(fieldname => ({
//           value: fieldname,
//           label: fieldname
//         }));
//         setFieldnameOptions(options);
//       }
//     } catch (error) {
//       console.error('Error fetching fieldname options:', error);
//     }
//   };

//   const fetchUncertaintySettings = async (fid) => {
//     if (!fid) return;

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.get(
//         `https://lims.kailtech.in/api/observationsetting/get-observation-setting/${fid}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success) {
//         const data = response.data.data;

//         // Check if uncertaintysetting exists and has data
//         if (data.uncertaintysetting && data.uncertaintysetting.uncertaintysetting && data.uncertaintysetting.uncertaintysetting.length > 0) {
//           const uncertaintyData = data.uncertaintysetting.uncertaintysetting.map((item, index) => ({
//             id: index + 1,
//             checked: item.checkbox === 'yes',
//             fieldname: item.fieldname ? { value: item.fieldname, label: item.fieldname } : null,
//             fieldHeading: item.field_heading,
//             formula: item.formula,
//             fieldPosition: item.field_position.toString(),
//           }));

//           setRows(uncertaintyData);
//         } else {
//           // No data → show 1 empty row
//           setRows([createEmptyRow(1)]);
//         }
//       } else {
//         // No data → show 1 empty row
//         setRows([createEmptyRow(1)]);
//       }
//     } catch (error) {
//       console.error('Error fetching uncertainty settings:', error);
//       // On error → show 1 empty row
//       setRows([createEmptyRow(1)]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Custom styles for React Select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "42px",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
//         : "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50,
//     }),
//   };

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, checked: !row.checked } : row
//       )
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: selectedOption } : row
//       )
//     );
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   const handleSave = async () => {
//     if (!formatId) {
//       alert('Format ID is missing! Please check the URL parameter.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');

//       if (!authToken) {
//         alert('Authentication token not found! Please login again.');
//         setLoading(false);
//         return;
//       }

//       // Transform rows data - EXACTLY like Postman payload
//       const uncertaintysetting = rows
//         .filter(row => row.fieldname && row.fieldname.value) // Only rows with fieldname
//         .map(row => ({
//           fieldname: row.fieldname.value,
//           field_heading: row.fieldHeading,
//           field_position: parseInt(row.fieldPosition) || 0,
//           formula: row.formula,
//           checkbox: row.checked ? 'yes' : 'no'
//         }));

//       // Check if there's data to send
//       if (uncertaintysetting.length === 0) {
//         alert('Please fill at least one row with fieldname before saving!');
//         setLoading(false);
//         return;
//       }

//       // Prepare payload - EXACTLY like your Postman
//       const payload = {
//         observation_id: parseInt(formatId),
//         resultsetting: {
//           uncertaintysetting: uncertaintysetting
//         }
//       };

//       console.log('=== SENDING PAYLOAD ===');
//       console.log(JSON.stringify(payload, null, 2));

//       // Make POST request
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/set-uncertainty-setting',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('=== API RESPONSE ===');
//       console.log(response.data);

//       if (response.data.success) {
//         setSuccessMessage('Observation setting updated successfully!');
//         setTimeout(() => setSuccessMessage(''), 3000);
//         // Refresh the data after save
//         fetchUncertaintySettings(formatId);
//       } else {
//         alert('Failed to save data. Please try again.');
//       }
//     } catch (error) {
//       console.error('=== ERROR ===', error);
//       alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save data'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!formatId) {
//     return <div className="p-6 text-red-600">Invalid format ID.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainty Setting</h1>
//           </div>

//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading...</div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         S. No.
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Checkbox
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Fieldname
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Heading
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Formula
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Position
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row) => (
//                       <tr key={row.id} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm">{row.id}</td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="checkbox"
//                             checked={row.checked}
//                             onChange={() => handleCheckbox(row.id)}
//                             className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <Select
//                             value={row.fieldname}
//                             onChange={(selectedOption) =>
//                               handleSelectChange(row.id, "fieldname", selectedOption)
//                             }
//                             options={fieldnameOptions}
//                             placeholder="Select fieldname..."
//                             isClearable
//                             styles={customSelectStyles}
//                             menuPortalTarget={document.body}
//                             menuPosition="fixed"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldHeading}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldHeading", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="heading"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.formula}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "formula", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="formula"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldPosition}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldPosition", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="position"
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="p-4 border-t flex justify-end">
//                 <button
//                   onClick={addRow}
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//                 >
//                   Add Row
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="flex flex-col items-end gap-2">
//           <div>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {loading ? 'Saving...' : 'Save All'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Toast-style Success Message */}
//       {successMessage && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//           <div className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-semibold shadow-2xl animate-bounce">
//             {successMessage}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Select from "react-select";

// export default function NewTableUI() {
//   const { id: formatId } = useParams();
  
//   // Helper: Create empty row
//   const createEmptyRow = (id) => ({
//     id,
//     checked: true, // default "yes"
//     fieldname: null,
//     fieldHeading: "",
//     formula: "",
//     fieldPosition: "",
//   });

//   // ✅ Initialize with one default row
//   const [rows, setRows] = useState([createEmptyRow(1)]);
//   const [fieldnameOptions, setFieldnameOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Auto-fetch data when formatId is available
//   useEffect(() => {
//     if (formatId) {
//       fetchUncertaintySettings(formatId);
//     }
//     fetchFieldnameOptions();
//   }, [formatId]);

//   const fetchFieldnameOptions = async () => {
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/get-all-summary-type',
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success && response.data.data) {
//         const options = response.data.data.map(fieldname => ({
//           value: fieldname,
//           label: fieldname
//         }));
//         setFieldnameOptions(options);
//       }
//     } catch (error) {
//       console.error('Error fetching fieldname options:', error);
//     }
//   };

//   const fetchUncertaintySettings = async (fid) => {
//     if (!fid) return;

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');
//       const response = await axios.get(
//         `https://lims.kailtech.in/api/observationsetting/get-observation-setting/${fid}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.success) {
//         const data = response.data.data;

//         // Check if uncertaintysetting exists and has data
//         if (data.uncertaintysetting && data.uncertaintysetting.uncertaintysetting && data.uncertaintysetting.uncertaintysetting.length > 0) {
//           const uncertaintyData = data.uncertaintysetting.uncertaintysetting.map((item, index) => ({
//             id: index + 1,
//             checked: item.checkbox === 'yes',
//             fieldname: item.fieldname ? { value: item.fieldname, label: item.fieldname } : null,
//             fieldHeading: item.field_heading,
//             formula: item.formula,
//             fieldPosition: item.field_position.toString(),
//           }));

//           setRows(uncertaintyData);
//         } else {
//           // No data → show 1 empty row
//           setRows([createEmptyRow(1)]);
//         }
//       } else {
//         // No data → show 1 empty row
//         setRows([createEmptyRow(1)]);
//       }
//     } catch (error) {
//       console.error('Error fetching uncertainty settings:', error);
//       // On error → show 1 empty row
//       setRows([createEmptyRow(1)]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Custom styles for React Select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       minHeight: "42px",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused
//         ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
//         : "none",
//       "&:hover": {
//         borderColor: "#3b82f6",
//       },
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 50,
//     }),
//   };

//   // Handlers
//   const handleCheckbox = (id) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, checked: !row.checked } : row
//       )
//     );
//   };

//   const handleInputChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleSelectChange = (id, field, selectedOption) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, [field]: selectedOption } : row
//       )
//     );
//   };

//   const addRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
//     setRows([...rows, createEmptyRow(newId)]);
//   };

//   // ✅ Remove row handler
//   const removeRow = (id) => {
//     // Ensure at least one row remains
//     if (rows.length === 1) {
//       alert('At least one row is required!');
//       return;
//     }
//     setRows((prevRows) => prevRows.filter((row) => row.id !== id));
//   };

//   const handleSave = async () => {
//     if (!formatId) {
//       alert('Format ID is missing! Please check the URL parameter.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const authToken = localStorage.getItem('authToken');

//       if (!authToken) {
//         alert('Authentication token not found! Please login again.');
//         setLoading(false);
//         return;
//       }

//       // Transform rows data - EXACTLY like Postman payload
//       const uncertaintysetting = rows
//         .filter(row => row.fieldname && row.fieldname.value) // Only rows with fieldname
//         .map(row => ({
//           fieldname: row.fieldname.value,
//           field_heading: row.fieldHeading,
//           field_position: parseInt(row.fieldPosition) || 0,
//           formula: row.formula,
//           checkbox: row.checked ? 'yes' : 'no'
//         }));

//       // Check if there's data to send
//       if (uncertaintysetting.length === 0) {
//         alert('Please fill at least one row with fieldname before saving!');
//         setLoading(false);
//         return;
//       }

//       // Prepare payload - EXACTLY like your Postman
//       const payload = {
//         observation_id: parseInt(formatId),
//         resultsetting: {
//           uncertaintysetting: uncertaintysetting
//         }
//       };

//       console.log('=== SENDING PAYLOAD ===');
//       console.log(JSON.stringify(payload, null, 2));

//       // Make POST request
//       const response = await axios.post(
//         'https://lims.kailtech.in/api/observationsetting/set-uncertainty-setting',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log('=== API RESPONSE ===');
//       console.log(response.data);

//       if (response.data.success) {
//         setSuccessMessage('Observation setting updated successfully!');
//         setTimeout(() => setSuccessMessage(''), 3000);
//         // Refresh the data after save
//         fetchUncertaintySettings(formatId);
//       } else {
//         alert('Failed to save data. Please try again.');
//       }
//     } catch (error) {
//       console.error('=== ERROR ===', error);
//       alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save data'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!formatId) {
//     return <div className="p-6 text-red-600">Invalid format ID.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainity Setting</h1>
//           </div>

//           {loading ? (
//             <div className="p-8 text-center text-gray-500">Loading...</div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         S. No.
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Checkbox
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Fieldname
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Heading
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Formula
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Field Position
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row) => (
//                       <tr key={row.id} className="border-b hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm">{row.id}</td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="checkbox"
//                             checked={row.checked}
//                             onChange={() => handleCheckbox(row.id)}
//                             className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <Select
//                             value={row.fieldname}
//                             onChange={(selectedOption) =>
//                               handleSelectChange(row.id, "fieldname", selectedOption)
//                             }
//                             options={fieldnameOptions}
//                             placeholder="Select fieldname..."
//                             isClearable
//                             styles={customSelectStyles}
//                             menuPortalTarget={document.body}
//                             menuPosition="fixed"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldHeading}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldHeading", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="heading"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.formula}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "formula", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="formula"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="text"
//                             value={row.fieldPosition}
//                             onChange={(e) =>
//                               handleInputChange(row.id, "fieldPosition", e.target.value)
//                             }
//                             className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
//                             placeholder="position"
//                           />
//                         </td>
//                         <td className="px-4 py-3">
//                           <button
//                             onClick={() => removeRow(row.id)}
//                             disabled={rows.length === 1}
//                             className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="p-4 border-t flex justify-end">
//                 <button
//                   onClick={addRow}
//                   className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
//                 >
//                   Add Row
//                 </button>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="flex flex-col items-end gap-2">
//           <div>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {loading ? 'Saving...' : 'Save All'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Toast-style Success Message */}
//       {successMessage && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//           <div className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-semibold shadow-2xl animate-bounce">
//             {successMessage}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

export default function NewTableUI() {
  const { id: formatId } = useParams();
  const navigate = useNavigate();
  
  // Helper: Create empty row
  const createEmptyRow = (id) => ({
    id,
    checked: true, // default "yes"
    fieldname: null,
    fieldHeading: "",
    formula: "",
    fieldPosition: "",
  });

  // ✅ Initialize with one default row
  const [rows, setRows] = useState([createEmptyRow(1)]);
  const [fieldnameOptions, setFieldnameOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-fetch data when formatId is available
  useEffect(() => {
    if (formatId) {
      fetchUncertaintySettings(formatId);
    }
    fetchFieldnameOptions();
  }, [formatId]);

  const fetchFieldnameOptions = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(
        'https://lims.kailtech.in/api/observationsetting/get-all-summary-type',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success && response.data.data) {
        const options = response.data.data.map(fieldname => ({
          value: fieldname,
          label: fieldname
        }));
        setFieldnameOptions(options);
      }
    } catch (error) {
      console.error('Error fetching fieldname options:', error);
    }
  };

  const fetchUncertaintySettings = async (fid) => {
    if (!fid) return;

    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(
        `https://lims.kailtech.in/api/observationsetting/get-observation-setting/${fid}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        const data = response.data.data;

        // Check if uncertaintysetting exists and has data
        if (data.uncertaintysetting && data.uncertaintysetting.uncertaintysetting && data.uncertaintysetting.uncertaintysetting.length > 0) {
          const uncertaintyData = data.uncertaintysetting.uncertaintysetting.map((item, index) => ({
            id: index + 1,
            checked: item.checkbox === 'yes',
            fieldname: item.fieldname ? { value: item.fieldname, label: item.fieldname } : null,
            fieldHeading: item.field_heading,
            formula: item.formula,
            fieldPosition: item.field_position.toString(),
          }));

          setRows(uncertaintyData);
        } else {
          // No data → show 1 empty row
          setRows([createEmptyRow(1)]);
        }
      } else {
        // No data → show 1 empty row
        setRows([createEmptyRow(1)]);
      }
    } catch (error) {
      console.error('Error fetching uncertainty settings:', error);
      // On error → show 1 empty row
      setRows([createEmptyRow(1)]);
    } finally {
      setLoading(false);
    }
  };

  // Custom styles for React Select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "42px",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
        : "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50,
    }),
  };

  // Handlers
  const handleCheckbox = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, checked: !row.checked } : row
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleSelectChange = (id, field, selectedOption) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: selectedOption } : row
      )
    );
  };

  const addRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows([...rows, createEmptyRow(newId)]);
  };

  // ✅ Remove row handler
  const removeRow = (id) => {
    // Ensure at least one row remains
    if (rows.length === 1) {
      alert('At least one row is required!');
      return;
    }
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  // ✅ Back button handler
  const handleBack = () => {
    navigate("/dashboards/operations/observation-settings"); // Go back to previous page
  };

  const handleSave = async () => {
    if (!formatId) {
      alert('Format ID is missing! Please check the URL parameter.');
      return;
    }

    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        alert('Authentication token not found! Please login again.');
        setLoading(false);
        return;
      }

      // Transform rows data - EXACTLY like Postman payload
      const uncertaintysetting = rows
        .filter(row => row.fieldname && row.fieldname.value) // Only rows with fieldname
        .map(row => ({
          fieldname: row.fieldname.value,
          field_heading: row.fieldHeading,
          field_position: parseInt(row.fieldPosition) || 0,
          formula: row.formula,
          checkbox: row.checked ? 'yes' : 'no'
        }));

      // Check if there's data to send
      if (uncertaintysetting.length === 0) {
        alert('Please fill at least one row with fieldname before saving!');
        setLoading(false);
        return;
      }

      // Prepare payload - EXACTLY like your Postman
      const payload = {
        observation_id: parseInt(formatId),
        resultsetting: {
          uncertaintysetting: uncertaintysetting
        }
      };

      console.log('=== SENDING PAYLOAD ===');
      console.log(JSON.stringify(payload, null, 2));

      // Make POST request
      const response = await axios.post(
        'https://lims.kailtech.in/api/observationsetting/set-uncertainty-setting',
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('=== API RESPONSE ===');
      console.log(response.data);

      if (response.data.success) {
        setSuccessMessage('Observation setting updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        // Refresh the data after save
        fetchUncertaintySettings(formatId);
      } else {
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('=== ERROR ===', error);
      alert(`Error: ${error.response?.data?.message || error.message || 'Failed to save data'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!formatId) {
    return <div className="p-6 text-red-600">Invalid format ID.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Button */}
<div className="flex items-center justify-start gap-4">
  <button
    onClick={handleBack}
    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium transition"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
        clipRule="evenodd" 
      />
    </svg>
    Back
  </button>
</div>


        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Edit Uncertainity Setting</h1>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        S. No.
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Checkbox
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Fieldname
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Field Heading
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Formula
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Field Position
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{row.id}</td>
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={row.checked}
                            onChange={() => handleCheckbox(row.id)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={row.fieldname}
                            onChange={(selectedOption) =>
                              handleSelectChange(row.id, "fieldname", selectedOption)
                            }
                            options={fieldnameOptions}
                            placeholder="Select fieldname..."
                            isClearable
                            styles={customSelectStyles}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.fieldHeading}
                            onChange={(e) =>
                              handleInputChange(row.id, "fieldHeading", e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="heading"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.formula}
                            onChange={(e) =>
                              handleInputChange(row.id, "formula", e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="formula"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.fieldPosition}
                            onChange={(e) =>
                              handleInputChange(row.id, "fieldPosition", e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="position"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeRow(row.id)}
                            disabled={rows.length === 1}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={addRow}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
                >
                  Add Row
                </button>
              </div>
            </>
          )}
        </div>

        {/* Save Button */}
        <div className="flex flex-col items-end gap-2">
          <div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Saving...' : 'Save All'}
            </button>
          </div>
        </div>
      </div>

      {/* Toast-style Success Message */}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-semibold shadow-2xl animate-bounce">
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
}