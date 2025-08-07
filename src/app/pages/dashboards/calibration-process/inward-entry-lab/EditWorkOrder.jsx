import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function EditWorkOrder() {
  const { id: inward_id } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ponumber, setPonumber] = useState("");
  const [wupload, setWupload] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        console.log()
      const form = new FormData();
      form.append("inward_id", inward_id);
      form.append("ponumber", ponumber);
      if (wupload) {
        form.append("wupload", wupload);
      }


      const response = await axios.post("/calibrationprocess/edit-workorder-detail", form);
      const result = response.data;

      if (result.success === "true") {
          
             toast.success("Work Order updated successfully ✅");
            setTimeout(() => {
                    window.location.href = `/dashboards/calibration-process/inward-entry-lab`;
                  }, 1000);
            
            }
             else {
            toast.error(result.message || "Update failed ❌");
            }
} catch {
    //   console.error("Update error:", err);
      toast.error("Error while updating work order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Work Order">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Edit Work Order
          </h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/calibration-process/inward-entry-lab")}
          >
            Back to Inward Entry List
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Work Order No"
            value={ponumber}
            onChange={(e) => setPonumber(e.target.value)}
            required
          />
          <Input
            label="Work Order Upload"
            type="file"
            onChange={(e) => setWupload(e.target.files[0])}
            required
          />
         <Button type="submit" color="primary" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
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
                Updating...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </Page>
  );
}
