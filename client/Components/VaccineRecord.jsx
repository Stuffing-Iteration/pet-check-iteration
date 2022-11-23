import React from 'react';
import AddVaccine from './AddVaccine';
import ViewVaccine from './ViewVaccine';

const VaccineRecord = ({ vaccineInfo, petId }) => {
  console.log('vax info from vaccine record componenent', vaccineInfo);
  return (
    <>
      <div className='vaccine-info'>
        <div className='vaccine-info-header'>Vaccine Record</div>
        <div className='vaccine-info-box'>
          <ViewVaccine vaccineInfo={vaccineInfo} petId={petId}/>
          <AddVaccine petId={petId}/>
        </div>
      </div>
    </>
  );
};

export default VaccineRecord;
