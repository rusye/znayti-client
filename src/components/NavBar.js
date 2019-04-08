import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import menuIcon from "../images/menu.svg";

export default function NavBar() {
  const [links, setLinks] = useState("");
  const [displayMenu, setDisplayMenu] = useState(false);

  const hide = e => {
    window.onclick = function(e) {
      if (e.target.alt !== "Dropdown menu" && displayMenu) {
        setDisplayMenu(false);
      }
    };
  };

  useEffect(() => {
    setLinks(
      <>
        <Link tabIndex="-1" to="/">
          <button
            className="bar-item button-one"
            onClick={() => setDisplayMenu(false)}
          >
            Home
          </button>
        </Link>

        <Link tabIndex="-1" to="/dashboard">
          <button
            className="bar-item button-one"
            onClick={() => setDisplayMenu(false)}
          >
            Dashboard
          </button>
        </Link>

        <Link tabIndex="-1" to="/about">
          <button
            className="bar-item button-one"
            onClick={() => setDisplayMenu(false)}
          >
            About
          </button>
        </Link>

        <Link tabIndex="-1" to="/">
          <button
            className="bar-item button-one"
            onClick={() => {
              setDisplayMenu(false);
              localStorage.clear();
            }}
          >
            LogOut
          </button>
        </Link>
      </>
    );
  }, []);

  useEffect(() => {
    hide();
  });

  return (
    <nav role="navigation">
      <div className="bar padding card">
        <Link tabIndex="-1" to="/">
          <button className="logo bar-item button-one">
            <b>Znayti</b>
          </button>
        </Link>

        {localStorage.loggedIn ? (
          <>
            <div className="right hide-small">{links}</div>

            <button
              className="menu bar-item button-one hide-large right"
              type="button"
              onClick={() =>
                displayMenu ? setDisplayMenu(false) : setDisplayMenu(true)
              }
              aria-label="dropdown menu"
            >
              <img className="icon" src={menuIcon} alt="Dropdown menu" />
            </button>
            {displayMenu ? (
              <div className="dropdown bar-block hide-large top">{links}</div>
            ) : null}
          </>
        ) : (
          <div className="right">
            <Link to="/">
              <button className="bar-item button-one">Home</button>
            </Link>
            
            <Link to="/about">
              <button className="bar-item button-one">About</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
