import React, { useState } from "react";
import { useNavigation } from 'react-router-dom';

function SignupForm() {
    const username = React.createRef();
    const email = React.createRef();
    const p1 = React.createRef();
    const p2 = React.createRef();

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-inner">
                <h2>Signup</h2>
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" name="name" id="name" ref={username} />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name="email" id="email" ref={email} />
                </div>
                <div className ="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input type='password' name='password' id='password' ref={p1}/>
                </div>
                <div className ="form-group">
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input type='password' name='confirmPassword' id='confirmPassword' ref={p2}/>
                </div>
                <div>
                    <input type='submit' value="SIGNUP" />
                </div>
            </div>
        </form>
    );

    function handleSubmit(event) {
        event.preventDefault();

        // Confirm that the form is filled out correctly
        const username = username.current.value
        const email = email.current.value;
        const p1 = p1.current.value;
        const p2 = p2.current.value;
        
        if (username === '') {
            alert('Username cannot be empty');
            return;
        } else if (email === '') {
            alert('Email cannot be empty');
            return;
        } else if (p1 === '') {
            alert('Email cannot be empty');
            return;
        } else if (p1 !== p2) {
            alert('Passwords must match');
            return;
        }

        fetch()
        .then()
        .catch();
    }
}

export default SignupForm;