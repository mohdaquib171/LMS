import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken, isUserSessionValid } from "../utils/token";
import ModalManager from "./ModalManager";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect logged-in users to the dashboard
    if (getUserToken() && isUserSessionValid()) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col justify-center items-center text-white">
      <header className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">
          Discover Your Next Read!
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Sign up now to explore a world of knowledge.
        </p>
        <ModalManager />
      </header>
    </div>
  );
};

export default LandingPage;
