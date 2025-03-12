import * as React from "react";
import { useState, useEffect } from "react";
import { getCountries } from "../api";
import { useNavigate } from "react-router-dom";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [continent, setContinent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, continent]);

  const fetchCountries = async () => {
    const countries = await getCountries(continent);
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCountries(filteredCountries);
  };

  const navigateTo = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <header className="top-0 left-0 w-full flex flex-col items-center justify-center gap-4 p-5 bg-gray-100 shadow-md z-50 h-32 md:flex-row md:gap-10 md:p-10">
        <h1 className="text-4xl text-blue-900 font-bold md:text-6xl">🌍 Countries of the World</h1>
        <div className="search-container flex flex-col items-center gap-2 md:flex-row md:gap-4">
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
        </div>
      </header>
      <div id="countries-container" className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {countries.map((country) => (
          <div key={country.cca3} className="country">
            <h1 className="text-2xl font-bold mb-2 text-blue-custom">{country.name.common}</h1>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="w-full h-48 object-cover rounded-md mb-4" />
            <p className="text-blue-custom"><strong>Region:</strong> {country.region}</p>
            <p className="text-blue-custom"><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p className="text-blue-custom"><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
            <button
              onClick={() => navigateTo(`/country?code=${country.cca3}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;