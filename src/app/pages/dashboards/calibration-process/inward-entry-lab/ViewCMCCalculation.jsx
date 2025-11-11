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
  // const [suffix, setSuffix] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUncertainty = async () => {
      try {
        const response = await axios.post(
          `/observationsetting/calculateuncertinty`,
          {
            instid: instId,
            inwardid: inwardId,
            // suffix: "mg"
          }
        );

        if (response.data?.status === true) {
          // setSuffix("mg");
          
          // Set headings from API
          const apiHeadings = response.data.data?.heading || [];
          setHeadings(apiHeadings);
          
          // Set calibration points data
          const calibrationPoints = response.data.data?.calibration_points || [];
          const mappedData = calibrationPoints.map((point, index) => ({
            srNo: index + 1,
            id: point.id,
            setPressure: point.uncertainty_calculations?.uuc || "",
            masterObservationM1: point.uncertainty_calculations?.master1 || 0,
            masterObservationM2: point.uncertainty_calculations?.master2 || 0,
            meanMaster: point.uncertainty_calculations?.averagemaster,
            error: point.uncertainty_calculations?.error || 0,
            maxZeroError: point.uncertainty_calculations?.maxzeroerror || 0,
            hysterisis: point.uncertainty_calculations?.hysterisis || 0,
            repeatability: point.uncertainty_calculations?.repeatability || 0,
            leastCountUuc: point.uncertainty_calculations?.leastcount || 0,
            uncertaintyMaster: point.uncertainty_calculations?.masterunc || 0,
            combinedUncertainty: point.uncertainty_calculations?.combineuncertinity || 0,
            degreeOfFreedom: point.uncertainty_calculations?.dof || 0,
            coverageFactor: point.uncertainty_calculations?.coveragefactor || 0,
            expandedUncertainty: point.uncertainty_calculations?.expandeduncertainty || 0,
            cmcTaken: point.uncertainty_calculations?.cmc_taken || 0,
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

  const renderMgTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-[12px] text-gray-700">
        <thead>
          <tr className="bg-gray-200 text-center text-xs font-medium">
            <th rowSpan="2" className="border border-gray-300 px-2 py-2">
              Sr no
            </th>
            {headings.map((heading, index) => {
              // For "observation master" columns, use colspan
              if (heading === "observation master") {
                if (index === 1) {
                  // First observation master column
                  return (
                    <th
                      key={`heading-${index}`}
                      colSpan="2"
                      className="border border-gray-300 bg-gray-300 px-2 py-2"
                    >
                      Observation on master (Pa)
                    </th>
                  );
                }
                // Skip second observation master as it's covered by colspan
                return null;
              }
              return (
                <th
                  key={`heading-${index}`}
                  rowSpan="2"
                  className="border border-gray-300 px-2 py-2 capitalize"
                >
                  {heading}
                </th>
              );
            })}
          </tr>
          
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="text-center hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-2">{row.srNo}</td>
              <td className="border border-gray-300 px-2 py-2">
                {row.setPressure}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {row.masterObservationM1}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {row.masterObservationM2}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {row.meanMaster !== null && row.meanMaster !== undefined
                  ? typeof row.meanMaster === "number"
                    ? row.meanMaster.toFixed(2)
                    : row.meanMaster
                  : "-"}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.error === "number"
                  ? row.error.toFixed(2)
                  : row.error}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.maxZeroError === "number"
                  ? row.maxZeroError.toFixed(4)
                  : row.maxZeroError}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.hysterisis === "number"
                  ? row.hysterisis.toFixed(2)
                  : row.hysterisis}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.repeatability === "number"
                  ? row.repeatability.toFixed(6)
                  : row.repeatability}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {row.leastCountUuc}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.uncertaintyMaster === "number"
                  ? row.uncertaintyMaster.toFixed(6)
                  : row.uncertaintyMaster}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.combinedUncertainty === "number"
                  ? row.combinedUncertainty.toFixed(6)
                  : row.combinedUncertainty}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {row.degreeOfFreedom === 0 || row.degreeOfFreedom === "-"
                  ? "-"
                  : typeof row.degreeOfFreedom === "number"
                    ? row.degreeOfFreedom.toFixed(2)
                    : row.degreeOfFreedom}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.coverageFactor === "number"
                  ? row.coverageFactor.toFixed(2)
                  : row.coverageFactor}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.expandedUncertainty === "number"
                  ? row.expandedUncertainty.toFixed(6)
                  : row.expandedUncertainty}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                {typeof row.cmcTaken === "number"
                  ? row.cmcTaken.toFixed(6)
                  : row.cmcTaken}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
            No data available for Magnehelic Gauge
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