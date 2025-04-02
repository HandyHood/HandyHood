import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/Users";
import Tasks from "./components/Tasks";
import Home from "./components/Home"; 

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/tasks" /> : <Login setUser={setUser} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/tasks"
          element={user ? <Tasks /> : <Navigate to="/" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="/" />}
        />
        <Route
          path="/home"
          element={<Home user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
};

export default App;