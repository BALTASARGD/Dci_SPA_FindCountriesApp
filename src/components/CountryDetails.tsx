import * as React from "react";
import { useEffect, useState } from "react";
import * as L from "leaflet";
import axios from "axios";
import { getCountryDetails } from "../api";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css"; 
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
  const location = useLocation();

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

    const map = L.map("map").setView([country.latlng[0], country.latlng[1]], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    L.marker([country.latlng[0], country.latlng[1]])
      .addTo(map)
      .bindPopup(
        `<b>${country.name}</b><br>${
          country.capital ? country.capital : "No capital"
        }`
      )
      .openPopup();

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
      { type: "Accommodation", icon: "fas fa-hotel", query: "hotels" },
      { type: "Restaurants", icon: "fas fa-utensils", query: "restaurants" },
      {
        type: "Entertainment",
        icon: "fas fa-theater-masks",
        query: "entertainment",
      },
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
    <div>
      <header
        id="country-header"
        className="fixed top-0 left-0 h-screen flex flex-col items-center justify-center gap-4 p-5 bg-green-900 text-white shadow-md z-50 w-64"
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
        className="fixed top-0 right-0 h-screen flex flex-col items-center justify-start gap-4 p-5 bg-green-900 text-white shadow-md z-50 w-64"
      >
        <div className="flex items-center justify-center w-full mb-10">
          <h2 className="text-2xl text-white font-bold">Places of Interest</h2>
        </div>
        <div className="flex flex-col items-start gap-4 w-full">
          {places.map((place) => (
            <a
              key={place.type}
              href={`https://www.google.com/search?q=${place.query}+in+${country.name}`}
              target="_blank"
              className="flex items-center gap-2 text-white hover:text-gray-300 w-full p-2 rounded-md hover:bg-green-700"
            >
              <i className={`${place.icon} text-2xl`}></i>
              <span>{place.type}</span>
            </a>
          ))}
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <div>
            <p
              id="country-description"
              className="mb-10 text-xl text-[#02048b]"
            >
              {description}
            </p>
            <p>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
            <p>
              <strong>Subregion:</strong> {country.subregion}
            </p>
            <p>
              <strong>Capital:</strong> {country.capital}
            </p>
          </div>
          <div id="map" className="h-96 w-full"></div> {}
        </div>
        <a
          href="/countries"
          className="back-link inline-block mt-10 text-blue-500 hover:text-blue-700"
        >
          <i className="fas fa-arrow-left text-2xl mr-2"></i>
          Back
        </a>
      </div>
    </div>
  );
};

export default CountryDetails;
