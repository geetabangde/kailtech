
import { useState, useEffect } from "react";
import axios from "utils/axios";
import { useParams, useNavigate } from "react-router-dom";
import Uncertaininty from "./components/Uncertaininty";

export default function NewTableUI() {
  const { id: formatId } = useParams();
  const navigate = useNavigate();

  // Helper: Create empty row
  const createEmptyRow = (id) => ({
    id,
    checked: true,
    fieldfrom: "",     
    fieldname: null,
    variable: "",                
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

      const response = await axios.post(
        '/observationsetting/get-all-summary-type',
        {},
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
      const response = await axios.get(
        `/observationsetting/get-observation-setting/${fid}`,
      );
      
      if (response.data.success) {
        const data = response.data.data;
        console.log('Fetched uncertainty settings:', data);
        
        if (data.uncertaintysetting && data.uncertaintysetting.uncertaintysetting && data.uncertaintysetting.uncertaintysetting.length > 0) {
          const uncertaintyData = data.uncertaintysetting.uncertaintysetting.map((item, index) => ({
            id: index + 1,
            checked: item.checkbox === 'yes',
            fieldname: item.fieldname ? { value: item.fieldname, label: item.fieldname } : null,
            fieldHeading: item.field_heading,
            formula: item.formula,
            fieldPosition: item.field_position.toString(),
            setVariable: item.variable || "",  
            fieldfrom: "new_summary",    
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
        '/observationsetting/set-uncertainty-setting',
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

        <Uncertaininty
          rows={rows}
          fieldnameOptions={fieldnameOptions}
          customSelectStyles={customSelectStyles}
          handleCheckbox={handleCheckbox}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          addRow={addRow}
          removeRow={removeRow}
          loading={loading}
        />

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