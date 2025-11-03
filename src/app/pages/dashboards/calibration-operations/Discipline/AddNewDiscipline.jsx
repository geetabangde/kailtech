import  { useState } from 'react';
import { useNavigate } from 'react-router';

export default function AddDiscipline() {
  const navigate = useNavigate();
  const [disciplineName, setDisciplineName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-normal text-gray-800">Add discipline</h1>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded transition-colors"
          onClick={()=>
            navigate("/dashboards/calibration-operations/discipline")
          }
          >
            &lt;&lt; Back to Discipline
          </button>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Discipline Name Field */}
          <div className="mb-6">
            <div className="flex items-start">
              <label className="w-48 pt-2 text-gray-700 font-medium">
                Discipline Name
              </label>
              <input
                type="text"
                value={disciplineName}
                onChange={(e) => setDisciplineName(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="mb-8">
            <div className="flex items-start">
              <label className="w-48 pt-2 text-gray-700 font-medium">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>

    

          {/* Add Method Button */}
          <div className="flex justify-end">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded font-medium transition-colors">
              Add Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}