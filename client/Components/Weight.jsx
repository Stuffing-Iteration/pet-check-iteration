import React from 'react';
import WeightChart from './WeightChart';

const Weight = () => {
  return (
    <>
      <div className='weight-info'>
        <div className='weight-info-header'>Weight</div>
        <div className='weight-info-box'>
          <WeightChart />
        </div>
      </div>
    </>
  );
};

export default Weight;
