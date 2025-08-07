import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Input, Button } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function AddInwardEntry() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    inwarddate: "",
    sample_received_on: "",
    ctype: "",
    customerid: "",
    specificpurpose: "",
    reportname: "",
    reportaddress: "",
    billingname: "",
    billingaddress: "",
  
    concernpersonname: "",
    concernpersondesignation: "",
    concernpersonmobile: "",
    concernpersonemail: "",
    quotationid: "",
    
    bd: "",
    promoter: "",
    priority: "",
    approval: "",
    pcharges: "",
    pchargestype: "",
    ponumber: "",
    wupload: null,
    wstatus: null,
    modeofreciept: "",
    couriernamerec: "",
    dateofdispatchrec: "",
    docketnorec: "",
    localcontactrec: "",
    rupload: null,
    modeofdispatch: "",
    couriername: "",
    dateofdispatch: "",
    docketno: "",
    localcontact: "",

    paymentstatus: "2", // Default "No"
    modeofpayment: "",
    detailsofpayment: "",
    paymentamount: "",
    certcollectiondetail: "",
    additionalemail: "",
    certcollectionremark: "",
    documents: "",
    deadline: "",
    specialrequest: "",
    notes: "",
    nablrequired: "Yes", // default – you can control based on conditions
    calibacc: "Nabl",
    instrumentlocation: "Lab",
    caliblocation: "Lab",
    customername: "",
    customeraddress: "",
    gstno: "", // already done
  });
  const [errors, setErrors] = useState({});
 
  const [certificateOptions, setCertificateOptions] = useState([]);
  const [customerTypeOptions, setCustomerTypeOptions] = useState([]);
  const [specificPurposeOptions, setSpecificPurposeOptions] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [reportAddressOptions, setReportAddressOptions] = useState([]);
  const [billingAddressOptions, setBillingAddressOptions] = useState([]);
  const [quotationOptions, setQuotationOptions] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [modepaymnetOptions, setModePaymentOptions] = useState([]);
  const [bdOptions, setBdOptions] = useState([]);
  const [promoterOptions, setPromoterOptions] = useState([]);
  const [approvedByOptions, setApprovedByOptions] = useState([]);
  const [choiceOptions, setChoiceOptions] = useState([]);
  const [concernPersonOptions, setConcernPersonOptions] = useState([]);
  const [selectedConcernPerson, setSelectedConcernPerson] = useState({
    designation: "",
    email: "",
    mobile: "",
  });
  const [creditInfo, setCreditInfo] = useState({ days: 0, amount: 0 });
  const [loading, setLoading] = useState(false);
  const isTransportMode = formData.modeofreciept !== "1"; // '1' = By Hand
  const isTransportDispatchMode = formData.modeofdispatch !== "BY Hand";
  

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [
          typeRes,
          purposeRes,
          customerRes,
          bdRes,
          promoterRes,
          choiceRes,
          approvedRes,
          modeRes,
          paymentmodeRes,
          setCertificateRes,
        ] = await Promise.all([
          axios.get("/people/get-customer-type-list"),
          axios.get("/people/get-specific-purpose-list"),
          axios.get("/people/get-all-customers"),
          axios.get("/people/get-customer-bd"),
          axios.get("/people/list-promoters"),
          axios.get("/get-choices"),
          axios.get("/approved-by"),
          axios.get("/mode-of-receipt"),
          axios.get("/mode-of-payment"),
          axios.get("/certificate-collect-as"),
        ]);

        setCustomerTypeOptions(
          (typeRes?.data?.Data || []).map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );

        setSpecificPurposeOptions(
          (purposeRes?.data?.data || []).map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );

        setCustomerOptions(
          (customerRes?.data?.data || []).map((item) => ({
            label: `${item.name} (${item.mobile})`,
            value: item.id,
            creditdays: item.creditdays,
            creditamount: item.creditamount,
            customername: item.name, 
            customeraddress: "nothing",
            gstno: item.gstno || "",
          })),
        );

        setBdOptions(
          (bdRes?.data?.data || []).map((item) => ({
            label: `${item.firstname} ${item.lastname}`,
            value: item.id,
          })),
        );
        setPromoterOptions(
          (promoterRes?.data?.data || []).map((item) => ({
            label: `${item.name}`,
            value: item.id,
          })),
        );

        setChoiceOptions(
          (choiceRes?.data?.data || []).map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );

        setApprovedByOptions(
          (approvedRes?.data?.data || []).map((item) => ({
            label: `${item.firstname} ${item.lastname}`,
            value: item.id,
          })),
        );

        setModeOptions(
          (modeRes?.data?.data || []).map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );

        setModePaymentOptions(
          (paymentmodeRes?.data?.data || []).map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );
        setCertificateOptions(
          (setCertificateRes?.data?.data || []).map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );
      } catch (error) {
        toast.error("Error loading dropdowns");
        console.error(error);
      }
    };

    fetchDropdowns();
  }, []);

  

  const handleChange = (e) => {
    const { name, value } = e.target;

    const dateFields = [
      "inwarddate",
      "sample_received_on",
      "dateofdispatchrec",
      "dateofdispatch",
      "deadline",
      
    ];

    if (dateFields.includes(name) && value) {
      const [year, month, day] = value.split("-");
      const formattedDate = `${day}-${month}-${year}`;
      setFormData((prev) => ({
        ...prev,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

  };


  const handleSelectChange = (option, name) => {
    setFormData((prev) => ({ ...prev, [name]: option?.value || "" }));

    if (name === "customerid" && option) {
      setCreditInfo({
        days: option.creditdays || 0,
        amount: option.creditamount || 0,
      });

    
      // ✅ Set GST No from selected customer
      setFormData((prev) => ({
        ...prev,
        gstno: option.gstno || "", // already done
        customername: option.customername, // 👈 set this
        customeraddress: option.customeraddress, // 👈 set this ("nothing")
      }));

      fetchConcernPersons(option.value);
      fetchQuotations(option.value); // 🔁 Call quotation list
    }

    if (name === "reportname" && option?.value) {
      fetchCustomerAddresses(option.value, "report");
    }

    if (name === "billingname" && option?.value) {
      fetchCustomerAddresses(option.value, "billing");
    }


    if (
      (name === "reportname" || name === "billingname") &&
      !option
    ) {
      if (name === "reportname") {
        setReportAddressOptions([]);
        setFormData((prev) => ({ ...prev, reportaddress: "" }));
      } else {
        setBillingAddressOptions([]);
        setFormData((prev) => ({ ...prev, billingaddress: "" }));
      }
    }
    if (name === "customerid" && !option) {
      setConcernPersonOptions([]);
      setFormData((prev) => ({ ...prev, concernpersonname: "" }));
      setSelectedConcernPerson({ designation: "", email: "", mobile: "" });
    }
    
    if (name === "concernpersonname" && option) {
      fetchConcernPersonDetails(option.value);
    }
  };

  const fetchCustomerAddresses = async (customerId, type) => {
    try {
      const res = await axios.get(
        `/people/get-customers-address/${customerId}`,
      );
      const addresses = res?.data?.data || [];
      const options = addresses.map((item) => ({
        label: `${item.name}, ${item.address}, ${item.city} - ${item.pincode}`,
        value: item.id,
      }));

      if (type === "report") setReportAddressOptions(options);
      if (type === "billing") setBillingAddressOptions(options);
    } catch (err) {
      toast.error("Failed to fetch customer addresses");
      console.error(err);
    }
  };

  const fetchConcernPersons = async (customerId) => {
    try {
      const res = await axios.get(`/get-concern-person/${customerId}`);
      const list = res?.data?.data || [];
      setConcernPersonOptions(
        list.map((item) => ({
          label: item.name,
          value: item.id,
          designation: item.designation,
          email: item.email,
          mobile: item.mobile,
        })),
      );
    } catch (err) {
      toast.error("Failed to fetch concern persons");
      console.error(err);
    }
  };
  //  fetchConcernPersonDetails
  const fetchConcernPersonDetails = async (personId) => {
    try {
      const res = await axios.get(`/get-concern-person-details/${personId}`);
      const data = res?.data?.data;

      if (data) {
        setSelectedConcernPerson({
          designation: data.designation || "",
          email: data.email || "",
          mobile: data.mobile || "",
        });
        // ✅ Also update hidden fields for submission
        setFormData((prev) => ({
          ...prev,
          concernpersondesignation: data.designation || "",
          concernpersonemail: data.email || "",
          concernpersonmobile: data.mobile || "",
        }));
      }
    } catch (err) {
      toast.error("Failed to fetch concern person details");
      console.error(err);
    }
  };

  // fetchQuotations
  const fetchQuotations = async (customerId) => {
    try {
      const res = await axios.get(`/get-quotaion/${customerId}`);
      const data = res?.data?.data || [];

      setQuotationOptions(
        data.map((item) => ({
          label: `${String(item.id).padStart(5, "0")}`,
          value: item.id, 
        })),
      );
    } catch (err) {
      toast.error("Failed to fetch quotations");
      console.error(err);
    }
  };

  const handleSameAsReporting = () => {
    setFormData((prev) => ({
      ...prev,
      billingname: prev.reportname,
      billingaddress: prev.reportaddress,
    }));
    setBillingAddressOptions(reportAddressOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};

    if (!formData.inwarddate) newErrors.inwarddate = "Date is required";
    if (!formData.sample_received_on)newErrors.sample_received_on = "Sample Received On Date is required";
    if (!formData.ctype) newErrors.ctype = "Customer type is required";
    if (!formData.customerid) newErrors.customerid = "Customer is required";
    if (!formData.specificpurpose) newErrors.specificpurpose = "Purpose is required";
    if (!formData.bd) newErrors.bd = "BD is required";
    if (!formData.promoter) newErrors.promoter = "Sales Promoter is required";
    if (!formData.priority) newErrors.priority = "Priority is required";
    if (!formData.approval) newErrors.approval = "Approved By is required";
    if (!formData.reportname) newErrors.reportname = "Report Name is required";
    if (!formData.reportaddress) newErrors.reportaddress = "Report Address is required";
    if (!formData.billingname) newErrors.billingname = "Billing Name is required";
    if (!formData.billingaddress) newErrors.billingaddress = "Billing Address is required";
    if (!formData.concernpersonname) newErrors.concernpersonname = "Concern Person Name is required";

    // ❗️ If any errors, block submission and show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({}); // Clear previous errors

    try {
      const form = new FormData();

      // Loop through formData and append
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          form.append(key, formData[key]);
        }
      }

      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await axios.post(
        "/calibrationprocess/add-inward-entry",
        form,
      );

      if (
        String(res.data.status) === "true" ||
        String(res.data.status) === "1"
      ) {
        toast.success("Inward Entry Saved ✅", {
          duration: 1200,
          icon: "✅",
        });
        navigate("/dashboards/calibration-process/inward-entry-lab");
      } else {
        toast.error(res.data.message || "Failed to save entry ❌");
      }
    } catch (err) {
      console.error("Error saving inward entry:", err);
      toast.error(err?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Add Inward Entry">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Inward Entry - Lab</h2>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() =>
              navigate("/dashboards/calibration-process/inward-entry-lab")
            }
          >
            Back
          </Button>
        </div>
        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* First Column */}
          <div className="space-y-4">
            <div>
              <Input
                label="Date"
                name="inwarddate"
                type="date"
                onChange={handleChange}
              />
              {errors.inwarddate && (
                <p className="mt-1 text-sm text-red-500">{errors.inwarddate}</p>
              )}
            </div>

            <div>
              <Input
                label="Sample Received Date"
                name="sample_received_on"
                type="date"
                onChange={handleChange}
              />
              {errors.sample_received_on && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.sample_received_on}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Customer Type</label>
              <ReactSelect
                name="ctype"
                options={customerTypeOptions}
                onChange={(option) => handleSelectChange(option, "ctype")}
                placeholder="Select Customer Type"
              />
              {errors.ctype && (
                <p className="mt-1 text-sm text-red-500">{errors.ctype}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Customer</label>
              <ReactSelect
                name="customerid"
                options={customerOptions}
                onChange={(option) => handleSelectChange(option, "customerid")}
                placeholder="Select Customer"
              />
              {errors.customerid && (
                <p className="mt-1 text-sm text-red-500">{errors.customerid}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Specific Purpose
              </label>
              <ReactSelect
                name="specificpurpose"
                options={specificPurposeOptions}
                onChange={(option) =>
                  handleSelectChange(option, "specificpurpose")
                }
                placeholder="Select Purpose"
              />
              {errors.specificpurpose && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.specificpurpose}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-medium">
                <strong>Customer Credit:</strong> {creditInfo.days} Days | ₹{" "}
                {creditInfo.amount}
              </p>
            </div>

            {/* Report Details */}
            <div className="mt-4 border-t pt-4">
              <h3 className="text-md mb-2 font-semibold">
                Customer&apos;s Report Detail
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Customer Name
                  </label>
                  <ReactSelect
                    name="reportname"
                    options={customerOptions}
                    onChange={(option) =>
                      handleSelectChange(option, "reportname")
                    }
                    placeholder="Select Customer"
                  />
                  {errors.reportname && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.reportname}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Customer Address
                  </label>
                  <ReactSelect
                    name="reportaddress"
                    options={reportAddressOptions}
                    onChange={(option) =>
                      setFormData((prev) => ({
                        ...prev,
                        reportaddress: option?.value || "",
                      }))
                    }
                    placeholder="Select Address"
                    isDisabled={reportAddressOptions.length === 0}
                  />
                  {errors.reportaddress && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.reportaddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Billing Details */}
            <div className="mt-4 border-t pt-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-md font-semibold">
                  Customer&apos;s Billing Detail
                </h3>
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={handleSameAsReporting}
                >
                  Same as reporting
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Customer Name
                  </label>
                  <ReactSelect
                    name="billingname"
                    options={customerOptions}
                    value={
                      customerOptions.find(
                        (opt) => opt.value === formData.billingname,
                      ) || null
                    }
                    onChange={(option) =>
                      handleSelectChange(option, "billingname")
                    }
                    placeholder="Select Customer"
                  />
                  {errors.billingname && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.billingname}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Customer Address
                  </label>
                  <ReactSelect
                    name="billingaddress"
                    options={billingAddressOptions}
                    value={
                      billingAddressOptions.find(
                        (opt) => opt.value === formData.billingaddress,
                      ) || null
                    }
                    onChange={(option) =>
                      setFormData((prev) => ({
                        ...prev,
                        billingaddress: option?.value || "",
                      }))
                    }
                    placeholder="Select Address"
                    isDisabled={billingAddressOptions.length === 0}
                  />
                  {errors.billingaddress && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.billingaddress}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="GST No"
                    name="gstno"
                    value={formData.gstno}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Concern Person Section */}
            <div className="mt-4 border-t pt-4">
              <h3 className="text-md mb-2 font-semibold">Concern Person</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Concern Person Name
                  </label>
                  <ReactSelect
                    name="concernpersonname"
                    options={concernPersonOptions}
                    onChange={(option) =>
                      handleSelectChange(option, "concernpersonname")
                    }
                    placeholder="Select Concern Person"
                  />
                  {errors.concernpersonname && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.concernpersonname}
                    </p>
                  )}
                </div>

                {formData.concernpersonname && (
                  <>
                    <Input
                      label="Concern Person Designation"
                      name="concernpersondesignation"
                      value={selectedConcernPerson.designation}
                      disabled
                    />
                    <Input
                      label="Concern Person Email"
                      name="concernpersonemail"
                      value={selectedConcernPerson.email}
                      disabled
                    />
                    <Input
                      label="Concern Person Mobile"
                      name="concernpersonmobile"
                      value={selectedConcernPerson.mobile}
                      disabled
                    />
                  </>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                name="certcollectionremark"
                value={formData.certcollectionremark}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    certcollectionremark: e.target.value,
                  })
                }
                className="w-full rounded border px-3 py-2"
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full rounded border px-3 py-2"
                placeholder="terms"
              ></textarea>
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Quotation No</label>
              <ReactSelect
                name="quotationid"
                options={quotationOptions}
                onChange={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    quotationid: option?.value || "",
                  }))
                }
                placeholder="Select Quotation"
                isDisabled={quotationOptions.length === 0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Concerned BD</label>
              <ReactSelect
                name="bd"
                options={bdOptions}
                value={
                  bdOptions.find((opt) => opt.value === formData.bd) || null
                }
                onChange={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    bd: option?.value || "",
                  }))
                }
                placeholder="Select BD"
                isDisabled={bdOptions.length === 0}
              />
              {errors.bd && (
                <p className="mt-1 text-sm text-red-500">{errors.bd}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Sales Promoter
              </label>
              <ReactSelect
                name="promoter"
                options={promoterOptions}
                value={
                  promoterOptions.find(
                    (opt) => opt.value === formData.promoter,
                  ) || null
                }
                onChange={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    promoter: option?.value || "",
                  }))
                }
                placeholder="Select Promoter"
                isDisabled={promoterOptions.length === 0}
              />
              {errors.promoter && (
                <p className="mt-1 text-sm text-red-500">{errors.promoter}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Priority Sample
              </label>
              <ReactSelect
                name="priority"
                options={choiceOptions}
                value={
                  choiceOptions.find(
                    (opt) => opt.value === formData.priority,
                  ) || null
                }
                onChange={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: option?.value || "",
                  }))
                }
                placeholder="Select Choice"
                isDisabled={choiceOptions.length === 0}
              />
              {errors.priority && (
                <p className="mt-1 text-sm text-red-500">{errors.priority}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Approved By</label>
              <ReactSelect
                name="approval"
                options={approvedByOptions}
                value={
                  approvedByOptions.find(
                    (opt) => opt.value === formData.approval,
                  ) || null
                }
                onChange={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    approval: option?.value || "",
                  }))
                }
                placeholder="Select Approver"
                isDisabled={approvedByOptions.length === 0}
              />
              {errors.approval && (
                <p className="mt-1 text-sm text-red-500">{errors.approval}</p>
              )}
            </div>

            {/* Priority Testing Charges */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="col-span-1 text-sm font-medium">
                Priority Testing Charges
              </label>
              <input
                type="number"
                value={formData.pcharges}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pcharges: e.target.value,
                  }))
                }
                className="col-span-1 rounded border px-3 py-1"
                placeholder="Enter charges"
              />
              <select
                value={formData.pchargestype || "%"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pchargestype: e.target.value,
                  }))
                }
                className="col-span-1 rounded border px-3 py-1"
              >
                <option value="%">%</option>
                <option value="₹">₹</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Work Order No
              </label>
              <input
                type="text"
                name="ponumber"
                value={formData.ponumber || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ponumber: e.target.value,
                  }))
                }
                className="w-full rounded border px-3 py-2"
                placeholder="Enter Work Order No"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Work Order Upload
              </label>
              <input
                type="file"
                name="wupload"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    wupload: e.target.files[0],
                  }))
                }
                className="block w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Mode Of Receipt
              </label>
              <select
                name="modeofreciept"
                value={formData.modeofreciept}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    modeofreciept: e.target.value,
                  }))
                }
                className="w-full rounded border px-3 py-2"
              >
                <option value="">Select Mode</option>
                {modeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditionally Show: Only if mode is NOT "By Hand" */}
            {isTransportMode && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Courier/Cargo/Transport
                  </label>
                  <input
                    type="text"
                    name="couriernamerec"
                    value={formData.couriernamerec}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Date Of Dispatch
                  </label>
                  <input
                    type="date"
                    name="dateofdispatchrec"
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Docket/Airway Bill No
                  </label>
                  <input
                    type="text"
                    name="docketnorec"
                    value={formData.docketnorec}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Local Contact of Courier
                  </label>
                  <input
                    type="text"
                    name="localcontactrec"
                    value={formData.localcontactrec}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Receipt Doc Upload
              </label>
              <input
                type="file"
                name="rupload"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rupload: e.target.files[0],
                  }))
                }
                className="block w-full rounded border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Mode Of Return
              </label>
              <select
                name="modeofdispatch"
                value={formData.modeofdispatch || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    modeofdispatch: e.target.value,
                  }))
                }
                className="w-full rounded border px-3 py-2"
              >
                <option value="">Select Mode</option>
                <option value="BY Hand">BY Hand</option>
                <option value="by Courier/Cargo/Transport">
                  by Courier/Cargo/Transport
                </option>
              </select>
            </div>

            {isTransportDispatchMode && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Courier/Cargo/Transport
                  </label>
                  <input
                    type="text"
                    name="couriername"
                    value={formData.couriername || ""}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Date Of Dispatch
                  </label>
                  <input
                    type="date"
                    name="dateofdispatch"
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Docket/Airway Bill No
                  </label>
                  <input
                    type="text"
                    name="docketno"
                    value={formData.docketno || ""}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Local Contact of Courier
                  </label>
                  <input
                    type="text"
                    name="localcontact"
                    value={formData.localcontact || ""}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Is Payment Done?
              </label>
              <select
                name="paymentstatus"
                value={formData.paymentstatus}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              >
                <option value="2">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {formData.paymentstatus === "1" && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Mode of Payment
                  </label>
                  <select
                    name="modeofpayment"
                    value={formData.modepaymnetOptions}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                  >
                    <option value="">Select Payment Mode</option>
                    {modepaymnetOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Details
                  </label>
                  <input
                    type="text"
                    name="detailsofpayment"
                    value={formData.detailsofpayment}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                    placeholder="Enter payment details"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Amount</label>
                  <input
                    type="number"
                    name="paymentamount"
                    value={formData.paymentamount}
                    onChange={handleChange}
                    className="w-full rounded border px-3 py-2"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            )}

            {/* CERTIFICATE COLLECTION DETAILS */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Certificate Collect as
                </label>
                <select
                  name="certcollectiondetail"
                  value={formData.certcollectiondetail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      certcollectiondetail: e.target.value,
                    })
                  }
                  className="w-full rounded border px-3 py-2"
                >
                  <option value="">Select</option>
                  {certificateOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Additional Email Ids
                </label>
                <textarea
                  name="additionalemail"
                  value={formData.additionalemail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalemail: e.target.value,
                    })
                  }
                  className="w-full rounded border px-3 py-2"
                  placeholder="Comma separated additional emails"
                ></textarea>
              </div>
            </div>

            {/* SPECIAL INSTRUCTIONS */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Documents Submitted, if any (Details)
                </label>
                <input
                  type="text"
                  name="documents"
                  value={formData.documents}
                  onChange={(e) =>
                    setFormData({ ...formData, documents: e.target.value })
                  }
                  className="w-full rounded border px-3 py-2"
                  placeholder="Certificate Collection Remark"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Any Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="w-full rounded border px-3 py-2"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Any Special Request
                </label>
                <textarea
                  name="specialrequest"
                  value={formData.specialrequest}
                  onChange={(e) =>
                    setFormData({ ...formData, specialrequest: e.target.value })
                  }
                  className="w-full rounded border px-3 py-2"
                  placeholder="terms"
                ></textarea>
              </div>

              <hr />

              {/* Hidden Inputs */}
              <input
                type="hidden"
                name="customeraddress"
                value={formData.customeraddress}
              />
              <input
                type="hidden"
                name="customername"
                value={formData.customername}
              />
              <input
                type="hidden"
                name="nablrequired"
                value={formData.nablrequired}
              />
              <input type="hidden" name="calibacc" value={formData.calibacc} />
              <input
                type="hidden"
                name="instrumentlocation"
                value={formData.instrumentlocation}
              />
              <input
                type="hidden"
                name="caliblocation"
                value={formData.caliblocation}
              />
            </div>
          </div>

          {/* Submit Button - Full Width */}
          <div className="col-span-1 md:col-span-2">
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
} 