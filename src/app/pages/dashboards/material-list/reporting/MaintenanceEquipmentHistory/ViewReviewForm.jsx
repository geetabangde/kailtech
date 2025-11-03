import { Button }  from "components/ui";
import { useNavigate } from "react-router";

const ReviewForm = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1400px] mx-auto bg-white">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <Button className="h-8 space-x-1.5 rounded-md px-3 text-xs "
          color="primary" onClick={() =>
              navigate(
                "/dashboards/material-list/electro-technical/maintenance-equipment-history"
              )}>
            Back
          </Button>
        </div>

      {/* Header Section */}
<div className="border border-gray-300">
  <div className="grid grid-cols-[350px_1fr] border-b border-gray-300">
    {/* Left Section with Logo */}
    <div className="border-r border-gray-300 p-6 flex flex-col items-center justify-center">
      <div className="mb-2">
        <img 
          src="/images/logo.png" 
          alt="KTRC Logo" 
          className="h-20 w-auto object-contain"
        />
      </div>
      <div className="text-center text-sm font-semibold mt-2">
        Quality First & Forever
      </div>
    </div>

    {/* Center and Right Section */}
    <div className="grid grid-cols-[1fr_400px]">
      {/* Center - Title */}
      <div className="border-r border-gray-300 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-lg font-bold mb-2">
            Kaltech Test And Research Centre Pvt. Ltd.
          </div>
          <div className="text-xl font-bold">
            Review of Calibration Certificate
          </div>
        </div>
      </div>

              {/* Right - Document Info */}
              <div>
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="border-r border-gray-300 px-4 py-2 font-semibold bg-gray-50">
                    QF. No.
                  </div>
                  <div className="px-4 py-2">KTRC/QF/0604/06</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="border-r border-gray-300 px-4 py-2 font-semibold bg-gray-50">
                    Issue No.
                  </div>
                  <div className="px-4 py-2">01</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="border-r border-gray-300 px-4 py-2 font-semibold bg-gray-50">
                    Issue Date
                  </div>
                  <div className="px-4 py-2">01/06/2019</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="border-r border-gray-300 px-4 py-2 font-semibold bg-gray-50">
                    Revision No.
                  </div>
                  <div className="px-4 py-2">01</div>
                </div>
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="border-r border-gray-300 px-4 py-2 font-semibold bg-gray-50">
                    Revision Date
                  </div>
                  <div className="px-4 py-2">20/08/2021</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="border-r border-gray-300 px-4 py-2 font-semibold bg-gray-50">
                    Page
                  </div>
                  <div className="px-4 py-2">1 of 1</div>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Information Section */}
          <div className="border-b border-gray-300">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-[200px_1fr] border-r border-gray-300">
                <div className="border-r border-b border-gray-300 px-4 py-3 font-semibold bg-gray-50">
                  Equipment Name
                </div>
                <div className="px-4 py-3 border-b border-gray-300">
                  Electrosurgery Analyzer
                </div>
                <div className="border-r border-b border-gray-300 px-4 py-3 font-semibold bg-gray-50">
                  Equipment Id
                </div>
                <div className="px-4 py-3 border-b border-gray-300">
                  KTRC-BM-EQ-007
                </div>
                <div className="border-r border-b border-gray-300 px-4 py-3 font-semibold bg-gray-50">
                  Calibrated by
                </div>
                <div className="px-4 py-3  border-b border-gray-300"></div>
                  <div className="border-r border-b border-gray-300 px-4 py-3 font-semibold bg-gray-50">
                  Date Of Review
                </div>
                <div className="px-4 py-3">30/12/2022</div>
              </div>
             
             
            </div>
          </div>

          {/* Checklist Table */}
          <div>
            {/* Table Header */}
            <div className="grid grid-cols-[60px_1fr_120px_200px] border-b border-gray-300 bg-gray-50">
              <div className="border-r border-gray-300 px-4 py-3 font-bold text-center">
                S.NO.
              </div>
              <div className="border-r border-gray-300 px-4 py-3 font-bold">
                CHECK LIST
              </div>
              <div className="border-r border-gray-300 px-4 py-3 font-bold text-center">
                Yes or No
              </div>
              <div className="px-4 py-3 font-bold text-center">
                REMARK,IF ANY
              </div>
            </div>

            {/* Table Rows */}
            {[
              { no: '1', text: 'Certificate Traceable to National or International Standards (NABL/NPL/ILAC/PTB etc.)' },
              { no: '2', text: 'Company Name and Address' },
              { no: '3', text: 'Our Instrument ID' },
              { no: '4', text: 'Make' },
              { no: '5', text: 'Model' },
              { no: '6', text: 'Serial Number' },
              { no: '7', text: 'Least Count' },
              { no: '8', text: 'Date of Calibration' },
              { no: '9', text: 'Suggested/Due Date of Calibration' },
              { no: '10', text: 'Required Parameter' },
              { no: '11', text: 'Required Range' },
              { no: '12', text: 'Review of Calibration Result (Error of our Equipment within relevant referred std. or manual)' },
              { no: '13', text: 'Measurement Uncertainty' },
              { no: '14', text: 'Master Instrument Calibration Certificate No.' },
              { no: '15', text: 'Master Instrument Calibration Due Date' },
              { no: '16', text: 'Coverage Factor k' },
              { no: '17', text: 'Certificate Acceptable (if above points are satisfactory)' },
            ].map((row, index) => (
              <div
                key={row.no}
                className={`grid grid-cols-[60px_1fr_120px_200px] ${
                  index < 16 ? 'border-b border-gray-300' : ''
                }`}
              >
                <div className="border-r border-gray-300 px-4 py-3 text-center">
                  {row.no}
                </div>
                <div className="border-r border-gray-300 px-4 py-3">
                  {row.text}
                </div>
                <div className="border-r border-gray-300 px-4 py-3 text-center">
                  Yes
                </div>
                <div className="px-4 py-3 text-center">OK</div>
              </div>
            ))}
          </div>

          {/* Electronic Signature */}
          <div className="border-t border-gray-300 px-4 py-4">
            <div className="text-sm">
              <div>Electronically signed by</div>
              <div>Hemant Quraishy</div>
              <div>Designation:Result Manager (Calibration)</div>
              <div>Date:30/12/2022</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;