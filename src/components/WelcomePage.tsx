import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../api";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [continent, setContinent] = useState("");
  const [countries, setCountries] = useState<any[]>([]);

  const fetchCountries = async () => {
    const countries = await getCountries(continent);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCountries(filteredCountries);
    navigate(`/countries?search=${searchTerm}&continent=${continent}`, { state: { countries: filteredCountries } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl text-blue-900 font-bold">Welcome to Find Your Country</h1>
      <div className="search-container flex flex-col items-center gap-2 md:flex-row md:gap-4 mt-8">
        <input
          type="text"
          id="search"
          placeholder="Search for a country..."
          className="p-2 border rounded w-full md:w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          id="continent-filter"
          className="p-2 border rounded w-full md:w-auto"
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
        >
          <option value="">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <button
          onClick={fetchCountries}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;

