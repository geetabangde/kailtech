// EditCustomer.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Button, Input, Select } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    customertype: [],
    modeofpayment: "",
    creditdays: "",
    creditamount: "",
    mobile: "",
    pname: "",
    pnumber: "",
    email: "",
    country: "",
    stateid: "",
    city: "",
    gstno: "",
    pan: "",
    discount: "",
    thumb_image: null
  });

  const [customerTypeOptions, setCustomerTypeOptions] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // Required fields (thumb_image is optional)
  const requiredFields = {
    name: "Customer Name",
    customertype: "Customer Type",
    modeofpayment: "Mode of Payment",
    creditdays: "Credit Days",
    creditamount: "Credit Amount",
    mobile: "Mobile",
    pname: "Contact Person Name",
    pnumber: "Contact Person Number",
    email: "Email",
    country: "Country",
    stateid: "State",
    city: "City",
    gstno: "GST No",
    pan: "PAN",
    discount: "Discount %"
  };

  useEffect(() => {
    const fetchDropdownsAndCustomer = async () => {
      try {
        setLoading(true);
        const [ctRes, pmRes, countryRes, stateRes, customerRes] = await Promise.all([
          axios.get("/people/get-customer-type-list"),
          axios.get("/people/get-payment-mode"),
          axios.get("/people/get-country"),
          axios.get("/people/get-state"),
          axios.get(`/people/get-single-customer/${id}`)
        ]);

        const ctData = Array.isArray(ctRes?.data?.Data) ? ctRes.data.Data : [];
        const pmData = Array.isArray(pmRes?.data?.data) ? pmRes.data.data : [];
        const countryData = Array.isArray(countryRes?.data?.data) ? countryRes.data.data : [];
        const stateData = Array.isArray(stateRes?.data?.data) ? stateRes.data.data : [];

        setCustomerTypeOptions(ctData.map((item) => ({ label: item.name, value: item.id })));
        setPaymentModes(pmData.map((item) => ({ label: item.name, value: item.id })));
        setCountries(countryData.map((item) => ({ label: item.name, value: item.id })));
        setStates(stateData.map((item) => ({ label: item.state, value: item.id })));

        const customer = customerRes?.data?.data || {};
        setFormData({
          name: customer.name || "",
          customertype: customer.customertype || [],
          modeofpayment: customer.modeofpayment || "",
          creditdays: customer.creditdays || "",
          creditamount: customer.creditamount || "",
          mobile: customer.mobile || "",
          pname: customer.pname || "",
          pnumber: customer.pnumber || "",
          email: customer.email || "",
          country: customer.country || "",
          stateid: customer.stateid || "",
          city: customer.city || "",
          gstno: customer.gstno || "",
          pan: customer.pan || "",
          discount: customer.discount || "",
          thumb_image: null
        });
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownsAndCustomer();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    }));

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleSelectChange = (e, name) => {
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check all required fields
    Object.keys(requiredFields).forEach(field => {
      if (field === 'customertype') {
        // For customertype array, check if it has at least one item
        if (!formData[field] || formData[field].length === 0) {
          newErrors[field] = true;
        }
      } else {
        // For other fields, check if empty or whitespace only
        if (!formData[field] || formData[field].toString().trim() === '') {
          newErrors[field] = true;
        }
      }
    });

    setErrors(newErrors);

    // If there are errors, focus on the first error field
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "customertype") {
          if (Array.isArray(value)) {
            value.forEach((v) => {
              payload.append("customertype[]", v);
            });
          } else {
            payload.append("customertype[]", value);
          }
        } else if (key === "thumb_image" && value) {
          // Only append image if file is selected
          if (value instanceof File) {
            const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
            if (allowedTypes.includes(value.type)) {
              payload.append("thumb_image", value);
            } else {
              console.warn("Invalid image file type.");
            }
          }
        } else if (key !== "thumb_image") {
          // Append all other fields
          payload.append(key, value);
        }
      });

      const res = await axios.post(`/people/update-customer/${id}`, payload);

      if (res.data.status === "true") {
        toast.success("Customer updated successfully");
        navigate("/dashboards/people/customers");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error updating customer");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Customer">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Edit Customer</h2>
          <Button
            variant="outline"
            className="text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/dashboards/people/customers")}
          >
            Back to List
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input 
              label="Customer Name" 
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
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Customer Type <span className="text-red-500">*</span>
            </label>
            <ReactSelect
              isMulti
              value={customerTypeOptions.filter((opt) => formData.customertype.includes(opt.value))}
              name="customertype"
              options={customerTypeOptions}
              onChange={(selected) => handleMultiSelectChange(selected, "customertype")}
              placeholder="Select customer types"
              className={errors.customertype ? "react-select-error" : ""}
            />
            {errors.customertype && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Mode of Payment <span className="text-red-500">*</span>
            </label>
            <Select 
              name="modeofpayment" 
              value={formData.modeofpayment} 
              onChange={(e) => handleSelectChange(e, "modeofpayment")}
              className={errors.modeofpayment ? "border-red-500 bg-red-50" : ""}
            > 
              <option value="">Choose...</option>
              {paymentModes.map((mode) => (
                <option key={mode.value} value={mode.value}>{mode.label}</option>
              ))}
            </Select>
            {errors.modeofpayment && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="Credit Days" 
              name="creditdays" 
              value={formData.creditdays} 
              onChange={handleInputChange}
              className={errors.creditdays ? "border-red-500 bg-red-50" : ""}
            />
            {errors.creditdays && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="Credit Amount" 
              name="creditamount" 
              value={formData.creditamount} 
              onChange={handleInputChange}
              className={errors.creditamount ? "border-red-500 bg-red-50" : ""}
            />
            {errors.creditamount && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="Mobile" 
              name="mobile" 
              value={formData.mobile} 
              onChange={handleInputChange}
              className={errors.mobile ? "border-red-500 bg-red-50" : ""}
            />
            {errors.mobile && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="Contact Person Name" 
              name="pname" 
              value={formData.pname} 
              onChange={handleInputChange}
              className={errors.pname ? "border-red-500 bg-red-50" : ""}
            />
            {errors.pname && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="Contact Person Number" 
              name="pnumber" 
              value={formData.pnumber} 
              onChange={handleInputChange}
              className={errors.pnumber ? "border-red-500 bg-red-50" : ""}
            />
            {errors.pnumber && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="Email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleInputChange}
              className={errors.email ? "border-red-500 bg-red-50" : ""}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <Select 
              name="country" 
              value={formData.country} 
              onChange={(e) => handleSelectChange(e, "country")}
              className={errors.country ? "border-red-500 bg-red-50" : ""}
            >
              <option value="">Choose...</option>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
            {errors.country && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <Select 
              name="stateid" 
              value={formData.stateid} 
              onChange={(e) => handleSelectChange(e, "stateid")}
              className={errors.stateid ? "border-red-500 bg-red-50" : ""}
            >
              <option value="">Choose...</option>
              {states.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </Select>
            {errors.stateid && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="City" 
              name="city" 
              value={formData.city} 
              onChange={handleInputChange}
              className={errors.city ? "border-red-500 bg-red-50" : ""}
            />
            {errors.city && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="GST No" 
              name="gstno" 
              value={formData.gstno} 
              onChange={handleInputChange}
              className={errors.gstno ? "border-red-500 bg-red-50" : ""}
            />
            {errors.gstno && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="PAN" 
              name="pan" 
              value={formData.pan} 
              onChange={handleInputChange}
              className={errors.pan ? "border-red-500 bg-red-50" : ""}
            />
            {errors.pan && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <Input 
              label="Discount %" 
              name="discount" 
              value={formData.discount} 
              onChange={handleInputChange}
              className={errors.discount ? "border-red-500 bg-red-50" : ""}
            />
            {errors.discount && (
              <p className="text-red-600 text-sm mt-1">This field is required</p>
            )}
          </div>

          {/* Image Upload - Optional */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Upload Photo
            </label>
            <input 
              type="file" 
              name="thumb_image" 
              accept="image/*" 
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary-600 file:text-white hover:file:bg-primary-700"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"></path>
                  </svg>
                  Updating...
                </div>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}