import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importing Pages
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import Home from "./pages/Home"; 
import Planner from "./pages/Planner";
import Finder from "./pages/Finder";
import Festivals from "./pages/Festivals";

/**
 * App Component
 * Handles the routing for TN Flow.
 * The layout uses a fixed background defined in index.css.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Authentication Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 2. Main Dashboard / Home */}
        <Route path="/home" element={<Home />} />

        {/* 3. Feature Pages */}
        {/* These paths match the 'Link' tags in your Home.jsx Navbar */}
        <Route path="/planner" element={<Planner />} />
        <Route path="/finder" element={<Finder />} />
        <Route path="/festivals" element={<Festivals />} />

        {/* 4. Catch-all: Redirects any unknown URL to login or home */}
        {/* Use Navigate to="/home" if you want logged-in users to stay on dashboard */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;