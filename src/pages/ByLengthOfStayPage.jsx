import React from "react";
import ReadmissionByLengthOfStay from "../components/ReadmissionByLengthOfStay";

const ByLengthOfStayPage = () => {
  return (
    <div className="p-6"> 
      <div className="w-full py-5 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Readmission Rates by Length of Stay in Hospital
        </h2>
        <p className="text-gray-700 text-base mx-auto text-center max-w-5xl">
          This line chart depicts readmission rates by length of initial hospital stay (in days). Hover over any point to see the exact rate for that day.
        </p>
      </div>   
      <ReadmissionByLengthOfStay />
    </div>
  );
};

export default ByLengthOfStayPage;