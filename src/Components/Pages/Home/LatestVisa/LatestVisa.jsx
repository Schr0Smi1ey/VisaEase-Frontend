import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisaCard from "../../../Cards/VisaCard";
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
      <h2 className="text-3xl font-bold text-center mb-8">Latest Visa visas</h2>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <VisaCard key={visa._id} visa={visa} />
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
