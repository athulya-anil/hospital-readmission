import React from "react";
import ReadmissionByDiagnosis from "../components/ReadmissionByDiagnosis";

const ByDiagnosisPage = () => {
  return (
    <div className="p-6"> 
      <div className="w-full py-5 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Top Diagnoses for Readmitted Patients
        </h2>
        <p className="text-gray-700 text-base mx-auto text-center max-w-5xl">
          This donut chart shows the top primary diagnoses associated with readmissions, displayed by the readmission rates.
        </p>
      </div>   
      <ReadmissionByDiagnosis />
    </div>
  );
};

export default ByDiagnosisPage;