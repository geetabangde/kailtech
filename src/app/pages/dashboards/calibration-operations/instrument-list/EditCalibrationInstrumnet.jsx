import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function EditInstrument() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    sop: [],
    standard: [],
    typeofsupport: [],
    typeofmaster: [],
    description: "",
    discipline: "",
    groups: "",
    remark: "",
    range: "",
    leastcount: "",
    unittype: "",
    mode: "",
    supportmaster: "",
    supportrange: "",
    supportleastcount: "",
    supportunittype: "",
    supportmode: "",
    scopematrixvalidation: "",
    digitincmc: "2",
    biomedical: "No",
    showvisualtest: "No",
    showelectricalsafety: "No",
    showbasicsafety: "No",
    showperformancetest: "No",
    setpoint: "UUC",
    uuc: "1",
    master: "1",
    setpointheading: "Set Point",
    parameterheading: "",
    uucheading: "Observation On UUC",
    masterheading: "Standard Reading",
    errorheading: "Error",
    remarkheading: "Remark",
    setpointtoshow: "Yes",
    parametertoshow: "Yes",
    uuctoshow: "Yes",
    mastertoshow: "Yes",
    errortoshow: "Yes",
    remarktoshow: "Yes",
    specificationtoshow: "Yes",
    specificationheading: "",
    tempsite: "",
    tempvariablesite: "",
    humisite: "",
    humivariablesite: "",
    templab: "",
    tempvariablelab: "",
    humilab: "",
    humivariablelab: "",
    mastersincertificate: "Yes",
    uncertaintyincertificate: "Yes",
    allottolab: "",
    suffix: [],
    uncertaintytable: [],
    vertical: "1",
  });

  const [priceLists, setPriceLists] = useState([]);
  const [sopOptions, setSopOptions] = useState([]);
  const [standardOptions, setStandardOptions] = useState([]);
  const [subcategoryOne, setSubcategoryOne] = useState([]);
  const [subcategoryTwo, setSubcategoryTwo] = useState([]);
  const [formateOptions, setFormateOptions] = useState([]);
  const [labOptions, setLabOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [unitTypeOptions, setUnitTypeOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Required fields
  const requiredFields = {
    name: "Instrument Name",
    sop: "Calibration Method/SOP",
    description: "Description",
    discipline: "Discipline",
    groups: "Group",
    tempsite: "Temperature Range for Site",
    humisite: "Humidity Range for Site",
    templab: "Temperature Range for Lab",
    humilab: "Humidity Range for Lab",
  };

  // Required fields for price lists
  const requiredPriceFields = {
    packagename: "Package Name",
    packagedesc: "Package Description",
    daysrequired: "Days Required",
    rate: "Rate",
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch all dropdown data and instrument data
        const [
          sopRes,
          standardRes,
          subcategoryoneRes,
          subcategorytwoRes,
          formatelist,
          lablist,
          currencylist,
          unitTypeRes,
          unitRes,
          modeRes,
          instrumentRes,
        ] = await Promise.all([
          axios.get("/calibrationoperations/calibration-method-list"),
          axios.get("/calibrationoperations/calibration-standard-list"),
          axios.get("/inventory/subcategory-list"),
          axios.get("/inventory/subcategory-list"),
          axios.get("/get-formate"),
          axios.get("/master/list-lab"),
          axios.get("/master/currency-list"),
          axios.get("/master/unit-type-list"),
          axios.get("/master/units-list"),
          axios.get("/master/mode-list"),
          axios.get(`/calibrationoperations/get-instrument-byid/${id}`)
        ]);

        const safeArray = (data) => (Array.isArray(data) ? data : []);

        // Set dropdown options
        setSopOptions(safeArray(sopRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setStandardOptions(safeArray(standardRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setSubcategoryOne(safeArray(subcategoryoneRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setSubcategoryTwo(safeArray(subcategorytwoRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setFormateOptions(safeArray(formatelist.data.data).map((item) => ({ label: item.name, value: item.description.toString() })));
        setLabOptions(safeArray(lablist.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setCurrencyOptions(safeArray(currencylist.data.data).map((item) => ({ label: `${item.name} (${item.description})`, value: item.id.toString() })));
        setUnitTypeOptions(safeArray(unitTypeRes.data.data).map((item) => ({ label: item.name, value: item.name })));
        setUnitOptions(safeArray(unitRes.data.data).map((item) => ({ label: item.name, value: item.id.toString() })));
        setModeOptions(safeArray(modeRes.data.data).map((item) => ({ label: item.name, value: item.name })));

        // Set instrument data
        const instrumentData = instrumentRes.data.data;
        const safeArrayData = (value) => (Array.isArray(value) ? value : typeof value === "string" && value ? value.split(",") : []);
        const safeString = (value) => (value != null ? String(value) : "");

        setFormData((prev) => ({
          ...prev,
          name: safeString(instrumentData.instrument.name),
          sop: safeArrayData(instrumentData.instrument.sop),
          standard: safeArrayData(instrumentData.instrument.standard),
          typeofsupport: safeArrayData(instrumentData.instrument.typeofsupport),
          typeofmaster: safeArrayData(instrumentData.instrument.typeofmaster),
          description: safeString(instrumentData.instrument.description),
          discipline: safeString(instrumentData.instrument.discipline),
          groups: safeString(instrumentData.instrument.groups),
          remark: safeString(instrumentData.instrument.remark),
          range: safeString(instrumentData.instrument.range),
          leastcount: safeString(instrumentData.instrument.leastcount),
          unittype: safeString(instrumentData.instrument.unittype),
          mode: safeString(instrumentData.instrument.mode),
          supportmaster: safeString(instrumentData.instrument.supportmaster),
          supportrange: safeString(instrumentData.instrument.supportrange),
          supportleastcount: safeString(instrumentData.instrument.supportleastcount),
          supportunittype: safeString(instrumentData.instrument.supportunittype),
          supportmode: safeString(instrumentData.instrument.supportmode),
          scopematrixvalidation: safeString(instrumentData.instrument.scopematrixvalidation),
          digitincmc: safeString(instrumentData.instrument.digitincmc || "2"),
          biomedical: safeString(instrumentData.instrument.biomedical || "No"),
          showvisualtest: safeString(instrumentData.instrument.showvisualtest || "No"),
          showelectricalsafety: safeString(instrumentData.instrument.showelectricalsafety || "No"),
          showbasicsafety: safeString(instrumentData.instrument.showbasicsafety || "No"),
          showperformancetest: safeString(instrumentData.instrument.showperformancetest || "No"),
          setpoint: safeString(instrumentData.instrument.setpoint || "UUC"),
          uuc: safeString(instrumentData.instrument.uuc || "1"),
          master: safeString(instrumentData.instrument.master || "1"),
          setpointheading: safeString(instrumentData.instrument.setpointheading || "Set Point"),
          parameterheading: safeString(instrumentData.instrument.parameterheading || ""),
          uucheading: safeString(instrumentData.instrument.uucheading || "Observation On UUC"),
          masterheading: safeString(instrumentData.instrument.masterheading || "Standard Reading"),
          errorheading: safeString(instrumentData.instrument.errorheading || "Error"),
          remarkheading: safeString(instrumentData.instrument.remarkheading || "Remark"),
          setpointtoshow: safeString(instrumentData.instrument.setpointtoshow || "Yes"),
          parametertoshow: safeString(instrumentData.instrument.parametertoshow || "Yes"),
          uuctoshow: safeString(instrumentData.instrument.uuctoshow || "Yes"),
          mastertoshow: safeString(instrumentData.instrument.mastertoshow || "Yes"),
          errortoshow: safeString(instrumentData.instrument.errortoshow || "Yes"),
          remarktoshow: safeString(instrumentData.instrument.remarktoshow || "Yes"),
          specificationtoshow: safeString(instrumentData.instrument.specificationtoshow || "Yes"),
          specificationheading: safeString(instrumentData.instrument.specificationheading || ""),
          tempsite: safeString(instrumentData.instrument.tempsite),
          tempvariablesite: safeString(instrumentData.instrument.tempvariablesite),
          humisite: safeString(instrumentData.instrument.humisite),
          humivariablesite: safeString(instrumentData.instrument.humivariablesite),
          templab: safeString(instrumentData.instrument.templab),
          tempvariablelab: safeString(instrumentData.instrument.tempvariablelab),
          humilab: safeString(instrumentData.instrument.humilab),
          humivariablelab: safeString(instrumentData.instrument.humivariablelab),
          mastersincertificate: safeString(instrumentData.instrument.mastersincertificate || "Yes"),
          uncertaintyincertificate: safeString(instrumentData.instrument.uncertaintyincertificate || "Yes"),
          allottolab: safeString(instrumentData.instrument.allottolab),
          suffix: safeArrayData(instrumentData.instrument.suffix),
          uncertaintytable: safeArrayData(instrumentData.instrument.uncertaintytable),
          vertical: safeString(instrumentData.instrument.vertical || "1"),
        }));

        const priceMatrix = Array.isArray(instrumentData.pricematrix) ? instrumentData.pricematrix : [];
        const fetchedPriceLists = priceMatrix.length > 0
          ? priceMatrix.map((price) => ({
              id: price.id || "",
              packagename: safeString(price.packagename),
              packagedesc: safeString(price.packagedesc),
              accreditation: safeString(price.accreditation),
              location: safeString(price.location),
              currency: currencyOptions.find((opt) => opt.value === safeString(price.currency)) || null,
              rate: safeString(price.rate),
              daysrequired: safeString(price.daysrequired),
              matrices: Array.isArray(price.matrix) && price.matrix.length > 0
                ? price.matrix.map((matrix, matrixIndex) => ({
                    id: matrix.id || "",
                    matrixno: matrixIndex + 1,
                    unittype: safeString(matrix.unittype),
                    unit: safeString(matrix.unit),
                    mode: safeString(matrix.mode),
                    instrangemin: safeString(matrix.instrangemin),
                    instrangemax: safeString(matrix.instrangemax),
                    tolerance: safeString(matrix.tolerance),
                    tolerancetype: safeString(matrix.tolerancetype),
                  }))
                : []
            }))
          : [];

        setPriceLists(fetchedPriceLists);

      } catch (err) {
        toast.error("Error loading data");
        console.error("Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
    clearFieldError(name);
  };

  const handleSingleSelectChange = (selectedOption, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: selectedOption?.value || "",
    }));
    clearFieldError(fieldName);
  };

  const handlePriceListChange = (index, e) => {
    const { name, value } = e.target;
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
    clearFieldError(`pricelist_${index}_${name}`);
  };

  const handlePriceCurrencyChange = (selected, index) => {
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], currency: selected || null };
      return updated;
    });
  };

  const handleMatrixChange = (priceIndex, matrixIndex, e) => {
    const { name, value } = e.target;
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[priceIndex].matrices = updated[priceIndex].matrices.map((matrix, i) =>
        i === matrixIndex ? { ...matrix, [name]: value } : matrix
      );
      return updated;
    });
  };

  const addPriceList = useCallback(() => {
    const newPrice = {
      id: "",
      packagename: "",
      packagedesc: "",
      accreditation: "",
      location: "",
      daysrequired: "",
      rate: "",
      currency: null,
      matrices: [],
    };
    setPriceLists((prev) => {
      if (prev.length > 0 && JSON.stringify(prev[prev.length - 1]) === JSON.stringify(newPrice)) {
        console.warn("Duplicate price list addition prevented");
        return prev;
      }
      return [...prev, newPrice];
    });
  }, []);

  const removePriceList = (index) => {
    setPriceLists((prev) => prev.filter((_, i) => i !== index));
  };

  const addMatrix = (priceIndex) => {
    setPriceLists((prev) => {
      const updated = [...prev];
      const selectedPrice = { ...updated[priceIndex] };
      const newMatrices = [...(selectedPrice.matrices || [])];

      const newMatrix = {
        id: "",
        matrixno: newMatrices.length + 1,
        unittype: "",
        unit: "",
        mode: "",
        instrangemin: "",
        instrangemax: "",
        tolerance: "",
        tolerancetype: "",
      };

      newMatrices.push(newMatrix);
      selectedPrice.matrices = newMatrices;
      updated[priceIndex] = selectedPrice;

      return updated;
    });
  };

  const removeMatrix = (priceIndex, matrixIndex) => {
    setPriceLists((prev) => {
      const updated = [...prev];
      updated[priceIndex].matrices = updated[priceIndex].matrices
        .filter((_, i) => i !== matrixIndex)
        .map((matrix, i) => ({ ...matrix, matrixno: i + 1 }));
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check main form required fields
    Object.keys(requiredFields).forEach(field => {
      if (field === 'sop') {
        if (!formData[field] || formData[field].length === 0) {
          newErrors[field] = true;
        }
      } else {
        if (!formData[field] || formData[field].toString().trim() === '') {
          newErrors[field] = true;
        }
      }
    });

    // Check price list required fields
    priceLists.forEach((price, priceIndex) => {
      Object.keys(requiredPriceFields).forEach(field => {
        if (!price[field] || price[field].toString().trim() === '') {
          newErrors[`pricelist_${priceIndex}_${field}`] = true;
        }
      });
    });

    setErrors(newErrors);

    // Focus on first error field
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      let element;
      
      if (firstErrorField.startsWith('pricelist_')) {
        // Handle price list field errors
        const [, priceIndex, fieldName] = firstErrorField.split('_');
        element = document.querySelector(`[name="${fieldName}"][data-price-index="${priceIndex}"]`);
      } else {
        element = document.querySelector(`[name="${firstErrorField}"]`);
      }
      
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        sop: formData.sop,
        standard: formData.standard,
        typeofsupport: formData.typeofsupport,
        typeofmaster: formData.typeofmaster,
        description: formData.description,
        discipline: formData.discipline,
        groups: formData.groups,
        remark: formData.remark,
        range: formData.range,
        leastcount: formData.leastcount,
        unittype: formData.unittype,
        mode: formData.mode,
        supportmaster: formData.supportmaster,
        supportrange: formData.supportrange,
        supportleastcount: formData.supportleastcount,
        supportunittype: formData.supportunittype,
        supportmode: formData.supportmode,
        scopematrixvalidation: formData.scopematrixvalidation,
        digitincmc: formData.digitincmc,
        biomedical: formData.biomedical,
        showvisualtest: formData.showvisualtest,
        showelectricalsafety: formData.showelectricalsafety,
        showbasicsafety: formData.showbasicsafety,
        showperformancetest: formData.showperformancetest,
        setpoint: formData.setpoint,
        uuc: formData.uuc,
        master: formData.master,
        setpointheading: formData.setpointheading,
        parameterheading: formData.parameterheading,
        uucheading: formData.uucheading,
        masterheading: formData.masterheading,
        errorheading: formData.errorheading,
        remarkheading: formData.remarkheading,
        setpointtoshow: formData.setpointtoshow,
        parametertoshow: formData.parametertoshow,
        uuctoshow: formData.uuctoshow,
        mastertoshow: formData.mastertoshow,
        errortoshow: formData.errortoshow,
        remarktoshow: formData.remarktoshow,
        specificationtoshow: formData.specificationtoshow,
        specificationheading: formData.specificationheading,
        tempsite: formData.tempsite,
        tempvariablesite: formData.tempvariablesite,
        humisite: formData.humisite,
        humivariablesite: formData.humivariablesite,
        templab: formData.templab,
        tempvariablelab: formData.tempvariablelab,
        humilab: formData.humilab,
        humivariablelab: formData.humivariablelab,
        mastersincertificate: formData.mastersincertificate,
        uncertaintyincertificate: formData.uncertaintyincertificate,
        allottolab: formData.allottolab,
        suffix: Array.isArray(formData.suffix) ? formData.suffix[0] || "" : formData.suffix || "",
        uncertaintytable: Array.isArray(formData.uncertaintytable) ? formData.uncertaintytable : [],
        vertical: formData.vertical,
        matrixidpricelist: [],
        pricematrixno: [],
        packagename: [],
        packagedesc: [],
        accreditationpricelist: [],
        locationpricelist: [],
        daysrequiredpricelist: [],
        ratepricelist: [],
        currencypricelist: [],
        pricematrix: [],
      };

      priceLists.forEach((price, priceIndex) => {
        payload.matrixidpricelist.push(price.id || "0");
        payload.pricematrixno.push(priceIndex.toString());
        payload.packagename.push(price.packagename || "");
        payload.packagedesc.push(price.packagedesc || "");
        payload.accreditationpricelist.push(price.accreditation || "");
        payload.locationpricelist.push(price.location || "");
        payload.daysrequiredpricelist.push(price.daysrequired || "");
        payload.ratepricelist.push(price.rate || "");
        payload.currencypricelist.push(price.currency?.value || "");
        payload.pricematrix.push(priceIndex.toString());

        payload[`matrixno${priceIndex}`] = [];
        payload[`pricematrixid${priceIndex}`] = [];
        payload[`matrixid${priceIndex}`] = [];
        payload[`unittype${priceIndex}`] = [];
        payload[`unit${priceIndex}`] = [];
        payload[`mode${priceIndex}`] = [];
        payload[`instrangemin${priceIndex}`] = [];
        payload[`instrangemax${priceIndex}`] = [];
        payload[`tolerance${priceIndex}`] = [];
        payload[`tolerancetype${priceIndex}`] = [];

        (price.matrices || []).forEach((matrix) => {
          payload[`matrixno${priceIndex}`].push(matrix.matrixno.toString());
          payload[`pricematrixid${priceIndex}`].push(price.id || "0");
          payload[`matrixid${priceIndex}`].push(matrix.id || "0");
          payload[`unittype${priceIndex}`].push(matrix.unittype || "");
          payload[`unit${priceIndex}`].push(matrix.unit || "");
          payload[`mode${priceIndex}`].push(matrix.mode || "");
          payload[`instrangemin${priceIndex}`].push(matrix.instrangemin || "");
          payload[`instrangemax${priceIndex}`].push(matrix.instrangemax || "");
          payload[`tolerance${priceIndex}`].push(matrix.tolerance || "");
          payload[`tolerancetype${priceIndex}`].push(matrix.tolerancetype || "");
        });
      });

      await axios.post(`/calibrationoperations/update-instrument/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Instrument updated successfully");
      navigate("/dashboards/calibration-operations/instrument-list");
    } catch(err)  {
      console.error("API Error:", err.response?.data || err.message);
      toast.error("Error updating instrument: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <Page title="Edit Instrument">
        <div className="p-6">
          <div className="flex items-center justify-center min-h-64">
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
              </svg>
              <span>Loading instrument data...</span>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Edit Instrument">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Instrument</h2>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/dashboards/calibration-operations/instrument-list")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Input
              label="Instrument Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "border-red-500 bg-red-50" : ""}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
              Calibration Method / SOP <span className="text-red-500">*</span>
            </label>
            <ReactSelect
              isMulti
              name="sop"
              options={sopOptions}
              value={sopOptions.filter((opt) => formData.sop.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "sop")}
              placeholder="Select Calibration Methods"
              className={errors.sop ? "react-select-error" : ""}
            />
            {errors.sop && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Calibration Standard</label>
            <ReactSelect
              isMulti
              name="standard"
              options={standardOptions}
              value={standardOptions.filter((opt) => formData.standard.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "standard")}
              placeholder="Select Calibration Standards"
            />
          </div>
          
          <div>
            <Input
              label="Instrument Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? "border-red-500 bg-red-50" : ""}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <input type="hidden" name="vertical" value={formData.vertical} />
          
          <div>
            <Input
              label="Discipline"
              name="discipline"
              value={formData.discipline}
              onChange={handleInputChange}
              className={errors.discipline ? "border-red-500 bg-red-50" : ""}
            />
            {errors.discipline && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <div>
            <Input
              label="Group"
              name="groups"
              value={formData.groups}
              onChange={handleInputChange}
              className={errors.groups ? "border-red-500 bg-red-50" : ""}
            />
            {errors.groups && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <Input
            label="Remark"
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
          />
          
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-lg font-semibold">Validation</h1>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Range Validation</label>
            <Select
              name="range"
              value={formData.range}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Leastcount Validation</label>
            <Select
              name="leastcount"
              value={formData.leastcount}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Unittype</label>
            <Select
              name="unittype"
              value={formData.unittype}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Mode</label>
            <Select
              name="mode"
              value={formData.mode}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Support Required</label>
            <Select
              name="supportmaster"
              value={formData.supportmaster}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Type Of Support</label>
            <ReactSelect
              isMulti
              name="typeofsupport"
              options={subcategoryOne}
              value={subcategoryOne.filter((opt) => formData.typeofsupport.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "typeofsupport")}
              placeholder="Select Type Of Support"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Range Validation For Support</label>
            <Select
              name="supportrange"
              value={formData.supportrange}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Leastcount Validation For Support</label>
            <Select
              name="supportleastcount"
              value={formData.supportleastcount}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Unittype For Support</label>
            <Select
              name="supportunittype"
              value={formData.supportunittype}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Mode For Support</label>
            <Select
              name="supportmode"
              value={formData.supportmode}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Type Of Master Required</label>
            <ReactSelect
              isMulti
              name="typeofmaster"
              options={subcategoryTwo}
              value={subcategoryTwo.filter((opt) => formData.typeofmaster.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "typeofmaster")}
              placeholder="Select Type Of Master"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Scope Matrix Validation</label>
            <Select
              name="scopematrixvalidation"
              value={formData.scopematrixvalidation}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <Input
            label="No Of Digit in CMC"
            name="digitincmc"
            type="number"
            value={formData.digitincmc}
            onChange={handleInputChange}
          />
          
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-lg font-semibold">Biomedical Details</h1>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Bio Medical Format</label>
            <Select
              name="biomedical"
              value={formData.biomedical}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Show Visual Test On Certificate</label>
            <Select
              name="showvisualtest"
              value={formData.showvisualtest}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Show Electrical Safety Test on Certificate</label>
            <Select
              name="showelectricalsafety"
              value={formData.showelectricalsafety}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Show Basic Safety Test on Certificate</label>
            <Select
              name="showbasicsafety"
              value={formData.showbasicsafety}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Show Performance Test on Certificate</label>
            <Select
              name="showperformancetest"
              value={formData.showperformancetest}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-lg font-semibold">For Custom Formats Only</h1>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Setpoint</label>
            <Select
              name="setpoint"
              value={formData.setpoint}
              onChange={handleInputChange}
            >
              <option value="UUC">UUC</option>
              <option value="Master">Master</option>
              <option value="Separate">Separate</option>
            </Select>
          </div>
          
          <Input
            label="UUC Repeatable"
            name="uuc"
            type="number"
            value={formData.uuc}
            onChange={handleInputChange}
          />
          
          <Input
            label="Master Repeatable"
            name="master"
            type="number"
            value={formData.master}
            onChange={handleInputChange}
          />
          
          <Input
            label="Set Point Heading"
            name="setpointheading"
            value={formData.setpointheading}
            onChange={handleInputChange}
          />
          
          <Input
            label="Parameter Heading"
            name="parameterheading"
            value={formData.parameterheading}
            onChange={handleInputChange}
          />
          
          <Input
            label="UUC Heading"
            name="uucheading"
            value={formData.uucheading}
            onChange={handleInputChange}
          />
          
          <Input
            label="Master Heading"
            name="masterheading"
            value={formData.masterheading}
            onChange={handleInputChange}
          />
          
          <Input
            label="Error Heading"
            name="errorheading"
            value={formData.errorheading}
            onChange={handleInputChange}
          />
          
          <Input
            label="Remark Heading"
            name="remarkheading"
            value={formData.remarkheading}
            onChange={handleInputChange}
          />
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Setpoint To Show On Certificate</label>
            <Select
              name="setpointtoshow"
              value={formData.setpointtoshow}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Parameter To Show On Certificate</label>
            <Select
              name="parametertoshow"
              value={formData.parametertoshow}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">UUC To Show On Certificate</label>
            <Select
              name="uuctoshow"
              value={formData.uuctoshow}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Master To Show On Certificate</label>
            <Select
              name="mastertoshow"
              value={formData.mastertoshow}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Error To Show On Certificate</label>
            <Select
              name="errortoshow"
              value={formData.errortoshow}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Remark To Show On Certificate</label>
            <Select
              name="remarktoshow"
              value={formData.remarktoshow}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Specification To Show On Certificate</label>
            <Select
              name="specificationtoshow"
              value={formData.specificationtoshow}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
         
          <div>
            <Input
              label="Temperature Range for Site"
              name="tempsite"
              type="number"
              value={formData.tempsite}
              onChange={handleInputChange}
              className={errors.tempsite ? "border-red-500 bg-red-50" : ""}
            />
            {errors.tempsite && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <Input
            label="Temperature Variable Site"
            name="tempvariablesite"
            type="number"
            value={formData.tempvariablesite}
            onChange={handleInputChange}
          />
          
          <div>
            <Input
              label="Humidity Range for Site"
              name="humisite"
              type="number"
              value={formData.humisite}
              onChange={handleInputChange}
              className={errors.humisite ? "border-red-500 bg-red-50" : ""}
            />
            {errors.humisite && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <Input
            label="Humidity Variable Site"
            name="humivariablesite"
            type="number"
            value={formData.humivariablesite}
            onChange={handleInputChange}
          />
          
          <div>
            <Input
              label="Temperature Range for Lab"
              name="templab"
              type="number"
              value={formData.templab}
              onChange={handleInputChange}
              className={errors.templab ? "border-red-500 bg-red-50" : ""}
            />
            {errors.templab && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <Input
            label="Temperature Variable Lab"
            name="tempvariablelab"
            type="number"
            value={formData.tempvariablelab}
            onChange={handleInputChange}
          />
          
          <div>
            <Input
              label="Humidity Range for Lab"
              name="humilab"
              type="number"
              value={formData.humilab}
              onChange={handleInputChange}
              className={errors.humilab ? "border-red-500 bg-red-50" : ""}
            />
            {errors.humilab && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>
          
          <Input
            label="Humidity Variable Lab"
            name="humivariablelab"
            type="number"
            value={formData.humivariablelab}
            onChange={handleInputChange}
          />
          
          <Input
            label="Specification Heading"
            name="specificationheading"
            value={formData.specificationheading}
            onChange={handleInputChange}
          />
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Show Masters In Certificate</label>
            <Select
              name="mastersincertificate"
              value={formData.mastersincertificate}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Show Uncertainty In Certificate</label>
            <Select
              name="uncertaintyincertificate"
              value={formData.uncertaintyincertificate}
              onChange={handleInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Lab to Calibrate</label>
            <ReactSelect
              name="allottolab"
              options={labOptions}
              value={labOptions.find((opt) => opt.value === formData.allottolab) || null}
              onChange={(selected) => handleSingleSelectChange(selected, "allottolab")}
              placeholder="Select Lab"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Format</label>
            <ReactSelect
              isMulti={false}
              name="suffix"
              options={formateOptions}
              value={formateOptions.find((opt) => opt.value === formData.suffix[0]) || null}
              onChange={(selected) => handleMultiSelectChange(selected ? [selected] : [], "suffix")}
              placeholder="Select Format"
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Uncertainty Sheet</label>
            <ReactSelect
              isMulti
              name="uncertaintytable"
              options={formateOptions}
              value={formateOptions.filter((opt) => formData.uncertaintytable.includes(opt.value))}
              onChange={(selected) => handleMultiSelectChange(selected, "uncertaintytable")}
              placeholder="Select Uncertainty"
            />
          </div>

          {priceLists.map((price, priceIndex) => (
            <div key={priceIndex} className="col-span-1 md:col-span-2 border border-gray-300 p-4 rounded bg-gray-50">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Price List {priceIndex + 1}</h1>
                {priceLists.length > 1 && (
                  <Button type="button" className="bg-red-600 text-white hover:bg-red-700" onClick={() => removePriceList(priceIndex)}>
                    Remove Price List
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <input
                  type="hidden"
                  name="matrixidpricelist[]"
                  value={price.id || "0"}
                />
                <input
                  type="hidden"
                  name="pricematrixno[]"
                  value={priceIndex}
                />
                <div>
                  <Input
                    label="Package Name"
                    name="packagename"
                    data-price-index={priceIndex}
                    value={price.packagename}
                    onChange={(e) => handlePriceListChange(priceIndex, e)}
                    className={errors[`pricelist_${priceIndex}_packagename`] ? "border-red-500 bg-red-50" : ""}
                  />
                  {errors[`pricelist_${priceIndex}_packagename`] && (
                    <p className="text-red-600 text-sm mt-1">This field is required</p>
                  )}
                </div>
                
                <div>
                  <Input
                    label="Package Description"
                    name="packagedesc"
                    data-price-index={priceIndex}
                    value={price.packagedesc}
                    onChange={(e) => handlePriceListChange(priceIndex, e)}
                    className={errors[`pricelist_${priceIndex}_packagedesc`] ? "border-red-500 bg-red-50" : ""}
                  />
                  {errors[`pricelist_${priceIndex}_packagedesc`] && (
                    <p className="text-red-600 text-sm mt-1">This field is required</p>
                  )}
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Accreditation</label>
                  <Select
                    name="accreditation"
                    value={price.accreditation}
                    onChange={(e) => handlePriceListChange(priceIndex, e)}
                  >
                    <option value="">Select</option>
                    <option value="Non Nabl">Non Nabl</option>
                    <option value="Nabl">Nabl</option>
                  </Select>
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Location</label>
                  <Select
                    name="location"
                    value={price.location}
                    onChange={(e) => handlePriceListChange(priceIndex, e)}
                  >
                    <option value="">Select</option>
                    <option value="Site">Site</option>
                    <option value="Lab">Lab</option>
                  </Select>
                </div>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">Select Currency</label>
                  <ReactSelect
                    name="currency"
                    value={price.currency}
                    options={currencyOptions}
                    onChange={(selected) => handlePriceCurrencyChange(selected, priceIndex)}
                    placeholder="Select Currency"
                  />
                </div>
                
                <div>
                  <Input
                    label="Rate"
                    name="rate"
                    data-price-index={priceIndex}
                    value={price.rate}
                    type="number"
                    onChange={(e) => handlePriceListChange(priceIndex, e)}
                    className={errors[`pricelist_${priceIndex}_rate`] ? "border-red-500 bg-red-50" : ""}
                  />
                  {errors[`pricelist_${priceIndex}_rate`] && (
                    <p className="text-red-600 text-sm mt-1">This field is required</p>
                  )}
                </div>
                
                <div>
                  <Input
                    label="Days Required"
                    name="daysrequired"
                    data-price-index={priceIndex}
                    type="number"
                    value={price.daysrequired}
                    onChange={(e) => handlePriceListChange(priceIndex, e)}
                    className={errors[`pricelist_${priceIndex}_daysrequired`] ? "border-red-500 bg-red-50" : ""}
                  />
                  {errors[`pricelist_${priceIndex}_daysrequired`] && (
                    <p className="text-red-600 text-sm mt-1">This field is required</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-md font-semibold mb-2">Matrices</h2>
                {price.matrices.map((matrix, matrixIndex) => (
                  <div key={`matrix-${priceIndex}-${matrixIndex}`} className="border border-gray-200 p-4 rounded mb-4 bg-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Matrix {matrix.matrixno}</h3>
                      {price.matrices.length > 0 && (
                        <Button type="button" className="bg-red-600 text-white hover:bg-red-700" onClick={() => removeMatrix(priceIndex, matrixIndex)}>
                          Remove Matrix
                        </Button>
                      )}
                    </div>
                    <input
                      type="hidden"
                      name={`matrixno${priceIndex}[]`}
                      value={matrix.matrixno}
                    />
                    <input
                      type="hidden"
                      name={`pricematrixid${priceIndex}[]`}
                      value={price.id || "0"}
                    />
                    <input
                      type="hidden"
                      name={`matrixid${priceIndex}[]`}
                      value={matrix.id || "0"}
                    />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                          Unit Type/Parameter
                        </label>
                        <ReactSelect
                          name="unittype"
                          options={unitTypeOptions}
                          value={unitTypeOptions.find((opt) => opt.value === matrix.unittype) || null}
                          onChange={(selected) => handleMatrixChange(priceIndex, matrixIndex, { target: { name: 'unittype', value: selected?.value || '' } })}
                          placeholder="Select Unit Type"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                          Unit
                        </label>
                        <ReactSelect
                          name="unit"
                          options={unitOptions}
                          value={unitOptions.find((opt) => opt.value === matrix.unit) || null}
                          onChange={(selected) => handleMatrixChange(priceIndex, matrixIndex, { target: { name: 'unit', value: selected?.value || '' } })}
                          placeholder="Select Unit"
                        />
                      </div>

                      <Input
                        label="Instrument Range Min"
                        name="instrangemin"
                        type="number"
                        value={matrix.instrangemin}
                        onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                      />

                      <Input
                        label="Instrument Range Max"
                        name="instrangemax"
                        type="number"
                        value={matrix.instrangemax}
                        onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                      />


                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                          Mode
                        </label>
                        <ReactSelect
                          name="mode"
                          options={[{ label: "Not Specified", value: "" }, ...modeOptions]}
                          value={[{ label: "Not Specified", value: "" }, ...modeOptions].find((opt) => opt.value === matrix.mode) || null}
                          onChange={(selected) => handleMatrixChange(priceIndex, matrixIndex, { target: { name: 'mode', value: selected?.value || '' } })}
                          placeholder="Select Mode"
                        />
                      </div>

                      <Input
                        label="Tolerance (±)"
                        name="tolerance"
                        value={matrix.tolerance}
                        type="number"
                        onChange={(e) => handleMatrixChange(priceIndex, matrixIndex, e)}
                      />

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
                          Tolerance Type
                        </label>
                        <ReactSelect
                          name="tolerancetype"
                          options={[
                            { label: "Not Specified", value: "" },
                            { label: "Fixed", value: "Fixed" },
                            { label: "%", value: "%" }
                          ]}
                          value={[
                            { label: "Not Specified", value: "" },
                            { label: "Fixed", value: "Fixed" },
                            { label: "%", value: "%" }
                          ].find((opt) => opt.value === matrix.tolerancetype) || null}
                          onChange={(selected) => handleMatrixChange(priceIndex, matrixIndex, { target: { name: 'tolerancetype', value: selected?.value || '' } })}
                          placeholder="Select Tolerance Type"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" className="bg-green-600 text-white hover:bg-green-700" onClick={() => addMatrix(priceIndex)}>
                  + Add Matrix
                </Button>
              </div>
            </div>
          ))}
          
          <div className="col-span-1 md:col-span-2">
            <Button type="button" className=" bg-green-600 hover:bg-green-700 text-white  w-full" onClick={addPriceList}>
              + Add Price List
            </Button>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Button
              type="submit"
              color="primary"
              disabled={loading}
              className={`flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  <span>Updating...</span>
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}