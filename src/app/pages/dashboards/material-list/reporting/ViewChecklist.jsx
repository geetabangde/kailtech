import { Button , Input} from 'components/ui';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function ViewChecklist() {
  const navigate = useNavigate();
  
  const handleBackToList = () => {
    // Navigate back to the MM Instrument List page
    navigate('/dashboards/material-list/reporting');
  };

  const unitOptions = [
    { value: 'hectopascal', label: 'Hectopascal(hPa)' },
    { value: 'pascal', label: 'Pascal(Pa)' },
    { value: 'bar', label: 'Bar' },
    { value: 'psi', label: 'PSI' }
  ];

  return (
    <div className="bg-white">    
     

      {/* Main Content */}
      <div className="p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-700">Site Checklist</h1>
          <div className="flex space-x-2">
            <Button 
              className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-4 py-2 rounded"
              onClick={handleBackToList}
            >
              &lt;&lt; Back To Master&apos;s List
            </Button>
            <Button className=" text-white px-4 py-2 rounded bg-indigo-500 hover:bg-fuchsia-500"
             onClick={() =>
              navigate("/dashboards/material-list/reporting/add-new-master-matrix")
            }>
              Add New Master Matrix
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-4">
          <div className="flex items-center justify-end">
            <span className="mr-2">Search:</span>
            <Input type="text" className="border border-gray-300 px-2 py-1 rounded w-48" />
          </div>
        </div>

        {/* Main Table */}
        <div className="border border-gray-300 mb-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">S No ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">Discipline ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">Equipment Use for Verification ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">General Check ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">Unit ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">Check Point ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">Acceptance limit ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">Action ▲</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search S No." className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search Discipline" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search Equipment" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search General" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Select 
                    options={unitOptions}
                    defaultValue={unitOptions[0]}
                    placeholder="Select unit..."
                    className="text-xs"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        minHeight: '24px',
                        height: '24px',
                        fontSize: '12px'
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        height: '24px',
                        padding: '0 6px'
                      }),
                      input: (provided) => ({
                        ...provided,
                        margin: '0px',
                      }),
                      indicatorSeparator: () => ({
                        display: 'none',
                      }),
                      indicatorsContainer: (provided) => ({
                        ...provided,
                        height: '24px',
                      }),
                    }}
                  />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search Check Point" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search Acceptance" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2">
                  <Input type="text" placeholder="Search Action" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Show entries */}
        <div className="mb-8 flex items-center">
          <span className="mr-2">Show</span>
          <select className="border border-gray-300 px-2 py-1 rounded mr-2">
            <option>25</option>
          </select>
          <span>entries</span>
        </div>

        {/* General Checklist Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">General Checklist</h2>
          <Button className="bg-indigo-500 hover:bg-fuchsia-500 text-white px-4 py-2 rounded "
                onClick={() =>
                    navigate("/dashboards/material-list/reporting/add-new-general-checklist-matrix")
                  }>
            Add New General Checklist Matrix
          </Button>
        </div>

        {/* Search Section */}
        <div className="mb-4">
          <div className="flex items-center justify-end">
            <span className="mr-2">Search:</span>
            <Input type="text" className="border border-gray-300 px-2 py-1 rounded w-48" />
          </div>
        </div>

        {/* General Checklist Table */}
        <div className="border border-gray-300 mb-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">S No ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">General Equipment/Accessories ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">Quantity ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">General Condition ▲</th>
                <th className="px-3 py-2 text-left border-r border-gray-300 text-sm">Remarks ▲</th>
                <th className="px-3 py-2 text-left text-sm">Action ▲</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search S No." className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search General Equipment" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search Quantity" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search General Condition" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2 border-r border-gray-300">
                  <Input type="text" placeholder="Search Remarks" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
                <td className="px-3 py-2">
                  <Input type="text" placeholder="Search Action" className="w-full border border-gray-300 px-2 py-1 text-xs rounded" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Show entries */}
        <div className="mb-4 flex items-center">
          <span className="mr-2">Show</span>
          <select className="border border-gray-300 px-2 py-1 rounded mr-2">
            <option>25</option>
          </select>
          <span>entries</span>
        </div>
      </div>
    </div>
  );
}

export default ViewChecklist;