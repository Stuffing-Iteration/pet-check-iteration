import React from 'react';
import AddVaccine from './AddVaccine';
import ViewVaccine from './ViewVaccine';

const VaccineRecord = ({ vaccine }) => {
  return (
    <>
      <div className='vaccine-info'>
        <div className='vaccine-info-header'>Vaccine Record</div>
        <div className='vaccine-info-box'>
          <ViewVaccine />
          <AddVaccine />
        </div>
      </div>
    </>
  );
};

export default VaccineRecord;
