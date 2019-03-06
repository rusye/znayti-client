import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar(props) {

  return (
    <h2>This Is The Nav Bar <Link to="/">Home</Link></h2>
  )
}