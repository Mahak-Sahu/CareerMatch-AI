import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roadmapsData } from "../data/roadmapsData";

function RoadmapsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

const categories = [
  "All",
  ...new Set(roadmapsData.map((skill) => skill.category))
];
const filteredSkills = roadmapsData.filter((skill) => {
  const matchesSearch =
    skill.name.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    skill.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate("/")}
          className="mb-8 px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
        >
          ← Back To Home
        </button>

        <h1 className="text-6xl leading-[1.3] font-bold text-center mb-4 bg-gradient-to-r from-green-300 to-cyan-400 text-transparent bg-clip-text">
    🚀 Career Accelerator
</h1>

<p className="text-center text-gray-400">
  Master in-demand skills, build projects, and accelerate your software engineering career.
</p>

<div className="flex justify-center gap-8 mb-8 mt-8">

  <div className="w-24 h-20 bg-white/5 rounded-3xl border border-cyan-500/20 flex flex-col items-center justify-center">
    <h3 className="text-2xl font-bold text-cyan-400">
      {roadmapsData.length}
    </h3>
    <p className="text-gray-300">Skills</p>
  </div>

  <div className="w-24 h-20 bg-white/5 rounded-3xl border border-cyan-500/20 flex flex-col items-center justify-center">
    <h3 className="text-2xl font-bold text-green-400">
      {categories.length}
    </h3>
    <p className="text-gray-300">Categories</p>
  </div>

</div>
<div className="max-w-2xl mx-auto mb-8">

  <input
    type="text"
    placeholder="🔍 Search Skills..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="
    w-full
    px-5 py-4
    rounded-2xl
    bg-white/5
    border border-cyan-500/20
    outline-none
    text-white
    placeholder-gray-500
    "
  />

</div>
<div className="flex flex-wrap justify-center gap-3 mb-12">

  {categories.map((category) => (

    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`px-5 py-2 rounded-xl transition-all duration-300 ${
        selectedCategory === category
          ? "bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold"
          : "bg-white/5 border border-cyan-500/20 text-gray-300"
      }`}
    >
      {category}
    </button>

  ))}

</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {filteredSkills.map((skill) => (

    <div
      key={skill.slug}
      onClick={() => navigate(`/roadmaps/${skill.slug}`)}
      className="
      cursor-pointer
      rounded-3xl
      p-6
      bg-white/5
      backdrop-blur-xl
      border border-cyan-500/20
      hover:border-cyan-400
      hover:scale-105
      transition-all duration-300
      shadow-[0_0_30px_rgba(34,211,238,0.10)]
      "
    >

      <div className="text-5xl mb-4">
        {skill.icon}
      </div>

      <h2 className="text-2xl font-bold mb-2">
        {skill.name}
      </h2>

      <p className="text-cyan-300 mb-3">
        {skill.category}
      </p>

      <div className="space-y-2 text-sm text-gray-300">

        <div>
          📈 Difficulty: {skill.difficulty}
        </div>

        <div>
          ⏳ Duration: {skill.duration}
        </div>

        <div>
          🔥 {skill.popularity}
        </div>

      </div>

    </div>

  ))}

</div>

      </div>

    </div>
  );
}

export default RoadmapsPage;