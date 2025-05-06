import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const ReadmissionByCondition = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv('/hospital-readmission/hospital_readmissions.csv').then((data) => {
      const filtered = data.filter(
        (d) => d.readmitted && d.medical_specialty && d.medical_specialty !== 'Missing'
      );

      const conditionRates = Array.from(
        d3.rollup(
          filtered,
          (v) => d3.mean(v, (d) => (d.readmitted === 'yes' ? 1 : 0)) * 100,
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

  if (!plotData) return <p>Loading chart...</p>;

  return (
    <Plot
      data={[
        {
          x: plotData.x,
          y: plotData.y,
          type: 'bar',
          marker: { color: 'rgba(255, 99, 132, 0.7)' },
        },
      ]}
      layout={{
        title: 'Top 10 Medical Specialties by Readmission Rate',
        xaxis: { title: 'Medical Specialty', tickangle: -45 },
        yaxis: { title: 'Readmission Rate (%)' },
        margin: { b: 150, t: 50 },
        height: 500,
      }}
    />
  );
};

export default ReadmissionByCondition;
