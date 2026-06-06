import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [openJD, setOpenJD] = useState(null);
const [openResume, setOpenResume] = useState(null);
  const [history, setHistory] = useState([]);

  const email = localStorage.getItem("userEmail");

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        `http://localhost:8080/api/history/${email}`
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-300 to-blue-500 bg-clip-text text-transparent">
          📊 Resume Dashboard
        </h1>

        {
          history.length === 0 ? (

            <p className="text-center text-gray-400">
              No Resume History Found
            </p>

          ) : (

            <div className="grid gap-8">

              {
                history.map((item, index) => (
<>
                  <div
                    key={index}
                    className="bg-zinc-900 border border-green-500/30 rounded-3xl p-8 shadow-2xl"
                  >

                    <div className="flex justify-between items-center mb-6">

                      <h2 className="text-3xl font-bold text-green-400">
                        ATS Score: {item.atsScore}/100
                      </h2>

                      <span className="text-gray-400">
                        {item.createdAt}
                      </span>

                    </div>

                    <div className="mb-6">

                      <h3 className="text-xl font-bold text-blue-400 mb-2">
                        AI Suggestion
                      </h3>

                      <p className="text-gray-300 whitespace-pre-wrap">
                        {item.aiSuggestion}
                      </p>

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-yellow-400 mb-2">
                        Resume Content
                      </h3>

                      
                      </div>

                    


 {/* Job Description Dropdown */}

<div
  className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 mt-4 cursor-pointer"
  onClick={() =>
    setOpenJD(openJD === index ? null : index)
  }
>
  <div className="flex justify-between items-center">
    <h3 className="text-cyan-400 font-bold">
      📄 Job Description
    </h3>

    <span className="text-white">
      {openJD === index ? "▲" : "▼"}
    </span>
  </div>

  {openJD === index && (
    <div className="mt-3 bg-black/30 p-3 rounded-lg max-h-52 overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap">
      {item.jobDescription}
    </div>
  )}
</div>

{/* Resume Dropdown */}

<div
  className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mt-4 cursor-pointer"
  onClick={() =>
    setOpenResume(openResume === index ? null : index)
  }
>
  <div className="flex justify-between items-center">
    <h3 className="text-yellow-400 font-bold">
      📑 Resume Content
    </h3>

    <span className="text-white">
      {openResume === index ? "▲" : "▼"}
    </span>
  </div>

  {openResume === index && (
    <div className="mt-3 bg-black/30 p-3 rounded-lg max-h-52 overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap">
      {item.resumeText}
    </div>
  )}
</div>
</div>
</>

                ))
              }

            </div>
          )
        }

      </div>

    </div>
    
  );
}

export default Dashboard;