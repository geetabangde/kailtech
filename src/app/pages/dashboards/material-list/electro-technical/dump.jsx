import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from 'components/ui';
import axios from 'utils/axios';
import toast, { Toaster } from 'react-hot-toast';

const Dump = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const instrumentId = id;
  
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    serialNo: '',
    quantity: '',
    location: '',  // Display location name
    reasonForDumping: ''
  });

  const [apiData, setApiData] = useState({
    mlid: '',  // ✅ Changed: Material Location ID (for API submission)
    typeofuse: '',
    issueStatus: null
  });

  const [loading, setLoading] = useState({
    page: true,
    submitting: false
  });
  const [errors, setErrors] = useState({});
  const [isIssued, setIsIssued] = useState(false);

  // Function to fetch location name from labs table
  const fetchLocationName = async (locationId) => {
    if (!locationId) return 'N/A';
    
    try {
      console.log('🔍 Fetching location name for ID:', locationId);
      
      // ✅ Correct endpoint without /api prefix
      const response = await axios.get(`/master/get-lab-byid/${locationId}`);
      
      console.log('✅ Location API Response:', response.data);
      
      // ✅ Based on your API response structure:
      // { "status": "true", "data": { "name": "SITE CALIBRATION" } }
      const locationName = response.data?.data?.name;
      
      console.log('📍 Extracted location name:', locationName);
      
      // Filter out "Not Applicable" or empty values
      if (locationName && locationName !== 'Not Applicable' && locationName !== '') {
        return locationName;
      }
      
      console.warn('⚠️ No valid location name found, using ID');
      return locationId; // Fallback to ID
    } catch (err) {
      console.error('❌ Error fetching location name:', err.message);
      console.error('❌ Full error:', err);
      return locationId; // Fallback to ID if fetch fails
    }
  };

  useEffect(() => {
    const loadInstrumentData = async () => {
      if (!instrumentId) {
        toast.error('No instrument ID provided in URL');
        setTimeout(() => navigate(-1), 1500);
        return;
      }

      try {
        setLoading(prev => ({ ...prev, page: true }));
        
        console.log('📡 Fetching instrument data for ID:', instrumentId);
        
        const response = await axios.get(`/material/get-mm-instrument-byid?id=${instrumentId}`);
        const instrumentData = response.data?.data?.instrument || {};
        
        console.log('✅ API Response:', instrumentData);
        
        if (!instrumentData || Object.keys(instrumentData).length === 0) {
          toast.error('Instrument not found');
          setTimeout(() => navigate(-1), 2000);
          return;
        }
        
        const typeofuse = parseInt(instrumentData.typeofuse) || 2;
        
        // ✅ Get location ID for API submission
        // NOTE: Backend API should ideally return mlid (materiallocation.id)
        // For now, using instrumentlocation as fallback
        let mlid = instrumentData.mlid || '';
        const instrumentLocationId = instrumentData.instrumentlocation || '';
        
        // ✅ If mlid not available, use instrumentlocation
        if (!mlid && instrumentLocationId) {
          console.warn('⚠️ mlid not in API response, using instrumentlocation');
          console.warn('⚠️ Note: Backend should return materiallocation.id as mlid');
          mlid = instrumentLocationId;
        }
        
        console.log('📍 Location ID for submission (mlid):', mlid);
        console.log('📍 Instrument Location ID:', instrumentLocationId);
        
        // Check issue status for typeofuse 2
        if (typeofuse === 2) {
          const issuestatus = parseInt(instrumentData.issuestatus);
          if (issuestatus === 0) {
            setIsIssued(true);
            toast.error('This instrument is currently issued and cannot be dumped.');
          }
        }
        
        // ✅ Fetch location name from labs table
        let locationName = 'N/A';
        if (instrumentLocationId) {
          locationName = await fetchLocationName(instrumentLocationId);
          console.log('🏢 Final location name:', locationName);
        }
        
        // ✅ Quantity - directly from API (no unit fetch needed)
        const quantityDisplay = instrumentData.quantity || '';
        
        // Set form data for display
        setFormData({
          name: instrumentData.name || '',
          idNumber: instrumentData.idno || '',
          serialNo: instrumentData.serialno || '',
          quantity: quantityDisplay,  // ✅ Just the quantity value
          location: locationName,  // ✅ Display location name
          reasonForDumping: ''
        });
        
        // ✅ Set API data for submission - use mlid NOT instrumentlocation
        setApiData({
          mlid: mlid,  // ✅ Material Location ID (this goes to API)
          typeofuse: typeofuse,
          issueStatus: instrumentData.issuestatus
        });
        
        console.log('✅ Form data prepared successfully');
        
      } catch (error) {
        console.error('❌ Error loading instrument:', error);
        console.error('❌ Error details:', error.response?.data);
        
        const errorMsg = error.response?.data?.message || 'Failed to load instrument data';
        toast.error(errorMsg);
        
        setTimeout(() => navigate(-1), 2000);
      } finally {
        setLoading(prev => ({ ...prev, page: false }));
      }
    };

    loadInstrumentData();
  }, [instrumentId, navigate]);

  const handleBackToElectroTechnical = () => {
    navigate(-1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSave = async () => {
    const newErrors = {};
    
    if (!formData.reasonForDumping.trim()) {
      newErrors.reasonForDumping = 'This field is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill in the reason for dumping');
      return;
    }
    
    // ✅ Validate mlid exists
    if (!apiData.mlid) {
      toast.error('Material location ID is missing. Cannot submit dump request.');
      console.error('❌ Missing mlid. API Data:', apiData);
      console.error('❌ This usually means the backend API needs to return mlid field');
      return;
    }
    
    const loadingToast = toast.loading('Submitting dump request...');
    
    try {
      setLoading(prev => ({ ...prev, submitting: true }));
      
      // ✅ CRITICAL: Send mlid as "location" parameter (like PHP does)
      const requestData = {
        mminstid: parseInt(instrumentId),
        location: parseInt(apiData.mlid),  // ✅ Send mlid NOT instrumentlocation
        typeofuse: parseInt(apiData.typeofuse),
        qty: 1,  // For typeofuse 2, always 1
        reason: formData.reasonForDumping.trim()
      };
      
      console.log('📤 Submitting dump request:', requestData);
      console.log('📍 Using mlid as location:', apiData.mlid);
      
      const response = await axios.post('/material/dump-instrument', requestData);
      
      console.log('✅ Dump response:', response.data);
      
      toast.dismiss(loadingToast);
      
      if (response.data?.status) {
        toast.success(
          response.data?.message || 'Dump request submitted successfully',
          { duration: 3000 }
        );
        
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        toast.error(response.data?.message || 'Failed to add dump request');
      }
      
    } catch (error) {
      console.error('❌ Error submitting dump:', error);
      console.error('❌ Error details:', error.response?.data);
      toast.dismiss(loadingToast);
      
      const errorMessage = error.response?.data?.message || 
                          'Failed to submit dump request. Please try again.';
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  if (loading.page) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="flex h-[60vh] items-center justify-center text-gray-600">
          <svg className="animate-spin h-6 w-6 mr-2 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
          </svg>
          Loading Instrument Data...
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            maxWidth: '500px',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10b981',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
        }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-gray-900 ml-12">Add Dump MM Instrument</h1>
            <Button
              variant="outline"
              onClick={handleBackToElectroTechnical}
              className="flex items-center space-x-2 text-white bg-indigo-500 hover:bg-fuchsia-500"
            >
              <span>←</span>
              <span>Back to Electro Technical</span>
            </Button>
          </div>
        </div>

        {/* Issue Warning */}
        {isIssued && (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-center text-lg font-semibold">
              ⚠️ Instrument has Been Issued Right Now. Cannot proceed with dump.
            </div>
          </div>
        )}

        {/* Form */}
        <div className="p-6 bg-white">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 space-y-6">
              {/* Name Field */}
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

              {/* Id Number Field */}
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

              {/* Serial No Field */}
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

              {/* Quantity Field */}
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

              {/* Location Field - Shows lab name */}
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

              {/* Reason For Dumping Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason For Dumping <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.reasonForDumping}
                  onChange={(e) => handleInputChange('reasonForDumping', e.target.value)}
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical bg-yellow-50"
                  placeholder="Enter reason for dumping"
                  disabled={isIssued}
                />
                {errors.reasonForDumping && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.reasonForDumping}
                  </p>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-start pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isIssued || loading.submitting}
                  className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading.submitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dump;