
import { useNavigate } from 'react-router-dom';

function ViewEquipmentHistory() {
  const navigate = useNavigate();

  const handleBackToList = () => {
    // Navigate back to the MM Instrument List page
    navigate('/dashboards/material-list/building-material');
  };

 return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-medium text-gray-900">INSTRUMENT HISTORY</h1>
        <button 
          className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-4 py-2 rounded text-sm"
          onClick={handleBackToList}
        >
          Back
        </button>
      </div>



      

           <div className="p-6">
        {/* Main Content */}
        <div className="bg-white border border-gray-400">
          {/* Top Section - Logo and Header Info */}
          <div className="flex border-b border-gray-400">
            {/* Left - Logo and Company Info */}
            <div className="w-1/3 border-r border-gray-400 p-4">
              <div className="flex items-center space-x-3 mb-4">
                               <img src="/images/logo.png" alt="KTRC Logo" className="w-40 h-30 object-contain" />

                <div className="text-xs">
                  <div className="font-semibold">Quality Test And Training</div>
                  <div className="text-gray-700">kailtech Test and Research Centre Pvt. Ltd.</div>
                </div>
              </div>
            </div>

            {/* Center - Instrument History Title */}
            <div className="w-1/3 border-r border-gray-400 flex items-center justify-center p-4">
              <h2 className="text-lg font-semibold underline">Instrument History</h2>
            </div>

            {/* Right - Document Info Table */}
            <div className="w-1/3 p-0">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="px-3 py-2 font-medium border-r border-gray-400 bg-gray-100 w-24">QF. No.</td>
                    <td className="px-3 py-2">KTRCQF/0604/01</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="px-3 py-2 font-medium border-r border-gray-400 bg-gray-100">Issue No.</td>
                    <td className="px-3 py-2">01</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="px-3 py-2 font-medium border-r border-gray-400 bg-gray-100">Issue Date</td>
                    <td className="px-3 py-2">01/06/2019</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="px-3 py-2 font-medium border-r border-gray-400 bg-gray-100">Revision No.</td>
                    <td className="px-3 py-2">02</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="px-3 py-2 font-medium border-r border-gray-400 bg-gray-100">Revision Date</td>
                    <td className="px-3 py-2">01/06/2023</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium border-r border-gray-400 bg-gray-100">Page</td>
                    <td className="px-3 py-2">1 of 1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-medium text-center mb-4 underline">INSTRUMENT HISTORY</h2>
            
            {/* Basic Info Section with Borders */}
            <div className="border border-gray-400 mb-4">
              <div className="flex">
                {/* Left Section - DEPARTMENT */}
                <div className="w-1/2 border-r border-gray-400">
                  <div className="border-b border-gray-400 px-3 py-2 bg-gray-200">
                    <span className="text-gray-800 font-medium text-sm">DEPARTMENT</span>
                  </div>
                  
                  <div className="p-0">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 w-52 border-r border-gray-400">Name of Instrument :</td>
                          <td className="py-2 px-3 text-gray-800">Electrosurgery Analyzer</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Make :</td>
                          <td className="py-2 px-3 text-gray-800">Fluke</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Model :</td>
                          <td className="py-2 px-3 text-gray-800">QA-ES MKIII</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">S.No. :</td>
                          <td className="py-2 px-3 text-gray-800">4837012</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Date of installation :</td>
                          <td className="py-2 px-3 text-gray-800">05/09/2020</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Location of Equipment :</td>
                          <td className="py-2 px-3 text-gray-800"></td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Name & Contact details of Service Provider:</td>
                          <td className="py-2 px-3 text-gray-800">Life Force 207, Second Floor, Plot No.-51 Hasanpur, Delhi-110092 Mr. Vijay Sharma</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">WI Reference :</td>
                          <td className="py-2 px-3 text-gray-800">KTRC-CAL(BM)-SOP-07</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Software / Firmware details :</td>
                          <td className="py-2 px-3 text-gray-800">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Section - EQPT ID */}
                <div className="w-1/2">
                  <div className="border-b border-gray-400 px-3 py-2 bg-gray-200 flex">
                    <span className="text-gray-800 font-medium text-sm">EQPT ID</span>
                    <span className="ml-8 text-gray-800 font-medium text-sm">KTRC-BM-EQ-007</span>
                  </div>
                  
                  <div className="p-0">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 w-44 border-r border-gray-400">Range :</td>
                          <td className="py-2 px-3 text-gray-800">As Per Manual</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">L.C. :</td>
                          <td className="py-2 px-3 text-gray-800">As Per Range</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Accuracy :</td>
                          <td className="py-2 px-3 text-gray-800">As Per Manual</td>
                        </tr>
                        <tr className="border-b border-gray-400">
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Acceptance Criteria :</td>
                          <td className="py-2 px-3">
                            <div className="text-gray-800">Error with in the accuracy</div>
                            <div className="text-gray-600 text-xs">(KTRC/QF/0704/07)</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 text-gray-700 border-r border-gray-400">Equipment Conforms Specified Requirement</td>
                          <td className="py-2 px-3 text-gray-800">Yes/No</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Types Table */}
            <div className="mb-6">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">CODE</th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-medium">TYPE OF SERVICE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">1</td>
                    <td className="border border-gray-300 px-3 py-2">Maintenance (KTRC/QF/0604/18)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">2</td>
                    <td className="border border-gray-300 px-3 py-2">Calibration (KTRC/QF/0604/01/06)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">3</td>
                    <td className="border border-gray-300 px-3 py-2">Repair / Modification</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">4</td>
                    <td className="border border-gray-300 px-3 py-2">Out of Order</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calibration History Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 py-2 text-left font-medium">CODE</th>
                    <th className="border border-gray-300 px-2 py-2 text-left font-medium">IMPLEMENT DATE</th>
                    <th className="border border-gray-300 px-2 py-2 text-left font-medium">NEXT DUE DATE</th>
                    <th className="border border-gray-300 px-2 py-2 text-left font-medium">RESULT OF CALIBRATION (Certificate No.)</th>
                    <th className="border border-gray-300 px-2 py-2 text-left font-medium">ADJUSTMENTS, IF ANY (YES/NO)</th>
                    <th className="border border-gray-300 px-2 py-2 text-left font-medium">MEETS ACCEPTANCE CRITERIA (YES/NO)</th>
                    <th className="border border-gray-300 px-2 py-2 text-left font-medium">SIGNED BY</th>
                    <th className="border border-gray-300 px-2 py-2 text-left font-medium">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2">2</td>
                    <td className="border border-gray-300 px-2 py-2">12/11/2020</td>
                    <td className="border border-gray-300 px-2 py-2">12/11/2021</td>
                    <td className="border border-gray-300 px-2 py-2">M-201112-15-2</td>
                    <td className="border border-gray-300 px-2 py-2"></td>
                    <td className="border border-gray-300 px-2 py-2"></td>
                    <td className="border border-gray-300 px-2 py-2 text-xs">
                      <div>Electronically signed by</div>
                      <div>Arjun Kumar(3156)</div>
                      <div>Designation:Assistant Manager</div>
                      <div>11/15/2021</div>
                      <div className="font-medium">Arjun Kumar</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2">2</td>
                    <td className="border border-gray-300 px-2 py-2">26/11/2021</td>
                    <td className="border border-gray-300 px-2 py-2">26/11/2022</td>
                    <td className="border border-gray-300 px-2 py-2">M-211126-8-2</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div>No</div>
                      <div>No Adjustment</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">Yes</td>
                    <td className="border border-gray-300 px-2 py-2 text-xs">
                      <div>Electronically signed by</div>
                      <div>Arjun Kumar(3156)</div>
                      <div>Designation:Assistant Manager</div>
                      <div>26/11/2021</div>
                      <div className="font-medium">Arjun Kumar</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2">2</td>
                    <td className="border border-gray-300 px-2 py-2">29/11/2022</td>
                    <td className="border border-gray-300 px-2 py-2">29/11/2023</td>
                    <td className="border border-gray-300 px-2 py-2">M-221128-9-4</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div>No</div>
                      <div>NA</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">Yes</td>
                    <td className="border border-gray-300 px-2 py-2 text-xs">
                      <div>Electronically signed by</div>
                      <div>Hemant Ojha(3229)</div>
                      <div>Designation:Asst Manager (Calibration)</div>
                      <div>30/11/2022</div>
                      <div className="font-medium">Hemant Ojha</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">OK</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2">2</td>
                    <td className="border border-gray-300 px-2 py-2">30/11/2023</td>
                    <td className="border border-gray-300 px-2 py-2">30/11/2024</td>
                    <td className="border border-gray-300 px-2 py-2">M-231128-1-5</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div>No</div>
                      <div>NA</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">Yes</td>
                    <td className="border border-gray-300 px-2 py-2 text-xs">
                      <div>Electronically signed by</div>
                      <div>Hemant Ojha(3229)</div>
                      <div>Designation:Asst Manager (Calibration)</div>
                      <div>30/11/2023</div>
                      <div className="font-medium">Hemant Ojha</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">OK</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2">2</td>
                    <td className="border border-gray-300 px-2 py-2">14/12/2024</td>
                    <td className="border border-gray-300 px-2 py-2">14/12/2025</td>
                    <td className="border border-gray-300 px-2 py-2">M-241205-4-4</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <div>No</div>
                      <div>NA</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">Yes</td>
                    <td className="border border-gray-300 px-2 py-2 text-xs">
                      <div>Electronically signed by</div>
                      <div>Hemant Ojha(3229)</div>
                      <div>Designation:Asst Manager (Calibration)</div>
                      <div>14/12/2024</div>
                      <div className="font-medium">Hemant Ojha</div>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">OK</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signature Section */}
            <div className="mt-8 flex justify-end space-x-16">
              <div className="text-center">
                <div className="text-sm font-medium">DTM</div>
                <div className="border-b border-gray-400 w-24 mt-8 mb-2"></div>
                <div className="text-sm">Name</div>
              </div>
              <div className="text-center">
                <div className="border-b border-gray-400 w-24 mt-12 mb-2"></div>
                <div className="text-sm">Sign</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 text-center py-2 text-xs text-gray-500">
        Copyright © 2025. All rights reserved.
      </div>
    </div>
  );
}

export default ViewEquipmentHistory;