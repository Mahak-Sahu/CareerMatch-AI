import React from "react";
import { useNavigate } from "react-router-dom";
import { roadmapsData } from "../data/roadmapsData";

function RoadmapsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate("/")}
          className="mb-8 px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
        >
          ← Back To Home
        </button>

        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-green-300 to-cyan-400 text-transparent bg-clip-text">
          🚀 Engineering Skill Roadmaps
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Learn step-by-step and become industry ready.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {roadmapsData.map((skill) => (

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