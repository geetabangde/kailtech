import  { useState } from 'react';
import Select from 'react-select';
import {Input }from "components/ui"
import { useNavigate } from 'react-router';

const AddUnitConversion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fromUnit: { value: 'Hectopascal(hPa)', label: 'Hectopascal(hPa)' },
    fromValue: '1',
    toUnit: { value: 'Hectopascal(hPa)', label: 'Hectopascal(hPa)' },
    toValue: ''
  });

  const unitOptions = [
    { value: 'Hectopascal(hPa)', label: 'Hectopascal(hPa)' },
    { value: 'Pascal(Pa)', label: 'Pascal(Pa)' },
    { value: 'Kilopascal(kPa)', label: 'Kilopascal(kPa)' },
    { value: 'Megapascal(MPa)', label: 'Megapascal(MPa)' },
    { value: 'Bar', label: 'Bar' },
    { value: 'Millibar(mbar)', label: 'Millibar(mbar)' },
    { value: 'PSI', label: 'PSI' },
    { value: 'Atmosphere(atm)', label: 'Atmosphere(atm)' }
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      borderColor: state.isFocused ? '#06b6d4' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(6, 182, 212, 0.2)' : 'none',
      '&:hover': {
        borderColor: '#06b6d4'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '8px 16px'
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        color: '#374151'
      }
    })
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your submit logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-normal text-gray-800">Add Unit Conversion</h1>
        <button className="px-6 py-2 bg-cyan-500 text-white text-sm rounded hover:bg-cyan-600 transition-colors"
        onClick={()=>
          navigate("/dashboards/master-data/units-conversion")
        }
        >
          &lt;&lt; Back to Units Conversion List
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* From Unit */}
        <div className="flex items-center mb-6">
          <label className="w-48 text-right mr-6 text-gray-700 font-medium">
            From Unit
          </label>
          <div className="flex-1">
            <Select
              value={formData.fromUnit}
              onChange={(option) => handleSelectChange('fromUnit', option)}
              options={unitOptions}
              styles={customStyles}
              isSearchable={true}
              placeholder="Select unit..."
            />
          </div>
        </div>

        {/* From Value */}
        <div className="flex items-center mb-6">
          <label className="w-48 text-right mr-6 text-gray-700 font-medium">
            From Value
          </label>
          <div className="flex-1">
            <Input
              type="text"
              name="fromValue"
              value={formData.fromValue}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* To Unit */}
        <div className="flex items-center mb-6">
          <label className="w-48 text-right mr-6 text-gray-700 font-medium">
            To Unit
          </label>
          <div className="flex-1">
            <Select
              value={formData.toUnit}
              onChange={(option) => handleSelectChange('toUnit', option)}
              options={unitOptions}
              styles={customStyles}
              isSearchable={true}
              placeholder="Select unit..."
            />
          </div>
        </div>

        {/* To Value */}
        <div className="flex items-center mb-8">
          <label className="w-48 text-right mr-6 text-gray-700 font-medium">
            To Value
          </label>
          <div className="flex-1">
            <Input
              type="text"
              name="toValue"
              value={formData.toValue}
              onChange={handleChange}
              placeholder="To Value"
              className="w-full px-4 py-3 border border-gray-300 rounded text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-600 text-white text-base font-medium rounded hover:bg-green-700 transition-colors shadow-sm"
          >
            Add Unit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUnitConversion;