import React from 'react';
import ReadmissionByAge from '../components/ReadmissionByAge';

const ByAgeGroupPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Readmission by Age Group</h2>
      <ReadmissionByAge />
    </div>
  );
};

export default ByAgeGroupPage;

