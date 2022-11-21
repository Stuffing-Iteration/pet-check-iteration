import NewPetPopUp from './components/NewPetPopUp';
import '../index.css'
import {useState } from 'react'

function MainPage() {
    const [buttonPopUp, setButtonPopUp] = useState(false);



    
    // ## render add new friend box 
    //## pop up pops and can close
    // =>render users pet cards 
    //=> add new friend post request
    // =>styling
    

  return (
    
        <div className="Main">


            <div className="PetCard">
                <button onClick={() => setButtonPopUp(true)}>Add New Friend</button>
                <popup trigger={buttonPopUp} setTrigger={setButtonPopUp}>
                    <h3 My popup></h3>
                </popup>
            </div>

        </div>

    
  )
}














export default SignUpForm;