import React, { useState, useEffect } from 'react';
import './Category.css';
import Search from './Search';
import NavBar from './NavBar';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
const {API_BASE_URL} = require('../config');


export default function Businesses(props) {
  const [business, setBusiness] = useState('');
  console.log(props.location.pathname)

  const fetchBusiness = async () => {
    const response = await fetch(`${API_BASE_URL}${props.location.pathname}`)
    const normalize = await normalizeResponseErrors(response)
    const rcvdBusiness = await normalize.json()
    setBusiness(rcvdBusiness)
  }
  
  useEffect(
    () => {
      fetchBusiness()
    }, []
  )

  // console.log(business.address.city)
  return (
    <div className='businesses'>
      <NavBar />
      <Search {...props} />
      <div>
        <h2>{business.name}</h2>
        <div className='address'>
          <h3>Address</h3>
          {/* <p>Street: {business.address.street}</p> */}
          {/* <p>City: {business.address.city}</p>
          <p>State: {business.address.state}</p>
          <p>Zip: {business.address.zip}</p> */}
        </div>
        <div className='hours'>
          <h3>Hours</h3>
          {/* <span>Monday: {business.hours.monday}</span>
          <span>Tuesday: {business.hours.tuesday}</span>
          <span>Wednesday: {business.hours.wednesday}</span>
          <span>Thursday: {business.hours.thursday}</span>
          <span>Friday: {business.hours.friday}</span>
          <span>Saturday: {business.hours.saturday}</span>
          <span>Sunday: {business.hours.sunday}</span> */}
        </div>
        <input type='button' value='View Telephone'></input>
      </div>
    </div>
  );
}