import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
import HourInputs from "./HourInputs";
import SelectCategory from "./SelectCategory";

export default function BusinessForm(props) {
  const [eachDay, setEachDay] = useState("");
  const [serverMessage, setServerMessage] = useState(null);

  const populateDays = () => {
    props.setResetHours(false);
    let days;

    if (props.hours) {
      days = Object.keys(props.hours);

      days.forEach(day => {
        setEachDay(
          days.map((day, index) => {
            return (
              <fieldset className="hourInputs" key={index}>
                <HourInputs
                  open={props.hours[day].open}
                  close={props.hours[day].close}
                  name={day}
                  onChange={props.handleHoursChange}
                />
              </fieldset>
            );
          })
        );
      });
    } else {
      days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ];

      setEachDay(
        days.map((day, index) => {
          return (
            <fieldset className="hourInputs" key={index}>
              <HourInputs name={day} onChange={props.handleHoursChange} />
            </fieldset>
          );
        })
      );
    }
  };

  const findBusiness = e => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/findbusiness`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        textquery: `${props.businessName} ${props.street}, ${props.city}, ${
          props.state
        }, ${props.zip}`
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(res => {
        setServerMessage(null);
        props.setGooglePlace(res.url);
        props.setLatitude(res.lat);
        props.setLongitude(res.lng);
      })
      .catch(err => {
        console.log(err);
        let message;
        if (err.code === 422) {
          message = err.message;
        } else if (err.code === 500) {
          message = "Internal server error";
        } else {
          message = "Something went wrong, please try again later";
        }
        setServerMessage(message);
      });
  };

  useEffect(() => {
    populateDays();
  }, []);

  return (
    <section>
      <fieldset>
        <legend>General Info</legend>
        <label aria-label="business name">
          Business Name&nbsp;
          <input
            value={props.businessName}
            onChange={e => props.setBusinessName(e.target.value)}
            placeholder="enter business name"
            type="text"
            name="business-name"
            pattern="^(\b[A-Z]\w*\s*)+.{2,}$"
            title="Please enter the business name"
            aria-labelledby="business-name"
            required
          />
        </label>

        <label aria-label="contact name">
          Contact Name&nbsp;
          <input
            value={props.contactName}
            onChange={e => props.setContactName(e.target.value)}
            placeholder="enter contact name"
            type="text"
            name="contact-name"
            pattern="^(\b[A-Z]\w*\s*)+.{2,}$"
            title="Please enter the contact name"
            aria-labelledby="contact-name"
          />
        </label>

        <SelectCategory
          {...props}
          category={props.category}
          setCategory={props.setCategory}
        />

        <label aria-label="telephone-input">
          Telephone&nbsp;
          <input
            type="tel"
            value={props.telephone}
            onChange={e => props.setTelephone(e.target.value)}
            placeholder="5031239876"
            title="Please enter a telephone number in this format: 5031239876"
            pattern="^[0-9]{10,10}$"
            name="telephone"
            aria-labelledby="telephone"
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Business Address</legend>

        <label aria-label="street-address-input">
          Street Address&nbsp;
          <input
            type="text"
            value={props.street}
            onChange={e => props.setStreet(e.target.value)}
            placeholder="123 Main St"
            title="Please enter a street address in this pattern 542 W 15th Street"
            name="street-address"
            aria-labelledby="street-address"
            required
          />
        </label>

        <label aria-label="city-name-input">
          City&nbsp;
          <input
            type="text"
            value={props.city}
            onChange={e => props.setCity(e.target.value)}
            placeholder="Portland"
            title="Please enter a city name, first letter must be capital"
            pattern="^(\b[A-Z]\w*\s*)+.{2,}$"
            name="city-name"
            aria-labelledby="city-name"
            required
          />
        </label>

        <label aria-label="state-name-input">
          State&nbsp;
          <input
            type="text"
            value={props.state}
            onChange={e => props.setState(e.target.value)}
            placeholder="OR"
            title="Please enter state two letter abbreviation, must be uppercase"
            pattern="[A-Z]{2}"
            name="state-name"
            aria-labelledby="state-name"
            required
          />
        </label>

        <label aria-label="state-name-input">
          Zip Code&nbsp;
          <input
            type="number"
            value={props.zip}
            onChange={e => props.setZip(e.target.value)}
            placeholder="97236"
            title="Please enter the business zip code"
            pattern="^\d{5}(?:[-]\d{4})?$"
            name="zip-code"
            aria-labelledby="zip code"
            required
          />
        </label>

        <label aria-label="latitude-input">
          Latitude&nbsp;
          <input
            type="number"
            value={props.latitude}
            onChange={e => props.setLatitude(e.target.value)}
            placeholder="45.5426225"
            title="Please enter the latitude, between 0 and 90 (North/South)"
            pattern="^([+]?)(90(\.0+)?|([1-8]?\d))(\.\d+)?$"
            name="latitude-code"
            aria-labelledby="latitude code"
            required
          />
        </label>

        <label aria-label="longitude-input">
          Longitude&nbsp;
          <input
            type="number"
            value={props.longitude}
            onChange={e => props.setLongitude(e.target.value)}
            placeholder="-122.7944704"
            title="Please enter the longitude, between -180 and 0 (East/West)"
            pattern="^([\-])(180(\.0+)?|(1[0-7]\d)|([1-9]?\d))(\.\d+)?$"
            name="longitude-code"
            aria-labelledby="longitude code"
            required
          />
        </label>

        <button
          type="button"
          aria-label="search for business in google"
          title="Please make sure business name, street, city, state, and zip are filled out"
          onClick={findBusiness}
          disabled={
            !(
              props.businessName &&
              props.street &&
              props.city &&
              props.state &&
              props.zip
            )
          }
        >
          Find Business
        </button>
        {serverMessage ? <div>{serverMessage}</div> : null}

        {props.googlePlace ? (
          <p>
            Did Google find the correct business?
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${props.googlePlace}`}
            >
              Please check this link
            </a>
            <label className="displayBlock">
              Yes <input type="checkbox" value="Yes" required />
            </label>
          </p>
        ) : null}
      </fieldset>

      <fieldset key={props.resetHours}>
        <legend>Business Hours</legend>
        {eachDay}
      </fieldset>

      <button type="submit" disabled={props.submitDisable}>
        Submit
      </button>

      <button type="reset" onClick={props.reset}>
        Reset
      </button>
    </section>
  );
}
