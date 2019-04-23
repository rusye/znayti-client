import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { Redirect } from "react-router-dom";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
import NavBar from "./NavBar";
import "./AdminLogin.css";

export default function AdminLogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitDisable(true);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/api/auth/bigboss/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(res => {
        setServerMessage(null);
        localStorage.setItem("user", username);
        localStorage.setItem("authToken", res.authToken);
        localStorage.setItem("userId", res.user.id);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("admin", true);
        setSubmitDisable(false);
        props.history.push("/dashboard");
      })
      .catch(err => {
        let message;
        if (err.code === 401) {
          message = "Incorrect username or password";
        } else if (err.code === 403) {
          message = err.message;
        } else {
          message = "Unable to login, please try again";
        }
        setSubmitDisable(false);
        setServerMessage(message);
      });
  };

  return localStorage.loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <NavBar />
      <section className="fullCentered">
        <form className="padding adminLogin" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="formTitle">Admin Login</legend>
            <label aria-label="username-input">
              Username&nbsp;
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="enter username"
                type="text"
                name="username"
                pattern="[A-Za-z0-9_]{1,15}"
                title="Username should only contain letters, numbers and underscores; no more than 15 characters e.g. Jojo_123"
                required
                aria-labelledby="login-username"
              />
            </label>

            <label aria-label="password-input">
              Password&nbsp;
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="enter password"
                type="password"
                name="password"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                aria-labelledby="login-password"
              />
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={submitDisable}
            className="login-submit"
          >
            Submit
          </button>
        </form>

        {window.location.origin === "https://safe-shore-26648.herokuapp.com/" ||
        window.location.origin === "http://localhost:3000" ? (
          <p className="whiteText">Demo Username & Password: ffffffffff</p>
        ) : null}

        {serverMessage ? <div>{serverMessage}</div> : null}
      </section>
    </>
  );
}
