import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/"); // Redirect to login after logout
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="home-container">
      <h1 className="home-header">HandyHood</h1>
      {user && (
        <button className="home-button" onClick={handleLogout}>
          Logout
        </button>
      )}
      {!user && (
        <button className="home-button" onClick={handleSignupRedirect}>
          Sign Up
        </button>
      )}
    </div>
  );
};

export default Home;