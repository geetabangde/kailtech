import { useState } from 'react';

export default function EditStatuaryDetail() {
  const [formData, setFormData] = useState({
    statuaryDetailName: 'Type of MSME',
    value: 'Small Scale',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log('Updated Data:', formData);
  };

  const handleBack = () => {
    console.log('Going back to Statuary Detail');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Statuary Detail</h1>
          <button
            onClick={handleBack}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded transition-colors text-sm font-medium"
          >
            &lt;&lt; Back to Statuary Detail
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          {/* Statuary Detail Name Field */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Statuary Detail Name
            </label>
            <input
              type="text"
              name="statuaryDetailName"
              value={formData.statuaryDetailName}
              onChange={handleInputChange}
              placeholder="Type of MSME"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-gray-700"
            />
          </div>

          {/* Value Field */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Value
            </label>
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleInputChange}
              placeholder="Small Scale"
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-gray-700"
            />
          </div>

          {/* Slider */}
          {/* <div className="mb-12 flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #d1d5db 0%, #d1d5db 50%, #d1d5db 100%)`
              }}
            />
            <button className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div> */}

          {/* Update Button */}
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded font-semibold transition-colors"
            >
              Update Statuary Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}