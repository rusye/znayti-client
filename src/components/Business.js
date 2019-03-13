import React, { useState, useEffect } from 'react';
import './Business.css';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Businesses(props) {
  const [business, setBusiness] = useState('');
  const [businessId, setBusinessId] = useState('')
  const [serverMessage, setServerMessage] = useState('Fetching Data');
  const [fetchingData, setFetchingData] = useState(true)

  const fetchBusiness = () => {
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

  const viewNumber = (e) => {
    e.preventDefault()
    console.log('hello')
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
  
  useEffect(
    () => {
      fetchBusiness()
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
          <p>Monday: {business.hours.monday}</p>
          <p>Tuesday: {business.hours.tuesday}</p>
          <p>Wednesday: {business.hours.wednesday}</p>
          <p>Thursday: {business.hours.thursday}</p>
          <p>Friday: {business.hours.friday}</p>
          <p>Saturday: {business.hours.saturday}</p>
          <p>Sunday: {business.hours.sunday}</p>
        </div>
        <button type='button' onClick={viewNumber}>View Telephone</button>
        {localStorage.admin ? (
          <button type='button' onClick={e => {if (window.confirm('Are you sure you want to delete this business?')) handleDelete(e)} }>Delete</button>
        ) : null}
        {serverMessage}
      </div>
    )
  );
}