import React from 'react';
import ReadmissionByMedication from '../components/ReadmissionByMedication';

const ByMedicationPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Number of Medications Prescribed at Admission</h2>
      <ReadmissionByMedication />
    </div>
  );
};

export default ByMedicationPage;

