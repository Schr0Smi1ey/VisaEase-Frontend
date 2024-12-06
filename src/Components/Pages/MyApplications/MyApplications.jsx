import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FiType } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { BsCalendar } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { FaUserAlt, FaClipboardList } from "react-icons/fa";

const MyVisaApplications = () => {
  const { user, Toast } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  // Fetch applications for the logged-in user
  useEffect(() => {
    fetch(`http://localhost:5000/Applications`)
      .then((response) => response.json())
      .then((data) => {
        console.log(user.email);
        const userApplications = data.filter(
          (application) => application.email === user.email
        );
        setApplications(userApplications);
      })
      .catch((error) => console.error("Error fetching applications:", error));
  }, [user.email]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Handle Cancel Application
  const handleCancel = (applicationId) => {
    console.log(applicationId);
    fetch(`http://localhost:5000/Applications/${applicationId}`, {
      method: "DELETE",
    })
      .then((result) => {
        console.log(result);
        Toast("Application cancelled successfully", "success");
        setApplications(
          applications.filter(
            (application) => application._id !== applicationId
          )
        );
      })
      .catch((error) => Toast(error.message, "error"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6 text-primary">
        My Visa Applications
      </h1>
      {applications.length === 0 ? (
        <p className="text-lg text-gray-600">
          You have not applied for any visas yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white p-4 rounded-lg shadow-lg text-lg"
            >
              <img
                src={application.countryImage}
                alt={application.country}
                className="w-full border-2 border-e-gray-100 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-xl mb-2">
                {application.countryName}
              </h3>
              <p className="flex items-center gap-4 text-gray-700">
                <FiType className="text-green-500 text-xl" />
                <strong className="text-gray-900">Visa Type:</strong>{" "}
                {application.visaType}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <BiTimeFive className="inline-block text-blue-500 text-xl" />
                <strong> Processing Time:</strong> {application.processingTime}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <RiMoneyDollarCircleLine className="inline-block text-green-600 text-xl" />
                <strong> Fee:</strong> ${application.fee}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <BsCalendarCheck className="inline-block text-purple-500 text-xl" />
                <strong> Validity:</strong> {application.validity}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <FaClipboardList className="inline-block text-teal-500 text-xl" />
                <strong> Application Method:</strong>{" "}
                {application.applicationMethod}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <BsCalendar className="inline text-purple-500 text-xl" />
                <strong> Applied Date:</strong>{" "}
                {new Date(application.appliedDate).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <FaUserAlt className="inline-block text-orange-500 text-xl" />
                <strong> Applicant's Name:</strong>{" "}
                {`${application.firstName} ${application.lastName}`}
              </p>
              <p className="flex items-center gap-4 text-gray-700">
                <HiOutlineMail className="inline-block text-teal-500 text-xl" />
                <strong> Applicant's Email:</strong> {application.email}
              </p>
              <button
                onClick={() => handleCancel(application._id)}
                className="px-3 py-1 bg-red-500 rounded-lg text-white font-semibold mt-4"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVisaApplications;
