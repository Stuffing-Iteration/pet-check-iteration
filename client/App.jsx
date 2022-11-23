import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignupPage';
import UserProfile from './Components/UserProfile';
import PetProfile from './Components/PetProfile';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/pets/:userId' element={<UserProfile/>} />
        <Route path='/petprofile/:petId' element={<PetProfile/>} />
        <Route path='/*' element={<h1>Page Not Found!</h1>} />
        
      </Routes>
    </div>
  );
}

export default App;
