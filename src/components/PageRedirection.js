import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";


const PageRedirection = ( props ) => {


    return (

        <div>
            <Router>
                <Switch>
                    
                    <Route path="/">{ <Login loginFormHandeling={ props.loginFormHandeling } />}</Route>    
                    <Route path="/login">{ <Login loginFormHandeling={ props.loginFormHandeling } />}</Route>  
                    <Route path="/signup" component={ Signup } />

                </Switch>

            </Router>
        </div>
    );
};


export default PageRedirection;