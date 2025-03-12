import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCountryDetails } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css"; 
import MapModal from "./MapModal";
import HistoryModal from "./HistoryModal";
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

interface Country {
  name: string;
  nativeName: string;
  capital: string;
  population: number;
  area: number;
  flag: string;
  currencies: string;
  languages: string;
  region: string;
  subregion: string;
  latlng: [number, number];
}

const CountryDetails: React.FC = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [places, setPlaces] = useState<any[]>([]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadCountryDetails();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  const loadCountryDetails = async () => {
    const urlParams = new URLSearchParams(location.search);
    const countryCode = urlParams.get("code");

    if (!countryCode) {
      console.error("Error: Country code not found in URL.");
      return;
    }

    const countryDetails = await getCountryDetails(countryCode);
    if (!countryDetails) {
      console.error("Error: Country details not found.");
      return;
    }

    const country: Country = {
      name: countryDetails.name || "Unknown",
      nativeName: countryDetails.nativeName || "Unknown",
      capital: countryDetails.capital || "Unknown",
      population: countryDetails.population || 0,
      area: countryDetails.area || 0,
      flag: countryDetails.flag || "",
      currencies: countryDetails.currencies || "Unknown",
      languages: countryDetails.languages || "Unknown",
      region: countryDetails.region || "Unknown",
      subregion: countryDetails.subregion || "Unknown",
      latlng:
        Array.isArray(countryDetails.latlng) &&
        countryDetails.latlng.length === 2
          ? [countryDetails.latlng[0], countryDetails.latlng[1]]
          : [0, 0], 
    };

    setCountry(country);
    await loadCountryDescription(country.name);

    loadPlacesOfInterest(country.name);
    loadCountryImages(country.name);
  };

  const loadCountryDescription = async (countryName: string) => {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`
      );
      setDescription((response.data as { extract: string }).extract);
    } catch (error) {
      console.error("Error loading country description:", error);
    }
  };

  const loadPlacesOfInterest = (countryName: string) => {
    const placesOfInterest = [
      { type: "History", icon: "fas fa-book", query: "history" },
      { type: "Map", icon: "fas fa-map", query: "map" },
      { type: "Entertainment", icon: "fas fa-theater-masks", query: "entertainment" },
      { type: "Restaurants", icon: "fas fa-utensils", query: "restaurants" },
      { type: "Accommodation", icon: "fas fa-hotel", query: "hotels" },
    ];

    setPlaces(placesOfInterest);
  };

  const loadCountryImages = async (countryName: string) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${countryName}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      setImages((response.data as { results: any[] }).results.slice(0, 6));
    } catch (error) {
      console.error("Error loading country images:", error);
    }
  };

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-900 min-h-screen">
      <header
        id="country-header"
        className="fixed top-0 left-0 h-screen flex flex-col items-center justify-center gap-4 p-5 bg-blue-900 text-white shadow-md z-50 w-48"
      >
        <div className="flex items-center justify-center w-full mb-10">
          <img
            id="country-flag"
            src={country.flag} 
            alt="Country Flag"
            className="w-16 h-8 object-cover rounded-md"
          />
          <h1
            id="country-name"
            className="text-2xl text-white font-bold ml-4"
          >
            {country.name}
          </h1>
        </div>
      </header>
      <aside
        id="places-of-interest"
        className="fixed top-0 right-0 h-screen flex flex-col items-center justify-between gap-4 p-5 bg-blue-900 text-white shadow-md z-50 w-38"
      >
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center justify-center w-full mb-10">
            <h2 className="text-2xl text-white font-bold">Places of Interest</h2>
          </div>
          {places.map((place) => (
            <a
              key={place.type}
              href={place.query === "map" ? "#" : undefined}
              target={place.query === "map" ? "_self" : "_blank"}
              className="flex items-center gap-2 text-white hover:text-gray-300 w-full p-2 rounded-md hover:bg-blue-700"
              onClick={
                place.query === "map"
                  ? () => setIsMapModalOpen(true)
                  : place.query === "history"
                  ? () => setIsHistoryModalOpen(true)
                  : undefined
              }
            >
              <i className={`${place.icon} text-2xl`}></i>
              <span>{place.type}</span>
            </a>
          ))}
        </div>
        <button onClick={() => navigate("/countries", { state: { countries: location.state?.countries, searchTerm: location.state?.searchTerm, continent: location.state?.continent } })} className="mt-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
          <i className="fas fa-arrow-left"></i> Back to List
        </button>
      </aside>
      <div
        id="country-container"
        className="text-center p-5 bg-white shadow-md rounded-md mx-auto w-full mt-24 text-blue-900 max-w-6xl"
      >
        <div
          id="country-images"
          className="w-full mt-12"
        >
          {images.length > 0 && (
            <img
              src={images[currentImageIndex].urls.regular}
              alt={images[currentImageIndex].alt_description}
              className="w-full h-auto rounded-md"
            />
          )}
        </div>
      </div>
      {isMapModalOpen && <MapModal latlng={country.latlng} onClose={() => setIsMapModalOpen(false)} />}
      {isHistoryModalOpen && <HistoryModal description={description} onClose={() => setIsHistoryModalOpen(false)} />}
    </div>
  );
};

export default CountryDetails;
