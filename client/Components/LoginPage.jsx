import React, { useState } from 'react';
import LoginForm from './LoginForm';
import PetProfile from './PetProfile';

function Login() {
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
//turn pet profile in link
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

export default Login
