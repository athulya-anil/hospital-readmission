import React from "react";
import ReadmissionByMedication from "../components/ReadmissionByMedication";

const ByMedicationPage = () => {
  return (
    <div className="p-6"> 
      <div className="w-full py-5 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Readmission Rates by Number of Medications Administered
        </h2>
        <p className="text-gray-700 text-base mx-auto text-center max-w-5xl">
          This graph reveals the relationship between the number of distinct medications a patient receives and chances of hospital readmission.
        </p>
      </div>   
      <ReadmissionByMedication />
    </div>
  );
};

export default ByMedicationPage;