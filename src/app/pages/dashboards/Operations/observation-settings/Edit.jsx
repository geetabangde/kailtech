import { useState, useEffect } from 'react';
import axios from "utils/axios";
import { useParams } from 'react-router-dom';
import Select from 'react-select';

export default function ExcelTableUI() {
  const { id: formatId } = useParams();
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]); // New table for additional fields
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [labToCalibrateOptions, setLabToCalibrateOptions] = useState([]);
  const [fieldnameOptions, setFieldnameOptions] = useState([]);

  // Dropdown options
  const setpointOptions = [
    { value: 'uuc', label: 'uuc' },
    { value: 'master', label: 'master' },
    { value: 'separate', label: 'separate' }
  ];

  // Custom styles for React Select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '42px',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50
    })
  };

  // Auto-fetch data when formatId is available
  useEffect(() => {
    if (formatId) {
      fetchObservationSettings(formatId);
    }
    fetchLabOptions();
    fetchFieldnameOptions();
  }, [formatId]);

  const fetchLabOptions = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(
        '/master/list-lab',
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'true' && response.data.data) {
        const labOptions = response.data.data.map(lab => ({
          value: lab.id,
          label: lab.name
        }));
        setLabToCalibrateOptions(labOptions);
      }
    } catch (error) {
      console.error('Error fetching lab options:', error);
    }
  };

const fetchFieldnameOptions = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await axios.get(
    '/observationsetting/get-all-summary-type',
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    }
  );
    // Only use new_summary array
    if (response.data.success && Array.isArray(response.data.new_summary)) {
      const options = response.data.new_summary.map((fieldname) => ({
        value: fieldname,
        label: fieldname,
      }));
      setFieldnameOptions(options); // <-- sets Table 1 dropdown
    } else {
      console.warn('No new_summary found:', response.data);
      setFieldnameOptions([]); // fallback empty
    }
  } catch (error) {
    console.error('Error fetching fieldname options:', error);
    setFieldnameOptions([]); // fallback empty
  }
};

  const fetchObservationSettings = async (fid) => {
    if (!fid) return;

    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(
        `/observationsetting/get-observation-setting/${fid}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

    if (response.data.success) {
        const data = response.data.data;

        const table1Data = data.resultsetting.calibration_settings.map((item, index) => ({
          id: index + 1,
          checked: item.checkbox === 'yes',
          fieldname: item.fieldname ? { value: item.fieldname, label: item.fieldname } : null,
          fieldHeading: item.field_heading,
          fieldPosition: item.field_position.toString(),
        }));

        const table2Data = data.observationsetting.observation_settings.map((item, index) => ({
          id: index + 1,
          checked: item.checkbox === 'yes',
          fieldname: item.fieldname,
          fieldHeading: item.field_heading,
        }));

        // Populate Table 3 with fetched data
        const setpointValue = data.setpoint ? setpointOptions.find(opt => opt.value.toLowerCase() === data.setpoint.toLowerCase()) : null;
        const labValue = data.allottolab ? labToCalibrateOptions.find(opt => opt.value === data.allottolab) : null;

        const table3Data = {
          id: 1,
          checked: true,
          setpoint: setpointValue,
          masterRepeatable: data.master?.toString() || '',
          uucRepeatable: data.uuc?.toString() || '',
          labToCalibrate: labValue
        };

        // Set data or fallback to 1 empty row
        setRows1(table1Data.length > 0 ? table1Data : [createEmptyRow1(1)]);
        setRows2(table2Data.length > 0 ? table2Data : [createEmptyRow2(1)]);
        setRows3([table3Data]); // Populate with fetched data
      } else {
        // No data → show 1 empty row each
        setRows1([createEmptyRow1(1)]);
        setRows2([createEmptyRow2(1)]);
        setRows3([createEmptyRow3(1)]);
      }
    } catch (error) {
      console.error('Error fetching observation settings:', error);

      // On error → show 1 empty row each
      setRows1([createEmptyRow1(1)]);
      setRows2([createEmptyRow2(1)]);
      setRows3([createEmptyRow3(1)]);
    } finally {
      setLoading(false);
    }
  };

  // Helper: Create empty row for Table 1
  const createEmptyRow1 = (id) => ({
    id,
    checked: true,
    fieldname: null,
    fieldHeading: '',
    fieldPosition: ''
  });

  // Helper: Create empty row for Table 2
  const createEmptyRow2 = (id) => ({
    id,
    checked: true,
    fieldname: '',
    fieldHeading: ''
  });

  // Helper: Create empty row for Table 3 (New Additional Fields)
  const createEmptyRow3 = (id) => ({
    id,
    checked: true,
    setpoint: null,
    masterRepeatable: '',
    uucRepeatable: '',
    labToCalibrate: null
  });

  // --- Table 1 Handlers ---
  const handleCheckbox1 = (id) => {
    setRows1(rows1.map(row =>
      row.id === id ? { ...row, checked: !row.checked } : row
    ));
  };

  const handleInputChange1 = (id, field, value) => {
    setRows1(rows1.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSelectChange1 = (id, field, selectedOption) => {
    setRows1(rows1.map(row =>
      row.id === id ? { ...row, [field]: selectedOption } : row
    ));
  };

  const addRow1 = () => {
    const newId = rows1.length > 0 ? Math.max(...rows1.map(r => r.id)) + 1 : 1;
    setRows1([...rows1, createEmptyRow1(newId)]);
  };

  // --- Table 2 Handlers ---
  const handleCheckbox2 = (id) => {
    setRows2(rows2.map(row =>
      row.id === id ? { ...row, checked: !row.checked } : row
    ));
  };

  const handleInputChange2 = (id, field, value) => {
    setRows2(rows2.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const addRow2 = () => {
    const newId = rows2.length > 0 ? Math.max(...rows2.map(r => r.id)) + 1 : 1;
    setRows2([...rows2, createEmptyRow2(newId)]);
  };

  // --- Table 3 Handlers (New Additional Fields) ---
  const handleInputChange3 = (id, field, value) => {
    setRows3(rows3.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSelectChange3 = (id, field, selectedOption) => {
    setRows3(rows3.map(row =>
      row.id === id ? { ...row, [field]: selectedOption } : row
    ));
  };

  const handleSave = async () => {
    if (!formatId) {
      alert('Format ID is missing!');
      return;
    }

    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');

      // Transform rows1 data to match API format for calibration_settings
      const calibration_settings = rows1
        .filter(row => row.fieldname && row.fieldname.value) // Only include rows with fieldname
        .map(row => ({
          fieldname: row.fieldname.value,
          field_heading: row.fieldHeading,
          field_position: parseInt(row.fieldPosition) || 0,
          checkbox: row.checked ? 'yes' : 'no'
        }));

      // Transform rows2 data to match API format for observation_settings
      const observation_settings = rows2
        .filter(row => row.fieldname.trim() !== '') // Only include rows with fieldname
        .map(row => ({
          fieldname: row.fieldname,
          field_heading: row.fieldHeading,
          checkbox: row.checked ? 'yes' : 'no'
        }));

      // Prepare payload
      const payload = {
        observation_id: parseInt(formatId),

        // --- new fields (from Table 3) ---
        setpoint: rows3[0]?.setpoint?.value || '',          // 'uuc' | 'Master' | 'Separate'
        uuc: rows3[0]?.uucRepeatable || '',                 // number or text
        master: rows3[0]?.masterRepeatable || '',           // number or text
        allottolab: rows3[0]?.labToCalibrate?.value || '',  // lab id

        // --- existing nested object ---
        resultsetting: {
          calibration_settings: calibration_settings,
          observation_settings: observation_settings
        }
      };

      console.log('Sending payload:', payload);

      // Make POST request
      const response = await axios.post(
        '/observationsetting/update-observation-setting',
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage('Data saved successfully!');
        console.log('Response:', response.data);
        // Hide message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
        // Optionally refresh the data
        fetchObservationSettings(formatId);
      } else {
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving observation settings:', error);
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

        {/* New Table: Additional Configuration */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Calibration Results Settings</h1>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading additional fields...</div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Setpoint</label>
                  <Select
                    value={rows3[0]?.setpoint}
                    onChange={(selectedOption) => handleSelectChange3(rows3[0]?.id, 'setpoint', selectedOption)}
                    options={setpointOptions}
                    placeholder="Select..."
                    isClearable
                    styles={customSelectStyles}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Master Repeatable</label>
                  <input
                    type="text"
                    value={rows3[0]?.masterRepeatable}
                    onChange={(e) => handleInputChange3(rows3[0]?.id, 'masterRepeatable', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Master Repeatable"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UUC Repeatable</label>
                  <input
                    type="text"
                    value={rows3[0]?.uucRepeatable}
                    onChange={(e) => handleInputChange3(rows3[0]?.id, 'uucRepeatable', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="UUC Repeatable"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lab to Calibrate</label>
                  <Select
                    value={rows3[0]?.labToCalibrate}
                    onChange={(selectedOption) => handleSelectChange3(rows3[0]?.id, 'labToCalibrate', selectedOption)}
                    options={labToCalibrateOptions}
                    placeholder="Select Lab..."
                    isClearable
                    styles={customSelectStyles}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* First Table: Field Configuration */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800"></h1>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading fields...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">S. No.</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Checkbox</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Fieldname</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Field Heading</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Field Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows1.map((row) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{row.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`t1-${row.id}`}
                                checked={row.checked === true}
                                onChange={() => handleCheckbox1(row.id)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`t1-${row.id}`}
                                checked={row.checked === false}
                                onChange={() => handleCheckbox1(row.id)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm">No</span>
                            </label>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={row.fieldname}
                            onChange={(selectedOption) => handleSelectChange1(row.id, 'fieldname', selectedOption)}
                            options={fieldnameOptions} // <-- new_summary only
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
                            onChange={(e) => handleInputChange1(row.id, 'fieldHeading', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="heading"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.fieldPosition}
                            onChange={(e) => handleInputChange1(row.id, 'fieldPosition', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="position"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={addRow1}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
                >
                  Add Row
                </button>
              </div>
            </>
          )}
        </div>

        {/* Second Table: Observation Configuration */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Observation Setting</h1>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading observations...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">S. No.</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Checkbox</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Fieldname</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Field Heading</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows2.map((row) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{row.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`t2-${row.id}`}
                                checked={row.checked === true}
                                onChange={() => handleCheckbox2(row.id)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`t2-${row.id}`}
                                checked={row.checked === false}
                                onChange={() => handleCheckbox2(row.id)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <span className="text-sm">No</span>
                            </label>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.fieldname}
                            onChange={(e) => handleInputChange2(row.id, 'fieldname', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="fieldname"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.fieldHeading}
                            onChange={(e) => handleInputChange2(row.id, 'fieldHeading', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                            placeholder="heading"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={addRow2}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition"
                >
                  Add Row
                </button>
              </div>
            </>
          )}
        </div>

        {/* Save All Button */}
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
      {/* Toast-style Success Message - Center of Screen */}
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