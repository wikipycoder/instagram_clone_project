import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./login.css";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const Signup = () => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const stateMethods = [setPhoneNumber, setUsername, setPassword, setEmail];
    const [user, setUser] = useState(null);

    

    const handleInputChange = (event) => {

        const { name, value} = event.target;
        
        if(name == "username")
            setUsername(value);
        
        else if(name == "phoneNumber")
            setPhoneNumber(value);
        
        else if(name == "email")
            setEmail(value);
        
        else 
            setPassword(value);
        
    }


    useEffect(() => {
        
        console.log("value of me", user);
        auth.signOut();
    }, [user]);


    const handleForm = (event) => {
        event.preventDefault();
       

        auth
        .createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            
            authUser.user.updateProfile({
                phoneNumber: phoneNumber,
                displayName: username

            });
            alert(username + " has successfully signed up");
            setUser(authUser.user);
        })
        .catch(error => alert(error.message));

        for(let method of stateMethods)
            method("");
        
        

    }

    

    return (

        <div className="container">

            <div className="main-content">
                <div className="header">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" className="logo-img"/>
                
                </div>
                <div className="l-part">
                    <form onSubmit={handleForm}>

                        <input 
                            type="number" 
                            placeholder="Mobile Number or Email" 
                            className="input-1" 
                            name="phoneNumber" 
                            value={ phoneNumber }
                            onChange={ handleInputChange }
                        />  

                        <input 
                            type="text" 
                            placeholder="username" 
                            className="input-1" 
                            name="username" 
                            onChange={ handleInputChange } 
                            value={ username }
                        />


                        <input type="email"
                            placeholder="email" 
                            className="input-1" 
                            name="email" 
                            value={ email }
                            onChange={ handleInputChange }
                        />

                        
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="input-2" 
                            name="password" 
                            value={ password } 
                            onChange={ handleInputChange }
                        />
                    
                        <input type="submit" value="Sign up" className="btn" />
                    </form>
                </div>
            </div>
            <div className="sub-content">
                <div className="s-part">
                    <span>Don't have an account?</span>
                    <Link to="/login">Login</Link>
                      
                </div>
            </div>



        </div>


    );

};


export default Signup;