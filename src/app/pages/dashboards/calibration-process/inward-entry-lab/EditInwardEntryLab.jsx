import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "utils/axios";
import { toast } from "sonner";
import { Input, Button } from "components/ui";
import { Page } from "components/shared/Page";
import ReactSelect from "react-select";

export default function EditInwardEntry() {
  const navigate = useNavigate();
   const { id } = useParams();
   
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
  const isTransportMode = formData.modeofreciept !== "1";
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
     
    const fetchInwardEntry = async () => {
      try {
        const res = await axios.get(
          `/calibrationprocess/get-inward-entry_byid/${id}`,
        );
        const data = res.data.data;
        setFormData({
          inwarddate: data.inwarddate
            ? data.inwarddate.split("-").reverse().join("-")
            : "",
          sample_received_on: data.sample_received_on
            ? data.sample_received_on.split("-").reverse().join("-")
            : "",
          deadline: data.deadline
            ? data.deadline.split("-").reverse().join("-")
            : "",

          ctype: String(data.ctype),
          customerid: String(data.customerid),
          specificpurpose: String(data.specificpurpose),
          reportname: String(data.reportname),
          reportaddress: String(data.reportaddress),
          billingname: String(data.billingname),
          billingaddress: String(data.billingaddress),

          customername: data.customername,
          customeraddress: data.customeraddress,
          gstno: data.gstno,
          concernpersonname: String(data.concernpersonname),
          quotationid: String(data.quotationid),

          bd: String(data.bd),
          promoter: String(data.promoter),
          priority: String(data.priority),
          approval: String(data.approval),
          pcharges: String(data.pcharges),
          pchargestype: data.pchargestype === 1 ? "₹" : "%",
          ponumber: data.ponumber,
          wupload: null,
          modeofreciept: String(data.modeofreciept),
          couriernamerec: data.couriernamerec,
          dateofdispatchrec: data.dateofdispatchrec
            ? data.dateofdispatchrec.split("-").reverse().join("-")
            : "",

          docketnorec: data.docketnorec,
          localcontactrec: data.localcontactrec,
          rupload: null,
          modeofdispatch: String(data.modeofdispatch),
          couriername: data.couriername,
          dateofdispatch: data.dateofdispatch
            ? data.dateofdispatch.split("-").reverse().join("-")
            : "",

          docketno: data.docketno,
          localcontact: data.localcontact,
          paymentstatus: String(data.paymentstatus),
          modeofpayment: String(data.modeofpayment),
          detailsofpayment: data.detailsofpayment,
          paymentamount: String(data.paymentamount),
          certcollectiondetail: data.certcollectiondetail,
          additionalemail: data.additionalemail,
          certcollectionremark: data.certcollectionremark,
          documents: data.documents,

          specialrequest: data.specialrequest,
          notes: data.notes,
          nablrequired: data.nablrequired,
          calibacc: data.calibacc || "Nabl",
          caliblocation: data.caliblocation || "Lab",
          creditdays: data.creditdays,
          creditamount: data.creditamount,
        });
         
        setCreditInfo({
          days: data.creditdays || 0,
          amount: data.creditamount || 0,
        });
        setSelectedConcernPerson({
          designation: data.concernpersondesignation,
          email: data.concernpersonemail,
          mobile: data.concernpersonmobile,
        });
        fetchConcernPersons(data.customerid);
        fetchQuotations(data.customerid);
        fetchCustomerAddresses(data.customername, "report");
        fetchCustomerAddresses(data.billingname, "billing");
      } catch (error) {
        toast.error("Error loading inward entry");
        console.error(error);
      }
    };
    fetchDropdowns();
    fetchInwardEntry();
  }, [id]);
   
   
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
   // Handle select change
  const handleSelectChange = (option, name) => {
    setFormData((prev) => ({ ...prev, [name]: option?.value || "" }));
    if (name === "customerid" && option) {
      setCreditInfo({
        days: option.creditdays || 0,
        amount: option.creditamount || 0,
      });
      setFormData((prev) => ({
        ...prev,
        gstno: option.gstno || "",
      }));
      fetchConcernPersons(option.value);
      fetchQuotations(option.value);
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
  // date comvet
  function convertToInputDateFormat(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    // Return in YYYY-MM-DD format
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
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
      }
    } catch (err) {
      toast.error("Failed to fetch concern person details");
      console.error(err);
    }
  };
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
    try {
      const form = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          form.append(key, formData[key]);
        }
      }
      for (let pair of form.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      //  console.log("Submitting Form Data:");
      //     for (let pair of form.entries()) {
      //       console.log(`${pair[0]}: ${pair[1]}`);
      //     }
      const res = await axios.post(
        `/calibrationprocess/update-inward-entry/${id}`,
        form,
      );
      if (
        String(res.data.status) === "true" ||
        String(res.data.status) === "1"
      ) {
        toast.success("Inward Entry Updated ✅", {
          duration: 1200,
          icon: "✅",
        });
        navigate("/dashboards/calibration-process/inward-entry-lab");
      } else {
        toast.error(res.data.message || "Failed to update entry ❌");
      }
    } catch (err) {
      console.error("Error updating inward entry:", err);
      toast.error(err?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page title="Edit Inward Entry">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Edit Inward Entry
          </h2>
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
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {/* First Column */}
          <div className="space-y-4">
            <h3>SERVICE REQUESTOR</h3>
            <div>
              <Input
                label="Date"
                name="inwarddate"
                type="date"
                value={
                  formData.inwarddate
                    ? convertToInputDateFormat(formData.inwarddate)
                    : ""
                }
                onChange={handleChange}
              />
            </div>

            <div>
              <Input
                label="Sample Received Date"
                name="sample_received_on"
                type="date"
                value={
                  formData.sample_received_on
                    ? convertToInputDateFormat(formData.sample_received_on)
                    : ""
                }
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Customer Type</label>
              <ReactSelect
                name="ctype"
                options={customerTypeOptions}
                value={
                  customerTypeOptions.find(
                    (opt) => opt.value === Number(formData.ctype),
                  ) || null
                }
                onChange={(option) => handleSelectChange(option, "ctype")}
                placeholder="Select Customer Type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Customer</label>
              <ReactSelect
                name="customerid"
                options={customerOptions}
                value={
                  customerOptions.find(
                    (opt) => opt.value === Number(formData.customerid),
                  ) || null
                }
                onChange={(option) => handleSelectChange(option, "customerid")}
                placeholder="Select Customer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Specific Purpose
              </label>
              <ReactSelect
                name="specificpurpose"
                options={specificPurposeOptions}
                value={
                  specificPurposeOptions.find(
                    (opt) => opt.value === Number(formData.specificpurpose),
                  ) || null
                }
                onChange={(option) =>
                  handleSelectChange(option, "specificpurpose")
                }
                placeholder="Select Purpose"
              />
            </div>

            {id && (
              <div>
                <p className="text-sm font-medium">
                  <strong>Customer Credit:</strong> {creditInfo.days || 0} Days
                  | ₹ {creditInfo.amount || 0}
                </p>
              </div>
            )}

            {/* Certificate Type */}

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
                    value={
                      customerOptions.find(
                        (opt) => opt.value === Number(formData.reportname),
                      ) || null
                    }
                    onChange={(option) =>
                      handleSelectChange(option, "reportname")
                    }
                    placeholder="Select Customer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Customer Address
                  </label>
                  <ReactSelect
                    name="reportaddress"
                    options={reportAddressOptions}
                    value={
                      reportAddressOptions.find(
                        (opt) => opt.value === Number(formData.reportaddress),
                      ) || null
                    }
                    onChange={(option) =>
                      setFormData((prev) => ({
                        ...prev,
                        reportaddress: option?.value || "",
                      }))
                    }
                    placeholder="Select Address"
                    isDisabled={reportAddressOptions.length === 0}
                  />
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
                        (opt) => opt.value === Number(formData.billingname),
                      ) || null
                    }
                    onChange={(option) =>
                      handleSelectChange(option, "billingname")
                    }
                    placeholder="Select Customer"
                  />
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
                        (opt) => opt.value === Number(formData.billingaddress),
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
                </div>
                <div>
                  <Input
                    label="GST No"
                    name="gstno"
                    value={formData.gstno}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  type="hidden"
                  name="customeraddress"
                  value={formData.customeraddress}
                  onChange={handleChange}
                />
                <Input
                  type="hidden"
                  name="customername"
                  value={formData.customername}
                  onChange={handleChange}
                />
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
                    value={
                      concernPersonOptions.find(
                        (opt) =>
                          opt.value === Number(formData.concernpersonname),
                      ) || null
                    }
                    onChange={(option) =>
                      handleSelectChange(option, "concernpersonname")
                    }
                    placeholder="Select Concern Person"
                  />
                </div>
                {formData.concernpersonname && (
                  <>
                    <Input
                      label="Concern Person Designation"
                      name="concern_designation"
                      value={selectedConcernPerson.designation}
                      disabled
                    />
                    <Input
                      label="Concern Person Email"
                      name="concern_email"
                      value={selectedConcernPerson.email}
                      disabled
                    />
                    <Input
                      label="Concern Person Mobile"
                      name="concern_mobile"
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
            <div>
              <label className="block text-sm font-medium">
                Additional Email Ids
              </label>
              <textarea
                name="additionalemail"
                value={formData.additionalemail}
                onChange={(e) =>
                  setFormData({ ...formData, additionalemail: e.target.value })
                }
                className="w-full rounded border px-3 py-2"
                placeholder="Comma separated additional emails"
              ></textarea>
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
                placeholder="Any Special Request"
              ></textarea>
            </div>
          </div>
          {/* Second Column */}
          <div className="space-y-4" style={{ marginTop: "7%" }}>
            {/* Quotation NO*/}
            <div>
              <label className="block text-sm font-medium">Quotation No</label>
              <ReactSelect
                name="quotationid"
                options={quotationOptions}
                value={
                  quotationOptions.find(
                    (opt) => opt.value === Number(formData.quotationid),
                  ) || null
                }
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
            {/* Concerned */}
            <div>
              <label className="block text-sm font-medium">Concerned BD</label>
              <ReactSelect
                name="bd"
                options={bdOptions}
                value={
                  bdOptions.find((opt) => opt.value === Number(formData.bd)) ||
                  null
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
            </div>
            <div>
              <label className="block text-sm font-medium">Promoter</label>
              <ReactSelect
                name="promoter"
                options={promoterOptions}
                value={
                  promoterOptions.find(
                    (opt) => opt.value === Number(formData.promoter),
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
                    (opt) => opt.value === Number(formData.priority),
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
            </div>
            <div>
              <label className="block text-sm font-medium">Approved By</label>
              <ReactSelect
                name="approval"
                options={approvedByOptions}
                value={
                  approvedByOptions.find(
                    (opt) => opt.value === Number(formData.approval),
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
                value={formData.pchargestype}
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
            {/* Work Order No */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Work Order No
              </label>
              <input
                type="text"
                name="ponumber"
                value={formData.ponumber}
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
            {/* Work Order Upload */}
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
            {/* Mode Of Receipt Dropdown */}
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
                    // value={formData.dateofdispatchrec}
                    value={
                      formData.dateofdispatchrec
                        ? convertToInputDateFormat(formData.dateofdispatchrec)
                        : ""
                    }
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
            {/* Receipt Doc Upload */}
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
                value={formData.modeofdispatch}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    modeofdispatch: e.target.value,
                  }))
                }
                required
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
                    value={formData.couriername}
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
                    // value={formData.dateofdispatch}
                    value={
                      formData.dateofdispatch
                        ? convertToInputDateFormat(formData.dateofdispatch)
                        : ""
                    }
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
                    value={Number(formData.docketno)}
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
                    value={formData.localcontact}
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
                value={Number(formData.paymentstatus)}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              >
                <option value="2">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            {formData.paymentstatus === "1" && (
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Mode of Payment
                </label>
                <select
                  name="modeofpayment"
                  value={formData.modeofpayment}
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
            <div className="mt-8 space-y-6">
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
            </div>
            <div className="mt-8 space-y-6">
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
                <Input
                  label="Any Deadline"
                  name="deadline"
                  type="date"
                  value={
                    formData.deadline
                      ? convertToInputDateFormat(formData.deadline)
                      : ""
                  }
                  onChange={handleChange}
                  required
                />
              </div>

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
          <div className="col-span-1 md:col-span-2">
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin text-white"
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
                "Update "
              )}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}
