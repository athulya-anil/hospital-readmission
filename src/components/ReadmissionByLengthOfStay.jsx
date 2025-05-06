import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const ReadmissionByLengthOfStay = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv('/hospital-readmission/hospital_readmissions.csv').then((data) => {
      const filtered = data.filter(d => d.time_in_hospital && d.readmitted !== '');

      const parsed = filtered.map(d => ({
        ...d,
        time_in_hospital: +d.time_in_hospital,
        readmitted: d.readmitted.trim().toLowerCase(),
      }));

      const rateByDay = Array.from(
        d3.rollup(
          parsed,
          v => d3.mean(v, d => d.readmitted === 'yes' ? 1 : 0) * 100,
          d => d.time_in_hospital
        )
      ).sort((a, b) => a[0] - b[0]);

      const x = rateByDay.map(d => d[0]);
      const y = rateByDay.map(d => d[1]);

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
          type: 'scatter',
          mode: 'lines+markers',
          line: { shape: 'linear' },
          marker: { size: 6, color: 'rgba(34, 197, 94, 0.8)' },
        },
      ]}
      layout={{
        title: 'Readmission Rate by Hospital Stay (Daily)',
        xaxis: { title: 'Days in Hospital', dtick: 1 },
        yaxis: { title: 'Readmission Rate (%)' },
        margin: { t: 50 },
        height: 450,
      }}
    />
  );
};

export default ReadmissionByLengthOfStay;

