import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import Tasks from "./components/Tasks";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div>
        <h1>HandyHood</h1>
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/tasks" /> : <Login setToken={handleLogin} />} />
        <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/" />} />
        <Route path="/users" element={token ? <Users /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
