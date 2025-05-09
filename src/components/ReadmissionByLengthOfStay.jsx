import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Plot from "react-plotly.js";

const ReadmissionByLengthOfStay = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv("/hospital-readmission/hospital_readmissions.csv").then((data) => {
      const filtered = data.filter(
        (d) => d.time_in_hospital && d.readmitted !== ""
      );

      const parsed = filtered.map((d) => ({
        ...d,
        time_in_hospital: +d.time_in_hospital,
        readmitted: d.readmitted.trim().toLowerCase(),
      }));

      const rateByDay = Array.from(
        d3.rollup(
          parsed,
          (v) => d3.mean(v, (d) => (d.readmitted === "yes" ? 1 : 0)) * 100,
          (d) => d.time_in_hospital
        )
      ).sort((a, b) => a[0] - b[0]);

      const x = rateByDay.map((d) => d[0]);
      const y = rateByDay.map((d) => d[1]);

      setPlotData({ x, y });
    });
  }, []);

  if (!plotData) return <p></p>;

  return (
    <div className="border rounded-lg shadow bg-white p-6 w-full max-w-3xl mx-auto">
      <Plot
        data={[
          {
            x: plotData.x,
            y: plotData.y,
            type: "scatter",
            mode: "lines+markers",
            line: {
              shape: "linear",
              color: "rgba(34, 197, 94, 1)",
              width: 2,
            },
            marker: {
              size: 6,
              color: "rgba(34, 197, 94, 0.8)",
              line: {
                color: "white",
                width: 1,
              },
            },
            hovertemplate: "Day %{x}<br>Rate: %{y}%<extra></extra>",
          },
        ]}
        layout={{
          xaxis: {
            title: {
              text: "Days in Hospital",
              font: { size: 16 },
            },
            tickfont: { size: 14 },
            dtick: 1,
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

export default ReadmissionByLengthOfStay;
