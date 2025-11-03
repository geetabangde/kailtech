import { useState } from "react";

export default function ViewEnvironmentalRecord() {
  const [loading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("September");
  const [selectedYear, setSelectedYear] = useState("2025");

  // Sample environmental data
  const environmentalData = {
    qfNo: "KTRCGC/003/01",
    issueNo: "01",
    issueDate: "01/05/2019",
    revisionNo: "01",
    revisionDate: "20/03/2021",
    page: "1 of 1",
    location: "",
    department: "",
    records: [
      { date: "01/09/2025", addedBy: "" },
      { date: "02/09/2025", addedBy: "" },
      { date: "03/09/2025", addedBy: "" },
      { date: "04/09/2025", addedBy: "" },
      { date: "05/09/2025", addedBy: "" },
      { date: "06/09/2025", addedBy: "" },
      { date: "07/09/2025", addedBy: "" },
      { date: "08/09/2025", addedBy: "" },
      { date: "09/09/2025", addedBy: "" },
    ]
  };

  const handlePrint = () => {
    setPrintLoading(true);
    setTimeout(() => {
      window.print();
      setPrintLoading(false);
    }, 500);
  };

  const handleGoBack = () => {
    // Navigate back functionality
    console.log("Navigate back");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex h-[60vh] items-center justify-center text-gray-600">
          <svg className="animate-spin h-6 w-6 mr-2 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
          </svg>
          Loading Environmental Record details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 no-print">
          <h2 className="text-lg font-semibold text-gray-800">Environmental Record List</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-3 items-center">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-6">
          <div className="printable-area">
            <div className="space-y-6 text-sm leading-relaxed print:text-black">
              
              {/* Main Header */}
              <div className="flex border border-gray-300 bg-white shadow-sm">
                {/* Logo Section */}
                <div className="w-1/3 p-4">
                  <img
                    src="https://kailtech.thehostme.com/2025_05_07/kailtech_new/images/letterhead.jpg"
                    alt="Logo"
                    className="h-10 mb-2 w-auto"
                  />
                  <p className="font-semibold text-sm text-gray-800">
                    Kailtech Test & Research Centre Pvt. Ltd.
                  </p>
                </div>

                {/* Title Section */}
                <div className="w-1/3 p-4 border-l border-gray-300 flex items-center justify-center">
                  <h2 className="text-sm font-bold uppercase text-center text-gray-800">
                    Environmental Conditions
                  </h2>
                </div>

                {/* Info Table */}
                <div className="w-1/3 p-0 border-l border-gray-300 flex">
                  <table className="w-full h-full text-xs text-gray-800 border-collapse">
                    <tbody>
                      {[
                        ["Q.F. No.", environmentalData.qfNo],
                        ["Issue No.", environmentalData.issueNo],
                        ["Issue Date", environmentalData.issueDate],
                        ["Revision No.", environmentalData.revisionNo],
                        ["Revision Date", environmentalData.revisionDate],
                        ["Page", environmentalData.page],
                      ].map(([label, value]) => (
                        <tr key={label} className="border-b border-gray-300">
                          <td className="p-1 font-semibold border-r border-gray-300 bg-gray-50">{label}</td>
                          <td className="p-1">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Location and Month Info */}
              <div className="space-y-4">
                <div className="flex gap-6 text-sm text-gray-700">
                  <span><strong>MONTH:</strong> {selectedMonth}</span>
                  <span><strong>YEAR:</strong> {selectedYear}</span>
                </div>
                <div className="flex gap-6 text-sm text-gray-700">
                  <span><strong>LOCATION:</strong> {environmentalData.location || ""}</span>
                </div>
              </div>

              {/* Environmental Records Table */}
              <div>
                <table className="w-full border border-gray-300 text-sm text-gray-800 table-fixed">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 border border-gray-300 text-left font-semibold">Date</th>
                      <th className="p-3 border border-gray-300 text-left font-semibold">Added By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {environmentalData.records.map((record, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-300">{record.date}</td>
                        <td className="p-3 border border-gray-300 h-12">{record.addedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Department Label */}
              <div className="text-right">
                <span className="text-sm text-gray-600">
                  <strong>DEPARTMENT:</strong> {environmentalData.department}
                </span>
              </div>

            </div>

            {/* Print Button */}
            <div className="flex justify-end mt-6 no-print">
              <button 
                onClick={handlePrint} 
                disabled={printLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {printLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
                    </svg>
                    Preparing...
                  </div>
                ) : (
                  "Download Environmental Record"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}