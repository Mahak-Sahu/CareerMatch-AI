import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
  alert("Please fill all details ⚠️");
  return;
}

if (!email.endsWith("@gmail.com")) {
  alert("Enter valid Gmail address 📧");
  return;
}

if (password.length < 6) {
  alert("Password must be at least 6 characters 🔒");
  return;
}

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      alert("Login Successful 😎");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      navigate("/");

      console.log(response.data);

    } catch (error) {

      alert("Invalid Credentials ❌");

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-green-400/20 rounded-3xl p-10 shadow-[0_0_50px_rgba(74,222,128,0.15)]">

        <h1 className="text-5xl leading-[1.4] font-extrabold text-center mb-8 bg-gradient-to-r from-green-300 to-blue-500 bg-clip-text text-transparent">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">

          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl bg-black/40 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 to-cyan-500 text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.35)]"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;