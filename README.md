# Find Your Country App

This project is a Single Page Application (SPA) built with React, TypeScript, and Vite. The application allows users to search for countries, filter them by continent, and view detailed information about each country. The app uses the REST Countries API to fetch country data and the Unsplash API to fetch images.

## Features

- **Search Functionality**: Users can search for countries by name.
- **Continent Filter**: Users can filter countries by continent.
- **Country Details**: View detailed information about a country, including its flag, population, region, subregion, capital, and more.
- **Map Modal**: View the location of the country on a map.
- **History Modal**: View a brief history of the country.
- **Responsive Design**: The application is responsive and works well on different screen sizes.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **REST Countries API**: An API to get information about countries.
- **Unsplash API**: An API to get images from Unsplash.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-github-username/FindYourCountryApp.git
    cd FindYourCountryApp
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your Unsplash API key:
    ```env
    VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    ```

5. **Build for production**:
    ```sh
    npm run build
    ```

## Project Structure

The project structure is as follows:

```
/src
  /components
    - CountryDetails.tsx
    - CountryList.tsx
    - HistoryModal.tsx
    - MapModal.tsx
    - WelcomePage.tsx
  /api.tsx
  /main.tsx
  /router.tsx
  /style.css
/.env
/index.html
/README.md
```

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request. We welcome all contributions!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
