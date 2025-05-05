import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import USMap from "./components/USMap";
import ByAgeGroupPage from "./pages/ByAgeGroupPage";
import ByConditionPage from "./pages/ByConditionPage";
import ByLengthOfStayPage from "./pages/ByLengthOfStayPage";
import ByDiagnosisPage from "./pages/ByDiagnosisPage";
import ByMedicationPage from "./pages/ByMedicationPage";


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
	    <li><Link to="/by-condition" className="hover:text-blue-500">By Condition</Link></li>
	    <li><Link to="/by-length-of-stay" className="hover:text-blue-500">By Length of Stay</Link></li>
	    <li><Link to="/by-diagnosis" className="hover:text-blue-500">By Diagnosis</Link></li>
	    <li><Link to="/by-medication" className="hover:text-blue-500">By Medication</Link></li>
            <li>
              <a
               href="/hospital-readmission/process-book.pdf"
               className="hover:text-blue-500"
               target="_blank"
               rel="noopener noreferrer"
              >
               Process Book
              </a>
            </li>
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
	<Route path="/by-condition" element={<ByConditionPage />} />
	<Route path="/by-length-of-stay" element={<ByLengthOfStayPage />} />
	<Route path="/by-diagnosis" element={<ByDiagnosisPage />} />
	<Route path="/by-medication" element={<ByMedicationPage />} />
      </Routes>
    </div>
  );
};

export default App;

