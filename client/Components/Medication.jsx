import React from 'react';
import AddMedication from './AddMedication';
import ViewMedications from './ViewMedications';

const Medication = ({ meds, petId }) => {
  return (
    <>
      <div className='med-info'>
        <div className='med-info-header'>Medication & Treatment</div>
        <div className='med-info-box'>
          <ViewMedications meds={meds} petId={petId}/>
          <AddMedication petId={petId}/>
        </div>
      </div>
    </>
  );
};

export default Medication;
