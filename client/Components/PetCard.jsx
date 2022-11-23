import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState} from 'react'

function PetCard (props){

    const [petImg, setPetImg] =  useState(' ')
    const { name, id, breed, species } = props.petInfo;
    console.log('pet card props: ', props)  
    const navigate = useNavigate()
    const goToPet = (e) => {
    
      navigate(`/petprofile/${id}`)
    }

    useEffect(() => {
        const getPetImage = (breed) => {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((data) =>  data.json())
        .then((data) => {
            console.log(data.message)
            setPetImg(data.message)
        })
        .catch(err => console.log(err))
        }
    getPetImage(breed)
    }, [])


return(
    <div className="petCard" onClick={goToPet}>
        <img className="petCardImg" src={petImg}/>
        <h2 className="nameOnCard">{name}</h2>
        <p></p>
    </div>
)
}

export default PetCard;