import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");

  navigate("/login");
};

  return (

    <nav className="w-full px-8 py-3 flex justify-between items-center border-b border-green-500/20 bg-black/40 backdrop-blur-lg">

      {/* Logo */}

      <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-green-300 to-blue-500 bg-clip-text text-transparent">
        🚀 CareerMatch AI
      </Link>

      {/* Right Side */}
      
      <div className="flex items-center gap-4 relative">

  {/* History Button */}
  <button
    onClick={() => navigate("/dashboard")}
    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition"
  >
    History
  </button>

  {/* Profile Circle */}
  <div className="relative">

    <button
      onClick={() => setOpen(!open)}
      className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-green-400 flex items-center justify-center shadow-lg hover:scale-105 transition"
    >
      <UserCircle size={32} className="text-white" />
    </button>

    {/* Dropdown */}
    {open && (
      <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#111827] border border-cyan-500 shadow-2xl p-4 z-50">

        <p className="text-gray-400 text-sm mb-2">
          Profile
        </p>

        <p className="text-green-400 font-semibold break-all mb-4">
          {userEmail}
        </p>

        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold transition"
        >
          Logout
        </button>

      </div>
    )}

  </div>

</div>

    </nav>
  );
}

export default Navbar;