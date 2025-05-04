import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const ReadmissionByLengthOfStay = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv('/hospital-readmission/hospital_readmissions.csv').then((data) => {
      const filtered = data.filter(d => d.time_in_hospital && d.readmitted);

      const bucketed = filtered.map(d => {
        const days = +d.time_in_hospital;
        if (days <= 3) return { ...d, bucket: '1–3 days' };
        if (days <= 7) return { ...d, bucket: '4–7 days' };
        if (days <= 14) return { ...d, bucket: '8–14 days' };
        return { ...d, bucket: '15+ days' };
      });

      const rateByBucket = Array.from(
        d3.rollup(
          bucketed,
          v => d3.mean(v, d => d.readmitted === 'yes' ? 1 : 0) * 100,
          d => d.bucket
        )
      ).sort((a, b) => {
        const order = ['1–3 days', '4–7 days', '8–14 days', '15+ days'];
        return order.indexOf(a[0]) - order.indexOf(b[0]);
      });

      const x = rateByBucket.map(d => d[0]);
      const y = rateByBucket.map(d => d[1]);

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
          marker: { color: 'rgba(34, 197, 94, 0.7)' }, // Tailwind green-500
        },
      ]}
      layout={{
        title: 'Readmission Rate by Length of Stay',
        xaxis: { title: 'Hospital Stay Duration' },
        yaxis: { title: 'Readmission Rate (%)' },
        margin: { t: 50 },
        height: 450,
      }}
    />
  );
};

export default ReadmissionByLengthOfStay;

