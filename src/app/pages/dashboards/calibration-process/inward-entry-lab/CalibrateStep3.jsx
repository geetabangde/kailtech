import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Page } from 'components/shared/Page';
import { Button } from 'components/ui/Button';
import { toast } from 'sonner';
import axios from 'utils/axios';
import InstrumentInfo from './components/InstrumentInfo';
import MastersList from './components/MastersList';
import SupportMastersList from './components/SupportMastersList';
// import ThermalCoefficientForm from './components/ThermalCoefficientForm';
// import EnvironmentalConditions from './components/EnvironmentalConditions';
import DateNotesForm from './components/DateNotesForm';
import ObservationTable from "./components/ObservationTable";
import Notes from './components/Notes';

const CalibrateStep3 = () => {
  const navigate = useNavigate();
  const { id, itemId: instId } = useParams();
  const inwardId = id;
  const searchParams = new URLSearchParams(window.location.search);
  const caliblocation = searchParams.get('caliblocation') || 'Lab';
  const calibacc = searchParams.get('calibacc') || 'Nabl';

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Dynamic headings states
  const [dynamicHeadings, setDynamicHeadings] = useState(null);
  const [suffix, setSuffix] = useState('');
  const [observations, setObservations] = useState([]);
  const [tableInputValues, setTableInputValues] = useState({});
  const [observationErrors, setObservationErrors] = useState({});
  const [supportMasters, setSupportMasters] = useState([]);
  

  // const [temperatureRange, setTemperatureRange] = useState(null);
  // const [humidityRange, setHumidityRange] = useState(null);
  // const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
      enddate: '',
      duedate: '',
      notes: '',
      tempend: '',
      humiend: '',
    });
  
    // Helper function to safely format date
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch {
      console.warn('Invalid date format:', dateString);
      return '';
    }
  };
    
  // ✅ FIX 1: Remove unused 'template' parameter from calculateRowValues
const calculateRowValues = (rowData) => { // Removed template parameter
  const parsedValues = rowData.map((val) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  });

  const result = { average: '', error: '', repeatability: '', hysteresis: '' };

  // ✅ Dynamic calculation based on dynamic headings
  if (dynamicHeadings?.mainhading?.calibration_settings) {
    const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
      .filter(col => col.checkbox === 'yes')
      .sort((a, b) => a.field_position - b.field_position);
    
    let masterStartCol = -1;
    let masterEndCol = -1;
    let calculatedMasterCol = -1;
    
    // Find column positions
    let colIndex = 1; // Start after SR NO
    sortedSettings.forEach((setting) => {
      if (setting.fieldname === 'calculatedmaster') {
        calculatedMasterCol = colIndex;
        colIndex++;
      } else if (setting.fieldname === 'master') {
        masterStartCol = colIndex;
        const obsSettings = dynamicHeadings?.observation_heading?.observation_settings || [];
        const obsCount = obsSettings.filter(obs => obs.checkbox === 'yes').length;
        masterEndCol = colIndex + obsCount - 1;
        colIndex += obsCount;
      } else {
        colIndex++;
      }
    });

    console.log('📊 Column positions:', { masterStartCol, masterEndCol, calculatedMasterCol });

    // Calculate average from master observations
    if (masterStartCol !== -1 && masterEndCol !== -1) {
      const masterValues = [];
      for (let i = masterStartCol; i <= masterEndCol; i++) {
        const val = parsedValues[i];
        if (val !== 0) masterValues.push(val);
      }

      if (masterValues.length > 0) {
        result.average = (masterValues.reduce((sum, val) => sum + val, 0) / masterValues.length).toFixed(2);
        
        // Calculate error: calculatedmaster - average
        if (calculatedMasterCol !== -1) {
          const calculatedMaster = parsedValues[calculatedMasterCol];
          result.error = calculatedMaster 
            ? (calculatedMaster - parseFloat(result.average)).toFixed(2)
            : '';
        }
        
        // Calculate hysteresis: max - min
        result.hysteresis = (Math.max(...masterValues) - Math.min(...masterValues)).toFixed(2);
      }
    }
  }

  console.log('🔢 Calculated values:', result);
  return result;
};

  // Dynamic Headings fetch function
  const fetchDynamicHeadings = useCallback(async (suffix) => {
    if (!suffix) {
      console.log('❌ No suffix provided for dynamic headings');
      return null;
    }

    try {
      console.log('🔍 Fetching dynamic headings for suffix:', suffix);
      
      const response = await axios.post(
        '/observationsetting/get-custome-observation',
        {
          inwardid: inwardId,
          instid: instId,
          suffix: suffix
        }
      );

      console.log('📊 Dynamic Headings API Response:', response.data);

      if (response.data.status === true) {
        return {
          heading: response.data.heading,
          data: response.data.data
        };
      } else {
        console.log('❌ No dynamic headings found in response');
        return null;
      }
    } catch (error) {
      console.error('Error fetching dynamic headings:', error);
      return null;
    }
  }, [instId, inwardId]);

  // Single API call for all data
  useEffect(() => {
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://kailtech.in/newlims/api/calibrationprocess/get-calibration-step3-details',
        {
          params: {
            inward_id: inwardId,
            instid: instId,
            caliblocation: caliblocation,
            calibacc: calibacc,
          },
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          }
        }
      );

      console.log('All API Data:', response.data);
      setApiData(response.data);

      // Fix: Use response.data instead of undefined 'data'
      setSupportMasters(response.data.supportMasters || []);
      // setTemperatureRange(response.data.temperatureRange);
      // setHumidityRange(response.data.humidityRange);

      if (response.data.listOfInstrument?.suffix) {
        setSuffix(response.data.listOfInstrument.suffix);
        console.log('Suffix found:', response.data.listOfInstrument.suffix);
        
        const headingsResponse = await fetchDynamicHeadings(response.data.listOfInstrument.suffix);
        
        if (headingsResponse) {
          setDynamicHeadings(headingsResponse.heading);
          
          if (headingsResponse.data?.calibration_points) {
            console.log('Setting observations from get-custome-observation API:', 
              headingsResponse.data.calibration_points);
            setObservations(headingsResponse.data.calibration_points);
          }
        }
      }

      // Fix: Use response.data here too
      setFormData((prev) => ({
        ...prev,
        enddate: formatDateForInput(response.data.instrument?.enddate),
        humiend: response.data.instrument?.humiend || '',
        tempend: response.data.instrument?.tempend || '',
        duedate: formatDateForInput(response.data.instrument?.duedate),
        temperatureEnd: response.data.temperatureRange?.min && response.data.temperatureRange?.max
          ? `${response.data.temperatureRange.min} - ${response.data.temperatureRange.max}`
          : response.data.temperatureRange?.value || '',
        humidityEnd: response.data.humidityRange?.min && response.data.humidityRange?.max
          ? `${response.data.humidityRange.min} - ${response.data.humidityRange.max}`
          : response.data.humidityRange?.value || '',
      }));

    } catch (err) {
      console.error('API Error:', err.response?.data || err);
      toast.error('Failed to fetch calibration data');
    } finally {
      setLoading(false);
    }
  };

  if (inwardId && instId) {
    fetchAllData();
  }
}, [inwardId, instId, caliblocation, calibacc, fetchDynamicHeadings]);
 

  // Generate dynamic table structure
  const generateDynamicTableStructure = useCallback((headings, template) => {
    if (!headings || !Array.isArray(headings)) {
      console.log('❌ No headings provided for dynamic table structure');
      return null;
    }

    console.log('🔄 Generating dynamic table structure for template:', template, 'with headings:', headings);

    const sortedHeadings = [...headings].sort((a, b) => (a.field_position || 0) - (b.field_position || 0));
    
    const headers = [];
    const subHeadersRow = [];

    headers.push({ name: 'SR NO', colspan: 1 });
    subHeadersRow.push(null);

    sortedHeadings.forEach((heading) => {
      if (heading.checkbox === 'yes') {
        const headerName = heading.field_heading || heading.fieldname;
        
        if (heading.fieldname === 'master' || heading.fieldname.includes('observation')) {
          const observationSettings = dynamicHeadings?.observation_heading?.observation_settings || [];
          const observationCount = observationSettings.filter(obs => obs.checkbox === 'yes').length;
          
          console.log(`📊 Found ${observationCount} observation columns for ${heading.fieldname}`);
          
          if (observationCount > 0) {
            headers.push({ name: headerName, colspan: observationCount });
            
            observationSettings.forEach((obsSetting) => {
              if (obsSetting.checkbox === 'yes') {
                let subHeaderName = obsSetting.field_heading || obsSetting.fieldname;
                subHeadersRow.push(subHeaderName);
              }
            });
          } else {
            let defaultCount = 3;
            headers.push({ name: headerName, colspan: defaultCount });
            for (let i = 1; i <= defaultCount; i++) {
              subHeadersRow.push(`M${i}`);
            }
          }
        } else {
          headers.push({ name: headerName, colspan: 1 });
          subHeadersRow.push(null);
        }
      }
    });

    console.log('✅ Dynamic table structure generated:', { headers, subHeadersRow });
    return { headers, subHeadersRow };
  }, [dynamicHeadings]);

  // Create observation rows dynamically
  const createObservationRows = (observationData) => {
    if (!observationData || !Array.isArray(observationData)) {
      return {
        rows: [],
        hiddenInputs: { calibrationPoints: [], types: [], repeatables: [], values: [] }
      };
    }

    const rows = [];
    const calibrationPoints = [];
    const types = [];
    const repeatables = [];
    const values = [];

    observationData.forEach((point, index) => {
      const row = [
        (index + 1).toString(), // SR NO
      ];

      if (dynamicHeadings?.mainhading?.calibration_settings) {
        const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
          .filter(col => col.checkbox === 'yes')
          .sort((a, b) => a.field_position - b.field_position);

        sortedSettings.forEach((setting) => {
          const fieldname = setting.fieldname;

          if (fieldname === 'uuc') {
            row.push(point.point || point.converted_point || '');
          }
          else if (fieldname === 'calculatedmaster') {
            // ✅ Add calculated master value
            row.push(point.converted_point || point.calculated_master || '');
          }
          else if (fieldname === 'master') {
            const masterData = point.summary_data?.master || [];
            const obsSettings = dynamicHeadings?.observation_heading?.observation_settings || [];
            
            const sortedMasterData = [...masterData].sort((a, b) => 
              parseInt(a.repeatable) - parseInt(b.repeatable)
            );
            
            obsSettings.forEach((obsSetting, obsIndex) => {
              if (obsSetting.checkbox === 'yes') {
                const masterValue = sortedMasterData[obsIndex]?.value || '';
                row.push(masterValue);
              }
            });
          }
          else if (fieldname === 'average' || fieldname === 'averagemaster') {
            const masterData = point.summary_data?.master || [];
            const values = masterData
              .map(m => parseFloat(m.value) || 0)
              .filter(v => v !== 0);
            
            if (values.length > 0) {
              const avg = (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2);
              row.push(avg);
            } else {
              row.push('');
            }
          }
          else if (fieldname === 'hysterisis' || fieldname === 'hysteresis') {
            const hystValue = point.summary_data?.hysterisis?.[0]?.value || 
                            point.summary_data?.hysteresis?.[0]?.value || '';
            row.push(hystValue);
          }
          else if (fieldname === 'error') {
            const errorValue = point.summary_data?.error?.[0]?.value || '';
            row.push(errorValue);
          }
          else {
            const value = point[fieldname] || '';
            row.push(value);
          }
        });
      }

      rows.push(row);
      calibrationPoints.push(point.id?.toString() || '');
      types.push('master');
      repeatables.push('0');
      values.push(point.point || point.converted_point || '0');
    });

    console.log('✅ Created observation rows:', rows);
    console.log('✅ Calibration point IDs:', calibrationPoints);
    
    return { rows, hiddenInputs: { calibrationPoints, types, repeatables, values } };
  };

  // Generate table structure
  const generateTableStructure = () => {
    if (dynamicHeadings?.mainhading?.calibration_settings) {
      const dynamicStructure = generateDynamicTableStructure(
        dynamicHeadings.mainhading.calibration_settings,
        apiData?.observationTemplate
      );
      if (dynamicStructure) {
        console.log('✅ Using dynamic table structure');
        return dynamicStructure;
      }
    }

    return null;
  };

  const tableStructure = generateTableStructure();
  const observationRows = createObservationRows(observations);

  // Initialize tableInputValues from observationRows


  // Render thermal coefficient section
  const renderThermalCoefficientSection = () => {
    return null;
  };

  // ✅ NEW: Input change handler with real-time calculations
  const handleInputChange = (rowIndex, colIndex, value) => {
    setTableInputValues((prev) => {
      const newValues = { ...prev };
      const key = `${rowIndex}-${colIndex}`;
      newValues[key] = value;

      // ✅ Real-time calculation
      const rowData = observationRows.rows[rowIndex].map((cell, idx) => {
        const inputKey = `${rowIndex}-${idx}`;
        return newValues[inputKey] ?? (cell?.toString() || '');
      });

      const calculated = calculateRowValues(rowData, apiData?.observationTemplate);

      // ✅ Find calculated field columns dynamically
      if (dynamicHeadings?.mainhading?.calibration_settings) {
        const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
          .filter(col => col.checkbox === 'yes')
          .sort((a, b) => a.field_position - b.field_position);
        
        let colIndex = 1; // Start after SR NO
        
        sortedSettings.forEach((setting) => {
          if (setting.fieldname === 'master') {
            const obsSettings = dynamicHeadings?.observation_heading?.observation_settings || [];
            const obsCount = obsSettings.filter(obs => obs.checkbox === 'yes').length;
            colIndex += obsCount;
          } else if (setting.fieldname === 'average' || setting.fieldname === 'averagemaster') {
            newValues[`${rowIndex}-${colIndex}`] = calculated.average;
            colIndex++;
          } else if (setting.fieldname === 'error') {
            newValues[`${rowIndex}-${colIndex}`] = calculated.error;
            colIndex++;
          } else if (setting.fieldname === 'hysterisis' || setting.fieldname === 'hysteresis') {
            newValues[`${rowIndex}-${colIndex}`] = calculated.hysteresis;
            colIndex++;
          } else {
            colIndex++;
          }
        });
      }
      return newValues;
    });
  };


  // ✅ UPDATED: Observation blur handler with UUC support
const handleObservationBlur = async (rowIndex, colIndex, value) => {
  const token = localStorage.getItem('authToken');
  const calibrationPointId = observationRows.hiddenInputs?.calibrationPoints?.[rowIndex];

  if (!calibrationPointId) {
    toast.error('Calibration point ID not found');
    return;
  }

  const rowData = observationRows.rows[rowIndex].map((cell, idx) => {
    const inputKey = `${rowIndex}-${idx}`;
    return tableInputValues[inputKey] ?? (cell?.toString() || '');
  });

  const calculated = calculateRowValues(rowData);
  const payloads = [];

  // ✅ Determine if this is a UUC or Master row
  const point = observations[rowIndex];
  const hasUUCData = point?.summary_data?.uuc && point.summary_data.uuc.length > 0;
  const observationType = hasUUCData ? 'uuc' : 'master';
  const averageType = hasUUCData ? 'averageuuc' : 'averagemaster';

  // ✅ Build payloads dynamically based on column
  if (dynamicHeadings?.mainhading?.calibration_settings) {
    const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
      .filter(col => col.checkbox === 'yes')
      .sort((a, b) => a.field_position - b.field_position);
    
    let currentColIndex = 1; // Start after SR NO
    
    for (const setting of sortedSettings) {
      if (setting.fieldname === 'uuc') {
        if (colIndex === currentColIndex) {
          payloads.push({
            inwardid: inwardId,
            instid: instId,
            calibrationpoint: calibrationPointId,
            type: 'uuc',
            repeatable: '0',
            value: value || '0',
          });
        }
        currentColIndex++;
      } 
      else if (setting.fieldname === 'calculatedmaster') {
        if (colIndex === currentColIndex) {
          payloads.push({
            inwardid: inwardId,
            instid: instId,
            calibrationpoint: calibrationPointId,
            type: 'calculatedmaster',
            repeatable: '0',
            value: value || '0',
          });
        }
        currentColIndex++;
      } 
      else if (setting.fieldname === 'master') {
        const obsSettings = dynamicHeadings?.observation_heading?.observation_settings || [];
        const obsCount = obsSettings.filter(obs => obs.checkbox === 'yes').length;
        
        for (let i = 0; i < obsCount; i++) {
          if (colIndex === currentColIndex) {
            // ✅ Save observation with correct type (uuc or master)
            payloads.push({
              inwardid: inwardId,
              instid: instId,
              calibrationpoint: calibrationPointId,
              type: observationType, // ✅ Dynamic type
              repeatable: i.toString(),
              value: value || '0',
            });
            
            // ✅ Also save calculated values with correct type
            payloads.push({
              inwardid: inwardId,
              instid: instId,
              calibrationpoint: calibrationPointId,
              type: averageType, // ✅ Dynamic average type
              repeatable: '0',
              value: calculated.average || '0',
            });
            
            payloads.push({
              inwardid: inwardId,
              instid: instId,
              calibrationpoint: calibrationPointId,
              type: 'error',
              repeatable: '0',
              value: calculated.error || '0',
            });
            
            if (calculated.hysteresis) {
              payloads.push({
                inwardid: inwardId,
                instid: instId,
                calibrationpoint: calibrationPointId,
                type: 'hysterisis',
                repeatable: '0',
                value: calculated.hysteresis || '0',
              });
            }
            
            if (calculated.repeatability) {
              payloads.push({
                inwardid: inwardId,
                instid: instId,
                calibrationpoint: calibrationPointId,
                type: 'repeatability',
                repeatable: '0',
                value: calculated.repeatability || '0',
              });
            }
          }
          currentColIndex++;
        }
      } 
      else {
        currentColIndex++;
      }
    }
  }

  console.log('📡 Observation Blur Payloads:', payloads);
  console.log('📊 Observation Type:', observationType, '| Average Type:', averageType);

  try {
    for (const payload of payloads) {
      await axios.post(
        'https://lims.kailtech.in/api/calibrationprocess/set-observations',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    console.log(`✅ Observation [${rowIndex}, ${colIndex}] and calculated values saved successfully!`);
    toast.success('Observation saved successfully!');

    // ✅ Refetch observations after save
    const headingsResponse = await fetchDynamicHeadings(suffix);
    if (headingsResponse?.data?.calibration_points) {
      setObservations(headingsResponse.data.calibration_points);
    }
  } catch (err) {
    console.error(`❌ Error saving observation [${rowIndex}, ${colIndex}]:`, err);
    toast.error(err.response?.data?.message || 'Failed to save observation');
  }
};
 

  const handleBackToInwardList = () => {
    navigate(
      `/dashboards/calibration-process/inward-entry-lab?caliblocation=${caliblocation}&calibacc=${calibacc}`
    );
  };

  const handleBackToPerformCalibration = () => {
    navigate(
      `/dashboards/calibration-process/inward-entry-lab/perform-calibration/${id}?caliblocation=${caliblocation}&calibacc=${calibacc}`
    );
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('authToken');
  const calibrationPoints = [];
  const types = [];
  const repeatables = [];
  const values = [];

  // Add thermal coefficients if applicable (currently not used, but keeping for future)
  // You can uncomment and add thermal coefficient logic here if needed

  // Process each row dynamically based on dynamic headings
  observationRows.rows.forEach((row, rowIndex) => {
    const calibPointId = observationRows.hiddenInputs?.calibrationPoints?.[rowIndex] || '';

    const rowData = row.map((cell, idx) => {
      const inputKey = `${rowIndex}-${idx}`;
      return tableInputValues[inputKey] ?? (cell?.toString() || '');
    });

    const calculated = calculateRowValues(rowData);

    // Build payloads dynamically based on calibration settings
    if (dynamicHeadings?.mainhading?.calibration_settings) {
      const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
        .filter(col => col.checkbox === 'yes')
        .sort((a, b) => a.field_position - b.field_position);

      let colIndex = 1; // Start after SR NO

      sortedSettings.forEach((setting) => {
        const fieldname = setting.fieldname;

        if (fieldname === 'uuc') {
          calibrationPoints.push(calibPointId);
          types.push('uuc');
          repeatables.push('0');
          values.push(rowData[colIndex] || '0');
          colIndex++;
        } 
        else if (fieldname === 'calculatedmaster') {
          calibrationPoints.push(calibPointId);
          types.push('calculatedmaster');
          repeatables.push('0');
          values.push(rowData[colIndex] || '0');
          colIndex++;
        } 
        else if (fieldname === 'master') {
          const obsSettings = dynamicHeadings?.observation_heading?.observation_settings || [];
          const obsCount = obsSettings.filter(obs => obs.checkbox === 'yes').length;

          // Add each master observation
          for (let i = 0; i < obsCount; i++) {
            calibrationPoints.push(calibPointId);
            types.push('master');
            repeatables.push(i.toString());
            values.push(rowData[colIndex] || '0');
            colIndex++;
          }
        } 
        else if (fieldname === 'average' || fieldname === 'averagemaster') {
          calibrationPoints.push(calibPointId);
          types.push('averagemaster');
          repeatables.push('0');
          values.push(calculated.average || '0');
          colIndex++;
        } 
        else if (fieldname === 'error') {
          calibrationPoints.push(calibPointId);
          types.push('error');
          repeatables.push('0');
          values.push(calculated.error || '0');
          colIndex++;
        } 
        else if (fieldname === 'hysterisis' || fieldname === 'hysteresis') {
          calibrationPoints.push(calibPointId);
          types.push('hysterisis');
          repeatables.push('0');
          values.push(calculated.hysteresis || '0');
          colIndex++;
        } 
        else if (fieldname === 'repeatability') {
          calibrationPoints.push(calibPointId);
          types.push('repeatability');
          repeatables.push('0');
          values.push(calculated.repeatability || '0');
          colIndex++;
        }
        else {
          // Skip other fields that don't need to be saved
          colIndex++;
        }
      });
    }
  });

  const payloadStep3 = {
    inwardid: inwardId,
    instid: instId,
    caliblocation: caliblocation,
    calibacc: calibacc,
    tempend: formData.tempend,
    humiend: formData.humiend,
    notes: formData.notes,
    enddate: formData.enddate,
    duedate: formData.duedate,
    calibrationpoint: calibrationPoints,
    type: types,
    repeatable: repeatables,
    value: values,
  };

  console.log('📤 Step 3 Payload:', payloadStep3);

  try {
    const response = await axios.post(
      'https://lims.kailtech.in/api/calibrationprocess/insert-calibration-step3',
      payloadStep3,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('✅ Step 3 saved successfully:', response.data);
    toast.success('All data submitted successfully!');
    
    setTimeout(() => {
      navigate(
        `/dashboards/calibration-process/inward-entry-lab/perform-calibration/${id}?caliblocation=${caliblocation}&calibacc=${calibacc}`
      );
    }, 1000);
  } catch (error) {
    console.error('❌ Network Error:', error);
    toast.error(error.response?.data?.message || 'Something went wrong while submitting');
  }
};

  if (loading) {
    return (
      <Page title="CalibrateStep3">
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title="CalibrateStep3">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-medium text-gray-800 dark:text-white">Fill Dates</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleBackToInwardList}
                  className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  ← Back to Inward Entry List
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBackToPerformCalibration}
                  className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  ← Back to Perform Calibration
                </Button>
              </div>
            </div>
            
            <InstrumentInfo 
              instrument={apiData?.instrument}
              inwardEntry={apiData?.inwardEntry}
              caliblocation={caliblocation}
            />

            <form onSubmit={handleSubmit} className="p-6">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Masters</h2>
              <MastersList masters={apiData?.masters || []} />
              <div className="mb-6">
                <h2 className="text-md font-medium text-gray-800 dark:text-white mb-2">Support masters</h2>
                <SupportMastersList supportMasters={supportMasters} />
              </div>

              {/* Dynamic Observation Table */}
              {tableStructure && observationRows.rows.length > 0 && (
                <ObservationTable
                  observationTemplate={apiData?.observationTemplate}
                  selectedTableData={{
                    id: apiData?.observationTemplate,
                    staticRows: observationRows.rows,
                    hiddenInputs: observationRows.hiddenInputs
                  }}
                  tableStructure={tableStructure}
                  tableInputValues={tableInputValues}
                  observationErrors={observationErrors}
                  handleInputChange={handleInputChange}
                  handleObservationBlur={handleObservationBlur}
                  handleRowSave={() => {}}
                  unitsList={[]}
                  dynamicHeadings={dynamicHeadings}
                  suffix={suffix}
                  renderThermalCoefficientSection={renderThermalCoefficientSection}
                  setObservationErrors={setObservationErrors}
                  observations={observations}
                />
              )}

              {/* <EnvironmentalConditions
                formData={formData}
                handleFormChange={handleFormChange}
                
                temperatureRange={temperatureRange}
                humidityRange={humidityRange}
              /> */}
              <DateNotesForm
                  formData={formData}
                  handleFormChange={handleFormChange}
                />
  
                <Notes 
                  formData={formData}
                  handleFormChange={handleFormChange}
                />
              
              
              <div className="flex justify-end mt-8 mb-4">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded font-medium transition-colors"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CalibrateStep3;