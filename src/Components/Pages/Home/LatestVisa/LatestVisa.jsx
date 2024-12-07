import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisaCard from "../../../Cards/VisaCard";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
const LatestVisas = () => {
  const [visas, setVisas] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(AuthContext);
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
    <section
      className={`container mx-auto my-10 ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-8">
        Latest Visa visas
      </h2>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visas.map((visa) => (
          <VisaCard key={visa._id} visa={visa} />
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/all-visas")}
          className="px-4 py-2 rounded-lg font-semibold btn bg-primary/[130] text-white"
        >
          See All Visas
        </button>
      </div>
    </section>
  );
};

export default LatestVisas;
