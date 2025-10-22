// File: src/components/BatchUpload.jsx
// CSV upload component. Validates file type, POSTs to /predict-batch (multipart/form-data).
import React, { useState } from "react";
import { predictBatch } from "../api";
import Papa from "papaparse";

export default function BatchUpload({ demoMode = true, onBatchResult }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  function handleFileSelect(e) {
    setFile(e.target.files[0]);
    setResults(null);
    setError(null);
  }

  async function handleUpload() {
    if (!file) { setError("Please select a CSV file."); return; }
    if (!file.name.match(/\.csv$/i)) { setError("Only CSV files are accepted."); return; }

    setError(null);
    setProgress(0);

    if (demoMode) {
      // parse CSV and mock predictions row by row
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (res) => {
          const rows = res.data.slice(0,100); // limit for demo
          const mocked = rows.map((r, idx) => {
            const p = mockPredictRow(r, idx);
            return { id: idx + 1, input: r, ...p };
          });
          setResults(mocked);
          onBatchResult && onBatchResult(mocked);
        }
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const data = await predictBatch(formData, (evt) => {
        if (evt.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
      });
      setResults(data);
      onBatchResult && onBatchResult(data);
    } catch (err) {
      console.error(err);
      setError("Batch upload failed.");
    }
  }

  return (
    <div className="page" aria-labelledby="batch-upload">
      <h3 id="batch-upload">Batch Upload (CSV)</h3>
      <p className="small">CSV must contain header row with columns matching the expected fields (age, monthly_income, loan_amount, etc.).</p>
      <input type="file" accept=".csv,text/csv" onChange={handleFileSelect} />
      <div style={{marginTop:8}}>
        <button className="button" onClick={handleUpload}>Upload & Predict</button>
      </div>

      {progress > 0 && <div style={{marginTop:8}} className="progress"><span style={{width:`${progress}%`}}></span></div>}
      {error && <div className="error">{error}</div>}

      {results && (
        <div style={{marginTop:12}}>
          <h4>Batch Results</h4>
          <table className="table" aria-label="Batch results">
            <thead><tr><th>#</th><th>Prediction</th><th>Prob</th></tr></thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.id ?? i+1}</td>
                  <td>{r.prediction}</td>
                  <td>{Math.round((r.probability ?? 0) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// simple row mock
function mockPredictRow(row, i) {
  const monthly_income = Number(row.monthly_income || row.income || 1000);
  const loan_amount = Number(row.loan_amount || row.loan || 500);
  const base=0.2 + Math.min(0.6, Math.max(0, (loan_amount / Math.max(1, monthly_income) - 2) * 0.15));
  const prob = Math.max(0.02, Math.min(0.98, base));
  return {
    prediction: prob > 0.5 ? "Default" : "No Default",
    probability: Number(prob.toFixed(3)),
    shap_values: { monthly_income: -0.1, loan_amount: 0.2 }
  };
}
