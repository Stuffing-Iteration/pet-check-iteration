import React, { useEffect, useState } from 'react';
import './petProfile.scss';
import PetInfo from './PetInfo';
import VaccineRecord from './VaccineRecord';
import Appointments from './Appointments';
import App from '../App';
import Medication from './Medication';
import axios from 'axios';
import Weight from './Weight';
import NavBar from './NavBar';

// @FIXME will remove (Mock-Data)

// ---- Pet Information ----- //
const info = {
  name: 'Mango',
  owner_id: '1',
  species: 'Dog',
  breed: 'Beagle',
  weight: 30,
  color: 'Black/Brown/White',
  age: 4,
};

// ---- Vaccination ----- //
const vaccine = {
  vaccine: 'rabies',
  date: '10/12/22',
  expiration: '10/12/25',
  location: 'LA Hospital',
  pet_id: 1,
  vet_id: 1,
};

// ---- Appointment ----- //
const appt = {
  date: '1/22/23',
  time: '1:30',
  location: '',
  vet: '',
  reason: 'check-up',
};

// ---- Medication ----- //
const medication = {
  medication: 'flexinil',
  dosage: '5 mg',
  instructions: '2/day for 5 days',
  reason: 'migraines',
};

const PetProfile = () => {
  // create api call with useEffect to give pet information to components
  const [petInfo, setPetInfo] = useState(info);
  const [vaccine, setVaccine] = useState(vaccine);
  const [appt, setAppt] = useState(appt);
  const [medication, setMedication] = useState(medication);

  //Will work with Azzie
  const getPets = async () => {
    const data = await axios.get('../server/server.js');
    setPetInfo(data);
  };

  const getVaccine = async () => {
    const data = await axios.get('../server/server.js');
    setVaccine(data);
  };
  const getAppt = async () => {
    const data = await axios.get('../server/server.js');
    setAppt(data);
  };
  const getMed = async () => {
    const data = await axios.get('../server/server.js');
    setMedication(data);
  };

  useEffect(() => {
    getPets();
    getVaccine();
    getAppt();
    getMed();
  }, []);
  return (
    <>
      <div className='navbar'>
        <img
          className='profile-container-logo'
          src='./logo.png'
          alt='PetCheck Logo'
          width='64px'
          height='64px'
          align='left'
        />
        <NavBar />
      </div>

      <div className='profile-container'>
        <PetInfo info={petInfo} />
        <VaccineRecord vaccine={vaccine} />
        <Appointments appt={appt} />
        <Medication med={medication} />
        <Weight />
      </div>
    </>
  );
};

export default PetProfile;
