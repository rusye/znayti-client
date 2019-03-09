import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar(props) {

  return (
    <nav>
      {
        localStorage.loggedIn ? (<div>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/">LogOut</Link>
        </div>
        ) : (
          <h2>This Is The Nav Bar <Link to="/">Home</Link></h2>
          )
      }
    </nav>
  )
}