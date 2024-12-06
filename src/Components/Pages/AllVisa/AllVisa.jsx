import { useState, useEffect } from "react";
import VisaCard from "../../Cards/VisaCard";

const AllVisa = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    // Fetch visas from the database
    window.scrollTo(0, 0);
    fetch("http://localhost:5000/Visa")
      .then((response) => response.json())
      .then((data) => setVisas(data))
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        All Visas
      </h1>
      {visas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visas.map((visa) => (
            <VisaCard key={visa.id} visa={visa} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No visas available.</p>
      )}
    </div>
  );
};

export default AllVisa;
