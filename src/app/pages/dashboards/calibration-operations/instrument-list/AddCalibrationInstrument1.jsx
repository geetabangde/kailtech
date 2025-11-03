import { useNavigate } from "react-router";
import { Page } from "components/shared/Page";
import { Button, Input } from "components/ui";
import axios from "utils/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

export default function AddInstrument() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    sop: [],
    standard: [],
    description: "",
    vertical: "1",
    remark: "",
    discipline: "",
    groups: "",
  });

  const [sopOptions, setSopOptions] = useState([]);
  const [standardOptions, setStandardOptions] = useState([]);

  // ✅ Fetch SOP and Standard lists
  useEffect(() => {
    const token = "Bearer YOUR_TOKEN_HERE"; // Replace with secure token handling

    axios
      .get("/", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setSopOptions(
          res.data?.data?.map((item) => ({
            label: item.name,
            value: item.id,
          })) || [],
        );
      });

    axios
      .get("/calibrationoperations/calibration-standard-list", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setStandardOptions(
          res.data?.data?.map((item) => ({
            label: item.name,
            value: item.id,
          })) || [],
        );
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => payload.append(`${key}[]`, v));
        } else {
          payload.append(key, value);
        }
      });

      await axios.post("/calibrationoperations/add-new-instrument", payload, {
        headers: {
          Authorization: "Bearer YOUR_TOKEN_HERE", // Use secure token storage
        },
      });

      toast.success("Instrument created successfully ✅");
      navigate("/dashboards/calibration-operations/instrument-list");
    } catch (err) {
      toast.error("Error creating instrument ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Add Instrument">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add List Of Instrument</h2>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() =>
              navigate("/dashboards/calibration-operations/instrument-list")
            }
          >
            Back
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <Input
            label="Instrument Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* ✅ Calibration Method/SOP - Multi Select */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Calibration Method / SOP
            </label>
            <ReactSelect
              isMulti
              name="sop"
              options={sopOptions}
              onChange={(selected) => handleMultiSelectChange(selected, "sop")}
              placeholder="Select Calibration Methods"
            />
          </div>

          {/* ✅ Calibration Standard - Multi Select */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Calibration Standard
            </label>
            <ReactSelect
              isMulti
              name="standard"
              options={standardOptions}
              onChange={(selected) =>
                handleMultiSelectChange(selected, "standard")
              }
              placeholder="Select Calibration Standards"
            />
          </div>

          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <Input
            label="Remark"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
          />

          <Input
            label="Discipline"
            name="discipline"
            value={formData.discipline}
            onChange={handleChange}
          />

          <Input
            label="Group"
            name="groups"
            value={formData.groups}
            onChange={handleChange}
          />

          <Button type="submit" color="primary" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </Page>
  );
}
