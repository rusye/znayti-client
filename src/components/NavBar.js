import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar() {

  return (
    <nav>
      {
        localStorage.loggedIn ? (<div>
          <Link to="/">
            <button className='navButton' type='button'>Home</button>
          </Link>

          <Link to="/dashboard">
            <button className='navButton' type='button'>Dashboard</button>
          </Link>

          <Link to="/">
            <button className='navButton' type='button' onClick={() => {localStorage.clear()}} >LogOut</button>
          </Link>
        </div>
        ) : (
          <Link to="/">
            <button className='navButton' type='button'>Home</button>
          </Link>
          )
      }
    </nav>
  )
}