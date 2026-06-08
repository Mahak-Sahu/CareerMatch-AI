import jsPDF from "jspdf";
import React, {
  useState,
  useEffect
} from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomSkillTooltip from "../components/CustomSkillTooltip";


function Home() {
    const navigate = useNavigate();
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [atsScore, setAtsScore] = useState(0);
  const [matchingSkills, setMatchingSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [breakdown, setBreakdown] = useState(null);
  const [similarMatches, setSimilarMatches] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [resumeTips, setResumeTips] = useState("");
  const [loading, setLoading] = useState(false);
const [arrowProgress,setArrowProgress] = useState(0);
const [improvementPlan,setImprovementPlan] = useState([]);
const [showImprovement, setShowImprovement] = useState(true);
const [roadmap, setRoadmap] = useState([]);
const [activeSection, setActiveSection] = useState("dashboard");
const [animatedATS, setAnimatedATS] = useState(0);
const [careerSummary,setCareerSummary] = useState("");
const [strengths,setStrengths] = useState([]);
const [learnNext,setLearnNext] = useState([]);
const [bestRole,setBestRole] = useState("");
const [projectIdea,setProjectIdea] = useState("");
const [proTip,setProTip] = useState("");


    const skillData = {
  matching: matchingSkills,
  similar: similarMatches,
  missing: missingSkills,
};
const parseAISuggestion = (text) => {
  try {
    // Strip markdown code fences if Gemini wraps JSON in ```json ... ```
    const clean = text.replace(/```json\n?|```/g, "").trim();
    const parsed = JSON.parse(clean);

    setCareerSummary(parsed.careerSummary || "");

    // "Recommended Career Path" card uses bestRole state
    setBestRole(parsed.recommendedCareerPath || parsed.bestRole || "");

    // Arrays — guard against Gemini returning a string instead of array
    setStrengths(
      Array.isArray(parsed.strengths)
        ? parsed.strengths
        : (parsed.strengths || "").split("\n").filter(Boolean)
    );

    setLearnNext(
      Array.isArray(parsed.learnNext)
        ? parsed.learnNext
        : (parsed.learnNext || "").split("\n").filter(Boolean)
    );

    // "Recommended Project" card uses projectIdea state
    setProjectIdea(parsed.recommendedProject || "");

    // "Recruiter Insight" card uses proTip state
    setProTip(parsed.recruiterInsight || parsed.proTip || "");

  } catch (e) {
    console.error("parseAISuggestion: JSON parse failed →", e.message);
    console.log("Raw aiSuggestion received:", text);
  }
};
  const chartData = [
  {
    name: "Matching",
    value: matchingSkills.length,
    key: "matching",
    color: "#22c55e",
  },
  {
    name: "Similar",
    value: similarMatches.length,
    key: "similar",
    color: "#3b82f6",
  },
  {
    name: "Missing",
    value: missingSkills.length,
    key: "missing",
    color: "#ef4444",
  },
];
    const totalGain =
roadmap.reduce(
 (sum,item) => sum + item.atsImpact,
 0
);

const potentialATS =
atsScore + totalGain;

useEffect(() => {

  setAnimatedATS(0);

  const timer = setTimeout(() => {

    setAnimatedATS(potentialATS);

  }, 300);

  return () => clearTimeout(timer);

}, [potentialATS]);
useEffect(() => {

 if(activeSection === "roadmap"){

   setArrowProgress(0);

   setTimeout(() => {

      setArrowProgress(potentialATS);

   },300);

 }

},[activeSection,potentialATS]);
  
    const analyzeResume = async () => {
        const userEmail = localStorage.getItem("userEmail");
        const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {

  alert("Please Login First 🔒");

  navigate("/login");

  return;
}
  setLoading(true);

  try {

    let response;

    // ✅ PDF Upload
    if (resumeFile) {

      const formData = new FormData();

      formData.append("file", resumeFile);
      formData.append("jobDescription", resumeText);
      formData.append("email", userEmail);

      response = await fetch(
        "http://localhost:8080/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

    } else {

      // ✅ Manual Text
      response = await fetch(
        "http://localhost:8080/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeText }),
        }
      );
    }

    const data = await response.json();

    setJobs(data.jobs);
    setAtsScore(data.atsScore);
    setMatchingSkills(data.matchingSkills || []);
    setMissingSkills(data.missingSkills || []);
    setSimilarMatches(data.similarMatches || []);
    setImprovementPlan(data.improvementPlan || []);
    setRoadmap(data.roadmap || []);
    setAiSuggestion(data.aiSuggestion);
    console.log("RAW aiSuggestion from API:", data.aiSuggestion);
    parseAISuggestion(data.aiSuggestion);
    setResumeTips(data.resumeTips);
    setBreakdown(data.breakdown);
    

  } catch (error) {

    console.error(error);

  }

  setLoading(false);
};
  
  const downloadReport = () => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("AI Resume Analysis Report", 20, 20);

  doc.setFontSize(16);
  doc.text(`ATS Score: ${atsScore}/100`, 20, 40);

  doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("AI Suggestion:", 20, 60);

doc.setFont("helvetica", "normal");

  doc.setFontSize(12);

 // Reconstruct a clean text version from our parsed React state
  const reconstructedSuggestion = `
Career Summary
${careerSummary}

Strengths
${strengths.join(", ")}

Learn Next
${learnNext.join(", ")}

Best Role
${bestRole}

Project Idea
${projectIdea}

Pro Tip
${proTip}
  `.trim();

  const cleanSuggestion = reconstructedSuggestion
    .replace(/[^\x20-\x7E\n]/g, "")
    .replace(/\n+/g, "\n")
    .trim();

  const suggestionLines = doc.splitTextToSize(cleanSuggestion, 170);

doc.setFontSize(12);
doc.setLineHeightFactor(1.8);

const formattedSuggestion = cleanSuggestion
  .split("\n")
  .map(line => line.trim())
  .filter(line => line?.length > 0);

let currentY = 70;

formattedSuggestion.forEach((line) => {
  const headings = [
    "Career Summary", 
    "Strengths",
    "Learn Next",
    "Best Role",
    "Project Idea",
    "Pro Tip"
  ];

  if (headings.includes(line.trim())) {
    doc.setFont("helvetica", "bold");
  } else {
    doc.setFont("helvetica", "normal");
  }

  doc.text(line, 20, currentY);
  currentY += 10;
});

let y = currentY + 10;

 doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("Matched Jobs:", 20, y);

doc.setFont("helvetica", "normal");

  y += 10;

  jobs.forEach((job, index) => {
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5);

    doc.text(
      `${index + 1}. ${job.jobTitle} - ${job.matchPercentage}% Match`,
      25,
      y
    );

    y += 10;
  });

  doc.save("AI_Resume_Report.pdf");
};
console.log("jobs =", jobs);
console.log("improvementPlan =", improvementPlan);
console.log("careerSummary =", careerSummary);
console.log("strengths =", strengths);
console.log("learnNext =", learnNext);


  // ✅ RETURN ALWAYS INSIDE FUNCTION
  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
    <Navbar />
    <motion.div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="leading-[1.4] py-8 mt-6 text-6xl font-extrabold tracking-tight bg-gradient-to-r from-green-300 to-blue-500 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(74,222,128,0.35)]">
          🚀 CareerMatch AI
        </h1>
        <p className="text-gray-400 mt-2">
          Upgrade your resume, unlock your potential, and find the right career path
        </p>
        
      </div>

      {/* Input Card */}
        <motion.div
  whileHover={{
    scale: 1.02,
    y: -5,
    boxShadow: "0px 0px 40px rgba(34,197,94,0.25)"
  }}
  transition={{ duration: 0.3 }}
  className="overflow-hidden group relative overflow-hidden bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-xl transition-all duration-300"
>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="mb-4 w-full text-sm text-gray-300
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-xl file:border-0
                     file:text-sm file:font-semibold
                     file:bg-green-500/20
                     file:text-green-300
                     hover:file:bg-green-500/30"
        />
        <textarea
          className="w-full p-5 mb-6 rounded-2xl bg-[#0f172a] text-white border border-green-400/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:shadow-[0_0_15px_rgba(74,222,128,0.35)] resize-none placeholder:text-gray-500"
          rows="6"
          placeholder="Paste Job Description here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />

        <button
          onClick={analyzeResume}
          disabled={  
  loading ||
  (!resumeText.trim() && !resumeFile)
}
          className="
          group relative overflow-hidden
          w-full py-4 rounded-2xl
          font-bold text-lg text-white
          bg-gradient-to-r from-green-400 to-emerald-500
          shadow-lg shadow-green-500/20
          transition-all duration-300

          hover:scale-[1.02]
          hover:shadow-[0_0_35px_rgba(74,222,128,0.6)]
          hover:-translate-y-1

          active:scale-[0.98]

          disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span className="relative z-10">
          {loading ? (
            <div className="flex items-center justify-center gap-3">
    
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>

              <span>AI is analyzing...</span>

            </div>
) : (
  "🚀 Analyze Resume"
)}
          </span>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] translate-x-[-100%] group-hover:translate-x-[100%]"></div>
        </button>
        
      </motion.div>
      

      {/* Empty State */}
      {!loading &&(jobs?.length || 0) === 0 && (
        <div className="mt-10 text-center text-gray-400">
          No results yet. Paste your resume and click Analyze.
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-10 text-center text-green-400 animate-pulse">
          🔍 Analyzing your resume...
        </div>
      )}

      {atsScore > 0 && (
<>
<div className="mt-8">
       {/*TOP BAR*/}
     <div className="max-w-5xl mx-auto mb-10">
  <div
    className="
    flex justify-center items-center gap-4
    overflow-x-auto
    whitespace-nowrap
    p-4
    rounded-3xl
    bg-white/5
    backdrop-blur-xl
    border border-cyan-500/20
    shadow-[0_0_30px_rgba(34,211,238,0.15)]
  "
  >

  <button
    onClick={() => setActiveSection("dashboard")}
    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
      activeSection === "dashboard"
        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/30 scale-105"
        : "bg-zinc-800/80 text-gray-300 hover:bg-zinc-700 hover:text-white"
    }`}
  >
    📊 Dashboard
  </button>

  <button
    onClick={() => setActiveSection("skills")}
    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
      activeSection === "skills"
        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/30 scale-105"
        : "bg-zinc-800/80 text-gray-300 hover:bg-zinc-700 hover:text-white"
    }`}
  >
    📋 Skills
  </button>

  <button
    onClick={() => setActiveSection("roadmap")}
    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
      activeSection === "roadmap"
        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/30 scale-105"
        : "bg-zinc-800/80 text-gray-300 hover:bg-zinc-700 hover:text-white"
    }`}
  >
    📈 Improvement Plan
  </button>
  <button
  onClick={() => navigate("/roadmaps")}
  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
    activeSection === "roadmaps"
      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/30 scale-105"
      : "bg-zinc-800/80 text-gray-300 hover:bg-zinc-700 hover:text-white"
  }`}
>
  🚀 Roadmap
</button>

  <button
    onClick={() => setActiveSection("jobs")}
    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
      activeSection === "jobs"
        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/30 scale-105"
        : "bg-zinc-800/80 text-gray-300 hover:bg-zinc-700 hover:text-white"
    }`}
  >
    💼 Jobs
  </button>

  <button
    onClick={() => setActiveSection("ai")}
    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
      activeSection === "ai"
        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg shadow-green-500/30 scale-105"
        : "bg-zinc-800/80 text-gray-300 hover:bg-zinc-700 hover:text-white"
    }`}
  >
    🤖 AI Assistant
  </button>
</div>
</div>

    {/* Main Content */}
   <div className="w-full">

      {/* ATS Score */}
{activeSection === "dashboard"  && (
  <>
  <div>
     <motion.div
    whileHover={{
      scale: 1.01,
      
    }}
    transition={{ duration: 0.2 }}
    className="mt-6 group relative overflow-hidden bg-white/10 backdrop-blur-xl border border-green-400/30 rounded-3xl p-6 shadow-lg"
  >

    <div className="flex justify-between items-center mb-3">

      <h2 className="text-4xl font-bold text-green-300 tracking-wide drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
        📊 ATS Resume Score
      </h2>

      <span
        className={`text-5xl font-extrabold drop-shadow-[0_0_15px_rgba(255,255,255,0.35)]
        ${
         atsScore >= 80
          ? "text-green-400"
          : atsScore >= 50
          ? "text-yellow-400"
          : "text-red-400"
         }`}
      >
       {atsScore}/100
      </span>

    </div>
    

    <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">

      <div
  className={`h-4 rounded-full transition-all duration-1000 ease-in-out ${
    atsScore >= 80
      ? "bg-gradient-to-r from-green-400 to-emerald-500"
      : atsScore >= 50
      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
      : "bg-gradient-to-r from-red-400 to-red-600"
  }`}
  style={{ width: `${atsScore}%` }}
  
/>
       

    </div>
    <p className="mt-4 text-sm text-gray-300 font-medium">

  {atsScore >= 80
    ? "🔥 Excellent Resume • ATS Friendly"
    : atsScore >= 50
    ? "⚡ Good Resume • Add More Keywords"
    : "📈 Needs Improvement • Optimize Resume"}

</p>


    <div className="grid grid-cols-3 gap-4 mt-6">

  <div className="bg-black/20 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-sm">JD Match</p>
    <p className="text-cyan-300 font-bold text-2xl">
      {(breakdown.matching/50)*100}%
    </p>
  </div>

  <div className="bg-black/20 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-sm">Missing Skills</p>
    <p className="text-red-400 font-bold text-2xl">
      {missingSkills.length}
    </p>
  </div>

  <div className="bg-black/20 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-sm">Matched Skills</p>
    <p className="text-green-400 font-bold text-2xl">
      {matchingSkills.length}
    </p>
  </div>

</div>

  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
  <div className="absolute -inset-[100px] bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_40%)]"></div>
  </div>
  </motion.div>
  
</div>
</>
)}
   {activeSection === "dashboard" && breakdown && (
  <motion.div
    whileHover={{
      scale: 1.01,
      y: -3
    }}
    className="mt-8 bg-white/10 backdrop-blur-sm border border-cyan-400/20 rounded-3xl p-6 shadow-xl "
  >

    <h2 className="text-3xl font-bold text-cyan-300 mb-6">
      📊 ATS Breakdown
    </h2>

    {[
      {
        label: "🎯 JD Match",
        value: breakdown.matching,
        max: 50,
        color: "from-green-400 to-green-600"
      },

      {
        label: "📁 Projects",
        value: breakdown.similar,
        max: 10,
        color: "from-blue-400 to-blue-600"
      },

      {
        label: "🔗 GitHub + LinkedIn",
        value: breakdown.keyword,
        max: 10,
        color: "from-purple-400 to-purple-600"
      },

      {
        label: "🎓 Education + Quality",
        value: breakdown.quality,
        max: 30,
        color: "from-yellow-400 to-orange-500"
      }

    ].map((item, index) => (

      <div key={index} className="mb-5">

        <div className="flex justify-between mb-2">

          <span className="font-semibold text-white">
            {item.label}
          </span>

          <span className="text-cyan-300 font-bold">
            {item.value}/{item.max}
          </span>

        </div>

        <div className="w-full h-4 bg-gray-700 rounded-full">

          <div
            className={`h-4 rounded-full bg-gradient-to-r ${item.color}`}
            style={{
              width: `${(item.value / item.max) * 100}%`
            }}
          />

        </div>

      </div>

    ))}

    <div className="mt-4 text-red-400 font-semibold">
      Missing Skills Penalty: {breakdown.missing}
    </div>

  </motion.div>
  
)}

{activeSection === "skills" && atsScore > 0 && (

<div className="mt-8

rounded-3xl
p-8
bg-white/10
backdrop-blur-xl
border border-green-400/30
shadow-[0_0_25px_rgba(34,197,94,0.15)]
transition-all duration-300
hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]
">

  

    <h2 className="text-3xl font-bold text-cyan-400">
      📋 Skill Gap Analysis
    </h2>
    <div className="w-full h-[300px]">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
  data={chartData}
  dataKey="value"
  nameKey="name"
  innerRadius={85}
  outerRadius={120}
  paddingAngle={4}
>

  {chartData.map((entry, index) => (

    <Cell
      key={`cell-${index}`}
      fill={entry.color}
    />

  ))}

</Pie>

<Tooltip />

<text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="middle"
  fill="#ffffff"
  fontSize="30"
  fontWeight="700"
>
  {matchingSkills.length +
   similarMatches.length +
   missingSkills.length}
  
  

  <tspan
    x="50%"
    dy="24"
    fill="#94a3b8"
    fontSize="14"
  >
    Skills
  </tspan>
</text>


<div className="text-center -mt-16">

  <p className="text-gray-400">
    Skills
  </p>

</div>
</PieChart>

</ResponsiveContainer>

</div>
   
   


     {/* Skills List */}
    <div className="grid md:grid-cols-3 gap-6 mt-8">

  {/* Matching */}
  <div className="
    bg-green-500/10
    border border-green-500/30
    rounded-2xl
    p-5
    backdrop-blur-xl
    hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]
    transition-all duration-300
    hover:-translate-y-1
hover:scale-[1.02]
  ">

    <h3 className="text-green-400 text-xl font-bold mb-4">
      ✅ Matching Skills
    </h3>

    <div className="space-y-3">

      {matchingSkills.map((skill,index) => (

        <div
          key={index}
          className="
            bg-green-500/10
            rounded-xl
            px-3
            py-2
            text-white
          "
        >
          {skill}
        </div>

      ))}

    </div>

  </div>

  {/* Similar */}
  <div className="
    bg-cyan-500/10
    border border-cyan-500/30
    rounded-2xl
    p-5
    backdrop-blur-xl
    hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]
    transition-all duration-300
    hover:-translate-y-1
hover:scale-[1.02]
  ">

    <h3 className="text-cyan-400 text-xl font-bold mb-4">
      ⚡ Similar Skills
    </h3>

    <div className="space-y-3">

      {similarMatches.map((skill,index) => (

        <div
          key={index}
          className="
            bg-cyan-500/10
            rounded-xl
            px-3
            py-2
            text-white
          "
        >
          {skill}
        </div>

      ))}

    </div>

  </div>

  {/* Missing */}
  <div className="
    bg-red-500/10
    border border-red-500/30
    rounded-2xl
    p-5
    backdrop-blur-xl
    hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]
    transition-all duration-300
    hover:-translate-y-1
hover:scale-[1.02]
  ">

    <h3 className="text-red-400 text-xl font-bold mb-4">
      ❌ Missing Skills
    </h3>

    <div className="space-y-3">

      {missingSkills.map((skill,index) => (

        <div
          key={index}
          className="
            bg-red-500/10
            rounded-xl
            px-3
            py-2
            text-white
          "
        >
          {skill}
        </div>

      ))}

    </div>

  </div>

</div>
</div>

)}

{/* roadmap cards */}
{activeSection === "roadmap" &&
improvementPlan?.length > 0 && (

<div className="bg-white/10
backdrop-blur-xl
border border-green-400/30
shadow-[0_0_25px_rgba(34,197,94,0.15)]
hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]
rounded-3xl p-6 mt-6 ">

    <div
        className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-cyan-400">
            🚀 ATS Improvement Plan
        </h2>
    </div>
    
    

        <div className="mt-5">
          {/* ATS Growth Tracker */}
<div className="
mt-6
mb-8
bg-black/20
border border-cyan-500/20
rounded-2xl
p-6
shadow-lg
">
  <h3 className="
text-cyan-400
font-bold
text-xl
mb-5
">
📈 ATS Growth Tracker
</h3>

  <div className="flex items-center justify-between gap-8 mb-8">

  <motion.div
className="
w-[260px]
h-[160px]
bg-yellow-500/10
border border-yellow-500/30
rounded-3xl
flex
flex-col
justify-center
items-center
shadow-[0_0_15px_rgba(250,204,21,0.15)]
"
>

<p className="text-gray-400 text-sm">
Current ATS
</p>

<h3 className="text-yellow-400 text-2xl font-bold">
{atsScore}
</h3>

</motion.div>

<div className="flex-1 relative h-24">

  

  {/* Animated Line */}


  {/* Top Line */}
<motion.div
className="
absolute
left-0
top-[50%]
h-[3px]
rounded-full
bg-gradient-to-r
from-green-400
to-cyan-400
shadow-[0_0_15px_rgba(34,211,238,0.6)]
"
initial={{ width: 0 }}
animate={{ width: "91%" }}
transition={{
  duration: 2,
  ease: "easeOut"
}}
/>

{/* Bottom Line */}
<motion.div
className="
absolute
left-0
top-[57%]
h-[2px]
rounded-full
bg-gradient-to-r
from-green-400
to-cyan-400
shadow-[0_0_15px_rgba(34,211,238,0.6)]
"
initial={{ width: 0 }}
animate={{ width: "91%" }}
transition={{
  duration: 2,
  ease: "easeOut"
}}
/>
    {/* Arrow */}

    
<motion.div

className="
absolute
top-1/2
-translate-y-1/2
text-cyan-400
text-4xl
drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]
"

initial={{
 left:"0%"
}}

animate={{
 left:"88%"
}}

transition={{
 duration:2,
 ease:"easeOut"
}}

>

⟹

</motion.div>



</div>
<motion.div

animate={{

 scale:[1,1,1.05],

 boxShadow:[

   "0 0 0px #22d3ee",

   "0 0 20px #22d3ee",

   "0 0 50px #22d3ee",

   "0 0 10px #22d3ee"

 ]

}}

transition={{

 duration:1 ,

 delay:2

}}

className="
w-[260px]
h-[160px]
flex
flex-col
justify-center
items-center
bg-cyan-500/10
border
border-cyan-500/30
rounded-2xl
text-center
"
>

<p className="text-gray-400 text-sm">
Potential ATS     
</p>

<h3 className="text-cyan-400 text-4xl font-bold">
{potentialATS}
</h3>

</motion.div>

  </div>

  

  <div className="text-center mt-1">

  <motion.div

   initial={{
    opacity:0,
    y:20
   }}

   animate={{
    opacity:1,
    y:0
   }}

   transition={{
    delay:2
   }}

   className="
   inline-flex
   px-5
   py-2
   rounded-full
   bg-green-500/10
   border
   border-green-500/30
   text-green-400
   font-bold
   "

  >

   🚀 +{totalGain} ATS Gain Possible

  </motion.div>

</div>

</div>

            <div className="space-y-3 mt-4">

{roadmap.map((item,index)=>(

<motion.div

 key={index}

 initial={{
   opacity:0,
   y:20
 }}

 animate={{
   opacity:1,
   y:0
 }}

 transition={{
   delay:index * 0.15
 }}

 className="
 bg-gray-800/40
 rounded-xl
 p-4
 border
 border-cyan-500/20
 "

>

<div className="flex justify-between items-center">
    
    <h3 className="text-cyan-400 font-bold text-2xl">
        {item.skill}
    </h3>

    <span className="
        bg-green-500/20
        text-green-300
        min-w-[170px]
        h-[44px]
        flex
items-center
justify-center
        px-3
        py-1
        rounded-full
        text-sm
        font-bold
    ">
        🔥 +{item.atsImpact}  ATS  Boost
    </span>

</div>
<div className="mt-3 space-y-1">

    <p className="text-yellow-300 text-2sm">
        🟡 Difficulty: {item.difficulty}
    </p>

    <p className="text-cyan-300 text-2sm">
        ⏱ Time Required: {item.timeRequired}
    </p>

</div>
</motion.div>

))
}

</div>


            </div>

</div>

)}

 


      {/* Results */}
      {activeSection === "jobs" && (
      <div className="mt-10 space-y-4">
        {jobs.map((job, index) => {


const rank =
index === 0
? "Rank #1 🥇"
: index === 1
? "Rank #2 🥈"
: index === 2
? "Rank #3 🥉"
: null;
const matchLevel =
job.matchPercentage >= 90
? "🏆 Perfect Match"
: job.matchPercentage >= 80
? "🟢 Strong Match"
: job.matchPercentage >= 60
? "🟢 Good Match"
: job.matchPercentage >= 40
? "🟡 Moderate Match"
: "🔴 Weak Match";
const progressColor =
job.matchPercentage >= 90
? "bg-gradient-to-r from-green-400 to-emerald-500"

: job.matchPercentage >= 60
? "bg-gradient-to-r from-cyan-400 to-sky-500"

: job.matchPercentage >= 40
? "bg-gradient-to-r from-yellow-400 to-orange-400"

: "bg-gradient-to-r from-red-400 to-rose-500";
const percentageColor =
job.matchPercentage >= 90
? "text-green-300"

: job.matchPercentage >= 60
? "text-cyan-300"

: job.matchPercentage >= 40
? "text-orange-300"

: "text-red-300";
return (

          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
          duration: 0.4,
          delay: index * 0.08
          }}
          whileHover={{
          scale: 1.02,
          y: -5
          }}
            key={index}
            className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-md hover:scale-[1.02] hover:border-green-400/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] hover:-translate-y-1 transition-all duration-300"
          >
            {rank && (
<div className="mb-2">
  <span className="inline-flex
    items-center
    px-4
    py-2
    rounded-full
    bg-gradient-to-r
    from-yellow-500/20
    to-orange-500/20
    border
    border-yellow-500/30
    text-yellow-300
    font-bold
    mb-3">
    {rank} 
  </span>
</div>
)}  
<div className="flex justify-between items-start">

  <div>

    <h2 className="text-xl font-semibold text-green-300">
      💼 {job.jobTitle}
    </h2>

    
  </div>

  <span
  className={`
    text-2xl
    font-bold
    ${percentageColor}
    drop-shadow-[0_0_10px_currentColor]
  `}
>
  {job.matchPercentage}%
</span>

</div>
            

            {/* Progress bar */}
            <div className=" w-full
 h-3
 bg-slate-700/60
 rounded-full
 mt-3
 overflow-hidden
">
              <motion.div
  initial={{ width: 0 }}
  animate={{ width: `${job.matchPercentage}%` }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  className={`${progressColor} h-3 rounded-full`}
/>
            </div>
            <div className="flex justify-end mt-2 mr-1">


</div>
<div className="mt-4 flex justify-between items-start">
            <div className="flex flex-col items-start">
  <p className="text-gray-400 text-sm mb-2">
    Missing Skills
  </p>

  <div className="flex flex-wrap gap-2">
    {job?.missingSkills?.length > 0 ? (
      job?.missingSkills?.map((skill, skillIndex) => (
        <span
          key={skillIndex}
          className="
                px-3
    py-1
    rounded-full
    bg-red-500/10
    border
    border-red-500/30
    text-red-300
    text-xs
    font-medium
    flex
    items-center
    gap-1

          "
        >
        ⚠️  {skill}
        </span>
      ))
    ) : (
      <span
        className="
          px-3
          py-1
          rounded-full
          bg-green-500/10
          border
          border-green-500/30
          text-green-300
          text-xs
          font-medium
        "
      >
        🎉 No Missing Skills
      </span>
    )}
  </div>
</div>
<div className="flex flex-col items-end">

  <p className="text-gray-400 text-sm mb-2">
    Match Quality
  </p>

  <div
    className={`
      inline-flex
      items-center
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold

      ${
        job.matchPercentage >= 90
          ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-300"
          : job.matchPercentage >= 80
          ? "bg-green-500/10 border border-green-500/30 text-green-300"
          : job.matchPercentage >= 60
          ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
          : job.matchPercentage >= 40
          ? "bg-orange-500/10 border border-orange-500/30 text-orange-300"
          : "bg-red-500/10 border border-red-500/30 text-red-300"
      }
    `}
  >
    {matchLevel}
  </div>

</div>
</div>
          </motion.div>
        );
      })
    }
      </div>
      )}
      



      
      {/* AI Suggestion */}
      
      <div className="mt-6 grid grid-cols-1  gap-5">
{activeSection === "ai" && aiSuggestion && (
  <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  whileHover={{
    scale: 1.01,
    boxShadow: "0px 0px 25px rgba(34,197,94,0.4)"
  }}
  className="relative overflow-hidden mt-10 bg-gradient-to-br from-[#1e293b]/95 to-[#14532d]/90 backdrop-blur-2xl border border-green-400/40 p-6 rounded-3xl shadow-2xl shadow-green-500/10 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.15),transparent_40%)] before:pointer-events-none"
>
<h2 className="leading-normal py-3 px-4 inline-block rounded-2xl text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-300 to-emerald-400 text-transparent bg-clip-text drop-shadow-[0_0_18px_rgba(74,222,128,0.6)]">      🤖 AI Suggestion
    </h2>
   <div
  className="
  bg-black/15
  border border-green-500/20
  rounded-3xl
  p-8
  mb-8
  "
>
  <h3
    className="
    text-2xl
    font-bold
    text-green-300
    mb-5
    flex
    items-center
    gap-3
    "
  >
    🎯 Recommended Career Path
  </h3>

  <p
    className="
    text-xl
    text-white
    leading-relaxed
    mb-4
    "
  >
    {bestRole}
  </p>

  <p
    className="
    text-gray-400
    italic
    text-base
    "
  >
    Best role based on your resume analysis
  </p>
</div>
<div className="
bg-black/20
border border-cyan-500/20
rounded-2xl
p-6
mb-6
">
  <h3 className="text-2xl font-bold text-cyan-300 mb-4">
    📄 Career Summary
  </h3>

  <p className="text-gray-200 leading-8">
    {careerSummary}
  </p>
</div>
    
<div className=" mt-8 bg-black/20
border border-cyan-500/20
rounded-2xl
p-6
mb-6">

  <h2 className="text-2xl font-bold text-green-300 mb-8">
    💡 Resume Improvement Tips
  </h2>

  {resumeTips.split("\n").map((tip, index) => (
    <p
      key={index}
      className="flex items-center gap-4 text-gray-200 text-xl mb-5 hover:translate-x-2 transition-all duration-300"
    >
      {tip}
    </p>
  ))}

</div>
 
 <div className="grid lg:grid-cols-2 gap-5 mt-6">

  {/* Strengths */}

  <div className="
    bg-black/20
    border border-green-500/20
    rounded-2xl
    p-6
  ">
    <h3 className="text-2xl font-bold text-green-300 mb-4">
      🔥 Strengths
    </h3>

    {strengths.map((item,index)=>(
      <p
        key={index}
        className="text-gray-200 mb-3"
      >
        {item}
      </p>
    ))}
  </div>

  {/* Learn Next */}

  <div className="
    bg-black/20
    border border-cyan-500/20
    rounded-2xl
    p-6
  ">
    <h3 className="text-2xl font-bold text-cyan-300 mb-4">
      📚 Learn Next
    </h3>

    {learnNext.map((item,index)=>(
      <p
        key={index}
        className="text-gray-200 mb-3"
      >
        {item}
      </p>
    ))}
  </div>

</div>
<div className="grid lg:grid-cols-1 gap-5 mt-6">

  <div className="
    bg-black/20
    border border-yellow-500/20
    rounded-2xl
    p-6
  ">
    <h3 className="text-2xl font-bold text-yellow-300 mb-4">
      💡 Recommended Project
    </h3>

    <p className="text-gray-200">
      {projectIdea}
    </p>
  </div>

  <div className="
    bg-black/20
    border border-purple-500/20
    rounded-2xl
    p-6
  ">
    <h3 className="text-2xl font-bold text-purple-300 mb-4">
      👨‍💼 Recruiter Insight
    </h3>

    <div className="
bg-purple-500/10
border-l-4
border-purple-400
rounded-xl
p-4
">
 {proTip}
</div>
  </div>

</div>
    <div className="prose prose-invert prose-p:text-gray-100 prose-strong:text-white max-w-none leading-8 text-lg">

      
        <button
  onClick={downloadReport}
  className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-lg hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all duration-300"
>
  📄 Download AI Report
</button>
    </div>
  </motion.div>
  
)}
</div>
</div>
 </div>
</>

)}
<div className="text-center text-gray-500 mt-16 mb-6 text-sm">
  Built with ❤️ using React + Spring Boot + AI
</div>
    </motion.div>
  </div>
);
}

export default Home;