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
    useEffect(() => {
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
        fetchPets();
        //setPets()
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        if(details.name && details.species && details.breed){
        fetch('api/pets', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: details.name,
                species: details.species.replace(' ', '-'),
                breed: details.breed,
                weight: details.weight,
                color: details.color,
                age: details.age,
                owner_id: props.userId,
                vet_id: 2
              })})
        .then((data) => {
            if(data.status === 200)
             return data.json()
            else{
                throw new Error("data status was not 200")
            }})
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
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            autoComplete='off'
            type='text'
            name='name'
            id='name'
            onChange={(e) => setPetDetails({ ...petDetails, name: e.target.value })}
            value={petDetails.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Species:</label>
          <input
            autoComplete='off'
            type='password'
            name='password'
            id='password'
            onChange={(e) =>
              setPetDetails({ ...petDetails, species: e.target.value })
            }
            value={petDetails.password}
          />
          </div>
          <div className='form-group'>
          <label htmlFor='name'>Breed:</label>
          <input
            autoComplete='off'
            type='text'
            name='name'
            id='name'
            onChange={(e) => setPetDetails({ ...petDetails, breed: e.target.value })}
            value={petDetails.name}
          />
        </div>
        </div>
        <div className='formContainer'>
        <div className='form-group'>
          <label htmlFor='name'>Weight:</label>
          <input
            autoComplete='off'
            type='text'
            name='name'
            id='name'
            onChange={(e) => setPetDetails({ ...petDetails, weight: e.target.value })}
            value={petDetails.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Color:</label>
          <input
            autoComplete='off'
            type='text'
            name='name'
            id='name'
            onChange={(e) => setPetDetails({ ...petDetails, color: e.target.value })}
            value={petDetails.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Age:</label>
          <input
            autoComplete='off'
            type='text'
            name='name'
            id='name'
            onChange={(e) => setPetDetails({ ...petDetails, age: e.target.value })}
            value={petDetails.name}
          />
        </div>
        </div>
        <div>
          <input id="submitPet" type='submit' value='SUBMIT' />
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