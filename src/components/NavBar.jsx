// File: src/components/NavBar.jsx
// Top navigation and demo-mode toggle. Links use react-router.
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({ demoMode, setDemoMode }) {
  const loc = useLocation();
  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="brand" aria-hidden>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect width="24" height="24" rx="6" fill="white" opacity="0.12"></rect>
          <path d="M4 12h16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Loan Default Predictor
      </div>

      <div className="right">
        <Link to="/" aria-current={loc.pathname === "/" ? "page" : undefined}>Home</Link>
        <Link to="/predict" aria-current={loc.pathname === "/predict" ? "page" : undefined}>Predict</Link>
        <Link to="/about" aria-current={loc.pathname === "/about" ? "page" : undefined}>About</Link>
        <Link to="/contact" aria-current={loc.pathname === "/contact" ? "page" : undefined}>Contact</Link>

        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <label className="small" htmlFor="demoToggle">Demo</label>
          <input
            id="demoToggle"
            type="checkbox"
            checked={demoMode}
            onChange={(e) => setDemoMode(e.target.checked)}
            aria-label="Toggle demo mode"
          />
        </div>
      </div>
    </nav>
  );
}
