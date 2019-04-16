import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Search from "./Search";
import Header from "./Header";

export default function Home(props) {
  return (
    <div className="fullCentered">
      <Link className="about" to="/about">
        <button className="aboutButton">About</button>
      </Link>
      <Header />
      <Search {...props} />
    </div>
  );
}
