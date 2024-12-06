import { Link } from "react-router-dom";

const VisaCard = ({ visa }) => {
  const { countryImage, countryName, visaType, fee, validity } = visa;
  console.log(visa._id);
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
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Visa Type:</span> {visaType}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Fee:</span> ${fee}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Validity:</span> {validity}
        </p>
        <div className="flex-grow-1">
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
