import React, { useState } from 'react';
import './index.css';
import {Routes, Route, Link} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignupPage';
import UserProfile from './Components/UserProfile';
import PetProfile from './Components/PetProfile';


function App() {

  return (
    <>
      <Link to='/signup'>Signup Page</Link>
      <Routes>
        
        <Route path='/' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/pets/:userId' element={<UserProfile/>} />
        <Route path='/petprofile/:petId' element={<PetProfile/>} />
        <Route path='/*' element={<h1>Page Not Found!</h1>} />
        
      </Routes>
    </>
  );
}

export default App;
