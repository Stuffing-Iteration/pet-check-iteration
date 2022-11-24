import React from 'react';
import AddVet from './AddVet';
import ViewVet from './ViewVet';

const VetList = ({ vetInfo, petId, petName }) => {
  // console.log('vax info from vaccine record componenent', vaccineInfo);
  return (
    <>
      <div className='vaccine-info'>
        <div className='vaccine-info-header'>{petName}'s Vets</div>
        <div className='vaccine-info-box'>
          <ViewVet vetInfo={vetInfo} petId={petId}/>
          <AddVet petId={petId}/>
        </div>
      </div>
    </>
  );
};

export default VetList;
