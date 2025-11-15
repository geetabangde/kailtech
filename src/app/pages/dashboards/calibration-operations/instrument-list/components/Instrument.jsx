
import { Input } from "components/ui";
import ReactSelect from "react-select";

function Instrument({ formData, errors, handleInputChange, handleMultiSelectChange, sopOptions, standardOptions }) {
  return (
    <>
      <div>
        <Input
          label="Instrument Name"
          placeholder="Enter Instrument Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? "border-red-500 bg-red-50" : ""}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
          Calibration Method / SOP <span className="text-red-500">*</span>
        </label>
        <ReactSelect
          isMulti
          name="sop"
          options={sopOptions}
          value={sopOptions.filter((opt) => formData.sop.includes(opt.value))}
          onChange={(selected) => handleMultiSelectChange(selected, "sop")}
          placeholder="Select Calibration Methods"
          className={errors.sop ? "react-select-error" : ""}
        />
        {errors.sop && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
          Calibration Standard
        </label>
        <ReactSelect
          isMulti
          name="standard"
          options={standardOptions}
          value={standardOptions.filter((opt) => formData.standard.includes(opt.value))}
          onChange={(selected) => handleMultiSelectChange(selected, "standard")}
          placeholder="Select Calibration Standards"
        />
      </div>

      <div>
        <Input
          label="Instrument Description"
          name="description"
          placeholder="Enter Instrument Description"
          value={formData.description}
          onChange={handleInputChange}
          className={errors.description ? "border-red-500 bg-red-50" : ""}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}
      </div>

      <input type="hidden" name="vertical" value={formData.vertical} />

      <div>
        <Input
          label="Discipline"
          name="discipline"
          placeholder="Enter Discipline"
          value={formData.discipline}
          onChange={handleInputChange}
          className={errors.discipline ? "border-red-500 bg-red-50" : ""}
        />
        {errors.discipline && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}
      </div>

      <div>
        <Input
          label="Group"
          name="groups"
          placeholder="Enter Group"
          value={formData.groups}
          onChange={handleInputChange}
          className={errors.groups ? "border-red-500 bg-red-50" : ""}
        />
        {errors.groups && (
          <p className="text-red-600 text-sm mt-1">This field is required</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Enter Remark"
          label="Remark"
          name="remark"
          value={formData.remark}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default Instrument;
