import React, {useState} from 'react';
import LoginForm from './Components/LoginForm'
import SignUpForm from './Components/SignUpForm'
import './index.css'





function App () {

    const adminUser = {
        email: "admin@admin.com",
        password: "abc"
    }

    const [user, setUser] = useState ({name: "", email: ""})

    const [error, setError] = useState("");

    const Login = details => {
        

        if(details.email == adminUser.email && details.password == adminUser.password){
            
            setUser({
                name:details.name,
                email: details.email
            })
        } else {
            setError('details dont match')
            
    }
    }

    const LogOut = () => {
        
        setUser({name: "" , email: ""})
       }

    return (
        <div className= "App">
                {(user.email != "") ? (
                    <div className= "Welcome">
                        <h2>Welcome, <span>{user.name}</span></h2>
                        <button onClick={LogOut}>Logout</button>
                        <button> Take me to my pets! </button>
                        </div>
                ) : (
                    <LoginForm Login={Login} error={error} />
                )
                }
        </div>
    )
};




export default App;
