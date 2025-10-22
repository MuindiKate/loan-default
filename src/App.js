// File: src/App.js
// Main App + Routes + Shared state for demo/mocked mode
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import PredictionPage from "./pages/PredictionPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ResultsPanel from "./components/ResultsPanel";

// Global CSS variables are in styles/styles.css

export default function App() {
  // demoMode toggles mocked responses (true) or real backend (false)
  const [demoMode, setDemoMode] = useState(true);
  const [lastResult, setLastResult] = useState(null);

  return (
    <BrowserRouter>
      <NavBar demoMode={demoMode} setDemoMode={setDemoMode} />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/predict"
            element={<PredictionPage demoMode={demoMode} setLastResult={setLastResult} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Results panel shown as a drawer/modal */}
      <ResultsPanel result={lastResult} onClose={() => setLastResult(null)} />
    </BrowserRouter>
  );
}
