import React, { useEffect } from 'react';
import { useState } from 'react';
import {connect} from 'react-redux'
import PetCard from './PetCard';
import './scssStyles/petCard.scss';

const mapStateToProps = state => (
    {
        username: state.user.username,
        userId: state.user.userId,
    }
  ); 

function UserProfile(props) {
    const [petInfo, setPets] = useState([])
    console.log(props)
    const fetchPets = async () =>{
        fetch(`api/pets/${props.userId}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            setPets(data)
            return data
        })
        .catch((err) => console.log(err))
    }
    useEffect(() => {
<<<<<<< HEAD
       
=======
        const fetchPets = async () =>{
            fetch(`api/pets/${props.userId}`)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setPets(data)
                return data
            })
            .catch((err) => console.log(err));
        }
>>>>>>> dev
        fetchPets();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if(petDetails.name && petDetails.species && petDetails.breed){
        fetch('api/pets', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: petDetails.name,
                species: petDetails.species,
                breed: petDetails.breed,
                weight: petDetails.weight,
                color: petDetails.color,
                age: petDetails.age,
                owner_id: props.userId,
                vet_id: 2
              })})
        .then((data) => {
            if(data.status === 200)
             return data.json()
            else{
                throw new Error("data status was not 200")
            }})
        .then(
            fetchPets()
        )
      }
    else{
        alert('You must enter Name, Species, and Breed')
    }};
      const [error, setError] = useState('');
      //must be filled, name, species, breed
      //vet id to be 2 integer
      //send back id and username
      const [petDetails, setPetDetails] = useState({ name: '', species: '', breed: '', weight: null, color : '', age: null });
    return (
        <div id="container">
            <p id="greeting">{props.username}'s Profile</p>
            
        <form className='pet-form' onSubmit={submitHandler}>
      <div className='form-inner'>
        <h2>Add New Pet!</h2>
        <div className="formContainer">
        {error != ' ' ? <div className='error'></div> : ''}
        <div className='form-group pform'>
          <label htmlFor='name'>*Name:</label>
          <input
            autoComplete='off'
            type='text'
            className='inputPet'
            onChange={(e) => setPetDetails({ ...petDetails, name: e.target.value })}
            value={petDetails.name}
          />
        </div>
        <div className='form-group pform'>
          <label htmlFor='Species'>*Species:</label>
          <input
            autoComplete='off'
            type='text'
            className='inputPet'
            onChange={(e) =>
              setPetDetails({ ...petDetails, species: e.target.value })
            }
            value={petDetails.species}
          />
          </div>
          <div className='form-group pform'>
          <label htmlFor='Breed'>*Breed:</label>
          <input
            autoComplete='off'
            type='text'
            className='inputPet'
            onChange={(e) => setPetDetails({ ...petDetails, breed: e.target.value.replace(' ', '') })}
            
          />
        </div>
        </div>
        <div className='formContainer'>
        <div className='form-group pform'>
          <label htmlFor='Weight'>Weight:</label>
          <input
            autoComplete='off'
            type='text'
            className='inputPet'
            onChange={(e) => setPetDetails({ ...petDetails, weight: e.target.value })}
            value={petDetails.weight}
          />
        </div>
        <div className='form-group pform'>
          <label htmlFor='Color'>Color:</label>
          <input
            autoComplete='off'
            type='text'
            className='inputPet'
            onChange={(e) => setPetDetails({ ...petDetails, color: e.target.value })}
            value={petDetails.color}
          />
        </div>
        <div className='form-group pform'>
          <label htmlFor='Age'>Age:</label>
          <input
            autoComplete='off'
            type='text'
            className='inputPet'
            onChange={(e) => setPetDetails({ ...petDetails, age: e.target.value })}
            value={petDetails.age}
          />
        </div>
        <div>
          <input id="submitPet" type='submit' value='SUBMIT' />
        </div>
        </div>
        </div>
    </form>
        
            <div id="cardContainer">
            {
                petInfo.map(pet => {
                    return <PetCard petInfo={pet}/>
                })
            }
            </div>
        </div>
        
    )
}

export default connect(mapStateToProps)(UserProfile)