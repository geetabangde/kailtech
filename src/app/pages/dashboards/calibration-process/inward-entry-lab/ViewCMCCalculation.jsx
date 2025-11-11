import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button } from "components/ui";

export default function ViewInwardEntrySrf() {
  const { id: inwardId, itemId: instId } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const caliblocation = searchParams.get("caliblocation") || "Lab";
  const calibacc = searchParams.get("calibacc") || "Nabl";

  const [data, setData] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Normalize heading for comparison
  const normalizeHeading = (heading) => {
    return heading.toLowerCase().trim().replace(/\s+/g, ' ');
  };

  // Map heading to uncertainty_calculations field
  const getFieldKeyFromHeading = (heading) => {
    const normalized = normalizeHeading(heading);
    
    // Comprehensive mapping based on API response
    const mappings = {
      'set uuc': 'uuc',
      'uuc': 'uuc',
      'set pressure': 'uuc',
      'master one': 'master1',
      'master1': 'master1',
      'master 1': 'master1',
      'master two': 'master2',
      'master2': 'master2',
      'master 2': 'master2',
      'average master': 'averagemaster',
      'mean master': 'averagemaster',
      'error': 'error',
      'max zerro': 'maxzeroerror',
      'max zero': 'maxzeroerror',
      'max zero error': 'maxzeroerror',
      'hysterisis': 'hysterisis',
      'hysteresis': 'hysterisis',
      'repeatablelity': 'repeatability',
      'repeatability': 'repeatability',
      'leastcount': 'leastcount',
      'least count': 'leastcount',
      'least count uuc': 'leastcount',
      'master unc': 'masterunc',
      'uncertainty master': 'masterunc',
      'master uncertainty': 'masterunc',
      'combine uncertinity': 'combineuncertinity',
      'combined uncertainty': 'combineuncertinity',
      'dof': 'dof',
      'degree of freedom': 'dof',
      'coverage factor': 'coveragefactor',
      'expandeduncertainty': 'expandeduncertainty',
      'expanded uncertainty': 'expandeduncertainty',
      'cmc taken': 'cmc_taken',
      'cmc': 'cmc_taken',
    };

    return mappings[normalized] || null;
  };

  // Format value based on field type
  const formatValue = (value, fieldKey) => {
    if (value === null || value === undefined) return "-";
    
    // Special handling for DOF showing "-" for 0
    if (fieldKey === 'dof' && (value === 0 || value === "-")) {
      return "-";
    }

    // If not a number, return as is
    if (typeof value !== "number") return value;

    // Determine decimal places based on field
    const decimalMap = {
      'maxzeroerror': 4,
      'repeatability': 6,
      'masterunc': 6,
      'combineuncertinity': 6,
      'expandeduncertainty': 6,
      'cmc_taken': 6,
      'averagemaster': 2,
      'error': 2,
      'hysterisis': 2,
      'coveragefactor': 2,
      'dof': 2,
    };

    const decimals = decimalMap[fieldKey] || 2;
    return value.toFixed(decimals);
  };

  useEffect(() => {
    const fetchUncertainty = async () => {
      try {
        const response = await axios.post(
          `/observationsetting/calculateuncertinty`,
          {
            instid: instId,
            inwardid: inwardId,
          }
        );

        if (response.data?.status === true) {
          const apiHeadings = response.data.data?.heading || [];
          setHeadings(apiHeadings);
          
          const calibrationPoints = response.data.data?.calibration_points || [];
          const mappedData = calibrationPoints.map((point, index) => ({
            srNo: index + 1,
            id: point.id,
            // Store entire uncertainty_calculations for dynamic access
            uncertaintyCalculations: point.uncertainty_calculations || {},
          }));
          
          setData(mappedData);
        } else {
          toast.error("No data found");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching uncertainty:", error);
        toast.error("Failed to fetch data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUncertainty();
  }, [inwardId, instId]);

  const handleBackToPerformCalibration = () => {
    navigate(
      `/dashboards/calibration-process/inward-entry-lab/perform-calibration/${inwardId}?caliblocation=${caliblocation}&calibacc=${calibacc}`,
    );
  };

  const handleBackToInwardList = () => {
    navigate(
      `/dashboards/calibration-process/inward-entry-lab?caliblocation=${caliblocation}&calibacc=${calibacc}`,
    );
  };

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const renderMgTable = () => {
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-[12px] text-gray-700">
          <thead>
            <tr className="bg-gray-200 text-center text-xs font-medium">
              <th rowSpan="2" className="border border-gray-300 px-2 py-2">
                Sr no
              </th>
              {headings.map((heading, index) => (
                <th
                  key={`heading-${index}`}
                  rowSpan="2"
                  className="border border-gray-300 px-2 py-2 capitalize"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-center hover:bg-gray-50">
                {/* Sr No */}
                <td className="border border-gray-300 px-2 py-2">
                  {row.srNo}
                </td>
                
                {/* Dynamic columns based on API headings */}
                {headings.map((heading, colIndex) => {
                  const fieldKey = getFieldKeyFromHeading(heading);
                  
                  if (!fieldKey) {
                    // If mapping not found, show "-"
                    return (
                      <td
                        key={`${rowIndex}-${colIndex}`}
                        className="border border-gray-300 px-2 py-2"
                      >
                        -
                      </td>
                    );
                  }

                  // Get value from uncertainty_calculations
                  const value = row.uncertaintyCalculations[fieldKey];
                  
                  return (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className="border border-gray-300 px-2 py-2"
                    >
                      {formatValue(value, fieldKey)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-600">
        <svg
          className="mr-2 h-6 w-6 animate-spin text-blue-600"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
          ></path>
        </svg>
        Loading Uncertainty Calculation...
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center justify-between rounded-lg border-b bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">
          Uncertainty Calculation 
        </h1>
        <div className="space-x-2">
          <Button
            onClick={handleBackToInwardList}
            className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
          >
            &lt;&lt; Back to Inward Entry List
          </Button>
          <Button
            onClick={handleBackToPerformCalibration}
            className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
          >
            &lt;&lt; Back to Perform Calibration
          </Button>
        </div>
      </div>

      <div className="rounded bg-white p-4 shadow">
        {data.length > 0 ? (
          renderMgTable()
        ) : (
          <div className="py-8 text-center text-gray-500">
            No data available
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Download CRF
        </button>
      </div>
    </div>
  );
}