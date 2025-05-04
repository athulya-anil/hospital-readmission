import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const ReadmissionByMedication = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv('/hospital-readmission/hospital_readmissions.csv').then((data) => {
      const filtered = data.filter(d => d.medication && d.readmitted);

      const rates = Array.from(
        d3.rollup(
          filtered,
          v => d3.mean(v, d => d.readmitted === 'yes' ? 1 : 0) * 100,
          d => d.medication
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

  if (!plotData) return <p>Loading medication chart...</p>;

  return (
    <Plot
      data={[
        {
          x: plotData.x,
          y: plotData.y,
          type: 'bar',
          orientation: 'h',
          marker: { color: 'rgba(59, 130, 246, 0.7)' }, // Tailwind blue-500
        },
      ]}
      layout={{
        title: 'Top 10 Medications by Readmission Rate',
        xaxis: { title: 'Readmission Rate (%)' },
        yaxis: { title: 'Medication', automargin: true },
        margin: { l: 200, t: 50 },
        height: 500,
      }}
    />
  );
};

export default ReadmissionByMedication;

