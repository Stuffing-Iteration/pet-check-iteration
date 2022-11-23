import React from 'react';
import AddAppointment from './addAppointment';
import ViewAppointments from './ViewAppointments';

const Appointments = ({ appts, petId }) => {
  return (
    <>
      <div className='appt-info'>
        <div className='appt-info-header'>Appointments</div>
        <div className='appt-info-box'>
          <ViewAppointments appts={appts} petId={petId} />
          <AddAppointment petId={petId} />
        </div>
      </div>
    </>
  );
};

export default Appointments;
