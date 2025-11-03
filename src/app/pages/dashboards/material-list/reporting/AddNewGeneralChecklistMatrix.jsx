import { useState } from 'react';
import { Button , Input} from 'components/ui';
import { useNavigate } from 'react-router-dom';

const MasterChecklistForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    generalEquipmentAccessories: '',
    quantity: '',
    generalCondition: '',
    remarks: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h1 className="text-lg font-medium text-gray-900">Add master Checklist</h1>
          <Button className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-4 py-2 rounded text-sm font-medium"
          onClick={() =>
              navigate("/dashboards/material-list/reporting/view-checklist/id")
            }>
            ← Back to Master Check List
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* General Equipment/Accessories Field */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium">
                General Equipment/Accessories
              </label>
              <div className="flex-1">
                <Input 
                  type="text"
                  value={formData.generalEquipmentAccessories}
                  onChange={(e) => handleInputChange('generalEquipmentAccessories', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Quantity Field */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium">
                Quantity
              </label>
              <div className="flex-1">
                <Input 
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* General Condition Field */}
            <div className="flex items-start">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium pt-2">
                General Condition
              </label>
              <div className="flex-1">
                <textarea 
                  value={formData.generalCondition}
                  onChange={(e) => handleInputChange('generalCondition', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                  rows="4"
                  placeholder=""
                />
              </div>
            </div>

            {/* Remarks Field */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium">
                Remarks
              </label>
              <div className="flex-1">
                <Input 
                  type="text"
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium">
              Save Master Checklist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterChecklistForm;