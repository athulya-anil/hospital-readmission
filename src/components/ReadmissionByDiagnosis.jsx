import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Plot from "react-plotly.js";

const ReadmissionByDiagnosis = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv("/hospital-readmission/hospital_readmissions.csv").then((data) => {
      const filtered = data.filter((d) => d.diag_1 && d.readmitted === "yes");

      const diagnosisCounts = Array.from(
        d3.rollup(
          filtered,
          (v) => v.length,
          (d) => d.diag_1
        )
      );

      // Sort and take top 10 most common diagnoses among readmitted
      const topDiagnoses = diagnosisCounts
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      const labels = topDiagnoses.map((d) => d[0]);
      const values = topDiagnoses.map((d) => d[1]);

      setPlotData({ labels, values });
    });
  }, []);

  if (!plotData) return <p></p>;

  return (
    <div className="border rounded-lg shadow bg-white p-6 w-full max-w-3xl mx-auto">
      <Plot
        data={[
          {
            type: "pie",
            labels: plotData.labels,
            values: plotData.values,
            hole: 0.4,
            textinfo: "label+percent",
            marker: {
              colors: [
                "#FF9999",
                "#66B3FF",
                "#99FF99",
                "#FFCC99",
                "#FFD700",
                "#C71585",
                "#8A2BE2",
                "#FF6347",
                "#00BFFF",
                "#98FB98",
              ],
            },
          },
        ]}
        layout={{
          height: 500,
          showlegend: true,
          legend: {
            font: { size: 14 },
          },
          margin: { t: 50, b: 50, l: 50, r: 50 },
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

export default ReadmissionByDiagnosis;
