import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCountries } from "../api";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const continent = searchParams.get("continent") || "All Continents";

  useEffect(() => {
    if (location.state && location.state.countries) {
      setCountries(location.state.countries);
    } else {
      fetchCountries();
    }
  }, [location.state]);

  const fetchCountries = async () => {
    const searchTerm = searchParams.get("search") || "";
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
    <div className="bg-blue-900 min-h-screen">
      <header className="top-0 left-0 w-full flex flex-col items-center justify-center gap-4 p-5 bg-blue-900 text-white shadow-md z-50 h-32 md:flex-row md:gap-10 md:p-10">
        <h1 className="text-4xl text-white font-bold md:text-6xl">{continent}</h1>
      </header>
      <div id="countries-container" className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {countries.map((country) => (
          <div key={country.cca3} className="country bg-blue-700 p-4 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-2 text-white">{country.name.common}</h1>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="w-full h-48 object-cover rounded-md mb-4" />
            <p className="text-white"><strong>Region:</strong> {country.region}</p>
            <p className="text-white"><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p className="text-white"><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
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