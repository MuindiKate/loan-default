// File: src/utils/download.js
// Helper to generate CSV report client-side. Also includes commented example for generating PDF with jsPDF.
export function generateCSVReport({ input, result }) {
  // flatten shap values into CSV-friendly columns
  const header = ["field","value"];
  const inputRows = Object.entries(input).map(([k,v]) => [k, JSON.stringify(v)]);
  const resultRows = [
    ["prediction", result.prediction],
    ["probability", result.probability]
  ];
  const shapRows = [["shap_"+Object.keys(result.shap_values || {}).length, ""]];
  const shapEntries = Object.entries(result.shap_values || {}).map(([k,v]) => [`shap_${k}`, v]);

  const rows = [["Section","Key","Value"]];
  rows.push(["Input","",""]);
  inputRows.forEach(([k,v]) => rows.push(["Input",k,v]));
  rows.push(["Result","",""]);
  resultRows.forEach(([k,v]) => rows.push(["Result",k,v]));
  if (shapEntries.length > 0) {
    rows.push(["SHAP","",""]);
    shapEntries.forEach(([k,v]) => rows.push(["SHAP",k,v]));
  }

  // Convert rows to CSV string
  return rows.map(r => r.map(escapeCsv).join(",")).join("\n");
}

function escapeCsv(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/* PDF example (commented):
import jsPDF from 'jspdf';
export function generatePDF() {
  const doc = new jsPDF();
  doc.text("PDF content", 10, 10);
  doc.save('report.pdf');
}
*/
