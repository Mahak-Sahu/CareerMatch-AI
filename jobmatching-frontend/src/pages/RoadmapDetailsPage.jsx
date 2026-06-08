import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { roadmapsData } from "../data/roadmapsData";
import { useState } from "react";

function AccordionSection({
  title,
  icon,
  sectionKey,
  openSection,
  setOpenSection,
  children,
}) {
  const isOpen = openSection === sectionKey;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-cyan-500/20 rounded-3xl overflow-hidden">

      <button
        onClick={() =>
          setOpenSection(isOpen ? "" : sectionKey)
        }
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <h2 className="text-2xl font-bold text-cyan-400">
          {icon} {title}
        </h2>

        <span className="text-2xl">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          {children}
        </div>
      )}

    </div>
  );
}
function RoadmapDetailsPage() {
  const [openSection, setOpenSection] = useState("overview");
  const navigate = useNavigate();
  const { slug } = useParams();
  const roadmap = roadmapsData.find(
  (item) => item.slug === slug
);

if (!roadmap) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Roadmap Not Found
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate("/roadmaps")}
          className="mb-8 px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
        >
          ← Back To Roadmaps
        </button>

        <div className="flex items-center gap-4 mb-6">

  <div className="text-6xl">
    {roadmap.icon}
  </div>

  <div>

    <h1 className="text-5xl font-bold text-cyan-400">
      {roadmap.name}
    </h1>

    <p className="text-gray-400 mt-2">
      {roadmap.category}
    </p>

  </div>

</div>
        
        
        <div className="space-y-6">

  <AccordionSection
  title="Overview"
  icon="📘"
  sectionKey="overview"
  openSection={openSection}
  setOpenSection={setOpenSection}
>

  <p className="text-gray-300 leading-8">
    {roadmap.overview?.description}
  </p>

  <div className="grid md:grid-cols-2 gap-4 mt-8">

    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="font-bold text-cyan-400 mb-2">
        Industry Demand
      </h3>

      <p>{roadmap.overview?.industryDemand}</p>
    </div>

    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="font-bold text-cyan-400 mb-2">
        Future Scope
      </h3>

      <p>{roadmap.overview?.futureScope}</p>
    </div>

  </div>

  <div className="grid md:grid-cols-3 gap-4 mt-8">

    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="font-bold text-green-400">
        📈 Difficulty
      </h3>

      <p className="mt-2">
        {roadmap.difficulty}
      </p>
    </div>

    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="font-bold text-green-400">
        ⏳ Duration
      </h3>

      <p className="mt-2">
        {roadmap.duration}
      </p>
    </div>

    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="font-bold text-green-400">
        🔥 Popularity
      </h3>

      <p className="mt-2">
        {roadmap.popularity}
      </p>
    </div>

  </div>

</AccordionSection>
<AccordionSection
  title="Prerequisites & Next Skills"
  icon="🧩"
  sectionKey="prerequisites"
  openSection={openSection}
  setOpenSection={setOpenSection}
>

  <div className="grid md:grid-cols-2 gap-6">

    {/* Prerequisites */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        📚 Prerequisites
      </h3>

      <div className="space-y-3">

        {roadmap.prerequisites?.map((item, index) => (

          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            ✅ {item}
          </div>

        ))}

      </div>

    </div>

    {/* Next Skills */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-green-400 mb-4">
        ⚡ Next Skills
      </h3>

      <div className="space-y-3">

        {roadmap.nextSkills?.map((item, index) => (

          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            🚀 {item}
          </div>

        ))}

      </div>

    </div>

  </div>

</AccordionSection>
<AccordionSection
  title="Learning Roadmap"
  icon="🗺️"
  sectionKey="roadmap"
  openSection={openSection}
  setOpenSection={setOpenSection}
>

  <div className="grid lg:grid-cols-2 gap-6">

    {/* Beginner */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-green-400 mb-4">
        Phase 1 • Beginner
      </h3>

      <div className="space-y-3">

        {roadmap.roadmap?.beginner?.map((topic, index) => (

          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            ✅ {topic}
          </div>

        ))}

      </div>

    </div>

    {/* Intermediate */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        Phase 2 • Intermediate
      </h3>

      <div className="space-y-3">

        {roadmap.roadmap?.intermediate?.map((topic, index) => (

          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            🚀 {topic}
          </div>

        ))}

      </div>

    </div>

    {/* Advanced */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-orange-400 mb-4">
        Phase 3 • Advanced
      </h3>

      <div className="space-y-3">

        {roadmap.roadmap?.advanced?.map((topic, index) => (

          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            🔥 {topic}
          </div>

        ))}

      </div>

    </div>

    {/* Industry Ready */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        Phase 4 • Industry Ready
      </h3>

      <div className="space-y-3">

        {roadmap.roadmap?.industryReady?.map((topic, index) => (

          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            💼 {topic}
          </div>

        ))}

      </div>

    </div>

  </div>

</AccordionSection>
<AccordionSection
  title="Resources"
  icon="📚"
  sectionKey="resources"
  openSection={openSection}
  setOpenSection={setOpenSection}
>

  <div className="grid md:grid-cols-2 gap-6">

    {/* Books */}
    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="text-cyan-400 font-bold text-lg mb-4">
        📖 Books
      </h3>

      <div className="space-y-2">
        {roadmap.resources?.books?.map((book, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl p-3"
          >
            {book}
          </div>
        ))}
      </div>
    </div>

    {/* Courses + YouTube */}
    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="text-green-400 font-bold text-lg mb-4">
        🎓 Courses & YouTube Channels
      </h3>

      <div className="space-y-2">

        {roadmap.resources?.courses?.map((course, index) => (
          <div
            key={`course-${index}`}
            className="bg-black/30 rounded-xl p-3"
          >
            📘 {course}
          </div>
        ))}

        {roadmap.resources?.youtube?.map((channel, index) => (
          <div
            key={`yt-${index}`}
            className="bg-black/30 rounded-xl p-3"
          >
            ▶️ {channel}
          </div>
        ))}

      </div>
    </div>

  </div>

  <div className="grid md:grid-cols-2 gap-6 mt-6">

    {/* Documentation + Websites */}
    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="text-yellow-400 font-bold text-lg mb-4">
        🌐 Documentation & Websites
      </h3>

      <div className="space-y-2">

        {roadmap.resources?.documentation?.map((doc, index) => (
          <div
            key={`doc-${index}`}
            className="bg-black/30 rounded-xl p-3 break-all"
          >
            📄 {doc}
          </div>
        ))}

        {roadmap.resources?.websites?.map((site, index) => (
          <div
            key={`site-${index}`}
            className="bg-black/30 rounded-xl p-3"
          >
            🌍 {site}
          </div>
        ))}

      </div>
    </div>

    {/* Practice Platforms */}
    <div className="bg-black/20 rounded-2xl p-5">
      <h3 className="text-pink-400 font-bold text-lg mb-4">
        💻 Practice Platforms
      </h3>

      <div className="space-y-2">

        {roadmap.resources?.practice?.map((platform, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl p-3"
          >
            🚀 {platform}
          </div>
        ))}

      </div>
    </div>

  </div>

</AccordionSection>
<AccordionSection
  title="Projects"
  icon="🚀"
  sectionKey="projects"
  openSection={openSection}
  setOpenSection={setOpenSection}
>

  <div className="grid lg:grid-cols-3 gap-6">

    {/* Beginner */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-green-400 mb-4">
        🟢 Beginner Projects
      </h3>

      <div className="space-y-3">

        {roadmap.projects?.beginner?.map((project, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            {project}
          </div>
        ))}

      </div>

    </div>

    {/* Intermediate */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        🟡 Intermediate Projects
      </h3>

      <div className="space-y-3">

        {roadmap.projects?.intermediate?.map((project, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            {project}
          </div>
        ))}

      </div>

    </div>

    {/* Advanced */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-red-400 mb-4">
        🔴 Advanced Projects
      </h3>

      <div className="space-y-3">

        {roadmap.projects?.advanced?.map((project, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            {project}
          </div>
        ))}

      </div>

    </div>

  </div>

</AccordionSection>
<AccordionSection
  title="Tools & Certifications"
  icon="🛠️"
  sectionKey="tools"
  openSection={openSection}
  setOpenSection={setOpenSection}
>

  <div className="grid lg:grid-cols-3 gap-6">

    {/* Tools */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-green-400 mb-4">
        🧰 Tools
      </h3>

      <div className="space-y-3">

        {roadmap.toolsAndCertifications?.tools?.map((tool, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            {tool}
          </div>
        ))}

      </div>

    </div>

    {/* Frameworks */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        ⚙️ Frameworks
      </h3>

      <div className="space-y-3">

        {roadmap.toolsAndCertifications?.frameworks?.map((item, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            {item}
          </div>
        ))}

      </div>

    </div>

    {/* Certifications */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        🏆 Certifications
      </h3>

      <div className="space-y-3">

        {roadmap.toolsAndCertifications?.certifications?.map((item, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            {item}
          </div>
        ))}

      </div>

    </div>

  </div>

</AccordionSection>
<AccordionSection
  title="Career & Salary"
  icon="💼"
  sectionKey="career"
  openSection={openSection}
  setOpenSection={setOpenSection}
>

  <div className="grid lg:grid-cols-2 gap-6">

    {/* Job Roles */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-green-400 mb-4">
        🎯 Job Roles
      </h3>

      <div className="space-y-3">

        {roadmap.career?.roles?.map((role, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            {role}
          </div>
        ))}

      </div>

    </div>

    {/* Career Path */}

    <div className="bg-black/20 rounded-2xl p-6">

      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        🚀 Career Growth Path
      </h3>

      <div className="space-y-3">

        {roadmap.career?.careerPath?.map((step, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-xl px-4 py-3"
          >
            {index + 1}. {step}
          </div>
        ))}

      </div>

    </div>

  </div>

  {/* Salary Section */}

  <div className="mt-8">

    <h3 className="text-2xl font-bold text-cyan-400 mb-6">
      💰 Salary Insights (India)
    </h3>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-black/20 rounded-2xl p-6 text-center">

        <div className="text-4xl mb-3">🌱</div>

        <h4 className="font-bold text-green-400 mb-2">
          Fresher
        </h4>

        <p className="text-lg font-semibold">
          {roadmap.career?.salary?.fresher}
        </p>

      </div>

      <div className="bg-black/20 rounded-2xl p-6 text-center">

        <div className="text-4xl mb-3">🚀</div>

        <h4 className="font-bold text-yellow-400 mb-2">
          Mid-Level
        </h4>

        <p className="text-lg font-semibold">
          {roadmap.career?.salary?.midLevel}
        </p>

      </div>

      <div className="bg-black/20 rounded-2xl p-6 text-center">

        <div className="text-4xl mb-3">👑</div>

        <h4 className="font-bold text-cyan-400 mb-2">
          Senior
        </h4>

        <p className="text-lg font-semibold">
          {roadmap.career?.salary?.senior}
        </p>

      </div>

    </div>

  </div>

</AccordionSection>
</div>
      </div>

    </div>
  );
}

export default RoadmapDetailsPage;