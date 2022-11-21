import React from 'react'
import '../index.css'
import React, {useState} from 'react'

// ## input form
// ## popup and close functionality
// => post request for form intake
// styling

function NewPetPopUp(props) {
    const [details, setDetails] =useState({petName: "", breed: "", age: ""});

    const submitHandler = e => {
        e.preventDefault();

        NewPetPopUp(details);
    }







  return (props.trigger) ? (
    <div className= 'popup'>
         <form className='input-pet' onSubmit= {submitHandler}>
        <div className="form-inner">
            <h2>Add a Pet!</h2>
            {(error != "") ? (<div className="error"></div>) : ""}
            <div className="form-group">
                <label htmlFor="petName">Pet Name:</label>
                <input type="text" petName="petName" id="petName" onChange={e => setDetails({...details, petName: e.target.value})} value= {details.name} />
            </div>
            <div className="form-group">
                <label htmlFor='breed'>Breed:</label>
                <input type="text" name="breed" id="breed" onChange={e => setDetails({...details, breed: e.target.value})} value= {details.email} ></input>
            </div>
            <div className ="form-group">
              <label htmlFor='age'>Password:</label>
             <input type='text' name='age' id='age' onChange={e => setDetails({...details, age: e.target.value})} value= {details.password} />
            </div>
            
            <div>
            <input type='submit' value="NEWPET" />
            </div>
            
        </div>
    </form>

        <div className='popup-inner'>
            <button className='close-btn' onClick={()=>props.setTrigger(false)}>close</button>
            {props.children}
        </div>
    </div>
  ): "" ;
}

export default NewPetPopUp