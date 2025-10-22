// File: src/components/ResultsPanel.jsx
// Popover/drawer that shows the latest result. Also includes button to generate PDF via jsPDF example.
import React from "react";
import jsPDF from "jspdf";

export default function ResultsPanel({ result, onClose }) {
  if (!result) return null;
  const probPct = Math.round((result.probability ?? 0) * 100);

  function downloadPdf() {
    // Simple jsPDF demo - includes input summary & SHAP
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Prediction Report", 14, 20);
    doc.setFontSize(11);
    doc.text(`Prediction: ${result.prediction}`, 14, 36);
    doc.text(`Probability: ${probPct}%`, 14, 46);
    let y = 60;
    doc.text("SHAP values:", 14, y);
    y += 8;
    if (result.shap_values) {
      Object.entries(result.shap_values).forEach(([k,v]) => {
        doc.text(`${k}: ${v}`, 14, y);
        y += 8;
      });
    } else {
      doc.text("— none —", 14, y);
    }
    doc.save(`prediction_${Date.now()}.pdf`);
  }

  return (
    <aside className="drawer" role="dialog" aria-modal="true" aria-label="Prediction result">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <div className="title">Prediction Result</div>
          <div className="small">Prediction: <strong>{result.prediction}</strong></div>
          <div className="small">Probability: <strong>{probPct}%</strong></div>
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:8}}>
          <button className="button secondary" onClick={onClose}>Close</button>
          <button className="button" onClick={downloadPdf}>Download PDF</button>
        </div>
      </div>
      <div style={{marginTop:12}}>
        <div className="small">SHAP details (top features)</div>
        <ul>
          {result.shap_values && Object.entries(result.shap_values).slice(0,6).map(([k,v]) => (
            <li key={k}>{k}: {Number(v).toFixed(3)}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
