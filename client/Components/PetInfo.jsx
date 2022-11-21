import React from 'react';

const PetInfo = ({ info }) => {
  const { name, age, breed, color, species, weight } = info;
  return (
    <div className='pet-info'>
      <div className='pet-info-header'>{name}'s Profile</div>
      <div className='pet-info-box'>
        <img
          className='pet-info-pic'
          src={
            'https://www.akc.org/wp-content/uploads/2017/11/Beagle-Puppy.jpg'
          }
          alt='beagle'
        />
        <div className='pet-info-details'>
          <div>Age: {age}</div>
          <div>Species: {species}</div>
          <div>Breed: {breed}</div>
          <div>Color: {color}</div>
          <div>Weight: {weight}</div>
        </div>
      </div>
    </div>
  );
};

export default PetInfo;
