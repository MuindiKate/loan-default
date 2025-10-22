// File: src/pages/PredictionPage.jsx
// Prediction page wraps the PredictionForm and BatchUpload components and will receive the returned result to show.
import React, { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import BatchUpload from "../components/BatchUpload";

export default function PredictionPage({ demoMode, setLastResult }) {
  return (
    <section className="page" aria-labelledby="predict-heading">
      <h1 id="predict-heading">Predict Loan Default</h1>
      <p className="small">Provide customer details below, or upload a CSV to run batch predictions.</p>

      <div style={{marginTop:12}}>
        <PredictionForm demoMode={demoMode} onResult={setLastResult} />
      </div>

      <div style={{marginTop:20}}>
        <BatchUpload demoMode={demoMode} onBatchResult={(data) => {
          // After batch success, show first result in drawer and log console
          if (Array.isArray(data) && data.length > 0) {
            setLastResult(data[0]);
          }
          console.log("Batch results:", data);
        }} />
      </div>
    </section>
  );
}
