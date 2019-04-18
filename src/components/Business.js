import React, { useState, useEffect } from "react";
import BusinessForm from "./BusinessForm";
import NavBar from "./NavBar";
import Search from "./Search";
import SubmitAnEditForm from "./SubmitAnEditForm";
import "./Business.css";
import phoneIcon from "../images/phone.svg";
import mapIcon from "../images/map.svg";
import { normalizeResponseErrors } from "../functions/normalizeResponse";
const { API_BASE_URL } = require("../config");

export default function Businesses(props) {
  const [fetchingData, setFetchingData] = useState(true);
  const [business, setBusiness] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [day, setDay] = useState("");
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [businessDeleted, setBusinessDeleted] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

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
    setFetchingData(true);
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
        setBusinessDeleted(true);
        setTimeout(() => {
          props.history.goBack();
        }, 3000);
      })
      .catch(err => {
        console.log(err);
        let message;
        if (err.code === 403) {
          message = "Unauthorized";
        } else if (err.code === 500) {
          message = "Internal server error";
        } else {
          message = "Something went wrong, please try again later";
        }
        setServerMessage(message);
      });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitDisable(true);

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
        setSubmitDisable(false);
        fetchBusiness();
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          updateModal();
        }, 3000);
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
        setSubmitDisable(false);
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
              <span className="theDay">{day}</span>

              {obj[day].open === obj[day].close ? (
                <span className="dayDetails">Closed</span>
              ) : (
                <span className="dayDetails">
                  {timeDispaly(obj[day].open)}-{timeDispaly(obj[day].close)}
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

  const updateEditModal = e => {
    editModal ? setEditModal(false) : setEditModal(true);
  };

  useEffect(() => {
    fetchBusiness();
    fetchCategories();
  }, []);

  return (
    <div className="componentLayout">
      <NavBar />
      <Search blur={editModal ? true : false} {...props} />

      {editModal ? (
        <SubmitAnEditForm
          updateEditModal={updateEditModal}
          businessName={business.name}
          businessId={businessId}
        />
      ) : null}

      {modal ? (
        <section className="modal forms" aria-live="assertive">
          <div className="modal-content animate padding">
            {!success ? (
              <form onSubmit={handleSubmit}>
                <div className="imgcontainer" onClick={updateModal}>
                  <span className="close" title="Close Form">
                    &times;
                  </span>
                </div>

                <fieldset>
                  <legend className="formTitle">Edit Business</legend>
                  <section>
                    <BusinessForm
                      hours={hours}
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

                <button type="submit" disabled={submitDisable}>
                  Submit
                </button>

                {serverMessage ? <div>{serverMessage}</div> : null}
              </form>
            ) : (
              <p>Business succesfully edited</p>
            )}
          </div>
        </section>
      ) : null}

      {fetchingData ? (
        <h2>{serverMessage ? serverMessage : "Fetching Data"}</h2>
      ) : businessDeleted ? (
        <h2>Business Successfully Deleted</h2>
      ) : (
        <div
          className={`componentResults business ${
            editModal || modal ? "blur" : null
          }`}
        >
          <h2>{business.name}</h2>

          {business.contactName ? (
            <span className="contact">{business.contactName}</span>
          ) : null}
          <span>{formatPhoneNumber(business.telephone)}</span>

          <address>
            <span>
              {business.address.street},<br />
              {business.address.city}
              ,&nbsp;{business.address.state}
              &nbsp;{business.address.zip}
            </span>
          </address>

          <div className="uxLinkContainer">
            <a
              className="uxLink showOnMobile"
              href={`tel:${business.telephone}`}
            >
              <img className="icon" src={phoneIcon} alt="phone" />
              Call
            </a>

            <a
              className="uxLink"
              target="_blank"
              rel="noopener noreferrer"
              href={business.googlePlace}
            >
              <img className="icon" src={mapIcon} alt="phone" />
              Map
            </a>
          </div>

          <div className="hours">
            <h3>Hours</h3>
            {day}
          </div>

          <div className="userFormButtonContainer">
            {localStorage.admin ? (
              <>
                <button
                  type="button"
                  className="uxLink other"
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

                <button
                  className="uxLink other"
                  type="button"
                  onClick={updateModal}
                >
                  Edit
                </button>
              </>
            ) : (
              <button
                type="button"
                className="uxLink other"
                onClick={updateEditModal}
              >
                Submit An Edit
              </button>
            )}
          </div>

          {serverMessage ? <div>{serverMessage}</div> : null}
        </div>
      )}
    </div>
  );
}
