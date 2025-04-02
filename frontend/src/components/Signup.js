import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";
import "../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Name: "",
    DateOfBirth: "",
    Phone: "",
    Address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await signup(formData);
      alert("Signup successful! Please log in.");
      navigate("/");
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      <input
        type="text"
        name="Username"
        placeholder="Username"
        onChange={handleChange}
        className="signup-input"
      />
      <input
        type="email"
        name="Email"
        placeholder="Email"
        onChange={handleChange}
        className="signup-input"
      />
      <input
        type="password"
        name="Password"
        placeholder="Password"
        onChange={handleChange}
        className="signup-input"
      />
      <input
        type="text"
        name="Name"
        placeholder="Full Name"
        onChange={handleChange}
        className="signup-input"
      />
      <input
        type="date"
        name="DateOfBirth"
        onChange={handleChange}
        className="signup-input"
      />
      <input
        type="text"
        name="Phone"
        placeholder="Phone"
        onChange={handleChange}
        className="signup-input"
      />
      <input
        type="text"
        name="Address"
        placeholder="Address"
        onChange={handleChange}
        className="signup-input"
      />
      <button className="signup-button" onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;