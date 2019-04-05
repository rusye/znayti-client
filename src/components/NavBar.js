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
        <Link tabIndex="0" to="/">
          <div
            className="bar-item button-one"
            onClick={() => setDisplayMenu(false)}
          >
            Home
          </div>
        </Link>

        <Link tabIndex="0" to="/dashboard">
          <div
            className="bar-item button-one"
            onClick={() => setDisplayMenu(false)}
          >
            Dashboard
          </div>
        </Link>

        <Link tabIndex="0" to="/">
          <div
            className="bar-item button-one"
            onClick={() => {
              setDisplayMenu(false);
              localStorage.clear();
            }}
          >
            LogOut
          </div>
        </Link>
      </>
    );
  }, []);

  useEffect(() => {
    hide();
  });

  return (
    <nav role="navigation">
      <div className="bar wide padding card">
        <Link tabIndex="0" to="/">
          <div className="logo bar-item button-one">
            <b>Znayti</b>
          </div>
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
              <div className="bar-item button-one">Home</div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
