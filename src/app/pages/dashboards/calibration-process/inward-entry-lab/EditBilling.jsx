import { useEffect, useState } from "react";
import { Button, Input } from "components/ui";
import { Page } from "components/shared/Page";
import axios from "utils/axios";
import { toast } from "sonner";

export default function EditBillingDetails() {
  const [customers, setCustomers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCustomerData, setSelectedCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/people/get-all-customers");
        if (res.data.status === "true" && res.data.data) {
        //   console.log("Fetched customers:", res.data.data); // Debug log
          setCustomers(res.data.data);
        } else {
          toast.error("Failed to load customers.");
        }
      } catch {
        toast.error("Error fetching customers.");
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      console.log("Selected customer ID:", selectedCustomer); // Debug log
      setLoading(true);
      const fetchAddresses = async () => {
        try {
          const res = await axios.get(`/people/get-customers-address/${selectedCustomer}`);
          if (res.data.status === "true" && res.data.data) {
            setAddresses(res.data.data);
          } else {
            toast.error("Failed to load customer addresses.");
          }
        } catch (err) {
          toast.error("Error fetching addresses.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchAddresses();

      const selectedCustomerData = customers.find(cust => String(cust.id) === selectedCustomer);
      // console.log("Selected customer data:", selectedCustomerData); // Debug log
      setSelectedCustomerData(selectedCustomerData);
    } else {
      setAddresses([]);
      setSelectedCustomerData(null);
    }
  }, [selectedCustomer, customers]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomer || !selectedAddress) {
      toast.error("Please select a customer and an address.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        inward_id: 3608,
        billingname: selectedCustomer,
        billingaddress: selectedAddress,
        gstno: selectedCustomerData?.gstno || "",
      };

    //   console.log("Submitting payload:", payload);

      const res = await axios.post("/calibrationprocess/edit-billing-details", payload);
      const result = res.data;

      if (result.status === "true") {
        toast.success("Billing details updated successfully!");
        setTimeout(() => {
          window.location.href = "/dashboards/calibration-process/inward-entry-lab";
        }, 1000);
      } else {
        toast.error(result.message || "Failed to update billing details.");
      }
    } catch (err) {
      toast.error("Error submitting form.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Billing Details">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Edit Billing Details
          </h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() =>
              (window.location.href = "/dashboards/calibration-process/inward-entry-lab")
            }
          >
            Back to Inward Entry List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <select
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
              value={selectedCustomer}
              onChange={(e) => {
                setSelectedCustomer(e.target.value);
                setSelectedAddress("");
              }}
              required
            >
              <option value="">Select Customer</option>
              {customers
                .filter(customer => customer.id != null)
                .map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.pnumber})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Select Address
            </label>
            <select
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              required
            >
              <option value="">Select Address</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.name} - {address.address}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Customer GST Number
            </label>
            <Input
              value={selectedCustomerData?.gstno || "No GST Available"}
              readOnly
              style={{
                backgroundColor: selectedCustomer ? "#f0f0f0" : "#dcdcdc",
              }}
            />
          </div>

          <Button type="submit" color="primary" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                Updating...
              </div>
            ) : (
              "Update Billing Details"
            )}
          </Button>
        </form>
      </div>
    </Page>
  );
}