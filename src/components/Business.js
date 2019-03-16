import React, { useState, useEffect } from 'react';
import BusinessForm from './BusinessForm'
import './Business.css';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Businesses(props) {
  const [business, setBusiness] = useState('');
  const [businessId, setBusinessId] = useState('')
  const [serverMessage, setServerMessage] = useState(null);
  const [fetchingData, setFetchingData] = useState(true)
  const [showtelephone, setShowtelephone] = useState(false)
  const [modal, setModal] = useState(false)

  // This is for the form
  const [businessName, setBusinessName] = useState('');
  const [categories, setCategories] = useState('')
  const [category, setCategory] = useState('');
  // need to reformat the telephone back to regular for this
  const [telephone, setTelephone] = useState('')
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [hours, setHours] = useState({})
  const [resetHours, setResetHours] = useState(false)
  console.log(hours)

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

  // Delete this if I don't need it
  // const reset = () => {
  //   setBusinessName('')
  //   setCategory('')
  //   setTelephone('')
  //   setStreet('')
  //   setCity('')
  //   setState('')
  //   setZip('')
  //   setLatitude('')
  //   setLongitude('')
  //   setHours({})
  //   setResetHours(true)
  // }

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

  // const displayHours = () => {
  //   const keys = Object.keys(obj) // [ 'Monday', 'Tuesday' ]
  
  //   keys.forEach(key => {
  //     console.log('Name of key is', key)
  //     console.log('Value is', o[key])
  //   })
  // }

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
          <p>Monday: open {business.hours.Monday.open} close {business.hours.Monday.close}</p>
          <p>Tuesday: open {business.hours.Tuesday.open} close {business.hours.Tuesday.close}</p>
          <p>Wednesday: open {business.hours.Wednesday.open} close {business.hours.Wednesday.close}</p>
          <p>Thursday: open {business.hours.Thursday.open} close {business.hours.Thursday.close}</p>
          <p>Friday: open {business.hours.Friday.open} close {business.hours.Friday.close}</p>
          <p>Saturday: open {business.hours.Saturday.open} close {business.hours.Saturday.close}</p>
          <p>Sunday: open {business.hours.Sunday.open} close {business.hours.Sunday.close}</p>
        </div>

        {showtelephone ? (
          <div className='telephone'><p>Telephone: {formatPhoneNumber(business.telephone)}</p></div>
          ) : (
          <button type='button' onClick={e => setShowtelephone(true)}>View Telephone</button>
          )
        }

        {modal ? (<section className='modal forms' aria-live='assertive'>
          <form className='modal-content animate'>
            <div className="imgcontainer">
              <span className="close" onClick={updateModal} title="Close Form">&times;</span>
            </div>

            <fieldset>
              <legend>Edit Business</legend>
              <section className='container'>
                <BusinessForm 
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
          </form>
          {serverMessage}
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