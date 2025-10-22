// File: src/components/History.jsx
// Shows recent predictions stored in localStorage, allows quick re-run.
import React, { useEffect, useState } from "react";

const STORAGE_KEY = "loan_predict_history_v1";

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  }

  if (!items || items.length === 0) return <p className="small">No recent predictions yet.</p>;

  return (
    <div>
      <table className="table" aria-label="Prediction history">
        <thead>
          <tr><th>Name</th><th>Prediction</th><th>Probability</th><th>When</th></tr>
        </thead>
        <tbody>
          {items.slice(0,10).map((it, idx) => (
            <tr key={idx}>
              <td>{it.input?.name || "—"}</td>
              <td>{it.result?.prediction}</td>
              <td>{Math.round((it.result?.probability ?? 0) * 100)}%</td>
              <td className="small">{new Date(it.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:8}}>
        <button className="button secondary" onClick={clearAll}>Clear History</button>
      </div>
    </div>
  );
}
