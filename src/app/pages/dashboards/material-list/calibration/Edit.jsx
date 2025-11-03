import { useState } from 'react';
import { useNavigate } from "react-router";
import { Button, Card, Input } from "components/ui";

// React Select Component
const Select = ({ options, value, onChange, placeholder, name, isSearchable = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative">
      <div
        className="w-full p-2 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white cursor-pointer dark:border-gray-700 dark:bg-dark-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isSearchable && isOpen ? (
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="w-full outline-none bg-transparent dark:text-white"
            autoFocus
          />
        ) : (
          <span className={selectedOption ? "text-gray-900 dark:text-white" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        )}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto dark:bg-dark-800 dark:border-gray-700">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 dark:hover:bg-dark-700 dark:border-gray-700 dark:text-white"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

const Edit = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    category: '',
    productType: '',
    vertical: '',
    instrumentName: '',
    description: '',
    nickName: '',
    idNo: '',
    newIdNo: '',
    serialNo: '',
    make: '',
    model: '',
    instrumentRange: '',
    accuracy: '',
    leastCount: '',
    calibrationFrequency: '',
    mfgDate: '',
    expDate: '',
    instrumentAllowedFor: '',
    calibrationRequired: '',
    wiReference: '',
    softwareFirmwareDetails: '',
    acceptanceCriteria: ''
  });

  const [errors, setErrors] = useState({});

  // Dropdown options
  const categoryOptions = [
    { value: 'masters', label: 'Masters' },
    { value: 'test', label: 'Test' },
    { value: 'camera & camera accessories', label: 'Camera & Camera Accessories' },
    { value: 'staff uniform', label: 'Staff Uniform' },
    { value: 'printing', label: 'Printing' }
  ];

  const productTypeOptions = [
    { value: 'load_cell_compression', label: 'Load Cell(3000kN) Compression' },
    { value: 'digital', label: 'Digital' },
    { value: 'analog', label: 'Analog' },
    { value: 'mechanical', label: 'Mechanical' }
  ];

  const verticalOptions = [
    { value: 'calibration', label: 'Calibration' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'pharmaceutical', label: 'Pharmaceutical' }
  ];

  const allowedForOptions = [
    { value: 'both', label: 'Both' },
    { value: 'internal', label: 'Internal Use' },
    { value: 'external', label: 'External Use' }
  ];

  const calibrationOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Add validation logic as needed
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.productType) newErrors.productType = 'Product Type is required';
    if (!formData.vertical) newErrors.vertical = 'Vertical is required';
    if (!formData.instrumentName) newErrors.instrumentName = 'Instrument Name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form Data:', formData);
      alert('Instrument updated successfully!');
      navigate('/dashboards/material-list/calibration');
    }
  };

  const handleBackToList = () => {
    navigate('/dashboards/material-list/calibration');
  };

  return (
    <div className="transition-content grid grid-cols-1 grid-rows-[auto_auto_1fr] px-(--margin-x) py-4">
      {/* Header */}
      <div className="flex items-center justify-between space-x-4 mb-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
            Edit MM Instrument
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            className="h-8 space-x-1.5 rounded-md px-3 text-xs bg-red-500 hover:bg-red-600 text-white"
            onClick={handleBackToList}
          >
            Go Back to MM Instrument
          </Button>
        </div>
      </div>

      {/* Form Card */}
      <Card className="mt-4">
        <div className="p-6">
          <div className="space-y-4">
            
            {/* Category */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <div className="col-span-9">
                <Select
                  options={categoryOptions}
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Select Category"
                  name="category"
                />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Product Type / Subcategory */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Type /Subcategory
              </label>
              <div className="col-span-9">
                <Select
                  options={productTypeOptions}
                  value={formData.productType}
                  onChange={handleInputChange}
                  placeholder="Select Product Type"
                  name="productType"
                />
                {errors.productType && <p className="text-red-500 text-xs mt-1">{errors.productType}</p>}
              </div>
            </div>

            {/* Vertical */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Vertical
              </label>
              <div className="col-span-9">
                <Select
                  options={verticalOptions}
                  value={formData.vertical}
                  onChange={handleInputChange}
                  placeholder="Select Vertical"
                  name="vertical"
                />
                {errors.vertical && <p className="text-red-500 text-xs mt-1">{errors.vertical}</p>}
              </div>
            </div>

            {/* Instrument Name */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Instrument Name
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="instrumentName"
                  value={formData.instrumentName}
                  onChange={handleInputChange}
                  placeholder="Instrument Name"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
                {errors.instrumentName && <p className="text-red-500 text-xs mt-1">{errors.instrumentName}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Nick Name */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Nick Name
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="nickName"
                  value={formData.nickName}
                  onChange={handleInputChange}
                  placeholder="Nick Name"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* ID No */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                ID No
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="idNo"
                  value={formData.idNo}
                  onChange={handleInputChange}
                  placeholder="ID No"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* New ID No */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                New ID No
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="newIdNo"
                  value={formData.newIdNo}
                  onChange={handleInputChange}
                  placeholder="New ID No"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Serial No */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Serial No
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="serialNo"
                  value={formData.serialNo}
                  onChange={handleInputChange}
                  placeholder="Serial No"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Make */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Make
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="Make"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Model */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Model
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Model"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Instrument Range */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Instrument Range
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="instrumentRange"
                  value={formData.instrumentRange}
                  onChange={handleInputChange}
                  placeholder="Instrument Range"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Accuracy */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Accuracy
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="accuracy"
                  value={formData.accuracy}
                  onChange={handleInputChange}
                  placeholder="Accuracy"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Leastcount */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Leastcount
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="leastCount"
                  value={formData.leastCount}
                  onChange={handleInputChange}
                  placeholder="Leastcount"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Frequency of calibration if required */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Frequency of calibration if required
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="calibrationFrequency"
                  value={formData.calibrationFrequency}
                  onChange={handleInputChange}
                  placeholder="Frequency of calibration"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Mfg Date */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Mfg Date
              </label>
              <div className="col-span-9">
                <Input 
                  type="date"
                  name="mfgDate"
                  value={formData.mfgDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Exp Date */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Exp Date
              </label>
              <div className="col-span-9">
                <Input 
                  type="date"
                  name="expDate"
                  value={formData.expDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Instrument allowed for */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Instrument allowed for
              </label>
              <div className="col-span-9">
                <Select
                  options={allowedForOptions}
                  value={formData.instrumentAllowedFor}
                  onChange={handleInputChange}
                  placeholder="Select Option"
                  name="instrumentAllowedFor"
                />
              </div>
            </div>

            {/* Calibration Required */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Calibration Required
              </label>
              <div className="col-span-9">
                <Select
                  options={calibrationOptions}
                  value={formData.calibrationRequired}
                  onChange={handleInputChange}
                  placeholder="Select Option"
                  name="calibrationRequired"
                />
              </div>
            </div>

            {/* WI Reference */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                WI Reference
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="wiReference"
                  value={formData.wiReference}
                  onChange={handleInputChange}
                  placeholder="WI Reference"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Software / Firmware details */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Software / Firmware details
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="softwareFirmwareDetails"
                  value={formData.softwareFirmwareDetails}
                  onChange={handleInputChange}
                  placeholder="Software / Firmware details"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Acceptance Criteria */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                Acceptance Criteria (KTRC/QF/0704/07)
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="acceptanceCriteria"
                  value={formData.acceptanceCriteria}
                  onChange={handleInputChange}
                  placeholder="Acceptance Criteria"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Update Instrument
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Edit;