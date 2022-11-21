import React, { useState } from 'react';
import LoginForm from './Components/LoginForm';
import './index.css';
import PetProfile from './components/PetProfile';

function App() {
  const adminUser = {
    email: 'admin@admin.com',
    password: 'abc',
  };

  const [user, setUser] = useState({ name: '', email: '' });

  const [error, setError] = useState('');

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
  };

  return (
    <>
      {user.email != '' ? (
        <>
          {/* <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={LogOut}>Logout</button> */}
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
  );
}

export default App;
