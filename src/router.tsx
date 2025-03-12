import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/countries" element={<CountryList />} />
        <Route path="/country" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
