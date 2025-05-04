import React from 'react';
import ReadmissionByCondition from '../components/ReadmissionByCondition';

const ByConditionPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Readmission by Condition</h2>
      <ReadmissionByCondition />
    </div>
  );
};

export default ByConditionPage;

