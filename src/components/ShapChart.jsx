// File: src/components/ShapChart.jsx
// Renders SHAP values as a simple horizontal bar chart using Chart.js (react-chartjs-2).
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

export default function ShapChart({ shapValues = {} }) {
  const labels = Object.keys(shapValues);
  const data = Object.values(shapValues).map(v => Number(v));

  const chartData = useMemo(() => ({
    labels,
    datasets: [{
      label: "SHAP value",
      data,
      // We intentionally do not specify colors here so Chart.js picks defaults; styling can be added
    }]
  }), [labels, data]);

  if (labels.length === 0) return <p className="small">No SHAP explanation available.</p>;

  return (
    <div>
      <h4>Feature importance (SHAP)</h4>
      <div style={{height:240}}>
        <Bar data={chartData} options={{
          indexAxis: "y",
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { callback: (v) => v } }
          }
        }} />
      </div>
    </div>
  );
}
