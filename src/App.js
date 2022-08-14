import { Submit } from "./components/Submit";
import { Login } from "./components/Login.js"
import { Error } from "./components/Error";
import { useState } from 'react';
import {auth} from './firebase';
import { signOut } from 'firebase/auth';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Upload from "./components/Upload";
import { Navbar } from "./components/Navbar"
import Header from "./components/Header.js";
import Congrats from "./components/Congrats";

function App() {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    })
  }
  
  return (
    <div>
      <Router>
        <Navbar isAuth={isAuth} signUserOut={signUserOut} />
          <Routes>
            <Route path="/" element={<Submit  isAuth={isAuth} />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="*" element={<Error/>} />
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/congrats" element={<Congrats/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;

