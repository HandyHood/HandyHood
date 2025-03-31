import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import Tasks from "./components/Tasks";

const App = () => {
  const [user, setUser] = useState(null); // Store user info instead of token

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div>
        <h1>HandyHood</h1>
        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/tasks" /> : <Login setUser={setUser} />
          }
        />
        <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/" />} />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
