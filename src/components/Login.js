import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./login.css";


const Login = (props) => {
    

    return (

        <div className="container">

            <div className="main-content">
                <div className="header">
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" className="logo-img"/>
                
                </div>
                <form onSubmit={ props.handleLogin }>
                    <div className="l-part">
                        <input type="text" placeholder="Username" name="email" className="input-1" onChange={  props.handleLoginFormFields } value={ props.email } />
                        <div className="overlap-text">
                            <input type="password" placeholder="Password"  name="password" className="input-2"  onChange={  props.handleLoginFormFields } value={ props.password } />

                        </div>
                        <input type="submit" value="Log in" className="btn" />
                    </div>
                </form>
            </div>
            <div className="sub-content">
                <div className="s-part">
                Don't have an account?  <Link to="/signup">Sign Up</Link>
                </div>
            </div>



        </div>


    );
};

export default Login;