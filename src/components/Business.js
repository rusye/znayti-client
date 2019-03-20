import React, { useState, useEffect } from 'react';
import BusinessForm from './BusinessForm'
import './Business.css';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Businesses(props) {
  const [business, setBusiness] = useState('');
  const [businessId, setBusinessId] = useState('')
  const [day, setDay] = useState('')
  const [serverMessage, setServerMessage] = useState(null);
  const [fetchingData, setFetchingData] = useState(true)
  const [showtelephone, setShowtelephone] = useState(false)
  const [modal, setModal] = useState(false)

  // This is for the form
  const [businessName, setBusinessName] = useState('');
  const [categories, setCategories] = useState('')
  const [category, setCategory] = useState('');
  const [telephone, setTelephone] = useState('')
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [hours, setHours] = useState({})
  const [resetHours, setResetHours] = useState(false)
  // console.log(hours)

  const setStates = (rcvdBusiness) => {
    setBusinessName(rcvdBusiness.name)
    setCategory(rcvdBusiness.category._id)
    setStreet(rcvdBusiness.address.street)
    setTelephone(rcvdBusiness.telephone)
    setCity(rcvdBusiness.address.city)
    setState(rcvdBusiness.address.state)
    setZip(rcvdBusiness.address.zip)
    setLatitude(rcvdBusiness.address.coordinates[1])
    setLongitude(rcvdBusiness.address.coordinates[0])
    setHours(rcvdBusiness.hours)
    return rcvdBusiness
  }

  const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      let formated = '(' + match[1] + ') ' + match[2] + '-' + match[3]
      return formated
    }
  }

  const handleHoursChange = (day, value) => {
    hours[day] = value
  }

  const fetchCategories = () => {
    return fetch(`${API_BASE_URL}/categories`, {
        method: 'GET'
      })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(rcvdCategories => {
        setServerMessage(null)
        if (rcvdCategories.length > 0) {
          setCategories(rcvdCategories)
        }
      })
      .catch(err => {
        setServerMessage('Unable to connect to server')
      })
  }

  const fetchBusiness = () => {
    setServerMessage('Fetching Data')
    return fetch(`${API_BASE_URL}${props.location.pathname}`, {
      method: 'GET'
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      return res.json();
    })
    .then(rcvdBusiness => {
      setBusinessId(rcvdBusiness.id)
      setBusiness(rcvdBusiness)
      setStates(rcvdBusiness)
      setServerMessage(null)
      displayHours(rcvdBusiness.hours)
      setFetchingData(false)
    })
    .catch(err => {
      console.log(err)
      let message;
      if (err.code === 404) {
        message = err.message;
      } else if (err.code === 500) {
        message = 'Internal server error';
      } else {
        message = 'Something went wrong, please try again later';
      }
      setServerMessage(message)
    })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return (fetch(`${API_BASE_URL}/business/${businessId}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({
        'id': businessId
      })
    }))
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      setServerMessage(null);
      setServerMessage('Business was successfully deleted.')
      setTimeout(() => { 
        setServerMessage(null)
        props.history.goBack()
      }, 5000)
    })
    .catch(err => {
      console.log(err)
      let message;
      if (err.code === 422 || 400) {
        message = err.message;
      } else if (err.code === 500) {
        message = 'Internal server error';
      } else {
        message = 'Something went wrong, please try again later';
      }
      setServerMessage(message)
    })
  }

  const handleEdit = (e) => {
    e.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return (fetch(`${API_BASE_URL}/business/${businessId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        'user': localStorage.userId,
        'id': businessId,
        'name': businessName,
        category,
        'address': {
          street,
          city,
          state,
          zip,
          'coordinates': [longitude, latitude]
        },
        "hours": hours,
        telephone
      })
    }))
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      setServerMessage(null);
      // reset()
      setServerMessage('Business successfully updated.')
      setTimeout(() => { 
        setServerMessage(null)
        fetchBusiness()
        updateModal()
      }, 4000)
    })
    .catch(err => {
      console.log(err)
      let message;
      if (err.code === 422 || 400) {
        message = err.message;
      } else if (err.code === 500) {
        message = 'Internal server error';
      } else {
        message = 'Something went wrong, please try again later';
      }
      setServerMessage(message)
    })
  };

  const timeDispaly = (time) => {

    time = time.split(':');

    let hours = Number(time[0]);
    let minutes = Number(time[1]);
    
    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours === 0) {
      timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (hours >= 12) ? "pm" : "am";
    return timeValue
  }

  const displayHours = (obj) => {
    const days = Object.keys(obj)
  
    days.forEach(day => {
      setDay(days.map((day, index) => {
        return (
          <p key={index}> {day}: 
          {(obj[day].open === obj[day].close) ? (
            ' Closed'
            ) : (
              ` ${timeDispaly(obj[day].open)}-${timeDispaly(obj[day].close)}`
            ) }
          </p>
        )
      }))
    })
  }

  const updateModal = (e) => {
    modal ? setModal(false) : setModal(true)
  }
  
  useEffect(
    () => {
      fetchBusiness()
      fetchCategories()
    }, []
  )
  
  return (
    fetchingData ? (
      <div className='businessDetails'>
        <h2>{serverMessage}</h2>
      </div>
    ) : (
      <div className='businessDetails'>
        <h2>{business.name}</h2>
        <div className='address'>
          <h3>Address</h3>
          <p>Street: {business.address.street}</p>
          <p>City: {business.address.city}</p>
          <p>State: {business.address.state}</p>
          <p>Zip: {business.address.zip}</p>
        </div>
        
        <div className='hours'>
          <h3>Hours</h3>
          {day}
        </div>

        {showtelephone ? (
          <div className='telephone'><p>Telephone: {formatPhoneNumber(business.telephone)}</p></div>
          ) : (
          <button type='button' onClick={e => setShowtelephone(true)}>View Telephone</button>
          )
        }

        {modal ? (<section className='modal forms' aria-live='assertive'>
          <form className='modal-content animate' onSubmit={handleSubmit}>
            <div className="imgcontainer">
              <span className="close" onClick={updateModal} title="Close Form">&times;</span>
            </div>

            <fieldset>
              <legend>Edit Business</legend>
              <section className='container'>
                <BusinessForm 

                  hours={hours}

                  handleSubmit={handleEdit}

                  categories={categories}
          
                  handleHoursChange={handleHoursChange}
          
                  businessName={businessName}
                  setBusinessName={setBusinessName}
          
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
          
                  resetHours={resetHours}
                  setResetHours={setResetHours}
                />
              </section>
            </fieldset>
            {serverMessage}
          </form>
          {/* {serverMessage} */}
        </section>) : null}

        {localStorage.admin ? (
          <div>
            <button type='button' onClick={e => {if (window.confirm('Are you sure you want to delete this business?')) handleDelete(e)} }>Delete</button>
            <button type='button' onClick={updateModal}>Edit</button>
          </div>
        ) : null}

        {serverMessage}
      </div>
    )
  );
}