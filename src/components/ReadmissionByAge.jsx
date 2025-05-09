import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Plot from "react-plotly.js";

const ReadmissionByAge = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv("/hospital-readmission/hospital_readmissions.csv").then((data) => {
      const filtered = data.filter((d) => d.age && d.readmitted);

      // Compute average readmission rate for each age group
      const ageRates = Array.from(
        d3.rollup(
          filtered,
          (v) => d3.mean(v, (d) => (d.readmitted === "yes" ? 1 : 0)) * 100,
          (d) => d.age
        )
      ).sort((a, b) => {
        // Sort age bins like [40-50), [50-60), ...
        const extract = (s) =>
          parseInt(s.replace(/[\[\]\(\)]/g, "").split("-")[0]);
        return extract(a[0]) - extract(b[0]);
      });

      const x = ageRates.map((d) => d[0]);
      const y = ageRates.map((d) => d[1]);

      setPlotData({ x, y });
    });
  }, []);

  if (!plotData) return <p>Loading readmission by age chart...</p>;

  return (
    <div className="border rounded-lg shadow bg-white p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4 text-center">
        Readmission Rate by Age Group
      </h2>
      <Plot
        data={[
          {
            x: plotData.x,
            y: plotData.y,
            type: "bar",
            marker: {
              color: "rgba(234, 139, 56, 0.8)",
              line: {
                width: 1.5,
                color: "rgba(234, 139, 56, 0.8)",
              },
            },
            hovertemplate: "%{x}<br>Rate: %{y}%<extra></extra>",
          },
        ]}
        layout={{
          title: {
            text: "",
          },
          xaxis: {
            title: {
              text: "Age Group",
              font: { size: 16 },
            },
            tickfont: { size: 14 },
            tickangle: -45,
          },
          yaxis: {
            title: {
              text: "Readmission Rate (%)",
              font: { size: 16 },
            },
            tickfont: { size: 14 },
          },
          margin: { t: 20, b: 80, l: 60, r: 20 },
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

export default ReadmissionByAge;
