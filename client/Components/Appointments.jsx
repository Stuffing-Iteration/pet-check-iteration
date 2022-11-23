import React from 'react';
import AddAppointment from './addAppointment';
import ViewAppointments from './ViewAppointments';

const Appointments = ({ appt, petId }) => {
  return (
    <>
      <div className='appt-info'>
        <div className='appt-info-header'>Appointments</div>
        <div className='appt-info-box'>
          <ViewAppointments appts={appt} />
          <AddAppointment petId={petId} />
        </div>
      </div>
    </>
  );
};

export default Appointments;
