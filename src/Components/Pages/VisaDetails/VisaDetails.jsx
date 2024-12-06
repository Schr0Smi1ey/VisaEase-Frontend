import { useState, useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FiType } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
const VisaDetails = () => {
  const visaData = useLoaderData();
  const { user, Toast } = useContext(AuthContext);
  console.log(visaData);
  const [visa, setVisa] = useState(visaData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    appliedDate: new Date().toISOString().split("T")[0],
    fee: visaData.fee || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleApply = async (e) => {
    e.preventDefault();
    const { _id, ...visaWithoutId } = visa;
    const applicationData = {
      ...formData,
      ...visaWithoutId,
    };
    fetch("http://localhost:5000/Applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => {
        if (res.ok) {
          Toast("Application submitted successfully", "success");
          setIsModalOpen(false);
        } else {
          Toast("Failed to submit application", "error");
        }
      })
      .catch((error) => {
        Toast(error.message, "error");
      });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6 text-primary">
        {visa.countryName} Visa Details
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <img
          src={visa.countryImage}
          alt={`${visa.countryName}`}
          className="rounded-lg w-[60%] mx-auto object-cover mb-4 border-2 border-gray-100"
        />
        <div className="max-w-2xl mx-auto w-fit space-y-2">
          <p className="flex items-center gap-4 text-gray-700">
            <FiType className="text-green-500 text-xl" />
            <strong className="text-gray-900">Visa Type:</strong>{" "}
            {visa.visaType}
          </p>
          <p className="flex items-center gap-4 text-gray-700">
            <BiTimeFive className="text-blue-500 text-xl" />
            <strong className="text-gray-900">Processing Time:</strong>{" "}
            {visa.processingTime}
          </p>
          <p className="flex items-center gap-4 text-gray-700">
            <AiOutlineFileText className="text-indigo-500 text-xl" />
            <strong className="text-gray-900">Required Documents:</strong>{" "}
            {visa.requiredDocuments.join(", ")}
          </p>
          <p className="flex items-center gap-4 text-gray-700">
            <MdDescription className="text-yellow-500 text-xl" />
            <strong className="text-gray-900">Description:</strong>{" "}
            {visa.description}
          </p>
          <p className="flex items-center gap-4 text-gray-700">
            <FaBirthdayCake className="text-pink-500 text-xl" />
            <strong className="text-gray-900">Age Restriction:</strong>{" "}
            {visa.ageRestriction} years
          </p>
          <p className="flex items-center gap-4 text-gray-700">
            <RiMoneyDollarCircleLine className="text-green-600 text-xl" />
            <strong className="text-gray-900">Fee:</strong> ${visa.fee}
          </p>
          <p className="flex items-center gap-4 text-gray-700">
            <BsCalendarCheck className="text-purple-500 text-xl" />
            <strong className="text-gray-900">Validity:</strong> {visa.validity}
          </p>
          <p className="flex items-center gap-4 text-gray-700">
            <HiOutlineMail className="text-teal-500 text-xl" />
            <strong className="text-gray-900">Application Method:</strong>{" "}
            {visa.applicationMethod}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex mx-auto px-4 py-2 bg-primary text-white rounded-md mt-8 hover:bg-primary-dark transition"
        >
          Apply for the Visa
        </button>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Apply for {visa.countryName} Visa
            </h2>
            <form onSubmit={handleApply}>
              <div className="mb-4">
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Applied Date</label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Fee</label>
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1 rounded-lg bg-red-600 text-white text-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded-lg bg-green-600 text-white text-lg font-semibold"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
