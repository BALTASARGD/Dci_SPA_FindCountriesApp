import axios from "axios";

const ALL_COUNTRIES_API_URL = "https://restcountries.com/v3.1/all";

export async function getCountries(continent: string = "") {
  try {
    const response = await axios.get(ALL_COUNTRIES_API_URL);
    const countries: any[] = response.data as any[];

    if (continent) {
      return countries.filter((country: any) => country.region === continent);
    }

    return countries;
  } catch (error) {
    console.error("Error getting countries:", error);
    return [];
  }
}

const API_URL = "https://restcountries.com/v3.1/alpha/";

export async function getCountryDetails(code: string) {
  try {
    const response = await axios.get(`${API_URL}${code}`);
    const country = (response.data as any[])[0];

    const countryDetails = {
      name: country.name.common,
      nativeName: country.name.nativeName
        ? country.name.nativeName[Object.keys(country.name.nativeName)[0]]
            .common
        : "N/A",
      capital: country.capital ? country.capital[0] : "N/A",
      population: country.population,
      area: country.area,
      flag: country.flags.png, // Asegúrate de que la URL de la bandera esté correcta
      currencies: country.currencies
        ? Object.values(country.currencies)
            .map((currency: any) => currency.name)
            .join(", ")
        : "N/A",
      languages: country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A",
      region: country.region,
      subregion: country.subregion,
      latlng: country.latlng || [0, 0], // Ensure latlng is included
    };

    return countryDetails;
  } catch (error) {
    console.error("Error getting country details", error);
    return null;
  }
}
