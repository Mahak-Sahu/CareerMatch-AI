import React from "react";
import Dashboard from "./pages/Dashboard";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoadmapsPage from "./pages/RoadmapsPage";
import RoadmapDetailsPage from "./pages/RoadmapDetailsPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/roadmaps" element={<RoadmapsPage />} />

<Route
  path="/roadmaps/:slug"
  element={<RoadmapDetailsPage />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;