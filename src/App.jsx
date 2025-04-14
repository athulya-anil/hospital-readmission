import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import USMap from "./components/USMap";
import ByAgeGroupPage from "./pages/ByAgeGroupPage";

const App = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Hospital Readmission Trends
          </h1>
          <ul className="flex space-x-4 text-gray-600 font-medium">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/by-age-group" className="hover:text-blue-500">By Age Group</Link></li>
            <li><a href="#" className="hover:text-blue-500">By Condition</a></li>
            <li><a href="#" className="hover:text-blue-500">By Length of Stay</a></li>
            <li><a href="#" className="hover:text-blue-500">By Diagnoses</a></li>
            <li><a href="#" className="hover:text-blue-500">By Medication</a></li>
            <li><a href="#" className="hover:text-blue-500">Process Book</a></li>
            <li><a href="#" className="hover:text-blue-500">Demo</a></li>
          </ul>
        </nav>
      </header>

      {/* Route-based content */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              {/* Overview */}
              <section className="px-6 py-6 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-gray-700 max-w-3xl">
                  This interactive dashboard visualizes hospital readmission rates across the United States using CMS data. Hover over a state to view detailed statistics including discharge count and readmissions.
                </p>
              </section>

              {/* US Map Section */}
              <main className="p-6">
                <USMap />
              </main>
            </>
          }
        />

        {/* By Age Group Page */}
        <Route path="/by-age-group" element={<ByAgeGroupPage />} />
      </Routes>
    </div>
  );
};

export default App;

