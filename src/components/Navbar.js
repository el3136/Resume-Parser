import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = (props) => {
  const { isAuth, signUserOut } = props;
  return (
    // <nav class="container">
    //   <h1>Resume Parser</h1>
    //   {isAuth && <button onClick={signUserOut}>Logout</button>}
    //   <hr/>
    // </nav>
    <nav class="navbar bg-light">
    <div class="container-fluid">
        <h1>Resume Parser</h1>
        {isAuth && <button onClick={signUserOut}>Logout</button>}
    </div>
    </nav>
  )
}
