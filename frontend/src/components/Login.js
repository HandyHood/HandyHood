import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import "../styles/Login.css"; 

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      setUser({ userId: res.data.userId, email: res.data.email });
      navigate("/tasks");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p className="login-text">
        Don't have an account?{" "}
        <button className="login-link-button" onClick={handleSignupRedirect}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;