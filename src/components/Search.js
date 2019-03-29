import React, { useState, useEffect } from "react";
import "./Search.css";
import searchIcon from "../images/search.svg";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";

const cache = {};

export default function Search(props) {
  const [userLocation, setLocation] = useState("Portland, OR");
  const [radius, setRadius] = useState(10);
  const [serverMessage, setServerMessage] = useState(null);

  const paramsString = decodeURIComponent(window.location.search.substring(1));

  const parseQueryString = queryString => {
    let params = {},
      queries,
      temp,
      i;
    queries = queryString.split("&");
    for (i = 0; i < queries.length; i++) {
      temp = queries[i].split("=");
      params[temp[0]] = temp[1];
    }
    return params;
  };

  const paramsKeys = params =>
    params.input && params.rad
      ? (setLocation(params.input), setRadius(params.rad))
      : null;

  const updateLocation = e => {
    setLocation(e);
  };

  const updateRadius = e => {
    setRadius(e);
  };

  useEffect(() => {
    paramsKeys(parseQueryString(paramsString));
  }, []);

  const searchRequest = e => {
    e.preventDefault();

    if (cache[userLocation]) {
      return cache[userLocation];
    }

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/location`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        location: userLocation
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(res => {
        setServerMessage(null);
        cache[userLocation] = [res.lat, res.long];
        return res;
      })
      .then(results => {
        props.history.push(
          `/business/search?long=${results.long}&lat=${results.lat}&rad=${radius}&input=${userLocation}`
        );
      })
      .catch(err => {
        console.log(err);
        let message = "Something went wrong, please try again later";
        setServerMessage(message);
      });
  };

  return (
    <>
      <form className="search-bar" onSubmit={searchRequest}>
        <input
          className="heightForty widthTwoHundred"
          aria-label="city and state"
          type="text"
          name="search"
          value={userLocation}
          onChange={e => updateLocation(e.target.value)}
          placeholder="City, State"
          required
        />

        <select
          className="heightForty"
          aria-label="radius"
          value={radius}
          onChange={e => updateRadius(e.target.value)}
        >
          <option value="10">10 Miles</option>
          <option value="20">20 Miles</option>
          <option value="50">50 Miles</option>
          <option value="100">100 Miles</option>
          <option value="200">200 Miles</option>
          <option value="3963.2">Any</option>
        </select>

        <button className="heightForty" aria-label="search" type="submit">
          <img className="search" src={searchIcon} alt="search" />
        </button>
      </form>
      {serverMessage ? <div className="whiteText">{serverMessage}</div> : null}
    </>
  );
}
