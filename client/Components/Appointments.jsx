import React from 'react';
import AddAppointment from './addAppointment';

const Appointments = ({ appt }) => {
  return (
    <>
      <div className='appt-info'>
        <div className='appt-info-header'>Appointments</div>
        <div className='appt-info-box'>
          <button>View Appointments</button>
          <AddAppointment />
        </div>
      </div>
    </>
  );
};

export default Appointments;
