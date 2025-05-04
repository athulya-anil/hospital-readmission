import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const ReadmissionByDiagnosis = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv('/hospital-readmission/hospital_readmissions.csv').then((data) => {
      const filtered = data.filter(d => d.diagnosis && d.readmitted);

      const rates = Array.from(
        d3.rollup(
          filtered,
          v => d3.mean(v, d => d.readmitted === 'yes' ? 1 : 0) * 100,
          d => d.diagnosis
        )
      );

      const top = rates
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      const x = top.map(d => d[1]);
      const y = top.map(d => d[0]);

      setPlotData({ x, y });
    });
  }, []);

  if (!plotData) return <p>Loading diagnosis chart...</p>;

  return (
    <Plot
      data={[
        {
          x: plotData.x,
          y: plotData.y,
          type: 'bar',
          orientation: 'h',
          marker: { color: 'rgba(234, 88, 12, 0.7)' }, // Tailwind orange-600
        },
      ]}
      layout={{
        title: 'Top 10 Diagnoses by Readmission Rate',
        xaxis: { title: 'Readmission Rate (%)' },
        yaxis: { title: 'Diagnosis', automargin: true },
        margin: { l: 200, t: 50 },
        height: 500,
      }}
    />
  );
};

export default ReadmissionByDiagnosis;

