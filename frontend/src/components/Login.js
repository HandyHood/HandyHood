import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = ({ setUser }) => {
  // Update prop to setUser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      setUser({ userId: res.data.userId, email: res.data.email }); // Store user info
      navigate("/tasks"); // Redirect to Tasks page
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
