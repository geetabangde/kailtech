import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'components/ui';

const Dump = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Atomic Absorption Spectrometer',
    idNumber: 'KTRC-CHEM-EQ-53',
    serialNo: 'MY 14066002',
    quantity: '1 No\'s',
    location: 'building-material',
    reasonForDumping: ''
  });

  const [errors, setErrors] = useState({});

  const handleBackToSiteCalibration = () => {
    // Navigate back to the MM Instrument List page
    navigate('/dashboards/material-list/building-material');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSave = () => {
    const newErrors = {};
    
    if (!formData.reasonForDumping.trim()) {
      newErrors.reasonForDumping = 'This field is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Handle save logic here
    console.log('Saving dump data:', formData);
    // You can add your API call or other save logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-900" style={{marginLeft:"50px"}}>Add Dump MMinstrument</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleBackToSiteCalibration}
              className="flex items-center space-x-2 text-white bg-indigo-500 hover:bg-fuchsia-500"
            >
              <span>←</span>
              <span>Back</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6" style={{background:"white"}}>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 space-y-6">
            {/* Name Field - Static/Read-only */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <Input
                type="text"
                value={formData.name}
                readOnly
                className="w-full bg-gray-50 cursor-not-allowed"
                placeholder="Enter name"
              />
            </div>

            {/* Id Number Field - Static/Read-only */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Id Number
              </label>
              <Input
                type="text"
                value={formData.idNumber}
                readOnly
                className="w-full bg-gray-50 cursor-not-allowed"
                placeholder="Enter ID number"
              />
            </div>

            {/* Serial No Field - Static/Read-only */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serial No
              </label>
              <Input
                type="text"
                value={formData.serialNo}
                readOnly
                className="w-full bg-gray-50 cursor-not-allowed"
                placeholder="Enter serial number"
              />
            </div>

            {/* Quantity Field - Static/Read-only */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <Input
                type="text"
                value={formData.quantity}
                readOnly
                className="w-full bg-gray-50 cursor-not-allowed"
                placeholder="Enter quantity"
              />
            </div>

            {/* Location Field - Static/Read-only */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <Input
                type="text"
                value={formData.location}
                readOnly
                className="w-full bg-gray-50 cursor-not-allowed"
                placeholder="Enter location"
              />
            </div>

            {/* Reason For Dumping Field - Editable */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason For Dumping
              </label>
              <textarea
                value={formData.reasonForDumping}
                onChange={(e) => handleInputChange('reasonForDumping', e.target.value)}
                className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical bg-yellow-50"
                placeholder="Enter reason for dumping"
              />
              {errors.reasonForDumping && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.reasonForDumping} ×
                </p>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-start pt-4">
              <Button
                onClick={handleSave}
                className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-6 py-2"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dump;