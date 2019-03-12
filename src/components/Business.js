import React, { useState, useEffect } from 'react';
import './Business.css';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Businesses(props) {
  const [business, setBusiness] = useState('');
  const [fetchingData, setFetchingData] = useState(true)

  const fetchBusiness = async () => {
    const response = await fetch(`${API_BASE_URL}${props.location.pathname}`)
    const normalize = await normalizeResponseErrors(response)
    const rcvdBusiness = await normalize.json()
    setBusiness(rcvdBusiness)
    setFetchingData(false)
  }

  const viewNumber = (e) => {
    e.preventDefault()
    console.log('hello')
  }
  
  useEffect(
    () => {
      fetchBusiness()
    }, []
  )
  
  return (
    fetchingData ? (
      <div className='businessDetails'>
        <h2>Getting the data insert a spining wheel</h2>
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
      </div>
    )
  );
}