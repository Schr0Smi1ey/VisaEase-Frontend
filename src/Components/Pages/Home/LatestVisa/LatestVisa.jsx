import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const LatestVisas = () => {
  const [visas, setVisas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/Visa")
      .then((res) => res.json())
      .then((data) => {
        const latestVisas = [...data].reverse().slice(0, 6);
        setVisas(latestVisas);
      })
      .catch((err) => console.error("Error fetching visas:", err));
  }, []);

  return (
    <section className="container mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Latest Visa Applications
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <div
            key={visa._id}
            className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition"
          >
            <img
              src={visa.countryImage}
              alt={visa.country}
              className="w-full h-1/2 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{visa.country}</h3>
            <p className="text-gray-600">Visa Type: {visa.visa_type}</p>
            <p className="text-gray-600">
              Processing Time: {visa.processing_time}
            </p>
            <p className="text-gray-600">Fee: ${visa.fee}</p>
            <p className="text-gray-600">Validity: {visa.validity} months</p>
            <p className="text-gray-600">
              Application Method: {visa.application_method}
            </p>
            <button
              onClick={() => navigate(`/visa-details/${visa._id}`)}
              className="btn bg-green-500 text-white mt-4 w-full hover:bg-green-600"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/all-visas")}
          className="btn bg-blue-500 text-white px-6 py-2 hover:bg-blue-600"
        >
          See All Visas
        </button>
      </div>
    </section>
  );
};

export default LatestVisas;
