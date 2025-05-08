import React, { useEffect } from "react";
import USMap from "./USMap";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full px-4">
      <div className="w-full py-10 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Hospital Readmission Dashboard
        </h2>
        <p className="text-gray-700 text-base max-w-2xl mx-auto">
          This interactive dashboard visualizes hospital readmission rates
          across the United States using CMS data. Hover over a state to view
          detailed statistics including discharge count and readmissions.
        </p>
      </div>

      <main className="w-full">
        <USMap />
      </main>
    </div>
  );
};

export default HomePage;
