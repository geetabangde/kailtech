import { useState } from 'react';
import { useNavigate } from "react-router";
import { Button, Card, Input } from "components/ui";

// React Select Component (Simple implementation since we can't import external libraries)
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
    frequencyOfCalibration: '',
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
    { value: 'printing', label: 'Printing' },
    { value: 'non standard solutions', label: 'Non Standard Solutions' },
    { value: 'freight/any other charge', label: 'Freight/Any Other Charge' },
    { value: 'containers', label: 'Containers' },
    { value: 'jigs & fixtures', label: 'Jigs & Fixtures' },
    { value: 'staff', label: 'Staff' }
  ];

  const productTypeOptions = [
    { value: 'load cell', label: 'Load Cell' },
    { value: 'digital', label: 'Digital' },
    { value: 'analog', label: 'Analog' },
    { value: 'mechanical', label: 'Mechanical' }
  ];

  const verticalOptions = [
    { value: 'vertical', label: 'Vertical' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'pharmaceutical', label: 'Pharmaceutical' }
  ];

  const allowedForOptions = [
    { value: 'internal', label: 'Internal Use' },
    { value: 'external', label: 'External Use' },
    { value: 'both', label: 'Both' }
  ];

  const calibrationOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  // Required fields
  const requiredFields = {
    category: 'Category is required',
    productType: 'Product Type is required',
    vertical: 'Vertical is required',
    instrumentName: 'Instrument Name is required',
    idNo: 'ID No is required',
    serialNo: 'Serial No is required',
    instrumentAllowedFor: 'Instrument allowed for is required',
    calibrationRequired: 'Calibration Required is required'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(requiredFields).forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = requiredFields[field];
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form Data:', formData);
      alert('Instrument added successfully!');
      // After successful submission, navigate back to the list
      navigate('/dashboards/material-list/site-calibration');
    }
  };

  const handleBackToList = () => {
    // Navigate back to the MM Instrument List page
    navigate('/dashboards/material-list/site-calibration');
  };

  return (
    <div className="transition-content grid grid-cols-1 grid-rows-[auto_auto_1fr] px-(--margin-x) py-4">
      {/* Header */}
      <div className="flex items-center justify-between space-x-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
            Edit MM Instrument
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            className="h-8 space-x-1.5 rounded-md px-3 text-xs bg-indigo-500 hover:bg-fuchsia-500 text-white"
            onClick={handleBackToList}
          >
            Go Back to MM Instrument
          </Button>
        </div>
      </div>

      {/* Form Card */}
      <Card className="mt-4">
        <div className="p-6">
          <div className="space-y-6">
            
            {/* Category */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">
                Category <span className="text-red-500">*</span>
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
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">
                Product Type / Subcategory <span className="text-red-500">*</span>
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
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">
                Vertical <span className="text-red-500">*</span>
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
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">
                Instrument Name <span className="text-red-500">*</span>
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
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Description</label>
              <div className="col-span-9">
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Nick Name */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Nick Name</label>
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
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">
                ID No <span className="text-red-500">*</span>
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="idNo"
                  value={formData.idNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
                {errors.idNo && <p className="text-red-500 text-xs mt-1">{errors.idNo}</p>}
              </div>
            </div>

            {/* New ID No */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">New ID No</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="newIdNo"
                  value={formData.newIdNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Serial No */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">
                Serial No <span className="text-red-500">*</span>
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="serialNo"
                  value={formData.serialNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
                {errors.serialNo && <p className="text-red-500 text-xs mt-1">{errors.serialNo}</p>}
              </div>
            </div>

            {/* Make */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Make</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Model */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Model</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Instrument Range */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Instrument Range</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="instrumentRange"
                  value={formData.instrumentRange}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Accuracy */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Accuracy</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="accuracy"
                  value={formData.accuracy}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Least Count */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Least Count</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="leastCount"
                  value={formData.leastCount}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Frequency of calibration required */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Frequency of calibration required</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="frequencyOfCalibration"
                  value={formData.frequencyOfCalibration}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Mfg Date */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Mfg Date</label>
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
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Exp Date</label>
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
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">
                Instrument allowed for <span className="text-red-500">*</span>
              </label>
              <div className="col-span-9">
                <Select
                  options={allowedForOptions}
                  value={formData.instrumentAllowedFor}
                  onChange={handleInputChange}
                  placeholder="Select Option"
                  name="instrumentAllowedFor"
                />
                {errors.instrumentAllowedFor && <p className="text-red-500 text-xs mt-1">{errors.instrumentAllowedFor}</p>}
              </div>
            </div>

            {/* Calibration Required */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">
                Calibration Required <span className="text-red-500">*</span>
              </label>
              <div className="col-span-9">
                <Select
                  options={calibrationOptions}
                  value={formData.calibrationRequired}
                  onChange={handleInputChange}
                  placeholder="Select Option"
                  name="calibrationRequired"
                />
                {errors.calibrationRequired && <p className="text-red-500 text-xs mt-1">{errors.calibrationRequired}</p>}
              </div>
            </div>

            {/* W/I Reference */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">W/I Reference</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="wiReference"
                  value={formData.wiReference}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Software / Firmware details */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Software / Firmware details</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="softwareFirmwareDetails"
                  value={formData.softwareFirmwareDetails}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

            {/* Acceptance Criteria */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <label className="col-span-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300 pt-2">Acceptance Criteria</label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  name="acceptanceCriteria"
                  value={formData.acceptanceCriteria}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none dark:border-gray-700 dark:bg-dark-800 dark:text-white"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              onClick={handleSubmit}
              color="primary"
              className="px-6 py-2"
            >
              Add Instrument
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Edit;