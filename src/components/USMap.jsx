import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { stateData } from "../statedata";
import { CMS_dataset } from "../cms_hospitals";
import { stateAbbreviationToName } from "../stateAbbreviations";

const USMapWithHospitals = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const states = Object.keys(stateData);
  const rates = states.map((abbr) => stateData[abbr].rate);

  const hoverText = states.map((abbr) => {
    const { rate, discharges, readmissions } = stateData[abbr];
    return (
      `${abbr}<br>` +
      `Readmission Rate: ${rate.toFixed(2)}%<br>` +
      `Discharges: ${discharges.toLocaleString()}<br>` +
      `Readmissions: ${readmissions.toLocaleString()}`
    );
  });

  useEffect(() => {
    if (selectedState) {
      const filtered = CMS_dataset.filter(
        (hosp) => hosp.state === selectedState
      ).sort((a, b) => {
        const rateA = a.rateOfReadmission;
        const rateB = b.rateOfReadmission;

        if (rateA === null || rateA === undefined) return 1; // a goes after b
        if (rateB === null || rateB === undefined) return -1; // b goes after a
        return rateB - rateA; // Descending order
      });

      setFilteredHospitals(filtered);
    } else {
      setFilteredHospitals([]);
    }
  }, [selectedState]);

  const handleClick = (event) => {
    const clickedState = event.points[0].location;
    setSelectedState(clickedState);
  };

  const fullStateName = selectedState
    ? stateAbbreviationToName[selectedState]
    : null;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 p-6 bg-gray-50 min-h-screen">
      {/* Map Section */}
      <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Hospital Readmission Rates by State
        </h2>
        <div className="overflow-x-auto">
          <Plot
            data={[
              {
                type: "choropleth",
                locationmode: "USA-states",
                locations: states,
                z: rates,
                text: hoverText,
                hoverinfo: "text",
                zmin: 10,
                zmax: 19,
                colorscale: [
                  [0, "#f2f0f7"],
                  [0.125, "#dadaeb"],
                  [0.25, "#bcbddc"],
                  [0.375, "#9e9ac8"],
                  [0.5, "#807dba"],
                  [0.625, "#6a51a3"],
                  [0.75, "#54278f"],
                  [0.875, "#3f007d"],
                  [1, "#2f005a"],
                ],
                colorbar: {
                  title: "Readmission Rate (%)",
                  thickness: 15,
                  len: 0.75,
                },
                marker: {
                  line: {
                    color: "white",
                    width: 1,
                  },
                },
              },
            ]}
            layout={{
              geo: {
                scope: "usa",
                showlakes: true,
                lakecolor: "rgb(255, 255, 255)",
              },
              projection: {
                type: "albers usa",
                scale: 1,
              },
              fitbounds: "locations",
              margin: { t: 20, b: 0, l: 0, r: 0 },
              height: 600,
              width: 900,
            }}
            config={{
              responsive: true,
              scrollZoom: false, // prevents accidental zoom-out on scroll
            }}
            style={{ width: "100%", maxWidth: "900px" }}
            onClick={handleClick}
          />
        </div>
      </div>

      {/* Hospital Table Section */}
      <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {fullStateName
            ? `Top Hospitals in ${fullStateName}`
            : "Top Hospitals in Selected State"}
        </h2>

        <div className="overflow-y-auto max-h-[610px]">
          <table className="min-w-full text-sm border-separate border-spacing-y-2">
            <thead className="bg-gray-100 text-gray-700 font-medium sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2 text-left">Facility Name</th>
                <th className="px-3 py-2 text-center">Discharges</th>
                <th className="px-3 py-2 text-center">Readmissions</th>
                <th className="px-3 py-2 text-center">Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {selectedState ? (
                filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hosp) => (
                    <tr
                      key={hosp.id}
                      className="bg-white border rounded-md shadow-sm hover:bg-gray-50 transition"
                    >
                      <td className="px-3 py-2">{hosp.name}</td>
                      <td className="px-3 py-2 text-center">
                        {hosp.numberOfDischarges
                          ? hosp.numberOfDischarges.toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {hosp.numberOfReadmissions
                          ? hosp.numberOfReadmissions.toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {hosp.rateOfReadmission
                          ? `${hosp.rateOfReadmission}%`
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 text-gray-500 italic"
                    >
                      No hospitals found for this state.
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    Select a state to view hospitals.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default USMapWithHospitals;
