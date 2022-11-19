import React, {useState} from 'react'

function LoginForm({Login, error}) {
    const [details, setDetails] =useState({name: "", email: "", password:""});

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

  return (
    <form onSubmit= {submitHandler}>
        <div className="form-inner">
            <h2>Login</h2>
            {/*Error! */}
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" />
            </div>
            <div className="form-group">
                <label htmlFor='email'>Email:</label>
                <input type="email" name="email" id="email"></input>
            </div>
            <div className ="form-group">
              <label htmlFor='password'>Password:</label>
             <label type='password' name='password' id='password'/>
            </div>
            
            <div>
            <input type='submit' value="LOGIN" />
            </div>
            
        </div>

    </form>
  )
}

export default LoginForm