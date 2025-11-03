import { useState } from 'react';
import { useNavigate } from 'react-router';


const AddVisualTest = () => {
    const navigate = useNavigate();
  const [description, setDescription] = useState('');

  const handleSave = () => {
    console.log('Saving:', description);
    // Add your save logic here
  };

  const handleVisualTestList = () => {
          navigate("/dashboards/calibration-operations/bio-medical-visual-test")

    console.log('Navigate to Visual Test List');
    // Add your navigation logic here
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <h1 className="text-3xl font-normal text-gray-800 mb-6">Add Visual Test</h1>

      {/* Visual Test List Button */}
      <button
        onClick={handleVisualTestList}
        className="px-6 py-2.5 bg-cyan-500 text-white text-sm font-medium rounded hover:bg-cyan-600 transition-colors mb-8"
      >
        Visual Test List
      </button>

      {/* Description Field */}
      <div className="flex items-start mb-8">
        <label className="w-40 pt-3 text-gray-800 font-medium">
          Description
        </label>
        <div className="flex-1">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Parameter Description"
            className="w-full px-4 py-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
      >
        Save changes
      </button>
    </div>
  );
};

export default AddVisualTest;