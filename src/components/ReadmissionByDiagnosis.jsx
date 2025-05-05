import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

const ReadmissionByDiagnosis = () => {
  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    d3.csv('/hospital-readmission/hospital_readmissions.csv').then((data) => {
      // Filter for rows with a diagnosis and that were readmitted
      const filtered = data.filter(d => d.diag_1 && d.readmitted === 'yes');

      // Count readmitted patients per diagnosis code
      const diagnosisCounts = Array.from(
        d3.rollup(
          filtered,
          v => v.length,
          d => d.diag_1
        )
      );

      // Sort and take top 10 most common diagnoses among readmitted
      const topDiagnoses = diagnosisCounts
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      const labels = topDiagnoses.map(d => d[0]);
      const values = topDiagnoses.map(d => d[1]);

      setPlotData({ labels, values });
    });
  }, []);

  if (!plotData) return <p>Loading diagnosis chart...</p>;

  return (
    <Plot
      data={[
        {
          type: 'pie',
          labels: plotData.labels,
          values: plotData.values,
          hole: 0.4, // donut chart
          textinfo: 'label+percent',
        },
      ]}
      layout={{
        title: 'Top 10 Diagnoses for Readmitted Patients (by Count)',
        height: 500,
        showlegend: true,
      }}
    />
  );
};

export default ReadmissionByDiagnosis;


