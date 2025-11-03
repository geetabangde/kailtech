import { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Button } from 'components/ui';
import { useNavigate } from 'react-router';

export default function EditMasterValidity() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    serviceProvider: 'Godrej & Boyce Mfg. Co. Ltd.,\nCalibration Services, Plant 18B,',
    typeOfService: 'Calibration',
    certificateNo: 'M-241205-4-4',
    startDate: '14/12/2024',
    endDate: '14/12/2025'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-normal text-gray-800">Edit master Validity</h1>
          <Button
            className="h-8 space-x-1.5 rounded-md px-3 text-xs "
            color="primary"
            onClick={() =>
              navigate(
                "/dashboards/material-list/site-calibration/maintenance-equipment-history"
              )
            }
          >
            <ArrowLeft size={18} />
            Back to Master Validity List
          </Button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Service Provider */}
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-12 items-start">
              <div className="col-span-3 p-4 bg-gray-50 border-r border-gray-200">
                <label className="text-sm font-medium text-gray-700">
                  Name and Address of Service Provider
                </label>
              </div>
              <div className="col-span-9 p-4 relative">
                <textarea
                  name="serviceProvider"
                  value={formData.serviceProvider}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-cyan-400 resize-none"
                  rows="3"
                />
                <ChevronDown className="absolute right-6 top-6 text-gray-400" size={20} />
              </div>
            </div>
          </div>


          {/* Type of Service */}
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-3 p-4 bg-gray-50 border-r border-gray-200">
                <label className="text-sm font-medium text-gray-700">
                  Type Of Service
                </label>
              </div>
              <div className="col-span-9 p-4 relative">
                <select
                  name="typeOfService"
                  value={formData.typeOfService}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-cyan-400 appearance-none"
                >
                  <option value="">Select Type</option>
                  <option value="Calibration">Calibration</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Repair">Repair</option>
                  <option value="Inspection">Inspection</option>
                </select>

                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>


          {/* Certificate No */}
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-3 p-4 bg-gray-50 border-r border-gray-200">
                <label className="text-sm font-medium text-gray-700">
                  Certificate No
                </label>
              </div>
              <div className="col-span-9 p-4">
                <input
                  type="text"
                  name="certificateNo"
                  value={formData.certificateNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Start Date */}
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-3 p-4 bg-gray-50 border-r border-gray-200">
                <label className="text-sm font-medium text-gray-700">
                  Start Date
                </label>
              </div>
              <div className="col-span-9 p-4">
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* End Date */}
          <div>
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-3 p-4 bg-gray-50 border-r border-gray-200">
                <label className="text-sm font-medium text-gray-700">
                  End Date
                </label>
              </div>
              <div className="col-span-9 p-4">
                <input
                  type="text"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="mt-6 flex items-center gap-4">
          <Button className="h-8 space-x-1.5 rounded-md px-3 text-xs "
            color="primary">
            <ChevronDown className="rotate-90" size={24} />
          </Button>
          <div className="flex-1 bg-gray-300 h-2 rounded-full overflow-hidden">
            <div className="bg-gray-500 h-full w-full"></div>
          </div>
          <Button className="h-8 space-x-1.5 rounded-md px-3 text-xs "
            color="primary">
            <ChevronDown className="-rotate-90" size={24} />
          </Button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button className="h-8 space-x-1.5 rounded-md px-3 text-xs "
            color="primary">
            Master Validity
          </Button>
        </div>
      </div>
    </div>
  );
}