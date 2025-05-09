import React from "react";
import ReadmissionByCondition from "../components/ReadmissionByCondition";

const ByConditionPage = () => {
  return (
    <div className="p-6"> 
      <div className="w-full py-5 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Readmission Rate by Specialty of the Practitioner
        </h2>
        <p className="text-gray-700 text-base mx-auto text-center max-w-5xl">
          This chart shows how hospital readmission rates vary based on the medical specialty of the provider who treated the patients.
        </p>
      </div>   
      <ReadmissionByCondition />
    </div>
  );
};

export default ByConditionPage;