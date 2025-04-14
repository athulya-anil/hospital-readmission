import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const ReadmissionByAge = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv('/hospital-readmission/hospital_readmissions.csv').then((data) => {
      const filtered = data.filter(d => d.age && d.readmitted);

      // Compute average readmission rate for each age group
      const ageRates = Array.from(
        d3.rollup(
          filtered,
          v => d3.mean(v, d => d.readmitted === 'yes' ? 1 : 0) * 100,
          d => d.age
        )
      ).sort((a, b) => {
        // Sort age bins like [40-50), [50-60), ...
        const extract = s => parseInt(s.replace(/[\[\]\(\)]/g, '').split('-')[0]);
        return extract(a[0]) - extract(b[0]);
      });

      const x = ageRates.map(d => d[0]);
      const y = ageRates.map(d => d[1]);

      setPlotData({ x, y });
    });
  }, []);

  if (!plotData) return <p>Loading readmission by age chart...</p>;

  return (
    <Plot
      data={[
        {
          x: plotData.x,
          y: plotData.y,
          type: 'bar',
          marker: { color: 'rgb(88, 29, 153)' },
        },
      ]}
      layout={{
        title: 'Readmission Rate by Age Group',
        xaxis: { title: 'Age Group' },
        yaxis: { title: 'Readmission Rate (%)' },
        margin: { t: 50 },
        height: 450,
      }}
    />
  );
};

export default ReadmissionByAge;

