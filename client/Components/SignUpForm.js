import React, {useState} from 'react'

function SignUpForm({login, error}) {
    const [details, setDetails] =useState({name: "", email: "", password:""});

    const submitHandler = e => {
        e.preventDefault();

        SignUp(details);
    }

    // ## form should work, same as log in
    // => need to post information to database
    // => need to link to log in, if user has no log in yet


  return (
    <form onSubmit= {submitHandler}>
        <div className="form-inner">
            <h2>Sign Up</h2>
            {(error != "") ? (<div className="error"></div>) : ""}
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value= {details.name} />
            </div>
            <div className="form-group">
                <label htmlFor='email'>Email:</label>
                <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value= {details.email} ></input>
            </div>
            <div className ="form-group">
              <label htmlFor='password'>Password:</label>
             <input type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} value= {details.password} />
            </div>
            
            <div>
            <input type='submit' value="SIGNUP" />
            </div>
            
        </div>

    </form>
  )
}

export default SignUpForm;
