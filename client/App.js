import React, {useState} from 'react';
import LoginForm from './Components/LoginForm'
import './index.css'


function App () {

    const adminUser = {
        email: "admin@admin.com",
        password: "abc"
    }

    const [user, setUser] = useState ({name: "", email: ""})

    const [error, setError] = useState("");

    const Login = details => {
        console.log(details)

        if(details.email == adminUser.email && details.password == adminUser.password){
            console.log('logged in')
            setUser({
                name:details.name,
                email: details.email
            })
        } else {
            setError('details dont match')
            console.log('details dont match')
    }
    }

    const LogOut = () => {
        console.log('logout');
        setUser({name: "", email: ""});
    }

    return (
        <div className= "App">
                {(user.email != "") ? (
                    <div className= "Welcome">
                        <h2>Welcome, <span>{user.name}</span></h2>
                        <button onClick={LogOut}>Logout</button>
                        </div>
                ) : (
                    <LoginForm Login={Login} error={error} />
                )
                }
        </div>
    )
};




export default App;