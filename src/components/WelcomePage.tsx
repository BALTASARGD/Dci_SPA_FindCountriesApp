import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/countries");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl text-blue-900 font-bold">Welcome to Find Your Country</h1>
      <p className="text-xl text-blue-700 mt-4">Loading...</p>
    </div>
  );
};

export default WelcomePage;

