import React, { useState } from "react";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";

export default function AddAdminUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverMessage, setServerMessage] = useState(null);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
  };

  const handleSubmit = e => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/api/users/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
        admin: true
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(res => {
        setServerMessage(null);
        reset();
        setServerMessage(`${res.username} succesfully added`);
        setTimeout(() => {
          setServerMessage(null);
        }, 4000);
      })
      .catch(err => {
        let message;
        if (err.code === 422) {
          message = err.message;
        } else if (err.code === 500) {
          message = "Internal server error";
        } else {
          message = "Something went wrong, please try again later";
        }
        setServerMessage(message);
        setTimeout(() => {
          setServerMessage(null);
        }, 5000);
      });
  };

  return (
    <form className="padding" onSubmit={handleSubmit}>
      <fieldset>
        <legend className="formTitle">Add New Admin</legend>
        <label aria-label="username-input">
          First Name&nbsp;
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="enter first name"
            type="text"
            name="first-name"
            pattern="[A-Za-z]{1,35}"
            title="Please enter first name"
            aria-labelledby="first-name"
          />
        </label>

        <label aria-label="username-input">
          Last Name&nbsp;
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="enter last name"
            type="text"
            name="last-name"
            pattern="[A-Za-z]{1, 35}"
            title="Please enter last name"
            aria-labelledby="last-name"
          />
        </label>

        <label aria-label="username-input">
          Username&nbsp;
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="enter username"
            type="text"
            name="username"
            pattern="[A-Za-z0-9_]{4,35}"
            title="Please enter a desired username, must be min of 4 characters and max of 35"
            required
            aria-labelledby="username"
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
            // pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
            aria-labelledby="login-password"
          />
        </label>

        <button type="submit" className="add-user-admin-submit">
          Submit
        </button>
        <button type="reset" onClick={reset}>
          Reset
        </button>
        {serverMessage ? <div>{serverMessage}</div> : null}
      </fieldset>
    </form>
  );
}
