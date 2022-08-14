import React from 'react';

import {auth, provider, userIdCollection} from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

export const Login = ({ setIsAuth }) => {

  let navigate = useNavigate();

  // TODO: login through Google Authentication first
  // check if their uid is in "user_types"
  // if not, then allow them to choose their user type for the first time
  // then navigate them to where they should go depending on their type
  
  // for the subsequent logins, skip the process of deciding their user_type

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      // localStorage.setItem("type", "recruiter");
      setIsAuth(true);
      // TODO: navigate to either the page for Applicant or Recruiter
      // depending on the type of the user saved in Firebase 
      // userid: "applicant" or "recruiter"
      navigate("/");
    })
  }

  const signInWithGoogleApplicant = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/upload");
    })
  }
  
  return (
    <div className='loginPage' class="container">
      <div classname= 'welcome'>
        <h1>
          Welcome! 
          </h1>
      </div> 

      <div className='box'>
        
        <h3>
         Sign in with Google to Continue
        </h3>
      </div>
      
      <div classname = 'box2'>
        <button onClick={signInWithGoogle}>
          
          Sign in with Google as Recruiter   
        </button>
        <button onClick={signInWithGoogleApplicant}>
          
          Sign in with Google as Applicant
        </button>
      </div>



    </div> 
  )
}

