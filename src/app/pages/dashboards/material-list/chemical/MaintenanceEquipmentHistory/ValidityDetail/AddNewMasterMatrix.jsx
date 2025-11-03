
import  { useState } from 'react';
import { Button, Card, Input } from '../../../../../../../components/ui'
import { useNavigate } from 'react-router';

const MasterMatrixForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    unityType: 'Pressure',
    mode: 'Not Specified',
    unit: 'Hectopascal(hPa)',
    instrumentRangeMin: '',
    instrumentRangeMax: '',
    calibratedRangeMin: '',
    calibratedRangeMax: '',
    leastCount: '',
    stability: '',
    remarks: '',
    uniformity: '',
    percentageOfRange: '',
    percentageOfMeasurement: '',
    absoluteValue: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Add master Matrix Form</h1>
          <Button
           className="h-8 space-x-1.5 rounded-md px-3 text-xs "
            color="primary"
         
          onClick={() => 
            navigate('/dashboards/material-list/chemical/maintenance-equipment-history/validity-detail')
          }>
            ← Back to Master Detail Entry List
          </Button>
        </div>

        {/* Main Form Card */}
        <Card className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            {/* Unity Type */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Unity Type/ parameter
              </label>
              <div className="col-span-9">
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.unityType}
                  onChange={(e) => handleInputChange('unityType', e.target.value)}
                >
                  <option>Pressure</option>
                </select>
              </div>
            </div>

            {/* Mode */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Mode
              </label>
              <div className="col-span-9">
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.mode}
                  onChange={(e) => handleInputChange('mode', e.target.value)}
                >
                  <option>Not Specified</option>
                </select>
              </div>
            </div>

            {/* Unit */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Unit
              </label>
              <div className="col-span-9">
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                >
                  <option>Hectopascal(hPa)</option>
                </select>
              </div>
            </div>

            {/* Instrument range min */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Instrument range min
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.instrumentRangeMin}
                  onChange={(e) => handleInputChange('instrumentRangeMin', e.target.value)}
                />
              </div>
            </div>

            {/* Instrument range max */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Instrument range max
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.instrumentRangeMax}
                  onChange={(e) => handleInputChange('instrumentRangeMax', e.target.value)}
                />
              </div>
            </div>

            {/* Calibrated range min */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Calibrated range min
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.calibratedRangeMin}
                  onChange={(e) => handleInputChange('calibratedRangeMin', e.target.value)}
                />
              </div>
            </div>

            {/* Calibrated range max */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Calibrated range max
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.calibratedRangeMax}
                  onChange={(e) => handleInputChange('calibratedRangeMax', e.target.value)}
                />
              </div>
            </div>

            {/* Leastcount */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Leastcount
              </label>
              <div className="col-span-9 ">
                <Input 
                  type="text"
                  className="flex-1 border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.leastCount}
                  onChange={(e) => handleInputChange('leastCount', e.target.value)}
                />
               
              </div>
            </div>

            {/* Stability */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Stability
              </label>
              <div className="col-span-9 ">
                <Input 
                  type="text"
                  className="flex-1 border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.stability}
                  onChange={(e) => handleInputChange('stability', e.target.value)}
                />
              </div>
            </div>

            {/* Remarks */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Remarks
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                />
              </div>
            </div>

            {/* Uniformity */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-right text-gray-700 font-medium">
                Uniformity
              </label>
              <div className="col-span-9">
                <Input 
                  type="text"
                  className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  value={formData.uniformity}
                  onChange={(e) => handleInputChange('uniformity', e.target.value)}
                />
              </div>
            </div>

            {/* Accuracy Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Accuracy</h2>
              
              {/* % of Range */}
              <div className="grid grid-cols-12 gap-4 items-center mb-4">
                <label className="col-span-3 text-right text-gray-700 font-medium">
                  % of Range
                </label>
                <div className="col-span-9">
                  <Input 
                    type="text"
                    className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                    value={formData.percentageOfRange}
                    onChange={(e) => handleInputChange('percentageOfRange', e.target.value)}
                  />
                </div>
              </div>

              {/* % of measurement */}
              <div className="grid grid-cols-12 gap-4 items-center mb-4">
                <label className="col-span-3 text-right text-gray-700 font-medium">
                  % of measurement
                </label>
                <div className="col-span-9">
                  <Input 
                    type="text"
                    className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                    value={formData.percentageOfMeasurement}
                    onChange={(e) => handleInputChange('percentageOfMeasurement', e.target.value)}
                  />
                </div>
              </div>

             

              {/* Absolute value */}
              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-3 text-right text-gray-700 font-medium">
                  Absolute value
                </label>
                <div className="col-span-9">
                  <Input 
                    type="text"
                    className="w-full border border-cyan-400 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                    value={formData.absoluteValue}
                    onChange={(e) => handleInputChange('absoluteValue', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-medium">
              Save Master Matrix
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MasterMatrixForm;