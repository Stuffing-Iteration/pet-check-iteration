import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const navigate = useNavigate();

    // Use lazy references to get input content
    const usernameInput = React.createRef();
    const emailInput = React.createRef();
    const p1Input = React.createRef();
    const p2Input = React.createRef();

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-inner">
                <h2>Signup</h2>
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" name="name" id="name" ref={usernameInput} />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name="email" id="email" ref={emailInput} />
                </div>
                <div className ="form-group">
                    <label htmlFor='password'>Password:</label>
                    <input type='password' name='password' id='password' ref={p1Input}/>
                </div>
                <div className ="form-group">
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input type='password' name='confirmPassword' id='confirmPassword' ref={p2Input}/>
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
        const username = usernameInput.current.value
        const email = emailInput.current.value;
        const p1 = p1Input.current.value;
        const p2 = p2Input.current.value;
        
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

        const msgBody = JSON.stringify({username, password: p1, email});

        fetch('api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },            
            body: msgBody
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Create user status code has error')
            }
        })
        .then((data) => {
            navigate('/');
        })
        .catch((rejection) => {
            console.error(rejection)
            alert('Signup unsuccessful')
        });
    }
}

export default SignupForm;