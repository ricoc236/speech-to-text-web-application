import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("") || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //simiple validation email (will be compared to backend)
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    

    //API call
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include", 
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Login failed");
          return;
        }

        console.log("Login successful:", data);
        navigate("/recorder"); 
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#B6f2d1]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 text-gray-900 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 text-gray-900 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
          <button
            type="submit"
            className="bg-[#85D1DB] hover:bg-[#20626b] text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
