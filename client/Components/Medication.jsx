import React from 'react';
import AddMedication from './AddMedication';

const Medication = ({ med }) => {
  return (
    <>
      <div className='med-info'>
        <div className='med-info-header'>Medication & Treatment</div>
        <div className='med-info-box'>
          <button>View Medication</button>
          <AddMedication />
        </div>
      </div>
    </>
  );
};

export default Medication;
