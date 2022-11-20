import React, { useEffect, useState } from 'react';
import './petProfile.scss';
import PetInfo from './PetInfo';

// @FIXME will remove

const info = {
  name: 'Mango',
  owner_id: '1',
  species: 'dog',
  breed: 'beagle',
  weight: 30,
  color: 'mixed',
  age: 4,
};

const PetProfile = () => {
  // create api call with useEffect to give pet information to components
  const [petInfo, setPetInfo] = useState(info);

  //Will work with Azzie
  // const getPets = async () => {
  //   const data = await axios.get('server');
  //   setPetInfo(data);
  // };

  useEffect(() => {
    // getPets()
  }, []);
  return (
    <div className='profile-container'>
      <PetInfo info={petInfo} />
    </div>
  );
};

export default PetProfile;
