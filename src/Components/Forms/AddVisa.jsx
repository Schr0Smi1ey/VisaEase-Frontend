import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";

const AddVisa = () => {
  const [visaData, setVisaData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
    addedBy: "",
  });
  const { user } = useContext(AuthContext);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setVisaData((prevData) => ({
        ...prevData,
        requiredDocuments: checked
          ? [...prevData.requiredDocuments, value]
          : prevData.requiredDocuments.filter((doc) => doc !== value),
      }));
    } else {
      setVisaData({ ...visaData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    visaData.addedBy = user.email;
    console.log(visaData);
    fetch("http://localhost:5000/Visa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visaData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Visa added successfully!");
        setVisaData({
          countryImage: "",
          countryName: "",
          visaType: "",
          processingTime: "",
          requiredDocuments: [],
          description: "",
          ageRestriction: "",
          fee: "",
          validity: "",
          applicationMethod: "",
          addedBy: "",
        });
      })
      .catch(() => toast.error("Error adding visa. Please try again."));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Add Visa
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto"
      >
        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="countryImage"
          >
            Country Image URL
          </label>
          <input
            type="url"
            id="countryImage"
            name="countryImage"
            placeholder="Enter image URL"
            value={visaData.countryImage}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="countryName"
          >
            Country Name
          </label>
          <input
            type="text"
            id="countryName"
            name="countryName"
            placeholder="Enter country name"
            value={visaData.countryName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="visaType"
          >
            Visa Type
          </label>
          <select
            id="visaType"
            name="visaType"
            value={visaData.visaType}
            onChange={handleInputChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled="true">
              Select Visa Type
            </option>
            <option value="Tourist visa">Tourist Visa</option>
            <option value="Student visa">Student Visa</option>
            <option value="Official visa">Official Visa</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="processingTime"
          >
            Processing Time
          </label>
          <input
            type="text"
            id="processingTime"
            name="processingTime"
            placeholder="e.g., 5-7 business days"
            value={visaData.processingTime}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Required Documents
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Valid passport"
                onChange={handleInputChange}
                className="checkbox"
              />
              Valid Passport
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Visa application form"
                onChange={handleInputChange}
                className="checkbox"
              />
              Visa Application Form
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Recent passport-sized photograph"
                onChange={handleInputChange}
                className="checkbox"
              />
              Recent Passport-Sized Photograph
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide details about the visa"
            value={visaData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="ageRestriction"
          >
            Age Restriction
          </label>
          <input
            type="number"
            id="ageRestriction"
            name="ageRestriction"
            placeholder="Enter minimum age"
            value={visaData.ageRestriction}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="fee">
            Visa Fee
          </label>
          <input
            type="number"
            id="fee"
            name="fee"
            placeholder="Enter fee amount"
            value={visaData.fee}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="validity"
          >
            Validity Period
          </label>
          <input
            type="text"
            id="validity"
            name="validity"
            placeholder="e.g., 1 year"
            value={visaData.validity}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="applicationMethod"
          >
            Application Method
          </label>
          <input
            type="text"
            id="applicationMethod"
            name="applicationMethod"
            placeholder="e.g., Online"
            value={visaData.applicationMethod}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4 text-white font-bold"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisa;
