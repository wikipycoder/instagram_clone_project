import logo from './logo.svg';
import './App.css';
import Posts from "./components/Posts";
import { useState, useEffect } from "react";
import { auth, firestore } from "./firebase";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PageRedirection from './components/PageRedirection';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PostUpload from './components/PostUpload';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


function App() {


  const [posts, setPosts] = useState([

    { username: "wiki", alt: "justin beiber", imgUrl: "https://www.geo.tv/assets/uploads/updates/2021-06-27/357133_6375138_updates.jpg", caption: "just beiber attending an award show" },
    { username: "ghafi", alt: "shawn mandes", imgUrl: "https://superstarsbio.com/wp-content/uploads/2019/12/ShawnMendes-2.jpg", caption: "I don't know who is shawn mandes do you guys know him?" },
    { username: "Shani", alt: "Dyln O Brien", imgUrl: "https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:12441?quality=0.8&format=jpg&width=1440&height=810&.jpg", caption: "I might have watched this guy in hollywood movies but I really don't know his name" },

  ]);

  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLoginFormFields = (event) => {

    const { name, value } = event.target;
    console.log("working pretty good");
    console.log(name, value);

    if (name == "email")
      setEmail(value);

    else
      setPassword(value);

  }


  useEffect(() => {

    auth
      .onAuthStateChanged(authUser => {
        if (authUser) {


          setUser(authUser);
          console.log("this auth user effect method executed in App.js component");
        }

        else {

          setUser(false);
          console.log("use is not logged in");
        }



      });
  }, [user]);


  const handleLogin = (event) => {

    event.preventDefault();
    console.log("hande login function");
    auth
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log(authUser.user);
        setUser(authUser.user);
      })
      .catch(error => {
        alert(error.message);
        setEmail("");
        setPassword("");
      });

  }





  useEffect(() => {
    firestore.collection("posts").onSnapshot(post => {
      post = post.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      setPosts(post);
    });
  }, []);



  
  const logout = () => {

   console.log("logout function is working");
   auth
   .signOut()
   .then(res => {
     setUser(false);
   }).catch(error => alert(error.message)); 
   setEmail("");
   setPassword("");
  }



  return (

    user ?
    <div className="App">
      
      <div className="app__header">
        <div className="app__headerImgSect">

          <img
            className="app__headerImg"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="instagram logo"

          />
        </div>


        <div className="header__notificationSection">
          <Router>
            { user ? 
             <button value="logout" className="header__notificationButton" onClick={ logout }>Logout</button>
            :
            <div>
              <Link to="/signup"><button value="logout" className="header__notificationButton">Sign Up</button></Link>
              <button value="logout" className="header__notificationButton">Sign In</button>
            </div>

            }
          </Router>
          

        </div>


      </div>


      <div className="app__post">
        <div className="app__individualPost">
          {posts.map((post, index) => {

            return <Posts key={index} username={post.username} caption={post.caption} imgUrl={post.imgUrl} alt={post.alt} />
          })}

          {user ? (
            <PostUpload username={ user.displayName }/>
          ):
          null
          }
        </div>

        <div className="app__postSidebar">
          <h3>Suggestions for you</h3>
          
          <div className="sidebar__followersList">
            <Avatar >
              w
            </Avatar>
            <p>wiki</p>
            <p className="sidebar__follow">Follow</p>
          </div>

          <div className="sidebar__followersList">
            <Avatar >
              J
            </Avatar>
            <p>John</p>
            <p className="sidebar__follow">Follow</p>
          </div>



          <div className="sidebar__followersList">
            <Avatar >
              A
            </Avatar>
            <p>Akbar</p>
            <p className="sidebar__follow">Follow</p>
          </div>


          <div className="sidebar__followersList">
            <Avatar >
              F
            </Avatar>
            <p>Fayaz</p>
            <p className="sidebar__follow">Follow</p>
          </div>




        </div>

      </div>
      

    </div>

    :
    (<div>
      <Router>
        <Switch>
            
          <Route path="/" exact>
            
            <Login 

              handleLoginFormFields={ handleLoginFormFields } 
              handleLogin={handleLogin } 
              email={ email} 
              password={ password}

            />
          
          </Route>    

          <Route path="/login">
          <Login 
            handleLoginFormFields={ handleLoginFormFields } 
            handleLogin={handleLogin } 
            email={ email} 
            password={ password}

          />
          </Route>  

          <Route path="/signup" component={ Signup } />

        </Switch>

      </Router>
    </div>)

    
  );
}

export default App;
