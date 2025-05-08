import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Plot from "react-plotly.js";

const ReadmissionByCondition = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv("/hospital-readmission/hospital_readmissions.csv").then((data) => {
      const filtered = data.filter(
        (d) =>
          d.readmitted &&
          d.medical_specialty &&
          d.medical_specialty !== "Missing"
      );

      const conditionRates = Array.from(
        d3.rollup(
          filtered,
          (v) => d3.mean(v, (d) => (d.readmitted === "yes" ? 1 : 0)) * 100,
          (d) => d.medical_specialty
        )
      );

      // Sort by highest readmission rate and take top 10
      const topConditions = conditionRates
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      const x = topConditions.map((d) => d[0]); // medical_specialty
      const y = topConditions.map((d) => d[1]); // rate

      setPlotData({ x, y });
    });
  }, []);

  if (!plotData) return <p></p>;

  return (
    <div className="border rounded-lg shadow bg-white p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4 text-center">
        📈 Top 10 Medical Specialties by Readmission Rate
      </h2>
      <Plot
        data={[
          {
            x: plotData.x,
            y: plotData.y,
            type: "bar",
            marker: { color: "rgba(255, 99, 132, 0.7)" },
            hovertemplate: "%{x}<br>Rate: %{y}%<extra></extra>",
          },
        ]}
        layout={{
          xaxis: {
            title: {
              text: "Medical Specialty",
              font: { size: 16 },
            },
            tickangle: -45,
            tickfont: { size: 14 },
          },
          yaxis: {
            title: {
              text: "Readmission Rate (%)",
              font: { size: 16 },
            },
            tickfont: { size: 14 },
          },
          margin: { b: 150, t: 50, l: 60, r: 20 },
          height: 450,
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

export default ReadmissionByCondition;
