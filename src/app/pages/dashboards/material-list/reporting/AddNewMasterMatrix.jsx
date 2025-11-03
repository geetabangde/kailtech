import  { useState } from 'react';
import { Button , Input} from 'components/ui';
import { useNavigate } from 'react-router-dom';


const MasterChecklistForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    discipline: '',
    equipmentForVerification: '',
    generalCheck: '',
    checkPoint: '',
    unit: 'KJ/ m²',
    acceptanceLimit: ''
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
            }
          >
            ← Back to Master Check List
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Discipline Field */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium">
                Discipline
              </label>
              <div className="flex-1">
                <select 
                  value={formData.discipline}
                  onChange={(e) => handleInputChange('discipline', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="">Select Discipline</option>
                  <option value="civil">Civil</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="electrical">Electrical</option>
                  <option value="instrumentation">Instrumentation</option>
                </select>
              </div>
            </div>

            {/* Equipment for Verification Field */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium">
                Equipment for Verification
              </label>
              <div className="flex-1">
                <select 
                  value={formData.equipmentForVerification}
                  onChange={(e) => handleInputChange('equipmentForVerification', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="">Select Equipment</option>
                  <option value="equipment1">Equipment 1</option>
                  <option value="equipment2">Equipment 2</option>
                  <option value="equipment3">Equipment 3</option>
                </select>
              </div>
            </div>

            {/* General check Field */}
            <div className="flex items-start">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium pt-2">
                General check
              </label>
              <div className="flex-1">
                <textarea 
                  value={formData.generalCheck}
                  onChange={(e) => handleInputChange('generalCheck', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                  rows="4"
                  placeholder=""
                />
              </div>
            </div>

            {/* Check Point Field */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium">
                Check Point
              </label>
              <div className="flex-1">
                <Input 
                  type="text"
                  value={formData.checkPoint}
                  onChange={(e) => handleInputChange('checkPoint', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Unit Field */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium">
                Unit
              </label>
              <div className="flex-1">
                <select 
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="KJ/ m²">KJ/ m²</option>
                  <option value="kg/m²">kg/m²</option>
                  <option value="N/mm²">N/mm²</option>
                  <option value="MPa">MPa</option>
                  <option value="mm">mm</option>
                </select>
              </div>
            </div>

            {/* Acceptance limit Field */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 text-gray-700 font-medium">
                Acceptance limit
              </label>
              <div className="flex-1">
                <Input 
                  type="text"
                  value={formData.acceptanceLimit}
                  onChange={(e) => handleInputChange('acceptanceLimit', e.target.value)}
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