import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Plot from "react-plotly.js";

const ReadmissionByMedication = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv("/hospital-readmission/hospital_readmissions.csv").then((data) => {
      const filtered = data.filter((d) => d.n_medications && d.readmitted);
      const parsed = filtered.map((d) => ({
        n_medications: +d.n_medications,
        readmitted: d.readmitted.trim().toLowerCase() === "yes" ? 1 : 0,
      }));

      const rateMap = d3.rollup(
        parsed,
        (v) => d3.mean(v, (d) => d.readmitted) * 100,
        (d) => d.n_medications
      );

      const sorted = Array.from(rateMap.entries()).sort((a, b) => a[0] - b[0]);
      const x = sorted.map((d) => d[0]);
      const y = sorted.map((d) => d[1]);

      const peakPoints = sorted
        .filter(([_, val]) => val >= 100)
        .map(([x, y]) => ({ x, y }));

      setPlotData({ x, y, peaks: peakPoints });
    });
  }, []);

  if (!plotData) return <></>;

  return (
    <div className="border rounded-lg shadow bg-white p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4 text-center">
        💊 Number of Distinct Medications Administered
      </h2>
      <Plot
        data={[
          {
            x: plotData.x,
            y: plotData.y,
            type: "scatter",
            mode: "lines+markers",
            name: "Readmission Rate",
            line: { color: "#1d4ed8", width: 2 },
            marker: { color: "#1d4ed8", size: 6 },
          },
          {
            x: plotData.peaks.map((p) => p.x),
            y: plotData.peaks.map((p) => p.y),
            type: "scatter",
            mode: "markers",
            name: "100% Readmission",
            marker: {
              color: "red",
              symbol: "x",
              size: 8,
              opacity: 0.9,
            },
          },
        ]}
        layout={{
          xaxis: {
            tickfont: { size: 14 },
          },
          yaxis: {
            title: {
              text: "Readmission Rate (%)",
              font: { size: 16 },
            },
            tickfont: { size: 14 },
            range: [0, 110],
          },
          height: 500,
          margin: { t: 80, b: 60, l: 70, r: 40 },
          legend: {
            orientation: "h",
            y: -0.2,
            font: { size: 14 },
          },
          plot_bgcolor: "#f9f9fb",
          paper_bgcolor: "#ffffff",
        }}
        config={{
          responsive: true,
          displayModeBar: false,
        }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ReadmissionByMedication;
