import React from "react";
import BD_Airlines from "../../../../assets/BD_Airlines.png";
import US_Bangla_Airlines from "../../../../assets/US_Bangla.jpg";
import Novo_Air from "../../../../assets/novo_air.jpg";
import Air_Astra from "../../../../assets/Airstra.png";
import Emirates from "../../../../assets/Emirates.png";
import Singapore_Airlines from "../../../../assets/Singapore_airlines.png";
import Turkish_Airlines from "../../../../assets/Turkish_airlines.jpg";
import Qatar_Airways from "../../../../assets/Qatar_airways.png";
import Malaysia_Airlines from "../../../../assets/Malaysia_Airlines.jpg";
import Etihad_Airways from "../../../../assets/Etihad_airways.jpg";
import Cathay_Pacific_Airways from "../../../../assets/Cathay_Pacific_Airways.jpg";
const Airlines = () => {
  // Mock data for airlines
  const airlines = [
    {
      id: 1,
      name: "Biman Bangladesh Airlines",
      logo: BD_Airlines,
    },
    {
      id: 2,
      name: "US-Bangla Airlines",
      logo: US_Bangla_Airlines,
    },
    {
      id: 3,
      name: "NOVOAIR",
      logo: Novo_Air,
    },
    {
      id: 4,
      name: "Air Astra",
      logo: Air_Astra,
    },
    {
      id: 5,
      name: "Emirates",
      logo: Emirates,
    },
    {
      id: 6,
      name: "Singapore Airlines",
      logo: Singapore_Airlines,
    },
    {
      id: 7,
      name: "Turkish Airlines",
      logo: Turkish_Airlines,
    },
    {
      id: 8,
      name: "Qatar Airways",
      logo: Qatar_Airways,
    },
    {
      id: 9,
      name: "Malaysia Airlines",
      logo: Malaysia_Airlines,
    },
    {
      id: 10,
      name: "Etihad Airways",
      logo: Etihad_Airways,
    },
    {
      id: 11,
      name: "Cathay Pacific Airways",
      logo: Cathay_Pacific_Airways,
    },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          Search Top Airlines
        </h2>
        <p className="text-gray-600 mb-8">
          Our user-friendly platform connects you to top airlines instantly.
          Enjoy a comfortable and hassle-free journey!
        </p>

        {/* Airline Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-6">
          {airlines.map((airline) => (
            <div
              key={airline.id}
              className="flex items-center justify-between bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex items-center">
                <img
                  src={airline.logo}
                  alt={airline.name}
                  className="w-16 h-16 mr-4 rounded-full"
                />
                <span className="text-gray-800 font-medium">
                  {airline.name}
                </span>
              </div>
              <span className="text-primary text-lg font-bold">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Airlines;
