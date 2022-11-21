import React from 'react';
import AddVaccine from './AddVaccine';

const VaccineRecord = ({ vaccine }) => {
  return (
    <>
      <div className='vaccine-info'>
        <div className='vaccine-info-header'>Vaccine Record</div>
        <div className='vaccine-info-box'>
          <button>View Records</button>
          <AddVaccine />
        </div>
      </div>
    </>
  );
};

export default VaccineRecord;
