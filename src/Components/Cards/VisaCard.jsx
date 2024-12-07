import { Link } from "react-router-dom";
import { FiType } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
const VisaCard = ({ visa }) => {
  const {
    countryImage,
    countryName,
    visaType,
    fee,
    validity,
    processingTime,
    applicationMethod,
  } = visa;
  return (
    <div className="card shadow-lg rounded-lg border border-gray-200">
      <img
        src={countryImage}
        alt={`${countryName} Visa`}
        className="rounded-t-lg object-cover h-3/4"
      />
      <div className="p-4 flex flex-col">
        <h2 className="text-xl font-semibold text-primary mb-2">
          {countryName}
        </h2>
        <div className="flex-grow mt-3">
          <p className="flex items-center gap-2 text-gray-700">
            <FiType className="text-green-500 text-xl" />
            <strong className="text-gray-900">Visa Type:</strong> {visaType}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <BiTimeFive className="inline-block text-blue-500 text-xl" />
            <strong> Processing Time:</strong> {processingTime}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <RiMoneyDollarCircleLine className="inline-block text-green-600 text-xl" />
            <strong> Fee:</strong> ${fee}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <BsCalendarCheck className="inline-block text-purple-500 text-xl" />
            <strong> Validity:</strong> {validity}
          </p>
          <p className="flex flex-wrap items-center gap-2 text-gray-700">
            <FaClipboardList className="inline-block text-teal-500 text-xl" />
            <strong> Application Method:</strong> {applicationMethod}
          </p>
        </div>
        <div className="mt-3">
          <Link
            to={`/visa-details/${visa._id}`}
            className="btn btn-primary w-full text-white font-semibold"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
