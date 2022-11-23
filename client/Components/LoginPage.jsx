
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux"
import { loginActionCreator } from '../actionFolder/action';
import * as actions from '../actionFolder/action'

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
//   const adminUser = {
//     email: 'admin@admin.com',
//     password: 'abc',
//   };
/*

  const [user, setUser] = useState({ name: '', email: '' });

  

  const Login = (details) => {
    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      setError('details dont matcadm');
    }
  };

  const LogOut = () => {
    setUser({ name: '', email: '' });
  };*/
//turn pet profile in link
const [details, setDetails] = useState({ name: '', password: '' });
const submitHandler = (e) => {
    e.preventDefault();
        fetch('api/login', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                username: details.name,
                password: details.password,
              })})
        .then((data) => {
            if(data.status === 200)
             return data.json()
            else{
                throw new Error("data status was not 200")
            }})
        .then((data) => {
        if(data.found){
            dispatch(actions.loginActionCreator(data.user.username, data.user.id))
            // dispatch({type: 'SET_CURRENT_INDEX', payload: [props.column, props.index]})
        }
        return data
        }
       )
       .then((data) => {
        if(data.found){
        navigate(`/pets/${data.user.id}`)}
        return data
       })
       .catch((err) =>{
    //alert('login was unsuccessful')
       setError('error')
       console.log(err)}
       )
    }

    useEffect(() => {
      fetch('/api/auth/')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else throw new Error('User is not logged in')
      })
      .then((data) => {
        dispatch(actions.loginActionCreator(data.username, data.userId));
        navigate('/pets/' + data.userId);
      })
      .catch((error) => {
        console.log(error);
      })
    }, [])

  return(
    <div className='centered'>
<form className='login-form' onSubmit={submitHandler}>
      <div className='form-inner'>
        <h2>Login</h2>
        {error != ' ' ? <div className='error'></div> : ''}
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            autoComplete='off'
            type='text'
            name='name'
            id='name'
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input
            autoComplete='off'
            type='password'
            name='password'
            id='password'
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <div>
          <input type='submit' value='LOGIN' />
        </div>
      </div>
    </form></div>
  )
/*return (

    <>
      {user.email != '' ? (
        <>
          {/* <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={LogOut}>Logout</button> /}
          <PetProfile />
        </>
      ) : (
        <div className='App'>
          <div className='Welcome'>
            <LoginForm Login={Login} error={error} />
          </div>
        </div>
      )}
    </>
  );*/

}
export default Login
