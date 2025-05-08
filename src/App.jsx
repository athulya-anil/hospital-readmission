import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import USMap from "./components/USMap";
import ByAgeGroupPage from "./pages/ByAgeGroupPage";
import ByConditionPage from "./pages/ByConditionPage";
import ByLengthOfStayPage from "./pages/ByLengthOfStayPage";
import ByDiagnosisPage from "./pages/ByDiagnosisPage";
import ByMedicationPage from "./pages/ByMedicationPage";
import HomePage from "./components/HomePage";
import { NavLink } from "react-router-dom";

const App = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800 text-center lg:text-left">
              Hospital Readmission Trends
            </h1>

            <ul className="flex flex-wrap justify-center lg:justify-end gap-3 text-sm font-medium text-gray-600">
              <li>
                <NavLink
                  to="/hospital-readmission/"
                  className={({ isActive }) =>
                    isActive &&
                    window.location.pathname === "/hospital-readmission/"
                      ? "text-blue-600 font-semibold transition-colors"
                      : "hover:text-blue-600 transition-colors"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hospital-readmission/by-age-group"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold transition-colors"
                      : "hover:text-blue-600 transition-colors"
                  }
                >
                  By Age Group
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hospital-readmission/by-length-of-stay"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold transition-colors"
                      : "hover:text-blue-600 transition-colors"
                  }
                >
                  By Length of Stay
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hospital-readmission/by-condition"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold transition-colors"
                      : "hover:text-blue-600 transition-colors"
                  }
                >
                  By Condition
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hospital-readmission/by-diagnosis"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold transition-colors"
                      : "hover:text-blue-600 transition-colors"
                  }
                >
                  By Diagnosis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hospital-readmission/by-medication"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold transition-colors"
                      : "hover:text-blue-600 transition-colors"
                  }
                >
                  By Number of Medications
                </NavLink>
              </li>
              <li>
                <a
                  href="/hospital-readmission/process-book.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors font-bold"
                >
                  Process Book
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-colors font-bold"
                >
                  Demo
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Route-based Content */}
      <main className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/hospital-readmission/" element={<HomePage />} />
          <Route
            path="/hospital-readmission/by-age-group"
            element={<ByAgeGroupPage />}
          />
          <Route
            path="/hospital-readmission/by-length-of-stay"
            element={<ByLengthOfStayPage />}
          />
          <Route
            path="/hospital-readmission/by-condition"
            element={<ByConditionPage />}
          />
          <Route
            path="/hospital-readmission/by-diagnosis"
            element={<ByDiagnosisPage />}
          />
          <Route
            path="/hospital-readmission/by-medication"
            element={<ByMedicationPage />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
