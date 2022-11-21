import React from 'react';
import AddMedication from './AddMedication';
import ViewMedications from './ViewMedications';

const Medication = ({ med }) => {
  return (
    <>
      <div className='med-info'>
        <div className='med-info-header'>Medication & Treatment</div>
        <div className='med-info-box'>
          <ViewMedications medication={med} />
          <AddMedication />
        </div>
      </div>
    </>
  );
};

export default Medication;
