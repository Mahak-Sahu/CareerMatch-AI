import React, { useState } from "react";
import axios from "axios";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
  alert("Please fill all details ⚠️");
  return;
}
const nameRegex = /^[A-Za-z][A-Za-z ]*$/;

if (!nameRegex.test(name)) {
  alert("Name must start with alphabet and contain only letters ⚠️");
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
        "http://localhost:8080/api/auth/signup",
        {
          name,
          email,
          password
        }
      );

      alert("Signup Successful 🚀");

    } catch (error) {

      console.log(error);

      alert("Signup Failed ❌");
    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md p-10 rounded-3xl border border-green-500/30 bg-white/5 backdrop-blur-lg shadow-[0_0_40px_rgba(0,255,150,0.15)]">

        {/* Heading */}

        <h1 className="text-5xl leading-[1.4] font-extrabold text-center mb-10 bg-gradient-to-r from-green-300 to-blue-500 bg-clip-text text-transparent">
          Sign Up
        </h1>

        {/* Form */}

        <form onSubmit={handleSignup} className="space-y-6">

          {/* Name */}

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 outline-none focus:border-green-400 transition"
          />

          {/* Email */}

          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 outline-none focus:border-green-400 transition"
          />

          {/* Password */}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-5 rounded-2xl bg-black/40 border border-gray-700 text-white placeholder-gray-400 outline-none focus:border-green-400 transition"
          />

          {/* Button */}

          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-400 to-cyan-500 text-white text-2xl font-bold hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(0,255,150,0.35)]"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;