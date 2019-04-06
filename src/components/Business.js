import React, { useState, useEffect } from "react";
import BusinessForm from "./BusinessForm";
import NavBar from "./NavBar";
import Search from "./Search";
import "./Business.css";
import phoneIcon from "../images/phone.svg";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
const { API_BASE_URL } = require("../config");

export default function Businesses(props) {
  const [business, setBusiness] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [day, setDay] = useState("");
  const [serverMessage, setServerMessage] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const [modal, setModal] = useState(false);

  // This is for the form
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [categories, setCategories] = useState("");
  const [category, setCategory] = useState("");
  const [telephone, setTelephone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [googlePlace, setGooglePlace] = useState("");
  const [hours, setHours] = useState({});
  const [resetHours, setResetHours] = useState(false);
  // console.log(hours)

  const setStates = rcvdBusiness => {
    setBusinessName(rcvdBusiness.name);
    setContactName(rcvdBusiness.contactName);
    setCategory(rcvdBusiness.category._id);
    setStreet(rcvdBusiness.address.street);
    setTelephone(rcvdBusiness.telephone);
    setCity(rcvdBusiness.address.city);
    setState(rcvdBusiness.address.state);
    setZip(rcvdBusiness.address.zip);
    setLatitude(rcvdBusiness.address.coordinates[1]);
    setLongitude(rcvdBusiness.address.coordinates[0]);
    setGooglePlace(rcvdBusiness.googlePlace);
    setHours(rcvdBusiness.hours);
    return rcvdBusiness;
  };

  const formatPhoneNumber = phoneNumberString => {
    let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let formated = "(" + match[1] + ") " + match[2] + "-" + match[3];
      return formated;
    }
  };

  const handleHoursChange = (day, value) => {
    hours[day] = value;
  };

  const fetchCategories = () => {
    return fetch(`${API_BASE_URL}/categories`, {
      method: "GET"
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(rcvdCategories => {
        setServerMessage(null);
        if (rcvdCategories.length > 0) {
          setCategories(rcvdCategories);
        }
      })
      .catch(err => {
        setServerMessage("Unable to connect to server");
      });
  };

  const fetchBusiness = () => {
    setServerMessage("Fetching Data");
    return fetch(`${API_BASE_URL}${props.location.pathname}`, {
      method: "GET"
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(rcvdBusiness => {
        setBusinessId(rcvdBusiness.id);
        setBusiness(rcvdBusiness);
        setStates(rcvdBusiness);
        setServerMessage(null);
        displayHours(rcvdBusiness.hours);
        setFetchingData(false);
      })
      .catch(err => {
        console.log(err);
        let message;
        if (err.code === 404) {
          message = err.message;
        } else if (err.code === 500) {
          message = "Internal server error";
        } else {
          message = "Something went wrong, please try again later";
        }
        setServerMessage(message);
      });
  };

  const handleDelete = e => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/business/${businessId}`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({
        id: businessId
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        setServerMessage(null);
        setServerMessage("Business was successfully deleted.");
        setTimeout(() => {
          setServerMessage(null);
          props.history.goBack();
        }, 5000);
      })
      .catch(err => {
        console.log(err);
        let message;
        if (err.code === 422 || 400) {
          message = err.message;
        } else if (err.code === 500) {
          message = "Internal server error";
        } else {
          message = "Something went wrong, please try again later";
        }
        setServerMessage(message);
      });
  };

  const handleEdit = e => {
    e.preventDefault();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    return fetch(`${API_BASE_URL}/business/${businessId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        user: localStorage.userId,
        contactName: contactName,
        id: businessId,
        name: businessName,
        category,
        googlePlace,
        address: {
          street,
          city,
          state,
          zip,
          coordinates: [longitude, latitude]
        },
        hours: hours,
        telephone
      })
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        setServerMessage(null);
        setServerMessage("Business successfully updated.");
        setTimeout(() => {
          setServerMessage(null);
          fetchBusiness();
          updateModal();
        }, 4000);
      })
      .catch(err => {
        console.log(err);
        let message;
        if (err.code === 422 || 400) {
          message = err.message;
        } else if (err.code === 500) {
          message = "Internal server error";
        } else {
          message = "Something went wrong, please try again later";
        }
        setServerMessage(message);
      });
  };

  const timeDispaly = time => {
    time = time.split(":");

    let hours = Number(time[0]);
    let minutes = Number(time[1]);

    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
    timeValue += hours >= 12 ? "pm" : "am";
    return timeValue;
  };

  const displayHours = obj => {
    const days = Object.keys(obj);

    days.forEach(day => {
      setDay(
        days.map((day, index) => {
          return (
            <div className="day" key={index}>
              <span className="dayDetails">{day} </span>
              {obj[day].open === obj[day].close ? (
                <span className="dayDetails">&nbsp;Closed</span>
              ) : (
                <span className="dayDetails">
                  &nbsp;{timeDispaly(obj[day].open)}-
                  {timeDispaly(obj[day].close)}
                </span>
              )}
            </div>
          );
        })
      );
    });
  };

  const updateModal = e => {
    modal ? setModal(false) : setModal(true);
  };

  useEffect(() => {
    fetchBusiness();
    fetchCategories();
  }, []);

  return (
    <>
      {modal ? (
        <section className="modal forms" aria-live="assertive">
          <form
            className="modal-content animate padding"
            onSubmit={handleSubmit}
          >
            <div className="imgcontainer">
              <span className="close" onClick={updateModal} title="Close Form">
                &times;
              </span>
            </div>

            <fieldset>
              <legend className="formTitle">Edit Business</legend>
              <section>
                <BusinessForm
                  hours={hours}
                  handleSubmit={handleEdit}
                  categories={categories}
                  handleHoursChange={handleHoursChange}
                  businessName={businessName}
                  setBusinessName={setBusinessName}
                  contactName={contactName}
                  setContactName={setContactName}
                  category={category}
                  setCategory={setCategory}
                  telephone={telephone}
                  setTelephone={setTelephone}
                  street={street}
                  setStreet={setStreet}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  zip={zip}
                  setZip={setZip}
                  latitude={latitude}
                  setLatitude={setLatitude}
                  longitude={longitude}
                  setLongitude={setLongitude}
                  googlePlace={googlePlace}
                  setGooglePlace={setGooglePlace}
                  resetHours={resetHours}
                  setResetHours={setResetHours}
                />
              </section>
            </fieldset>
            {serverMessage}
          </form>
        </section>
      ) : null}{" "}
      <div className="componentLayout">
        <NavBar />
        <Search {...props} />

        {fetchingData ? (
          <h2>{serverMessage}</h2>
        ) : (
          <div className="componentResults business">
            <h2>{business.name}</h2>
            {business.contactName ? <span>{business.contactName}</span> : null}

            <a className="contactInfo" href={`tel:${business.telephone}`}>
              <img className="icon" src={phoneIcon} alt="phone" />
              &nbsp;{formatPhoneNumber(business.telephone)}
            </a>

            <div className="padding">
              <h3>Address</h3>
              <address>
                <span>
                  {business.address.street}, &nbsp;{business.address.city},
                  &nbsp;{business.address.state}
                  &nbsp;{business.address.zip}
                </span>
              </address>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={business.googlePlace}
              >
                Map
              </a>
            </div>

            <div className="padding hours">
              <h3>Hours</h3>
              {day}
            </div>

            {localStorage.admin ? (
              <div>
                <button
                  type="button"
                  onClick={e => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this business?"
                      )
                    )
                      handleDelete(e);
                  }}
                >
                  Delete
                </button>
                <button type="button" onClick={updateModal}>
                  Edit
                </button>
              </div>
            ) : null}

            {serverMessage}
          </div>
        )}
      </div>
    </>
  );
}
