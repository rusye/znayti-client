import React, { useState, useEffect } from "react";
import "./Search.css";
import searchIcon from "../images/search.svg";
import arrowIcon from "../images/downArrow.svg";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";

const cache = {};

export default function Search(props) {
  const [userLocation, setLocation] = useState("Portland, OR");
  const [radius, setRadius] = useState(10);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [locadingIcon, setLoadingIcon] = useState(false);
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

  const getLocationCoordinates = input => {
    if (cache[input]) {
      return Promise.resolve(cache[input]);
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
        cache[input] = [res.lat, res.long];
        return [res.lat, res.long];
      })
      .catch(err => {
        console.log(err);
        let message = "Something went wrong, please try again later";
        setServerMessage(message);
        return Promise.reject();
      });
  };

  const searchRequest = e => {
    e.preventDefault();
    setSubmitDisable(true);
    setLoadingIcon(true);
    return getLocationCoordinates(userLocation)
      .then(res => {
        const [lat, long] = res;
        setLoadingIcon(false);
        setSubmitDisable(false);
        props.history.push(
          `/business/search?long=${long}&lat=${lat}&rad=${radius}&input=${userLocation}`
        );
      })
      .catch(res => {
        setLoadingIcon(false);
        setSubmitDisable(false);
      });
  };

  useEffect(() => {
    paramsKeys(parseQueryString(paramsString));
  }, []);

  return (
    <>
      <form className="search-bar" autoComplete="off" onSubmit={searchRequest}>
        <label htmlFor="inp" className="inp">
          <input
            id="inp"
            className="heightForty widthTwoHundred"
            aria-label="city and state"
            title="Please enter city and state you wish to search in"
            type="text"
            name="search"
            required
            onChange={e => updateLocation(e.target.value)}
            value={userLocation}
            placeholder="&nbsp;"
          />
          <span className="label">City, State</span>
          <span className="border" />
        </label>
        <label htmlFor="sel" className="inp selectSpecs">
          <select
            id="sel"
            className="heightForty"
            aria-label="radius"
            value={radius}
            onChange={e => updateRadius(e.target.value)}
            title="Please select how far from your location you want to search"
          >
            <option value="10">10 Miles</option>
            <option value="20">20 Miles</option>
            <option value="50">50 Miles</option>
            <option value="100">100 Miles</option>
            <option value="200">200 Miles</option>
            <option value="3963.2">Any</option>
          </select>
          <span className="label">Radius</span>
          <span className="border" />
          <img className="downArrow" src={arrowIcon} alt="select arrow" />
        </label>

        <button
          className="searchButton"
          aria-label="search"
          type="submit"
          disabled={submitDisable}
        >
          {locadingIcon ? (
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          ) : (
            <img className="searchIcon" src={searchIcon} alt="search" />
          )}
        </button>
      </form>
      {serverMessage ? <div className="whiteText">{serverMessage}</div> : null}
    </>
  );
}
