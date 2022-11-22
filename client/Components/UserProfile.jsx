import React, { useEffect } from 'react';
import { useState } from 'react';
import {connect} from 'react-redux'


const mapStateToProps = state => (
    {
        username: state.user.username,
        userId: state.user.userId,
    }
  ); 

function UserProfile(props) {
    const [petInfo, setPets] = useState({})
    console.log(props)
    useEffect(() => {
        const fetchPets = async () =>{
            fetch(`/pets/${props.userId}`)
            .then((data) => {
                console.log("it gets here")
                return data.json();
            })
            .then((data) => {
                console.log(data)
                setPets(data)
                return data
            })
            .catch((err) => console.log(err))
        }
        fetchPets();
        setPets()
    }, [])
    return (
        <h1>User Profile</h1>
    )
}

export default connect(mapStateToProps)(UserProfile)