import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Page } from "components/shared/Page";
import { Button } from "components/ui/Button";
import { toast } from "sonner";
import axios from "utils/axios";
import InstrumentInfo from "./components/InstrumentInfo";
import MastersList from "./components/MastersList";
import SupportMastersList from "./components/SupportMastersList";
import DateNotesForm from "./components/DateNotesForm";
import ObservationTable from "./components/ObservationTable";
import Notes from "./components/Notes";

const CalibrateStep3 = () => {
  const navigate = useNavigate();
  const { id, itemId: instId } = useParams();
  const inwardId = id;
  const searchParams = new URLSearchParams(window.location.search);
  const caliblocation = searchParams.get("caliblocation") || "Lab";
  const calibacc = searchParams.get("calibacc") || "Nabl";

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dynamicHeadings, setDynamicHeadings] = useState(null);
  const [suffix, setSuffix] = useState("");
  const [observations, setObservations] = useState([]);
  const [tableInputValues, setTableInputValues] = useState({});
  const [observationErrors, setObservationErrors] = useState({});
  const [supportMasters, setSupportMasters] = useState([]);
  const [humidityRange, setHumidityRange] = useState(null);
  const [temperatureRange, setTemperatureRange] = useState(null);
  const [errors] = useState({});
  const [formData, setFormData] = useState({
    enddate: "",
    duedate: "",
    notes: "",
    tempend: "",
    humiend: "",
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch {
      console.warn("Invalid date format:", dateString);
      return "";
    }
  };


  // ✅ Wrap evaluateFormula in useCallback to prevent re-creation
  const evaluateFormula = useCallback((formula, variables) => {
    if (!formula || !formula.trim()) return "";

    try {
      let expr = formula.trim();

      console.log("🧮 Original formula:", formula);
      console.log("📊 Input variables:", variables);

      // Step 1: Remove ALL $ signs from formula
      expr = expr.replace(/\$/g, "");

      // Step 2: Create clean variables without $ signs
      const cleanVariables = {};
      Object.keys(variables).forEach((key) => {
        const cleanKey = key.replace(/\$/g, "");
        cleanVariables[cleanKey] = variables[key];
      });

      console.log("🔧 Clean formula:", expr);
      console.log("🔧 Clean variables:", cleanVariables);

      // Step 3: Handle special functions and operators
      const functionMappings = [
        { pattern: /\babs\(([^)]+)\)/g, replacement: "Math.abs($1)" },
        {
          pattern: /\bpow\(([^,]+),\s*([^)]+)\)/g,
          replacement: "Math.pow($1, $2)",
        },
        { pattern: /\bsqrt\(([^)]+)\)/g, replacement: "Math.sqrt($1)" },
        { pattern: /\bmin\(([^)]+)\)/g, replacement: "Math.min($1)" },
        { pattern: /\bmax\(([^)]+)\)/g, replacement: "Math.max($1)" },
      ];

      functionMappings.forEach((mapping) => {
        expr = expr.replace(mapping.pattern, mapping.replacement);
      });

      // Step 4: Replace variables with their numeric values
      const sortedKeys = Object.keys(cleanVariables).sort(
        (a, b) => b.length - a.length,
      );

      for (const key of sortedKeys) {
        if (typeof cleanVariables[key] !== "number") continue;

        const regex = new RegExp(`\\b${key}\\b`, "g");
        expr = expr.replace(regex, `(${cleanVariables[key]})`);
      }

      // Step 5: Replace any remaining unknown variables with 0
      expr = expr.replace(/\b[a-zA-Z]\w*\b/g, "0");

      console.log("📝 Final expression:", expr);

      // Step 6: Safe evaluation
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
        console.warn("⚠️ Invalid result:", result);
        return "";
      }

      const finalValue = parseFloat(result.toFixed(4));
      console.log("✅ Result:", finalValue);

      return finalValue;
    } catch (err) {
      console.error("❌ Formula evaluation failed:", {
        formula,
        error: err.message,
        variables,
      });
      return "";
    }
  }, []); // Empty dependency array since the function logic doesn't depend on any external values

  const fetchDynamicHeadings = useCallback(
    async (suffix) => {
      if (!suffix) {
        console.log("❌ No suffix provided for dynamic headings");
        return null;
      }

      try {
        console.log("🔍 Fetching dynamic headings for suffix:", suffix);

        const response = await axios.post(
          "/observationsetting/get-custome-observation",
          {
            inwardid: inwardId,
            instid: instId,
            suffix: suffix,
          },
        );

        console.log("📊 Dynamic Headings API Response:", response.data);

        if (response.data.status === true) {
          return {
            heading: response.data.heading,
            data: response.data.data,
          };
        } else {
          console.log("❌ No dynamic headings found in response");
          return null;
        }
      } catch (error) {
        console.error("Error fetching dynamic headings:", error);
        return null;
      }
    },
    [instId, inwardId],
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/calibrationprocess/get-calibration-step3-details",
          {
            params: {
              inward_id: inwardId,
              instid: instId,
              caliblocation: caliblocation,
              calibacc: calibacc,
            },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          },
        );

        console.log("All API Data:", response.data);
        setApiData(response.data);
        setSupportMasters(response.data.supportMasters || []);
        setHumidityRange(response.data.humidityRange || null);
        setTemperatureRange(response.data.temperatureRange || null);

        console.log("supports data", response.data);

        if (response.data.listOfInstrument?.suffix) {
          setSuffix(response.data.listOfInstrument.suffix);
          console.log("Suffix found:", response.data.listOfInstrument.suffix);

          const headingsResponse = await fetchDynamicHeadings(
            response.data.listOfInstrument.suffix,
          );

          if (headingsResponse) {
            setDynamicHeadings(headingsResponse.heading);

            if (headingsResponse.data?.calibration_points) {
              console.log(
                "Setting observations from get-custome-observation API:",
                headingsResponse.data.calibration_points,
              );
              setObservations(headingsResponse.data.calibration_points);
            }
          }
        }

        setFormData((prev) => ({
          ...prev,
          setTemperatureRange: response.data.temperatureRange || null,
          humidityRange: response.data.humidityRange || null,
          enddate: formatDateForInput(response.data.instrument?.enddate),
          humiend: response.data.instrument?.humiend || "",
          tempend: response.data.instrument?.tempend || "",
          duedate: formatDateForInput(response.data.instrument?.duedate),
          temperatureEnd:
            response.data.temperatureRange?.min &&
            response.data.temperatureRange?.max
              ? `${response.data.temperatureRange.min} - ${response.data.temperatureRange.max}`
              : response.data.temperatureRange?.value || "",
          humidityEnd:
            response.data.humidityRange?.min && response.data.humidityRange?.max
              ? `${response.data.humidityRange.min} - ${response.data.humidityRange.max}`
              : response.data.humidityRange?.value || "",
        }));
      } catch (err) {
        console.error("API Error:", err.response?.data || err);
        toast.error("Failed to fetch calibration data");
      } finally {
        setLoading(false);
      }
    };

    if (inwardId && instId) {
      fetchAllData();
    }
  }, [inwardId, instId, caliblocation, calibacc, fetchDynamicHeadings]);

  
  // ✅ Generate Dynamic Table Structure - Uses API order (NO SORTING)
  const generateDynamicTableStructure = useCallback(
    (headings) => {
      if (!headings || !Array.isArray(headings)) {
        console.log("❌ No headings provided for dynamic table structure");
        return null;
      }

      console.log("🔄 Generating dynamic table structure");

      // ✅ Use API order directly - NO SORTING by field_position
      const calibrationSettings = headings.filter(
        (col) => col.checkbox === "yes",
      );
      const observationFrom = dynamicHeadings?.observation_from || "master"; // ✅ FIXED
      const observationSettings =
        dynamicHeadings?.observation_heading?.observation_settings || [];
      const enabledObsSettings = observationSettings.filter(
        (obs) => obs.checkbox === "yes",
      );

      console.log(
        "📋 Fields in API order:",
        calibrationSettings.map((s) => s.fieldname),
      );
      console.log("📋 Observation from:", observationFrom);
      console.log("📋 Enabled observations:", enabledObsSettings.length);

      const headers = [];
      const subHeadersRow = [];

      // SR NO column
      headers.push({ name: "SR NO", colspan: 1 });
      subHeadersRow.push(null);

      // ✅ Process fields in API order
      calibrationSettings.forEach((heading) => {
        const headerName = heading.field_heading || heading.fieldname;
        const fieldname = heading.fieldname;

        // ✅ Handle different observation_from modes
        if (observationFrom === "master" && fieldname === "master") {
          // Master has multiple observations, UUC is single
          if (enabledObsSettings.length > 0) {
            headers.push({
              name: headerName,
              colspan: enabledObsSettings.length,
            });
            enabledObsSettings.forEach((obsSetting) => {
              subHeadersRow.push(
                obsSetting.field_heading || obsSetting.fieldname,
              );
            });
          } else {
            headers.push({ name: headerName, colspan: 1 });
            subHeadersRow.push(null);
          }
        } else if (observationFrom === "uuc" && fieldname === "uuc") {
          // ✅ UUC mode: UUC has multiple observations, Master is single
          if (enabledObsSettings.length > 0) {
            headers.push({
              name: headerName,
              colspan: enabledObsSettings.length,
            });
            enabledObsSettings.forEach((obsSetting) => {
              subHeadersRow.push(
                obsSetting.field_heading || obsSetting.fieldname,
              );
            });
          } else {
            headers.push({ name: headerName, colspan: 1 });
            subHeadersRow.push(null);
          }
        } else if (observationFrom === "separate") {
          // Both master and UUC have multiple observations
          if (fieldname === "master" || fieldname === "uuc") {
            if (enabledObsSettings.length > 0) {
              headers.push({
                name: headerName,
                colspan: enabledObsSettings.length,
              });
              enabledObsSettings.forEach((obsSetting) => {
                subHeadersRow.push(
                  obsSetting.field_heading || obsSetting.fieldname,
                );
              });
            } else {
              headers.push({ name: headerName, colspan: 1 });
              subHeadersRow.push(null);
            }
          } else {
            // Regular single column
            headers.push({ name: headerName, colspan: 1 });
            subHeadersRow.push(null);
          }
        } else {
          // Default case - regular single column
          headers.push({ name: headerName, colspan: 1 });
          subHeadersRow.push(null);
        }
      });

      console.log("✅ Headers generated:", headers);
      console.log("✅ Sub-headers generated:", subHeadersRow);

      return { headers, subHeadersRow };
    },
    [dynamicHeadings],
  );


  // ✅ Create observation rows - Supports all 3 observation_from modes + mode field + calculated fields
  const createObservationRows = (observationData) => {
    if (!observationData || !Array.isArray(observationData)) {
      return {
        rows: [],
        hiddenInputs: {
          calibrationPoints: [],
          types: [],
          repeatables: [],
          values: [],
        },
      };
    }

    const rows = [];
    const calibrationPoints = [];
    const types = [];
    const repeatables = [];
    const values = [];

    // ✅ Get observation_from from API response
    const observationFrom = dynamicHeadings?.observation_from || "master";
    const observationSettings =
      dynamicHeadings?.observation_heading?.observation_settings || [];
    const enabledObsSettings = observationSettings.filter(
      (obs) => obs.checkbox === "yes",
    );

    // ✅ Get calibration settings WITHOUT sorting - use API order
    const calibrationSettings =
      dynamicHeadings?.mainhading?.calibration_settings?.filter(
        (col) => col.checkbox === "yes",
      ) || [];

    console.log("🔄 Creating rows with observation_from:", observationFrom);
    console.log("📋 Enabled observations:", enabledObsSettings.length);

    observationData.forEach((point, index) => {
      const row = [(index + 1).toString()];

      // ✅ Process each field in API order (NO SORTING)
      calibrationSettings.forEach((setting) => {
        const fieldname = setting.fieldname;

        // ✅ Handle mode field
        if (fieldname === "mode") {
          const modeData = point.summary_data?.mode;
          if (modeData && Array.isArray(modeData) && modeData.length > 0) {
            row.push(modeData[0]?.value || "");
          } else {
            row.push(point.mode || "");
          }
        }
        // ✅ Handle range field
        else if (fieldname === "range") {
          const rangeData = point.summary_data?.range;
          if (rangeData && Array.isArray(rangeData) && rangeData.length > 0) {
            row.push(rangeData[0]?.value || "");
          } else {
            row.push(point.range || "");
          }
        }
    
        // ✅ Handle UUC field based on observation_from - FIXED VERSION
        else if (fieldname === "uuc") {
          if (observationFrom === "uuc" || observationFrom === "separate") {
            // ✅ UUC mode: Multiple observations
            const uucData = point.summary_data?.uuc || [];

            console.log(`📊 Point ${index} UUC data from API:`, uucData);

            if (uucData.length === 0) {
              // No data - fill all columns with empty
              enabledObsSettings.forEach(() => {
                row.push("");
              });
            } else if (uucData.length === 1 && uucData[0].repeatable === "0") {
              // ✅ Only one value in API - fill all observation columns with same value
              const uucValue = uucData[0]?.value || "";
              console.log(
                `✅ Auto-filling all ${enabledObsSettings.length} UUC columns with value: ${uucValue}`,
              );

              enabledObsSettings.forEach(() => {
                row.push(uucValue);
              });
            } else {
              // Multiple values available - sort by repeatable
              const sortedUucData = [...uucData].sort(
                (a, b) => parseInt(a.repeatable) - parseInt(b.repeatable),
              );

              // ✅ Fill exactly enabledObsSettings.length columns
              enabledObsSettings.forEach((_, idx) => {
                if (idx < sortedUucData.length) {
                  row.push(sortedUucData[idx]?.value || "");
                } else {
                  row.push("");
                }
              });
            }
          } else {
          
            // ✅ Master mode: UUC is single calculated value
            const uucData = point.summary_data?.uuc;
            if (uucData && Array.isArray(uucData) && uucData.length > 0) {
              const calculatedUuc = uucData.find(
                (item) => item.repeatable === "0",
              );
              row.push(calculatedUuc?.value || "");
            } else {
              row.push("");
            }
          }
        }
        // ✅ Handle calculatedmaster field
        else if (fieldname === "calculatedmaster") {
          const calcMasterData = point.summary_data?.calculatedmaster;
          if (
            calcMasterData &&
            Array.isArray(calcMasterData) &&
            calcMasterData.length > 0
          ) {
            row.push(calcMasterData[0]?.value || "");
          } else {
            row.push(point.converted_point || point.calculated_master || "");
          }
        }
        // ✅ Handle MASTER field based on observation_from
        else if (fieldname === "master") {
          if (observationFrom === "master" || observationFrom === "separate") {
            // ✅ Master has multiple observations
            const masterData = point.summary_data?.master || [];
            const sortedMasterData = [...masterData].sort(
              (a, b) => parseInt(a.repeatable) - parseInt(b.repeatable),
            );

            // Push multiple Master observation values
            enabledObsSettings.forEach((obsSetting, obsIndex) => {
              const masterValue = sortedMasterData[obsIndex]?.value || "";
              row.push(masterValue);
            });
          } else if (observationFrom === "uuc") {
            // ✅ UUC mode: Master is SINGLE value (not multiple observations)
            const masterData = point.summary_data?.master;
            if (
              masterData &&
              Array.isArray(masterData) &&
              masterData.length > 0
            ) {
              // ✅ Sirf repeatable "0" wala value lena hai (SINGLE VALUE)
              const masterSingleValue = masterData.find(
                (item) => item.repeatable === "0",
              );
              row.push(
                masterSingleValue?.value ||
                  point.point ||
                  point.converted_point ||
                  "",
              );
            } else {
              // Fallback to point data
              const masterValue = point.point || point.converted_point || "";
              row.push(masterValue);
            }
          } else {
            // Default fallback
            const masterData = point.summary_data?.master;
            if (
              masterData &&
              Array.isArray(masterData) &&
              masterData.length > 0
            ) {
              row.push(masterData[0]?.value || "");
            } else {
              row.push(point.point || point.converted_point || "");
            }
          }
        }
        // ✅ For all other fields (average, error, etc.)
        else {
          const summaryFieldData = point.summary_data?.[fieldname];
          if (
            summaryFieldData &&
            Array.isArray(summaryFieldData) &&
            summaryFieldData.length > 0
          ) {
            row.push(summaryFieldData[0]?.value || "");
          } else {
            row.push("");
          }
        }
      });

      console.log(`✅ Row ${index} complete:`, row);
      rows.push(row);
      calibrationPoints.push(point.id?.toString() || "");
      types.push("master");
      repeatables.push("0");
      values.push(point.point || point.converted_point || "0");
    });

    console.log("✅ All rows created:", rows);

    return {
      rows,
      hiddenInputs: { calibrationPoints, types, repeatables, values },
    };
  };

  const generateTableStructure = () => {
    if (dynamicHeadings?.mainhading?.calibration_settings) {
      const dynamicStructure = generateDynamicTableStructure(
        dynamicHeadings.mainhading.calibration_settings, // ✅ Only one parameter
      );
      if (dynamicStructure) {
        console.log("✅ Using dynamic table structure");
        return dynamicStructure;
      }
    }
    return null;
  };

  const tableStructure = generateTableStructure();
  const observationRows = createObservationRows(observations);

  // ✅ Calculate initial values - Supports all 3 observation_from modes
  useEffect(() => {
    if (observations.length > 0 && dynamicHeadings) {
      console.log("🔄 Calculating initial values...");

      const initialValues = {};
      const observationFrom = dynamicHeadings?.observation_from || "master";

      observations.forEach((point, rowIndex) => {
        // Build column map
        const columnMap = {};

        if (dynamicHeadings?.mainhading?.calibration_settings) {
          const calibrationSettings =
            dynamicHeadings.mainhading.calibration_settings.filter(
              (col) => col.checkbox === "yes",
            );

          const enabledObsSettings =
            dynamicHeadings?.observation_heading?.observation_settings?.filter(
              (obs) => obs.checkbox === "yes",
            ) || [];

          let currentCol = 1;

          calibrationSettings.forEach((setting) => {
            const fieldname = setting.fieldname;

            if (observationFrom === "master" && fieldname === "master") {
              columnMap[fieldname] = {
                startCol: currentCol,
                endCol: currentCol + enabledObsSettings.length - 1,
                count: enabledObsSettings.length,
              };
              currentCol += enabledObsSettings.length;
            } else if (observationFrom === "uuc" && fieldname === "uuc") {
              columnMap[fieldname] = {
                startCol: currentCol,
                endCol: currentCol + enabledObsSettings.length - 1,
                count: enabledObsSettings.length,
              };
              currentCol += enabledObsSettings.length;
            } else if (observationFrom === "separate") {
              if (fieldname === "master" || fieldname === "uuc") {
                columnMap[fieldname] = {
                  startCol: currentCol,
                  endCol: currentCol + enabledObsSettings.length - 1,
                  count: enabledObsSettings.length,
                };
                currentCol += enabledObsSettings.length;
              } else {
                columnMap[fieldname] = currentCol;
                currentCol++;
              }
            } else {
              columnMap[fieldname] = currentCol;
              currentCol++;
            }
          });
        }

        // ✅ Build variables CORRECTLY based on observation_from
        const variables = {};

        if (dynamicHeadings?.observation_heading?.observation_settings) {
          const obsSettings =
            dynamicHeadings.observation_heading.observation_settings.filter(
              (obs) => obs.checkbox === "yes",
            );

          if (observationFrom === "uuc" && point.summary_data?.uuc) {
            const uucData = [...point.summary_data.uuc].sort(
              (a, b) => parseInt(a.repeatable) - parseInt(b.repeatable),
            );

            // ✅ REMOVED unused uucStartCol variable - Use API data directly
            obsSettings.forEach((obsSetting, idx) => {
              const varName = obsSetting.setvariable;
              const value = parseFloat(uucData[idx]?.value) || 0;
              variables[varName] = value;
            });
          }
        }

        // ✅ Add master value to variables
        const masterValue = parseFloat(
          point.point || point.converted_point || "0",
        );
        variables["$master"] = masterValue;
        variables["master"] = masterValue;

        console.log(`Row ${rowIndex} variables:`, variables);
        console.log(`Row ${rowIndex} master value:`, masterValue);

        // ✅ Calculate all formula-based fields
        if (dynamicHeadings?.mainhading?.calibration_settings) {
          const calibrationSettings =
            dynamicHeadings.mainhading.calibration_settings.filter(
              (col) => col.checkbox === "yes",
            );

          calibrationSettings.forEach((setting) => {
            const { fieldname, formula, SetVariable } = setting;

            if (fieldname === "master" || fieldname === "uuc") return;

            if (formula && formula.trim() !== "") {
              const colIdx = columnMap[fieldname];
              if (colIdx !== undefined) {
                const calculatedValue = evaluateFormula(formula, variables);

                if (calculatedValue !== "") {
                  initialValues[`${rowIndex}-${colIdx}`] = calculatedValue;
                  console.log(
                    `✅ Row ${rowIndex}, ${fieldname}: ${calculatedValue} (formula: ${formula})`,
                  );

                  if (SetVariable && SetVariable.trim() !== "") {
                    variables[SetVariable] = parseFloat(calculatedValue) || 0;
                  }
                }
              }
            }
          });
        }
      });

      // ✅ Only set values that don't already exist
      setTableInputValues((prev) => {
        const newValues = { ...prev };

        Object.keys(initialValues).forEach((key) => {
          if (newValues[key] === undefined) {
            newValues[key] = initialValues[key];
          }
        });

        return newValues;
      });
    }
  }, [observations, dynamicHeadings, evaluateFormula]); // ✅ evaluateFormula is now memoized with useCallback // ✅ REMOVED tableInputValues and observationRows.rows

  const renderThermalCoefficientSection = () => {
    return null;
  };

  
  // ✅ Handle input changes - Supports all 3 observation_from modes
  const handleInputChange = (rowIndex, colIndex, value) => {
    setTableInputValues((prev) => {
      const newValues = { ...prev };
      const key = `${rowIndex}-${colIndex}`;
      newValues[key] = value;

      const observationFrom = dynamicHeadings?.observation_from || "master";

      // Get current row data
      const rowData = observationRows.rows[rowIndex].map((cell, idx) => {
        const inputKey = `${rowIndex}-${idx}`;
        return newValues[inputKey] ?? (cell?.toString() || "");
      });

      // Build column map
      const columnMap = {};
      let currentCol = 1;

      if (dynamicHeadings?.mainhading?.calibration_settings) {
        const calibrationSettings =
          dynamicHeadings.mainhading.calibration_settings.filter(
            (col) => col.checkbox === "yes",
          );

        const observationSettings =
          dynamicHeadings?.observation_heading?.observation_settings || [];
        const enabledObsSettings = observationSettings.filter(
          (obs) => obs.checkbox === "yes",
        );

        calibrationSettings.forEach((setting) => {
          const fieldname = setting.fieldname;

          if (observationFrom === "master" && fieldname === "master") {
            // Master has multiple observations
            columnMap[fieldname] = {
              startCol: currentCol,
              endCol: currentCol + enabledObsSettings.length - 1,
              count: enabledObsSettings.length,
            };
            currentCol += enabledObsSettings.length;
          } else if (observationFrom === "uuc" && fieldname === "uuc") {
            // UUC has multiple observations
            columnMap[fieldname] = {
              startCol: currentCol,
              endCol: currentCol + enabledObsSettings.length - 1,
              count: enabledObsSettings.length,
            };
            currentCol += enabledObsSettings.length;
          } else if (observationFrom === "separate") {
            // Both master and UUC have multiple observations
            if (fieldname === "master" || fieldname === "uuc") {
              columnMap[fieldname] = {
                startCol: currentCol,
                endCol: currentCol + enabledObsSettings.length - 1,
                count: enabledObsSettings.length,
              };
              currentCol += enabledObsSettings.length;
            } else {
              columnMap[fieldname] = currentCol;
              currentCol++;
            }
          } else {
            columnMap[fieldname] = currentCol;
            currentCol++;
          }
        });
      }

      // Build variables based on observation_from
      const variables = {};

      // Get master value from observation data
      const point = observations[rowIndex];
      const masterValue = parseFloat(
        point?.point || point?.converted_point || "0",
      );
      variables["$master"] = masterValue;
      variables["master"] = masterValue;

      if (dynamicHeadings?.observation_heading?.observation_settings) {
        const obsSettings =
          dynamicHeadings.observation_heading.observation_settings.filter(
            (obs) => obs.checkbox === "yes",
          );

        if (observationFrom === "uuc" && columnMap["uuc"]) {
          const uucInfo = columnMap["uuc"];
          obsSettings.forEach((obsSetting, idx) => {
            const varName = obsSetting.setvariable;
            const colIdx = uucInfo.startCol + idx;
            const cellValue = parseFloat(rowData[colIdx]) || 0;
            variables[varName] = cellValue;
          });
        }
      }

      console.log("📊 Variables for calculation:", variables);
      console.log("📊 Master value:", masterValue);

      // Calculate all formula-based fields
      if (dynamicHeadings?.mainhading?.calibration_settings) {
        const calibrationSettings =
          dynamicHeadings.mainhading.calibration_settings.filter(
            (col) => col.checkbox === "yes",
          );

        calibrationSettings.forEach((setting) => {
          const { fieldname, formula, SetVariable } = setting;

          if (fieldname === "master" || fieldname === "uuc") return;

          if (formula && formula.trim() !== "") {
            const calculatedValue = evaluateFormula(formula, variables);

            if (calculatedValue !== "") {
              const colIdx = columnMap[fieldname];
              if (colIdx !== undefined) {
                newValues[`${rowIndex}-${colIdx}`] = calculatedValue;
                console.log(
                  `✅ Calculated ${fieldname}: ${calculatedValue} (formula: ${formula})`,
                );

                if (SetVariable && SetVariable.trim() !== "") {
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

  
  // ✅ Handle blur to save observations - Supports all 3 observation_from modes
  const handleObservationBlur = async (rowIndex, colIndex, value) => {
    const token = localStorage.getItem("authToken");
    const calibrationPointId =
      observationRows.hiddenInputs?.calibrationPoints?.[rowIndex];
    const observationFrom = dynamicHeadings?.observation_from || "master";

    if (!calibrationPointId) {
      toast.error("Calibration point ID not found");
      return;
    }

    const rowData = observationRows.rows[rowIndex].map((cell, idx) => {
      const inputKey = `${rowIndex}-${idx}`;
      return tableInputValues[inputKey] ?? (cell?.toString() || "");
    });

    const payloads = [];

    // ✅ Build variables for formula calculation
    const variables = {};

    if (dynamicHeadings?.observation_heading?.observation_settings) {
      const obsSettings =
        dynamicHeadings.observation_heading.observation_settings.filter(
          (obs) => obs.checkbox === "yes",
        );

      const calibrationSettings =
        dynamicHeadings.mainhading.calibration_settings.filter(
          (col) => col.checkbox === "yes",
        );

      let currentCol = 1;
      const columnPositions = {};

      // Build column positions
      for (const setting of calibrationSettings) {
        const fieldname = setting.fieldname;

        if (observationFrom === "master" && fieldname === "master") {
          columnPositions.master = {
            start: currentCol,
            count: obsSettings.length,
          };
          currentCol += obsSettings.length;
        } else if (observationFrom === "uuc" && fieldname === "uuc") {
          columnPositions.uuc = {
            start: currentCol,
            count: obsSettings.length,
          };
          currentCol += obsSettings.length;
        } else if (observationFrom === "separate") {
          if (fieldname === "master") {
            columnPositions.master = {
              start: currentCol,
              count: obsSettings.length,
            };
            currentCol += obsSettings.length;
          } else if (fieldname === "uuc") {
            columnPositions.uuc = {
              start: currentCol,
              count: obsSettings.length,
            };
            currentCol += obsSettings.length;
          } else {
            currentCol++;
          }
        } else {
          currentCol++;
        }
      }

      // Build variables based on observation_from
      if (observationFrom === "master" && columnPositions.master) {
        obsSettings.forEach((obsSetting, idx) => {
          const varName = obsSetting.setvariable;
          const colIdx = columnPositions.master.start + idx;
          const cellValue = parseFloat(rowData[colIdx]) || 0;
          variables[varName] = cellValue;
        });
      } else if (observationFrom === "uuc" && columnPositions.uuc) {
        // ✅ UUC mode: Variables come from UUC observations
        obsSettings.forEach((obsSetting, idx) => {
          const varName = obsSetting.setvariable;
          const colIdx = columnPositions.uuc.start + idx;
          const cellValue = parseFloat(rowData[colIdx]) || 0;
          variables[varName] = cellValue;
        });
      }
    }

    // ✅ Determine which field was edited
    if (dynamicHeadings?.mainhading?.calibration_settings) {
      const calibrationSettings =
        dynamicHeadings.mainhading.calibration_settings.filter(
          (col) => col.checkbox === "yes",
        );

      const obsSettings =
        dynamicHeadings?.observation_heading?.observation_settings?.filter(
          (obs) => obs.checkbox === "yes",
        ) || [];

      let currentColIndex = 1;

      for (const setting of calibrationSettings) {
        const fieldname = setting.fieldname;

        if (fieldname === "uuc") {
          if (observationFrom === "uuc" || observationFrom === "separate") {
            // UUC has multiple observations
            for (let i = 0; i < obsSettings.length; i++) {
              if (colIndex === currentColIndex) {
                // ✅ Save the UUC observation
                payloads.push({
                  inwardid: inwardId,
                  instid: instId,
                  calibrationpoint: calibrationPointId,
                  type: "uuc",
                  repeatable: i.toString(),
                  value: value || "0",
                });

                // ✅ Calculate and save derived fields ONLY if they have formulas
                calibrationSettings.forEach((calcSetting) => {
                  if (
                    calcSetting.formula &&
                    calcSetting.formula.trim() !== ""
                  ) {
                    const calculatedValue = evaluateFormula(
                      calcSetting.formula,
                      variables,
                    );
                    if (calculatedValue !== "") {
                      payloads.push({
                        inwardid: inwardId,
                        instid: instId,
                        calibrationpoint: calibrationPointId,
                        type: calcSetting.fieldname,
                        repeatable: "0",
                        value: calculatedValue.toString(),
                      });
                    }
                  }
                });
              }
              currentColIndex++;
            }
          } else {
            // Master mode: UUC is single value
            if (colIndex === currentColIndex) {
              payloads.push({
                inwardid: inwardId,
                instid: instId,
                calibrationpoint: calibrationPointId,
                type: "uuc",
                repeatable: "0",
                value: value || "0",
              });
            }
            currentColIndex++;
          }
        } else if (fieldname === "master") {
          if (observationFrom === "master" || observationFrom === "separate") {
            currentColIndex += obsSettings.length;
          } else {
            if (colIndex === currentColIndex) {
              payloads.push({
                inwardid: inwardId,
                instid: instId,
                calibrationpoint: calibrationPointId,
                type: "master",
                repeatable: "0",
                value: value || "0",
              });
            }
            currentColIndex++;
          }
        } else {
          // For other fields (average, error, etc.), save the current value from tableInputValues
          if (colIndex === currentColIndex) {
            const currentValue =
              tableInputValues[`${rowIndex}-${colIndex}`] || value || "0";
            payloads.push({
              inwardid: inwardId,
              instid: instId,
              calibrationpoint: calibrationPointId,
              type: fieldname,
              repeatable: "0",
              value: currentValue.toString(),
            });
          }
          currentColIndex++;
        }
      }
    }

    console.log("📡 Saving payloads:", payloads);
    console.log("📊 Variables for calculation:", variables);

    try {
      // Save all payloads
      for (const payload of payloads) {
        await axios.post("/calibrationprocess/set-observations", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      console.log(`✅ Saved successfully!`);
      toast.success("Observation saved successfully!");

      // ✅ IMPORTANT: Refetch observations
      const headingsResponse = await fetchDynamicHeadings(suffix);
      if (headingsResponse?.data?.calibration_points) {
        setObservations(headingsResponse.data.calibration_points);
        console.log("🔄 Observations refreshed from API");
      }
    } catch (err) {
      console.error(`❌ Error saving:`, err);
      toast.error(err.response?.data?.message || "Failed to save observation");
    }
  };

  const handleBackToInwardList = () => {
    navigate(
      `/dashboards/calibration-process/inward-entry-lab?caliblocation=${caliblocation}&calibacc=${calibacc}`,
    );
  };

  const handleBackToPerformCalibration = () => {
    navigate(
      `/dashboards/calibration-process/inward-entry-lab/perform-calibration/${id}?caliblocation=${caliblocation}&calibacc=${calibacc}`,
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

    const token = localStorage.getItem("authToken");
    const calibrationPoints = [];
    const types = [];
    const repeatables = [];
    const values = [];
    const observationFrom = dynamicHeadings?.observation_from || "master";

    // First, let's create a mapping of what each column represents
    const columnMap = {};
    let currentColIndex = 1; // Start from 1 (0 is SR NO)

    if (dynamicHeadings?.mainhading?.calibration_settings) {
      const calibrationSettings =
        dynamicHeadings.mainhading.calibration_settings.filter(
          (col) => col.checkbox === "yes",
        );

      const obsSettings =
        dynamicHeadings?.observation_heading?.observation_settings?.filter(
          (obs) => obs.checkbox === "yes",
        ) || [];

      calibrationSettings.forEach((setting) => {
        const fieldname = setting.fieldname;

        if (observationFrom === "master" && fieldname === "master") {
          // Master has multiple observations
          columnMap[fieldname] = {
            type: "multi",
            start: currentColIndex,
            count: obsSettings.length,
            repeatables: obsSettings.map((_, idx) => idx.toString()),
          };
          currentColIndex += obsSettings.length;
        } else if (observationFrom === "uuc" && fieldname === "uuc") {
          // UUC has multiple observations
          columnMap[fieldname] = {
            type: "multi",
            start: currentColIndex,
            count: obsSettings.length,
            repeatables: obsSettings.map((_, idx) => idx.toString()),
          };
          currentColIndex += obsSettings.length;
        } else if (observationFrom === "separate") {
          if (fieldname === "master" || fieldname === "uuc") {
            // Both have multiple observations
            columnMap[fieldname] = {
              type: "multi",
              start: currentColIndex,
              count: obsSettings.length,
              repeatables: obsSettings.map((_, idx) => idx.toString()),
            };
            currentColIndex += obsSettings.length;
          } else {
            // Single column field
            columnMap[fieldname] = {
              type: "single",
              column: currentColIndex,
              repeatable: "0",
            };
            currentColIndex++;
          }
        } else {
          // Single column field
          columnMap[fieldname] = {
            type: "single",
            column: currentColIndex,
            repeatable: "0",
          };
          currentColIndex++;
        }
      });
    }

    console.log("📊 Column Map for submission:", columnMap);

    // Now collect data from tableInputValues
    observationRows.rows.forEach((row, rowIndex) => {
      const calibPointId =
        observationRows.hiddenInputs?.calibrationPoints?.[rowIndex] || "";

      if (!calibPointId) {
        console.warn(`⚠️ No calibration point ID for row ${rowIndex}`);
        return;
      }

      // Process each field in column map
      Object.keys(columnMap).forEach((fieldname) => {
        const fieldInfo = columnMap[fieldname];

        if (fieldInfo.type === "multi") {
          // Multiple observations (e.g., multiple UUC or Master readings)
          for (let i = 0; i < fieldInfo.count; i++) {
            const colIndex = fieldInfo.start + i;
            const key = `${rowIndex}-${colIndex}`;
            const value = tableInputValues[key] ?? row[colIndex] ?? "0";

            calibrationPoints.push(calibPointId);
            types.push(fieldname);
            repeatables.push(fieldInfo.repeatables[i] || i.toString());
            values.push(value.toString());
          }
        } else {
          // Single column field
          const colIndex = fieldInfo.column;
          const key = `${rowIndex}-${colIndex}`;
          const value = tableInputValues[key] ?? row[colIndex] ?? "0";

          calibrationPoints.push(calibPointId);
          types.push(fieldname);
          repeatables.push(fieldInfo.repeatable);
          values.push(value.toString());
        }
      });
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

    console.log("📤 Step 3 Payload for submission:", payloadStep3);
    console.log("📊 Table Input Values used:", tableInputValues);

    try {
      const response = await axios.post(
        "/calibrationprocess/insert-calibration-step3",
        payloadStep3,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("✅ Step 3 saved successfully:", response.data);
      toast.success("All data submitted successfully!");

      setTimeout(() => {
        navigate(
          `/dashboards/calibration-process/inward-entry-lab/perform-calibration/${id}?caliblocation=${caliblocation}&calibacc=${calibacc}`,
        );
      }, 1000);
    } catch (error) {
      console.error("❌ Network Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while submitting",
      );
    }
  };

  useEffect(() => {
    console.log("🔍 DEBUG - Current State:", {
      observationFrom: dynamicHeadings?.observation_heading?.observation_from,
      dynamicHeadings: dynamicHeadings,
      tableStructure: tableStructure,
      observationRows: observationRows,
      observationsCount: observations.length,
      observationSettings:
        dynamicHeadings?.observation_heading?.observation_settings,
    });
  }, [dynamicHeadings, tableStructure, observationRows, observations]);

  if (loading) {
    return (
      <Page title="CalibrateStep3">
        <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
              <div className="animate-pulse">
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title="CalibrateStep3">
      <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 rounded-lg bg-white shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
              <h1 className="text-xl font-medium text-gray-800 dark:text-white">
                Fill Dates
              </h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleBackToInwardList}
                  className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-fuchsia-500"
                >
                  ← Back to Inward Entry List
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBackToPerformCalibration}
                  className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-fuchsia-500"
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
              <h2 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
                Masters
              </h2>
              <MastersList masters={apiData?.masters || []} />

              <div className="mb-6">
                <h2 className="text-md mb-2 font-medium text-gray-800 dark:text-white">
                  Support masters
                </h2>
                <SupportMastersList supportMasters={supportMasters} />
              </div>

              {/* Dynamic Observation Table */}
              {tableStructure && observationRows.rows.length > 0 && (
                <ObservationTable
                  observationTemplate={apiData?.observationTemplate}
                  selectedTableData={{
                    id: apiData?.observationTemplate,
                    staticRows: observationRows.rows,
                    hiddenInputs: observationRows.hiddenInputs,
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
                  renderThermalCoefficientSection={
                    renderThermalCoefficientSection
                  }
                  setObservationErrors={setObservationErrors}
                  observations={observations}
                />
              )}

              <DateNotesForm
                formData={formData}
                handleFormChange={handleFormChange}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Temperature End (°C) <span className="text-red-500">*</span>
                    :
                  </label>
                  <input
                    type="text"
                    name="tempend"
                    value={formData.tempend}
                    onChange={handleFormChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-600 dark:text-white"
                    placeholder="Enter temperature range"
                    // required attribute removed
                  />
                  {errors.tempend && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.tempend}
                    </p>
                  )}
                  {!errors.tempend && !formData.tempend && (
                    <p className="mt-1 text-xs text-red-500">
                      This field is required
                    </p>
                  )}
                  {temperatureRange && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Range:{" "}
                      {temperatureRange.min
                        ? `${temperatureRange.min} - ${temperatureRange.max}`
                        : temperatureRange.value || "N/A"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Humidity End (%RH) <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    name="humiend"
                    value={formData.humiend}
                    onChange={handleFormChange}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-600 dark:text-white"
                    placeholder="Enter humidity range"
                    // required attribute removed
                  />
                  {errors.humiend && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.humiend}
                    </p>
                  )}
                  {!errors.humiend && !formData.humiend && (
                    <p className="mt-1 text-xs text-red-500">
                      This field is required
                    </p>
                  )}
                  {humidityRange && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Range:{" "}
                      {humidityRange.min
                        ? `${humidityRange.min} - ${humidityRange.max}`
                        : humidityRange.value || "N/A"}
                    </p>
                  )}
                </div>
              </div>

              <Notes formData={formData} handleFormChange={handleFormChange} />

              <div className="mt-8 mb-4 flex justify-end">
                <Button
                  type="submit"
                  className="rounded bg-green-500 px-8 py-2 font-medium text-white transition-colors hover:bg-green-600"
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
