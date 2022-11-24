import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './petProfileStyle.scss';
import PetInfo from './PetInfo';
import VaccineRecord from './VaccineRecord';
import Appointments from './Appointments';
import App from '../App';
import Medication from './Medication';
import axios from 'axios';
import Weight from './Weight';
import NavBar from './NavBar';
import DocumentView from './DocumentView'
// @FIXME will remove (Mock-Data)

// ---- Pet Information ----- //
// const info = {
//   name: 'Mango',
//   owner_id: '1',
//   species: 'Dog',
//   breed: 'Beagle',
//   weight: 30,
//   color: 'Black/Brown/White',
//   age: 4,
// };

// ---- Vaccination ----- //
// const vaccine = {
//   vaccine: 'rabies',
//   date: '10/12/22',
//   expiration: '10/12/25',
//   location: 'LA Hospital',
//   pet_id: 1,
//   vet_id: 1,
// };

// // ---- Appointment ----- //
// const appt = {
//   date: '1/22/23',
//   time: '1:30',
//   location: '',
//   vet: '',
//   reason: 'check-up',
// };

// // ---- Medication ----- //
// const medication = {
//   medication: 'flexinil',
//   dosage: '5 mg',
//   instructions: '2/day for 5 days',
//   reason: 'migraines',
// };

const PetProfile = () => {

  const {petId} = useParams();
  // create api call with useEffect to give pet information to components
  const [petInfo, setPetInfo] = useState('');
  const [vaccines, setVaccine] = useState('');
  const [appts, setAppt] = useState('');
  const [medications, setMedication] = useState('');

  //Will work with Azzie
  const getPets = () => {
    fetch(`/api/onepet/${petId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data from fetch', data);
        setPetInfo({
          name: data.name,
          owner_id: data.owner_id,
          species: data.species,
          breed: data.breed,
          weight: data.weight,
          color: data.color,
          age: data.age,
        });
        
      })
      .catch((err) => console.log(err));
  };

  const getVaccine = () => {
    fetch(`/api/vax/${petId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data from vax fetch', data);
        setVaccine(data);
        console.log('vaccine info', vaccines);
      })
      .catch((err) => console.log(err));
  };

  const getAppt = () => {
    fetch(`/api/appts/${petId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data from appts fetch', data);
        setAppt(data);
      })
      .catch((err) => console.log(err));
  };

  const getMed = () => {
    fetch(`/api/meds/${petId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data from meds fetch', data);
        setMedication(data);
        console.log('medication info', medications);
      })
      .catch((err) => console.log(err));
  };

  useEffect( () => {
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
        <PetInfo info={petInfo} petId={petId}/>
        <VaccineRecord vaccineInfo={vaccines} petId={petId}/>
        <Appointments appts={appts} petId={petId}/>
        <Medication meds={medications} petId={petId}/>
        <Weight />
        <DocumentView petId={petId} />
      </div>
    </>
  );
};

export default PetProfile;
