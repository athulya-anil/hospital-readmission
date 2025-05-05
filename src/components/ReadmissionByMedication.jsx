import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const ReadmissionByMedication = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv('/hospital-readmission/hospital_readmissions.csv').then((data) => {
      const filtered = data.filter(d => d.n_medications && d.readmitted);
      const parsed = filtered.map(d => ({
        n_medications: +d.n_medications,
        readmitted: d.readmitted.trim().toLowerCase() === 'yes' ? 1 : 0,
      }));

      const rateMap = d3.rollup(
        parsed,
        v => d3.mean(v, d => d.readmitted) * 100,
        d => d.n_medications
      );

      const sorted = Array.from(rateMap.entries()).sort((a, b) => a[0] - b[0]);
      const x = sorted.map(d => d[0]);
      const y = sorted.map(d => d[1]);

      const peakPoints = sorted.filter(([_, val]) => val >= 100).map(([x, y]) => ({ x, y }));

      setPlotData({ x, y, peaks: peakPoints });
    });
  }, []);

  if (!plotData) return <p>Loading readmission chart...</p>;

  return (
    <Plot
      data={[
        {
          x: plotData.x,
          y: plotData.y,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Readmission Rate',
          line: { color: '#1d4ed8', width: 2 },
          marker: { color: '#1d4ed8', size: 4 },
        },
        {
          x: plotData.peaks.map(p => p.x),
          y: plotData.peaks.map(p => p.y),
          type: 'scatter',
          mode: 'markers',
          name: '100% Readmission',
          marker: {
            color: 'red',
            symbol: 'x',
            size: 6,        // smaller size
            opacity: 0.9    // optional: slightly transparent
            // no outline
          },
        },
      ]}
      layout={{
        title: 'Readmission by Medication',
        xaxis: {
          title: 'Number of Medications Prescribed at Admission',
        },
        yaxis: {
          title: 'Readmission Rate (%)',
          range: [0, 110],
        },
        height: 500,
        margin: { t: 80, b: 60, l: 70, r: 40 },
        legend: {
          orientation: 'h',
          y: -0.2,
        },
      }}
    />
  );
};

export default ReadmissionByMedication;

