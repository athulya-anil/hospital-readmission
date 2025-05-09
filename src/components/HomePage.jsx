import React, { useEffect } from "react";
import USMap from "./USMap";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full px-4">
      <div className="w-full py-10">
        <h2 className="text-3xl font-bold mb-4 text-slate-800 text-center">
          Hospital Readmission Dashboard
        </h2>
        <p className="text-gray-700 text-base mx-auto text-justify w-full max-w-5xl">
          This interactive dashboard visualizes hospital readmission rates across the United States using Medicare data from the Centers for Medicare & Medicaid Services (CMS). 
          The map highlights geographic variations in readmission rates. Interact with the visualization by hovering over states to view detailed statistics 
          and clicking to display top hospitals within that region. Use the navigation bar above to explore readmission patterns by age group, length of stay, medical condition, and other dimensions.
        </p>
      </div>

      <main className="w-full">
        <USMap />
      </main>
    </div>
  );
};

export default HomePage;