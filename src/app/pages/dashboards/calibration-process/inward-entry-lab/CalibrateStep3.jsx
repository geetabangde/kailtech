import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Page } from 'components/shared/Page';
import { Button } from 'components/ui/Button';
import { toast } from 'sonner';
import axios from 'utils/axios';
import InstrumentInfo from './components/InstrumentInfo';
import MastersList from './components/MastersList';
import SupportMastersList from './components/SupportMastersList';
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
  const [dynamicHeadings, setDynamicHeadings] = useState(null);
  const [suffix, setSuffix] = useState('');
  const [observations, setObservations] = useState([]);
  const [tableInputValues, setTableInputValues] = useState({});
  const [observationErrors, setObservationErrors] = useState({});
  const [supportMasters, setSupportMasters] = useState([]);
  const [formData, setFormData] = useState({
    enddate: '',
    duedate: '',
    notes: '',
    tempend: '',
    humiend: '',
  });

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
  
// ✅ Complete Formula Evaluator with All Math Functions
const evaluateFormula = (formula, variables) => {
  if (!formula || !formula.trim()) return '';

  try {
    let expr = formula.trim();
    
    console.log('🧮 Original formula:', formula);
    console.log('📊 Input variables:', variables);

    // Step 1: Remove ALL $ signs from formula
    expr = expr.replace(/\$/g, '');
    
    // Step 2: Create clean variables without $ signs
    const cleanVariables = {};
    Object.keys(variables).forEach(key => {
      const cleanKey = key.replace(/\$/g, '');
      cleanVariables[cleanKey] = variables[key];
    });

    console.log('🔧 Clean formula:', expr);
    console.log('🔧 Clean variables:', cleanVariables);

    // Step 3: Handle special functions and operators
    // Replace all function patterns with JavaScript equivalents
    
    // Math functions mapping
    const functionMappings = [
      { pattern: /\babs\(([^)]+)\)/g, replacement: 'Math.abs($1)' },
      { pattern: /\bpow\(([^,]+),\s*([^)]+)\)/g, replacement: 'Math.pow($1, $2)' },
      { pattern: /\bsqrt\(([^)]+)\)/g, replacement: 'Math.sqrt($1)' },
      { pattern: /\bmin\(([^)]+)\)/g, replacement: 'Math.min($1)' },
      { pattern: /\bmax\(([^)]+)\)/g, replacement: 'Math.max($1)' }
    ];

    functionMappings.forEach(mapping => {
      expr = expr.replace(mapping.pattern, mapping.replacement);
    });

    // Step 4: Handle modulus operator (%)
    expr = expr.replace(/%/g, '%');

    // Step 5: Replace variables with their numeric values
    const sortedKeys = Object.keys(cleanVariables).sort((a, b) => b.length - a.length);
    
    for (const key of sortedKeys) {
      if (typeof cleanVariables[key] !== 'number') continue;
      
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      expr = expr.replace(regex, `(${cleanVariables[key]})`);
    }

    // Step 6: Replace any remaining unknown variables with 0
    expr = expr.replace(/\b[mM]\d+\b/g, '0');

    console.log('📝 Final expression:', expr);

    // Step 7: Safe evaluation with all Math functions available
    const result = new Function(`
      'use strict';
      const abs = Math.abs;
      const pow = Math.pow;
      const sqrt = Math.sqrt;
      const min = Math.min;
      const max = Math.max;
      return ${expr};
    `)();

    if (isNaN(result) || result === Infinity || result === -Infinity) {
      console.warn('⚠️ Invalid result:', result);
      return '';
    }

    const finalValue = parseFloat(result.toFixed(4));
    console.log('✅ Result:', finalValue);
    
    return finalValue;
  } catch (err) {
    console.error('❌ Formula evaluation failed:', {
      formula,
      error: err.message,
      variables
    });
    return '';
  }
};

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

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          '/calibrationprocess/get-calibration-step3-details',
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
        setSupportMasters(response.data.supportMasters || []);

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

  // ✅ Create observation rows with ALL master columns
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
      const row = [(index + 1).toString()];

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
            row.push(point.converted_point || point.calculated_master || '');
          }
          else if (fieldname === 'master') {
            // ✅ Show ALL master observations dynamically
            const masterData = point.summary_data?.master || [];
            const obsSettings = dynamicHeadings?.observation_heading?.observation_settings || [];
            
            const sortedMasterData = [...masterData].sort((a, b) => 
              parseInt(a.repeatable) - parseInt(b.repeatable)
            );
            
            const enabledObsSettings = obsSettings.filter(obs => obs.checkbox === 'yes');
            
            enabledObsSettings.forEach((obsSetting, obsIndex) => {
              const masterValue = sortedMasterData[obsIndex]?.value || '';
              row.push(masterValue);
            });
          }
          else {
            // For other fields, just push empty initially (will be calculated)
            row.push('');
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

  // ✅ Calculate initial values when observations load
  useEffect(() => {
    if (observations.length > 0 && dynamicHeadings) {
      console.log('🔄 Calculating initial values...');
      
      const initialValues = {};
      
      observations.forEach((point, rowIndex) => {
        // Build column map
        const columnMap = {};
        
        if (dynamicHeadings?.mainhading?.calibration_settings) {
          const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
            .filter(col => col.checkbox === 'yes')
            .sort((a, b) => a.field_position - b.field_position);
          
          let currentCol = 1;
          
          sortedSettings.forEach((setting) => {
            if (setting.fieldname === 'master') {
              const obsCount = dynamicHeadings?.observation_heading?.observation_settings
                ?.filter(obs => obs.checkbox === 'yes').length || 0;
              
              columnMap[setting.fieldname] = {
                startCol: currentCol,
                endCol: currentCol + obsCount - 1,
                count: obsCount
              };
              currentCol += obsCount;
            } else {
              columnMap[setting.fieldname] = currentCol;
              currentCol++;
            }
          });
        }
        
        // Build variables from ALL master observations
        const variables = {};
        
        if (point.summary_data?.master && dynamicHeadings?.observation_heading?.observation_settings) {
          const obsSettings = dynamicHeadings.observation_heading.observation_settings.filter(
            obs => obs.checkbox === 'yes'
          );
          
          const masterData = point.summary_data.master.sort((a, b) => 
            parseInt(a.repeatable) - parseInt(b.repeatable)
          );
          
          // Map ALL master observations to their variables
          obsSettings.forEach((obsSetting, idx) => {
            const varName = obsSetting.setvariable; // e.g., "$m1", "$m2", etc.
            const value = parseFloat(masterData[idx]?.value) || 0;
            variables[varName] = value;
          });
        }
        
        console.log(`Row ${rowIndex} initial variables:`, variables);
        
        // Calculate all formula-based fields
        if (dynamicHeadings?.mainhading?.calibration_settings) {
          const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
            .filter(col => col.checkbox === 'yes')
            .sort((a, b) => a.field_position - b.field_position);
          
          sortedSettings.forEach((setting) => {
            const { fieldname, formula, SetVariable } = setting;
            
            if (fieldname === 'master') return;
            
            if (formula && formula.trim() !== '') {
              const colIdx = columnMap[fieldname];
              if (colIdx !== undefined) {
                const calculatedValue = evaluateFormula(formula, variables);
                
                if (calculatedValue !== '') {
                  initialValues[`${rowIndex}-${colIdx}`] = calculatedValue;
                  console.log(`✅ Row ${rowIndex}, ${fieldname}: ${calculatedValue}`);
                  
                  // Store in variables for formula chaining
                  if (SetVariable && SetVariable.trim() !== '') {
                    variables[SetVariable] = parseFloat(calculatedValue) || 0;
                  }
                }
              }
            }
          });
        }
      });
      
      setTableInputValues(prev => ({ ...prev, ...initialValues }));
      console.log('✅ Initial calculations done:', initialValues);
    }
  }, [observations, dynamicHeadings]);

  const renderThermalCoefficientSection = () => {
    return null;
  };

  // ✅ Handle input changes with real-time calculation
  const handleInputChange = (rowIndex, colIndex, value) => {
    setTableInputValues((prev) => {
      const newValues = { ...prev };
      const key = `${rowIndex}-${colIndex}`;
      newValues[key] = value;

      // Get current row data
      const rowData = observationRows.rows[rowIndex].map((cell, idx) => {
        const inputKey = `${rowIndex}-${idx}`;
        return newValues[inputKey] ?? (cell?.toString() || '');
      });

      // Build column map
      const columnMap = {};
      
      if (dynamicHeadings?.mainhading?.calibration_settings) {
        const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
          .filter(col => col.checkbox === 'yes')
          .sort((a, b) => a.field_position - b.field_position);
        
        let currentCol = 1;
        
        sortedSettings.forEach((setting) => {
          if (setting.fieldname === 'master') {
            const obsCount = dynamicHeadings?.observation_heading?.observation_settings
              ?.filter(obs => obs.checkbox === 'yes').length || 0;
            
            columnMap[setting.fieldname] = {
              startCol: currentCol,
              endCol: currentCol + obsCount - 1,
              count: obsCount
            };
            currentCol += obsCount;
          } else {
            columnMap[setting.fieldname] = currentCol;
            currentCol++;
          }
        });
      }

      // Build variables from ALL master observations
      const variables = {};
      
      if (dynamicHeadings?.observation_heading?.observation_settings && columnMap['master']) {
        const obsSettings = dynamicHeadings.observation_heading.observation_settings.filter(
          obs => obs.checkbox === 'yes'
        );
        
        const masterInfo = columnMap['master'];
        
        obsSettings.forEach((obsSetting, idx) => {
          const varName = obsSetting.setvariable;
          const colIdx = masterInfo.startCol + idx;
          const cellValue = parseFloat(rowData[colIdx]) || 0;
          variables[varName] = cellValue;
        });
      }

      console.log('📊 Variables from master observations:', variables);

      // Calculate all formula-based fields
      if (dynamicHeadings?.mainhading?.calibration_settings) {
        const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
          .filter(col => col.checkbox === 'yes')
          .sort((a, b) => a.field_position - b.field_position);
        
        sortedSettings.forEach((setting) => {
          const { fieldname, formula, SetVariable } = setting;
          
          if (fieldname === 'master') return;
          
          if (formula && formula.trim() !== '') {
            const calculatedValue = evaluateFormula(formula, variables);
            
            if (calculatedValue !== '') {
              const colIdx = columnMap[fieldname];
              if (colIdx !== undefined) {
                newValues[`${rowIndex}-${colIdx}`] = calculatedValue;
                
                // Store for formula chaining
                if (SetVariable && SetVariable.trim() !== '') {
                  variables[SetVariable] = parseFloat(calculatedValue) || 0;
                }
              }
            }
          }
        });
      }
      
      return newValues;
    });
  };

  // ✅ Handle blur to save observations
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

    const payloads = [];
    
    // Build variables
    const variables = {};
    
    if (dynamicHeadings?.observation_heading?.observation_settings) {
      const obsSettings = dynamicHeadings.observation_heading.observation_settings.filter(
        obs => obs.checkbox === 'yes'
      );
      
      const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
        .filter(col => col.checkbox === 'yes')
        .sort((a, b) => a.field_position - b.field_position);
      
      let masterStartCol = -1;
      let tempCol = 1;
      
      for (const setting of sortedSettings) {
        if (setting.fieldname === 'master') {
          masterStartCol = tempCol;
          break;
        }
        tempCol++;
      }
      
      if (masterStartCol !== -1) {
        obsSettings.forEach((obsSetting, idx) => {
          const varName = obsSetting.setvariable;
          const colIdx = masterStartCol + idx;
          const cellValue = parseFloat(rowData[colIdx]) || 0;
          variables[varName] = cellValue;
        });
      }
    }

    // Build payloads
    if (dynamicHeadings?.mainhading?.calibration_settings) {
      const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
        .filter(col => col.checkbox === 'yes')
        .sort((a, b) => a.field_position - b.field_position);
      
      let currentColIndex = 1;
      
      for (const setting of sortedSettings) {
        const fieldname = setting.fieldname;
        
        if (fieldname === 'uuc') {
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
        else if (fieldname === 'calculatedmaster') {
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
        else if (fieldname === 'master') {
          const obsSettings = dynamicHeadings?.observation_heading?.observation_settings || [];
          const obsCount = obsSettings.filter(obs => obs.checkbox === 'yes').length;
          
          for (let i = 0; i < obsCount; i++) {
            if (colIndex === currentColIndex) {
              payloads.push({
                inwardid: inwardId,
                instid: instId,
                calibrationpoint: calibrationPointId,
                type: 'master',
                repeatable: i.toString(),
                value: value || '0',
              });
              
              // Also save all calculated fields
              sortedSettings.forEach((calcSetting) => {
                if (calcSetting.formula && calcSetting.formula.trim() !== '') {
                  const calculatedValue = evaluateFormula(calcSetting.formula, variables);
                  
                  if (calculatedValue !== '') {
                    payloads.push({
                      inwardid: inwardId,
                      instid: instId,
                      calibrationpoint: calibrationPointId,
                      type: calcSetting.fieldname,
                      repeatable: '0',
                      value: calculatedValue.toString(),
                    });
                  }
                }
              });
            }
            currentColIndex++;
          }
        } 
        else {
          currentColIndex++;
        }
      }
    }

    console.log('📡 Saving payloads:', payloads);

    try {
      for (const payload of payloads) {
        await axios.post(
          '/calibrationprocess/set-observations',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log(`✅ Saved successfully!`);
      toast.success('Observation saved successfully!');

      // Refetch observations
      const headingsResponse = await fetchDynamicHeadings(suffix);
      if (headingsResponse?.data?.calibration_points) {
        setObservations(headingsResponse.data.calibration_points);
      }
    } catch (err) {
      console.error(`❌ Error saving:`, err);
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

    observationRows.rows.forEach((row, rowIndex) => {
      const calibPointId = observationRows.hiddenInputs?.calibrationPoints?.[rowIndex] || '';

      const rowData = row.map((cell, idx) => {
        const inputKey = `${rowIndex}-${idx}`;
        return tableInputValues[inputKey] ?? (cell?.toString() || '');
      });

      // Build variables
      const variables = {};
      
      if (dynamicHeadings?.observation_heading?.observation_settings) {
        const obsSettings = dynamicHeadings.observation_heading.observation_settings.filter(
          obs => obs.checkbox === 'yes'
        );
        
        const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
          .filter(col => col.checkbox === 'yes')
          .sort((a, b) => a.field_position - b.field_position);
        
        let masterStartCol = -1;
        let tempCol = 1;
        
        for (const setting of sortedSettings) {
          if (setting.fieldname === 'master') {
            masterStartCol = tempCol;
            break;
          }
          tempCol++;
        }
        
        if (masterStartCol !== -1) {
          obsSettings.forEach((obsSetting, idx) => {
            const varName = obsSetting.setvariable;
            const colIdx = masterStartCol + idx;
            const cellValue = parseFloat(rowData[colIdx]) || 0;
            variables[varName] = cellValue;
          });
        }
      }

      // Build payloads
      if (dynamicHeadings?.mainhading?.calibration_settings) {
        const sortedSettings = [...dynamicHeadings.mainhading.calibration_settings]
          .filter(col => col.checkbox === 'yes')
          .sort((a, b) => a.field_position - b.field_position);

        let colIndex = 1;

        sortedSettings.forEach((setting) => {
          const fieldname = setting.fieldname;
          const formula = setting.formula;

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

            for (let i = 0; i < obsCount; i++) {
              calibrationPoints.push(calibPointId);
              types.push('master');
              repeatables.push(i.toString());
              values.push(rowData[colIndex] || '0');
              colIndex++;
            }
          } 
          else if (formula && formula.trim() !== '') {
            const calculatedValue = evaluateFormula(formula, variables);
            
            calibrationPoints.push(calibPointId);
            types.push(fieldname);
            repeatables.push('0');
            values.push(calculatedValue?.toString() || '0');
            colIndex++;
          }
          else {
            calibrationPoints.push(calibPointId);
            types.push(fieldname);
            repeatables.push('0');
            values.push(rowData[colIndex] || '0');
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
        '/calibrationprocess/insert-calibration-step3',
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