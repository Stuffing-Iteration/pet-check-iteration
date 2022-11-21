import React, {useState, useEffect} from 'react'
import paw from '/paw.png'
function PetCard() {
    const [details, setDetails] = useState();



    // ## on each card, render a paw image
    // => GET all users pets names ==> pets/:userid (here or on main page and pass as props?)
    // => on each card, render current pet name
    // styling
   
    

  return (
    
        <div className="PetCard">
            <img src= {paw} alt="paw print" />
            <h2>{}</h2>
            


         
        </div>

    
  )
}








export
