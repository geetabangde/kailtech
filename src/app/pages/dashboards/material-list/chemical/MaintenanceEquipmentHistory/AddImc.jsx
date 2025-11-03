import  { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Button , Input } from 'components/ui';
import { useNavigate } from 'react-router';


export default function AddIntermediateCheck() {
  const navigate =useNavigate();
  const [observations, setObservations] = useState([
    { id: 1, masterUse: '', unit: '', calibPoint: '', obs1Master: '', obs1UUC: '', obs2Master: '', obs2UUC: '', obs3Master: '', obs3UUC: '', average: '', error: '', close: '' }
  ]);

  const addObservation = () => {
    setObservations([
      ...observations,
      { 
        id: observations.length + 1, 
        masterUse: '', 
        unit: '', 
        calibPoint: '', 
        obs1Master: '', 
        obs1UUC: '', 
        obs2Master: '', 
        obs2UUC: '', 
        obs3Master: '', 
        obs3UUC: '', 
        average: '', 
        error: '', 
        close: '' 
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-normal text-gray-800">Add Intermediate Check</h1>
          <Button 
           className="h-8 space-x-1.5 rounded-md px-3 text-xs "
          color="primary" 
          onClick={() =>
              navigate(
                "/dashboards/material-list/chemical/maintenance-equipment-history"
              )
            }
          
          >
             Back
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Instrument Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instrument Name
            </label>
            <Input
              type="text"
              value="Electrosurgery Analyzer KTRC-BM-EQ-007"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>

          {/* Month */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Month
            </label>
            <Input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Acceptance Criteria */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Acceptance Criteria
            </label>
            <div className="relative">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Drift</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Remark */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remark
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
            ></textarea>
          </div>

          {/* Initial Check */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-4">Initial Check</h2>
            
            {/* Observation Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b border-r border-gray-300">S.No</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b border-r border-gray-300">Master Use for Check</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b border-r border-gray-300">Unit</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 border-b border-r border-gray-300">Calib Point</th>
                    <th colSpan="8" className="px-3 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300">Observation</th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="border-b border-r border-gray-300"></th>
                    <th className="border-b border-r border-gray-300"></th>
                    <th className="border-b border-r border-gray-300"></th>
                    <th className="border-b border-r border-gray-300"></th>
                    <th colSpan="2" className="px-3 py-2 text-center text-sm font-medium text-gray-700 border-b border-r border-gray-300">Observation 1</th>
                    <th colSpan="2" className="px-3 py-2 text-center text-sm font-medium text-gray-700 border-b border-r border-gray-300">Observation 2</th>
                    <th colSpan="2" className="px-3 py-2 text-center text-sm font-medium text-gray-700 border-b border-r border-gray-300">Observation 3</th>
                    <th className="px-3 py-2 text-center text-sm font-medium text-gray-700 border-b border-r border-gray-300">Average</th>
                    <th className="px-3 py-2 text-center text-sm font-medium text-gray-700 border-b border-r border-gray-300">Error</th>
                    <th className="px-3 py-2 text-center text-sm font-medium text-gray-700 border-b border-gray-300">Close</th>
                  </tr>
                </thead>
                <tbody>
                  {observations.map((obs) => (
                    <tr key={obs.id} className="border-b border-gray-300 last:border-b-0">
                      <td className="px-3 py-3 text-sm text-gray-700 border-r border-gray-300">{obs.id}</td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <div className="relative">
                          <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option>Select Master</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                        </div>
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <div className="relative">
                          <select className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option>Select unit</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                        </div>
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          placeholder="Master"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          placeholder="UUC"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          placeholder="Master"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          placeholder="UUC"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          placeholder="Master"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                        
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          placeholder="UUC"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                      </td>
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                          readOnly
                        />
                         <Input
                          type="text"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                          readOnly
                        />
                      </td>
                      
                      <td className="px-2 py-2 border-r border-gray-300">
                        <Input
                          type="text"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                          readOnly
                        />
                      </td>
                      <td className="px-2 py-2">
                        <Input
                          type="text"
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                          readOnly
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Observation Button */}
            <Button
              onClick={addObservation}
            className="h-8 space-x-1.5 rounded-md px-3 text-xs "
          color="primary"             >
              <Plus className="w-4 h-4" />
              Add Observation
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button className="h-8 space-x-1.5 rounded-md px-3 text-xs "
          color="primary" >
              Save
            </Button>
            <Button className="h-8 space-x-1.5 rounded-md px-3 text-xs "
          color="primary" >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}