import React from "react";
import ReadmissionByAge from "../components/ReadmissionByAge";

const ByAgeGroupPage = () => {
  return (
    <div className="p-6"> 
      <div className="w-full py-5 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
         Readmission Rate by Age Group
        </h2>
        <p className="text-gray-700 text-base mx-auto text-justify w-full max-w-5xl">
         This chart illustrates how hospital readmission rates vary across different age groups, showing a pattern of increasing risk with age. 
        </p>
      </div>   
      <ReadmissionByAge />
    </div>
  );
};

export default ByAgeGroupPage;