import { useState, useEffect } from "react";
import VisaCard from "../../Cards/VisaCard";

const AllVisa = () => {
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("http://localhost:5000/Visa")
      .then((response) => response.json())
      .then((data) => {
        setVisas(data);
        setFilteredVisas(data);
      })
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "All") {
      setFilteredVisas(visas);
    } else {
      const filtered = visas.filter(
        (visa) => visa.visaType.toLowerCase() === selectedFilter.toLowerCase()
      );
      setFilteredVisas(filtered);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4 text-primary">
        All Visas
      </h1>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-8">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="select select-bordered font-medium text-lg w-fit mx-auto"
        >
          <option value="All">All Visa Types</option>
          <option value="Tourist Visa">Tourist Visa</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Official Visa">Official Visa</option>
        </select>
      </div>

      {filteredVisas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVisas.map((visa) => (
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
